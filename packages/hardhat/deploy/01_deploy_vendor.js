module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const yourToken = await ethers.getContract("YourToken", deployer);

  // Todo: deploy the vendor
  await deploy("Vendor", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [yourToken.address],
    log: true,
   });
   const Vendor = await deployments.get("Vendor");
   const vendor = await ethers.getContract("Vendor", deployer);
  console.log("\n 🏵  Sending all 1000 tokens to the vendor...\n");


  // Todo: transfer the tokens to the vendor
   const result = await yourToken.transfer(vendor.address, 1000 );

   console.log("\n 🤹  Sending ownership to frontend address...\n")
  // ToDo: change address with your burner wallet address vvvv
    await vendor.transferOwnership( "0x203d1bB005496e9fd86a24A232BA812614866c71" );
};

module.exports.tags = ["Vendor"];
