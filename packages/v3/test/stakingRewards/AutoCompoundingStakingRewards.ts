import { BancorNetwork } from '../../../v2/typechain';
import Contracts from '../../components/Contracts';
import {
    NetworkSettings,
    PoolToken,
    TestBancorNetwork,
    TestMasterPool,
    TestPoolCollection,
    TestAutoCompoundingStakingRewards,
    ExternalRewardsVault
} from '../../typechain-types';
import { expectRole, roles } from '../helpers/AccessControl';
import { ZERO_ADDRESS } from '../helpers/Constants';
import { createProxy, createSystem, depositToPool, setupSimplePool } from '../helpers/Factory';
import { toWei } from '../helpers/Types';
import { TokenWithAddress, createTokenBySymbol, transfer } from '../helpers/Utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import Decimal from 'decimal.js';
import { BigNumber, BigNumberish } from 'ethers';
import { ethers } from 'hardhat';

const { Upgradeable: UpgradeableRoles } = roles;

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;

describe('AutoCompoundingStakingRewards', () => {
    let deployer: SignerWithAddress;
    let user: SignerWithAddress;
    let stakingRewardsProvider: SignerWithAddress;

    let network: TestBancorNetwork;
    let networkSettings: NetworkSettings;
    let masterPool: TestMasterPool;
    let poolCollection: TestPoolCollection;
    let externalRewardsVault: ExternalRewardsVault;

    let autoCompoundingStakingRewards: TestAutoCompoundingStakingRewards;

    before(async () => {
        [deployer, user, stakingRewardsProvider] = await ethers.getSigners();
    });

    describe('construction', () => {
        beforeEach(async () => {
            ({ network, networkSettings, masterPool, poolCollection, externalRewardsVault } = await createSystem());

            autoCompoundingStakingRewards = await createProxy(Contracts.TestAutoCompoundingStakingRewards, {
                ctorArgs: [network.address, masterPool.address]
            });
        });

        it('should revert when attempting to reinitialize', async () => {
            await expect(autoCompoundingStakingRewards.initialize()).to.be.revertedWith(
                'Initializable: contract is already initialized'
            );
        });

        it('should revert when initialized with an invalid bancor network contract', async () => {
            await expect(
                Contracts.AutoCompoundingStakingRewards.deploy(ZERO_ADDRESS, masterPool.address)
            ).to.be.revertedWith('InvalidAddress');
        });

        it('should revert when initialized with an invalid master pool contract', async () => {
            await expect(
                Contracts.AutoCompoundingStakingRewards.deploy(network.address, ZERO_ADDRESS)
            ).to.be.revertedWith('InvalidAddress');
        });

        it('should be properly initialized', async () => {
            expect(await autoCompoundingStakingRewards.version()).to.equal(1);

            await expectRole(autoCompoundingStakingRewards, UpgradeableRoles.ROLE_ADMIN, UpgradeableRoles.ROLE_ADMIN, [
                deployer.address
            ]);
        });
    });

    describe('program', () => {
        let currentTime: BigNumber;

        const MIN_LIQUIDITY_FOR_TRADING = toWei(BigNumber.from(1_000));
        const INITIAL_RATE = { n: BigNumber.from(1), d: BigNumber.from(2) };
        const TOTAL_DURATION = 10 * MONTH;
        const TOTAL_REWARDS = 10;

        let token: TokenWithAddress;

        beforeEach(async () => {
            ({ network, networkSettings, masterPool, poolCollection, externalRewardsVault } = await createSystem());

            await networkSettings.setMinLiquidityForTrading(MIN_LIQUIDITY_FOR_TRADING);

            currentTime = BigNumber.from(0);

            autoCompoundingStakingRewards = await createProxy(Contracts.TestAutoCompoundingStakingRewards, {
                ctorArgs: [network.address, masterPool.address]
            });

            ({ token } = await setupSimplePool(
                {
                    symbol: 'TKN',
                    balance: BigNumber.from(10_000),
                    initialRate: INITIAL_RATE
                },
                deployer,
                network,
                networkSettings,
                poolCollection
            ));
        });

        describe('program creation', () => {
            it('should revert when reserve token is not valid', async () => {
                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        ZERO_ADDRESS,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.revertedWith('InvalidAddress');
            });

            it('should revert when rewards vault contract is not valid', async () => {
                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        ZERO_ADDRESS,
                        TOTAL_REWARDS,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.revertedWith('InvalidAddress');
            });

            it('should revert when there is a program already running', async () => {
                await autoCompoundingStakingRewards.createProgram(
                    token.address,
                    externalRewardsVault.address,
                    TOTAL_REWARDS,
                    0,
                    currentTime,
                    currentTime.add(TOTAL_DURATION)
                );

                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.revertedWith('ProgramActive');
            });

            it('should revert when total rewards is lower or equal to 0', async () => {
                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        -1,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.be.reverted;

                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        0,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.revertedWith('InvalidParam');
            });

            it('should revert when start time is higher than end time', async () => {
                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime.add(TOTAL_DURATION),
                        currentTime
                    )
                ).to.be.revertedWith('InvalidParam');
            });

            it('should revert when start time is lower than current time', async () => {
                await autoCompoundingStakingRewards.setTime(1);

                await expect(
                    autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        0,
                        currentTime.add(TOTAL_DURATION)
                    )
                ).to.revertedWith('InvalidParam');
            });

            it('should create the program', async () => {
                const startTime = currentTime;
                const endTime = currentTime.add(TOTAL_DURATION);

                const res = await autoCompoundingStakingRewards.createProgram(
                    token.address,
                    externalRewardsVault.address,
                    10,
                    0,
                    startTime,
                    endTime
                );

                await expect(res)
                    .to.emit(autoCompoundingStakingRewards, 'ProgramCreated')
                    .withArgs(token.address, externalRewardsVault.address, 10, 0, startTime, endTime);

                const program = await autoCompoundingStakingRewards.program(token.address);

                expect(program.pool).to.equal(token.address);
                expect(program.rewardsVault).to.equal(externalRewardsVault.address);
                expect(program.totalRewards).to.equal(10);
                expect(program.availableRewards).to.equal(10);
                expect(program.distributionType).to.equal(0);
                expect(program.startTime).to.equal(startTime);
                expect(program.endTime).to.equal(endTime);
                expect(program.prevDistributionTimestamp).to.equal(0);
                expect(program.isEnabled).to.equal(true);
            });
        });

        describe('program termination', () => {
            context('when program is not running', () => {
                it('should revert when there is no program running', async () => {
                    await expect(autoCompoundingStakingRewards.terminateProgram(token.address)).to.revertedWith(
                        'ProgramNotActive'
                    );
                });
            });

            context('when program is running', () => {
                beforeEach(async () => {
                    await autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    );
                });

                it('should terminate the program', async () => {
                    const newEndTime = 10;

                    await autoCompoundingStakingRewards.setTime(newEndTime);

                    const res = autoCompoundingStakingRewards.terminateProgram(token.address);

                    await expect(res)
                        .to.emit(autoCompoundingStakingRewards, 'ProgramTerminated')
                        .withArgs(token.address, newEndTime, 10);

                    const program = await autoCompoundingStakingRewards.program(token.address);

                    expect(program.pool).to.equal(token.address);
                    expect(program.rewardsVault).to.equal(externalRewardsVault.address);
                    expect(program.totalRewards).to.equal(10);
                    expect(program.availableRewards).to.equal(0);
                    expect(program.distributionType).to.equal(0);
                    expect(program.startTime).to.equal(currentTime);
                    expect(program.endTime).to.equal(newEndTime);
                    expect(program.prevDistributionTimestamp).to.equal(0);
                    expect(program.isEnabled).to.equal(true);
                });
            });
        });

        describe('program status', () => {
            context("when program doesn't exist", () => {
                it('should return false when program is not active', async () => {
                    expect(await autoCompoundingStakingRewards.isProgramActive(token.address)).to.be.false;
                });
            });

            context("when program hasn't started", () => {
                beforeEach(async () => {
                    await autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime.add(1),
                        currentTime.add(TOTAL_DURATION)
                    );
                });

                it("should return false if program hasn't started", async () => {
                    expect(await autoCompoundingStakingRewards.isProgramActive(token.address)).to.be.false;
                });
            });

            context('when program time has ended', () => {
                beforeEach(async () => {
                    await autoCompoundingStakingRewards.createProgram(
                        token.address,
                        externalRewardsVault.address,
                        TOTAL_REWARDS,
                        0,
                        currentTime,
                        currentTime.add(TOTAL_DURATION)
                    );

                    await autoCompoundingStakingRewards.setTime(currentTime.add(TOTAL_DURATION).add(1));
                });

                it('should return false when program has ended', async () => {
                    expect(await autoCompoundingStakingRewards.isProgramActive(token.address)).to.be.false;
                });
            });
        });
    });

    describe('process rewards', () => {
        const depositAndTransferToSR = async (
            lp: SignerWithAddress,
            token: TokenWithAddress,
            poolToken: TokenWithAddress,
            amount: BigNumberish,
            network: TestBancorNetwork,
            externalRewardsVault: ExternalRewardsVault
        ) => {
            await depositToPool(lp, token, amount, network);
            await transfer(lp, poolToken, externalRewardsVault, amount);
        };

        const tokenFromPoolToken = async (
            user: { address: string },
            poolCollection: TestPoolCollection,
            token: TokenWithAddress,
            poolToken: PoolToken
        ) => {
            const tokenStakedBalance = (await poolCollection.poolLiquidity(token.address)).stakedBalance;
            return (await poolToken.balanceOf(user.address)).mul(tokenStakedBalance).div(await poolToken.totalSupply());
        };

        const assertAccuracy = (actual: BigNumber, expected: BigNumber, minAccuracy = '0.999999999999999999') => {
            const actualDec = new Decimal(actual.toString());
            const actualExp = new Decimal(expected.toString());

            if (!actualDec.eq(actualExp)) {
                const accuracy = actualDec.gt(actualExp) ? actualExp.div(actualDec) : actualDec.div(actualExp);
                expect(accuracy.gte(new Decimal(minAccuracy)) && accuracy.lte(1)).to.equal(
                    true,
                    '\n' +
                        [`expected = ${actualExp}`, `actual   = ${actualDec}`, `accuracy = ${minAccuracy.length}`].join(
                            '\n'
                        )
                );
            }
        };

        function getPerc(num: number, percent: number): number;
        function getPerc(num: BigNumber, percent: number): BigNumber;

        function getPerc(num: number | BigNumber, percent: number): number | BigNumber {
            if (typeof num === 'number') {
                return num - Math.floor(num - (percent / 100) * num);
            }
            return num.sub(num.sub(num.mul(percent).div(100)));
        }

        context('FLAT', () => {
            const distributionType = 0;

            const MIN_LIQUIDITY_FOR_TRADING = toWei(BigNumber.from(1_000));
            const INITIAL_RATE = { n: BigNumber.from(1), d: BigNumber.from(2) };

            const INITIAL_STAKE = toWei(BigNumber.from(10_000));
            const TOTAL_REWARDS = toWei(BigNumber.from(90_000));
            const TOTAL_TOKEN = INITIAL_STAKE.add(TOTAL_REWARDS);
            const PROGRAM_TIME = 10 * DAY;

            let currentTime: BigNumber;

            let token: TokenWithAddress;
            let poolToken: PoolToken;

            beforeEach(async () => {
                ({ network, networkSettings, masterPool, poolCollection, externalRewardsVault } = await createSystem());

                await networkSettings.setMinLiquidityForTrading(MIN_LIQUIDITY_FOR_TRADING);

                autoCompoundingStakingRewards = await createProxy(Contracts.TestAutoCompoundingStakingRewards, {
                    ctorArgs: [network.address, masterPool.address]
                });

                await externalRewardsVault.grantRole(
                    roles.ExternalRewardsVault.ROLE_ASSET_MANAGER,
                    autoCompoundingStakingRewards.address
                );

                currentTime = BigNumber.from(0);

                ({ token, poolToken } = await setupSimplePool(
                    {
                        symbol: 'TKN',
                        balance: INITIAL_STAKE,
                        initialRate: INITIAL_RATE
                    },
                    user,
                    network,
                    networkSettings,
                    poolCollection
                ));

                await depositAndTransferToSR(
                    stakingRewardsProvider,
                    token,
                    poolToken,
                    TOTAL_REWARDS,
                    network,
                    externalRewardsVault
                );

                await autoCompoundingStakingRewards.createProgram(
                    token.address,
                    externalRewardsVault.address,
                    TOTAL_REWARDS,
                    distributionType,
                    currentTime,
                    currentTime.add(PROGRAM_TIME)
                );
            });

            describe('simple tests', () => {
                it('should not have distributed any rewards at the beginning of a program', async () => {
                    await autoCompoundingStakingRewards.processRewards(token.address);

                    const userTokenOwned = await tokenFromPoolToken(user, poolCollection, token, poolToken);
                    const externalRewardsVaultTokenOwned = await tokenFromPoolToken(
                        externalRewardsVault,
                        poolCollection,
                        token,
                        poolToken
                    );

                    assertAccuracy(userTokenOwned, INITIAL_STAKE);
                    assertAccuracy(externalRewardsVaultTokenOwned, TOTAL_REWARDS);
                });

                it('should have distributed all rewards at the end of a program', async () => {
                    await autoCompoundingStakingRewards.setTime(PROGRAM_TIME);
                    await autoCompoundingStakingRewards.processRewards(token.address);

                    const userTokenOwned = await tokenFromPoolToken(user, poolCollection, token, poolToken);
                    const externalRewardsVaultTokenOwned = await tokenFromPoolToken(
                        externalRewardsVault,
                        poolCollection,
                        token,
                        poolToken
                    );

                    assertAccuracy(userTokenOwned, TOTAL_TOKEN);
                    assertAccuracy(externalRewardsVaultTokenOwned, BigNumber.from(0));
                });
            });

            describe('advanced tests', () => {
                for (const programTimePercent of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
                    const currentTime = getPerc(PROGRAM_TIME, programTimePercent);

                    it(`should have distributed ${programTimePercent}% of all rewards at ${programTimePercent}% of a program`, async () => {
                        await autoCompoundingStakingRewards.setTime(currentTime);
                        await autoCompoundingStakingRewards.processRewards(token.address);

                        const userTokenOwned = await tokenFromPoolToken(user, poolCollection, token, poolToken);
                        const externalRewardsVaultTokenOwned = await tokenFromPoolToken(
                            externalRewardsVault,
                            poolCollection,
                            token,
                            poolToken
                        );

                        assertAccuracy(userTokenOwned, INITIAL_STAKE.add(getPerc(TOTAL_REWARDS, programTimePercent)));

                        assertAccuracy(
                            externalRewardsVaultTokenOwned,
                            getPerc(TOTAL_REWARDS, 100 - programTimePercent)
                        );
                    });
                }
            });
        });
    });
});
