import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the DataRegistry contract.
 */
const deployDataRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const deployment = await deploy("DataRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Output address and ABI for frontend consumption
  const deployedArtifact = await get("DataRegistry");
  // Log minimal JSON so it can be copied to a frontend easily
  console.log(
    `\nDataRegistry deployed => {\n  \"address\": \"${deployment.address}\",\n  \"abi\": ${JSON.stringify(deployedArtifact.abi)}\n}\n`,
  );
};

export default deployDataRegistry;
deployDataRegistry.tags = ["DataRegistry"];
