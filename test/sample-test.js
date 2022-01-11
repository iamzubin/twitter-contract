const { expect, assert } = require("chai");
const { Signer } = require("ethers");
const { ethers, web3 } = require("hardhat")


describe("Greeter", function () {
  it("Should add to verified map if everything is good", async function () {
    const [signer, owner] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(signer.address);
    await greeter.deployed(signer.address);

    const userAddr = owner.address
    const x = ethers.utils.formatBytes32String("54236829")
    deadline = parseInt(Date.now()/1000) + 500

    const typedData = {
      types:
      {
        // need for metamask but not for this
        //   EIP712Domain : [
        //   {name:"name",type:"string"},
        //   {name:"version",type:"string"},
        // ],
        set: [
          { name: "twitterId", type: "bytes32" },
          { name: "userAddr", type: "address" },
          { name: "deadline", type: "uint256" },
        ]
      },
      primaryType: "set",
      domain: { name: "SublimeTwitter", version: "1" },
      message: {
        twitterId: x,
        userAddr: userAddr,
        deadline: deadline,
      }
    }
  
    signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




    splitSign = ethers.utils.splitSignature(signatures)
    await greeter.executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, userAddr, x, deadline)
    const t = await greeter.getVerified(userAddr)
    expect(t).to.equal(x);
  });
  it("Should revert when signature does not match", async function () {
    const [signer, owner] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(signer.address);
    await greeter.deployed(signer.address);

    const userAddr = owner.address
    const x = ethers.utils.formatBytes32String("54236829")
    deadline = parseInt(Date.now()/1000) + 500

    const typedData = {
      types:
      {
        // need for metamask but not for this
        //   EIP712Domain : [
        //   {name:"name",type:"string"},
        //   {name:"version",type:"string"},
        // ],
        set: [
          { name: "twitterId", type: "bytes32" },
          { name: "userAddr", type: "address" },
          { name: "deadline", type: "uint256" },
        ]
      },
      primaryType: "set",
      domain: { name: "SublimeTwitterT", version: "1" },
      message: {
        twitterId: x,
        userAddr: userAddr,
        deadline: deadline,
      }
    }
  
    signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




    splitSign = ethers.utils.splitSignature(signatures)
    const t = greeter.executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, userAddr, x, deadline)
    await expect(t).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'MyFunction: invalid signature'")
  });
  it("Should revert when deadline passed", async function () {
    const [signer, owner] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(signer.address);
    await greeter.deployed(signer.address);

    const userAddr = owner.address
    const x = ethers.utils.formatBytes32String("54236829")
    deadline = parseInt(Date.now()/1000) - 500

    const typedData = {
      types:
      {
        // need for metamask but not for this
        //   EIP712Domain : [
        //   {name:"name",type:"string"},
        //   {name:"version",type:"string"},
        // ],
        set: [
          { name: "twitterId", type: "bytes32" },
          { name: "userAddr", type: "address" },
          { name: "deadline", type: "uint256" },
        ]
      },
      primaryType: "set",
      domain: { name: "SublimeTwitter", version: "1" },
      message: {
        twitterId: x,
        userAddr: userAddr,
        deadline: deadline,
      }
    }
  
    signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




    splitSign = ethers.utils.splitSignature(signatures)
    const t = greeter.executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, userAddr, x, deadline)
    await expect(t).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Signed transaction expired'")
  });
});
