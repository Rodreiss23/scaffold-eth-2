import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log(`Deploying contracts with deployer: ${deployer} on network: ${network.name}`);

  const rep = await deploy("REPToken", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // rewardRateScaled: REP per second per 1 ETH staked scaled by 1e18
  // Example: 1e15 REP per second per ETH  (~0.001 REP/s/ETH)
  const rewardRateScaled = ethers.parseUnits("0.001", 18);

  const staking = await deploy("Staking", {
    from: deployer,
    args: [deployer, rep.address, rewardRateScaled],
    log: true,
    autoMine: true,
  });

  // Transfer REP ownership to Staking so it can mint rewards
  const signer = await ethers.getSigner(deployer);
  const repContract = await ethers.getContractAt("REPToken", rep.address, signer);
  const tx = await repContract.transferOwnership(staking.address);
  await tx.wait();
  log(`Transferred REPToken ownership to Staking at ${staking.address}`);
};

export default func;
func.tags = ["REP", "Staking"];
