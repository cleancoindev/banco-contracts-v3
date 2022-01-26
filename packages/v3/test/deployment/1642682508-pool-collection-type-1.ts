import {
    BancorNetwork,
    ExternalProtectionVault,
    MasterPool,
    MasterVault,
    PoolCollection
} from '../../components/Contracts';
import { PoolType, DEFAULT_TRADING_FEE_PPM } from '../../utils/Constants';
import { ContractName, DeployedContracts, runTestDeployment } from '../../utils/Deploy';
import { expectRole, Roles } from '../helpers/AccessControl';
import { expect } from 'chai';

describe('1642682508-pool-collection-type-1', () => {
    let network: BancorNetwork;
    let masterPool: MasterPool;
    let masterVault: MasterVault;
    let externalProtectionVault: ExternalProtectionVault;
    let poolCollection: PoolCollection;

    beforeEach(async () => {
        await runTestDeployment(ContractName.PoolCollectionType1V1);

        network = await DeployedContracts.BancorNetworkV1.deployed();
        masterPool = await DeployedContracts.MasterPoolV1.deployed();
        masterVault = await DeployedContracts.MasterVaultV1.deployed();
        externalProtectionVault = await DeployedContracts.ExternalProtectionVaultV1.deployed();
        poolCollection = await DeployedContracts.PoolCollectionType1V1.deployed();
    });

    it('should deploy and configure the pool collection contract', async () => {
        expect(await poolCollection.version()).to.equal(1);

        expect(await poolCollection.poolType()).to.equal(PoolType.Standard);
        expect(await poolCollection.defaultTradingFeePPM()).to.equal(DEFAULT_TRADING_FEE_PPM);

        expect(await network.latestPoolCollection(PoolType.Standard)).to.equal(poolCollection.address);

        await expectRole(masterPool, Roles.MasterPool.ROLE_NETWORK_TOKEN_MANAGER, Roles.Upgradeable.ROLE_ADMIN, [
            poolCollection.address
        ]);
        await expectRole(masterPool, Roles.MasterPool.ROLE_VAULT_MANAGER, Roles.Upgradeable.ROLE_ADMIN, [
            poolCollection.address
        ]);
        await expectRole(masterPool, Roles.MasterPool.ROLE_FUNDING_MANAGER, Roles.Upgradeable.ROLE_ADMIN, [
            poolCollection.address
        ]);
        await expectRole(masterVault, Roles.Vault.ROLE_ASSET_MANAGER, Roles.Upgradeable.ROLE_ADMIN, [
            network.address,
            poolCollection.address
        ]);
        await expectRole(externalProtectionVault, Roles.Vault.ROLE_ASSET_MANAGER, Roles.Upgradeable.ROLE_ADMIN, [
            network.address,
            poolCollection.address
        ]);
    });
});
