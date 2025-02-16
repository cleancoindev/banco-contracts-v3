import { deploy, DeployedContracts, InstanceName, isMainnet, setDeploymentMetadata } from '../../utils/Deploy';
import { BigNumber } from 'ethers';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async ({ getNamedAccounts }: HardhatRuntimeEnvironment) => {
    const { deployer } = await getNamedAccounts();

    const uniswapPair = await DeployedContracts.MockUniswapV2Pair.deployed();

    await deploy({
        name: InstanceName.MockUniswapV2Factory,
        from: deployer,
        args: [
            InstanceName.MockUniswapV2Factory,
            InstanceName.MockUniswapV2Factory,
            BigNumber.from(100_000_000),
            uniswapPair.address
        ]
    });

    return true;
};

func.skip = async () => isMainnet();

export default setDeploymentMetadata(__filename, func);
