const { expect } = require("chai");
const { ethers, web3 } = require("hardhat")


describe("Greeter", function () {
  it("return if the signature is verified", async function () {

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    const [owner] = await ethers.getSigners();

    const signer = owner
    const x = 1

    const typedData = {
      types:
      {
        set: [
          { name: "x", type: "uint8" },
        ]
      },
      primaryType: "set",
      domain: { name: "SetTest", version: "1" },
      message: {
        x: x,
      }
    }

    signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);
    //     web3.currentProvider.request({
    //       method: "eth_signTypedData_v3",
    //       params: [signer, msgParams],
    //       from: signer         
    //      },(err, result)=>{console.log(result)})
    // ​



    splitSign = ethers.utils.splitSignature(signatures)
    await greeter.executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, signer.address, x)
    
    greeter.set(x)

    expect(await greeter.get()).to.equal(x);
  });
});
