const { expect, assert } = require("chai");
const { Signer } = require("ethers");
const { ethers, web3 } = require("hardhat")


describe("Verifier", function () {
  it("Should add to verified map if everything is good", async function () {
    const [signer, owner] = await ethers.getSigners();

    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy(signer.address, "SublimeTwitter", "1");
    await verifier.deployed(signer.address);

    const userAddr = owner.address
    const x = "54236829"
    deadline = parseInt(Date.now() / 1000) + 4231
    const network = await ethers.getDefaultProvider().getNetwork();

    const typedData = {
      types:
      {
        // need for metamask but not for this
        //   EIP712Domain : [
        //   {name:"name",type:"string"},
        //   {name:"version",type:"string"},
        // ],
        set: [
          { name: "twitterId", type: "string" },
          { name: "userAddr", type: "address" },
          { name: "timestamp", type: "uint256" },
        ]
      },
      primaryType: "set",
      domain: { name: "SublimeTwitter", version: "1" , chainId : 31337, verifyingContract:  verifier.address },
      message: {
        twitterId: x,
        userAddr: userAddr,
        timestamp: deadline,
      }
    }

    signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);
    
    console.log({name: "SublimeTwitter", version: "1" , chainId : 31337, verifyingContract:  String(verifier.address).toLowerCase()})
    console.log(signer.address, deadline)
    
    splitSign = ethers.utils.splitSignature(signatures)
    console.log({v:splitSign.v, r: splitSign.r, s: splitSign.s, tweet: x, deadline: deadline, msgSender: owner.address})
    await verifier.connect(owner).executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, x, deadline)
    const t = await verifier.getVerified(userAddr)
    expect(t).to.equal(x);
  });
  // it("Should revert when signature does not match", async function () {
  //   const [signer, owner] = await ethers.getSigners();

  //   const Verifier = await ethers.getContractFactory("Verifier");
  //   const verifier = await Verifier.deploy(signer.address);
  //   await verifier.deployed(signer.address);

  //   const userAddr = owner.address
  //   const x = ethers.utils.formatBytes32String(54236829)
  //   deadline = parseInt(Date.now() / 1000) + 500

  //   const typedData = {
  //     types:
  //     {
  //       // need for metamask but not for this
  //       //   EIP712Domain : [
  //       //   {name:"name",type:"string"},
  //       //   {name:"version",type:"string"},
  //       // ],
  //       set: [
  //         { name: "twitterId", type: "bytes32" },
  //         { name: "userAddr", type: "address" },
  //         { name: "deadline", type: "uint256" },
  //       ]
  //     },
  //     primaryType: "set",
  //     domain: { name: "SublimeTwitterT", version: "1" },
  //     message: {
  //       twitterId: x,
  //       userAddr: userAddr,
  //       deadline: deadline,
  //     }
  //   }

  //   signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




  //   splitSign = ethers.utils.splitSignature(signatures)
  //   const t = verifier.connect(owner).executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, x, deadline)
  //   await expect(t).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'MyFunction: invalid signature'")
  // });
  // it("Should revert when sent by wrong address", async function () {
  //   const [signer, owner, third] = await ethers.getSigners();

  //   const Verifier = await ethers.getContractFactory("Verifier");
  //   const verifier = await Verifier.deploy(signer.address);
  //   await verifier.deployed(signer.address);

  //   const userAddr = owner.address
  //   const x = ethers.utils.formatBytes32String(54236829)
  //   deadline = parseInt(Date.now() / 1000) + 500

  //   const typedData = {
  //     types:
  //     {
  //       // need for metamask but not for this
  //       //   EIP712Domain : [
  //       //   {name:"name",type:"string"},
  //       //   {name:"version",type:"string"},
  //       // ],
  //       set: [
  //         { name: "twitterId", type: "bytes32" },
  //         { name: "userAddr", type: "address" },
  //         { name: "deadline", type: "uint256" },
  //       ]
  //     },
  //     primaryType: "set",
  //     domain: { name: "SublimeTwitterT", version: "1" },
  //     message: {
  //       twitterId: x,
  //       userAddr: third.address,
  //       deadline: deadline,
  //     }
  //   }

  //   signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




  //   splitSign = ethers.utils.splitSignature(signatures)
  //   const t = verifier.connect(owner).executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, x, deadline)
  //   await expect(t).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'MyFunction: invalid signature'")
  // });
  // it("Should revert when deadline passed", async function () {
  //   const [signer, owner] = await ethers.getSigners();

  //   const Verifier = await ethers.getContractFactory("Verifier");
  //   const verifier = await Verifier.deploy(signer.address);
  //   await verifier.deployed(signer.address);

  //   const userAddr = owner.address
  //   const x = ethers.utils.formatBytes32String(54236829)
  //   deadline = parseInt(Date.now() / 1000) - 500

  //   const typedData = {
  //     types:
  //     {
  //       // need for metamask but not for this
  //       //   EIP712Domain : [
  //       //   {name:"name",type:"string"},
  //       //   {name:"version",type:"string"},
  //       // ],
  //       set: [
  //         { name: "twitterId", type: "bytes32" },
  //         { name: "userAddr", type: "address" },
  //         { name: "deadline", type: "uint256" },
  //       ]
  //     },
  //     primaryType: "set",
  //     domain: { name: "SublimeTwitter", version: "1" },
  //     message: {
  //       twitterId: x,
  //       userAddr: userAddr,
  //       deadline: deadline,
  //     }
  //   }

  //   signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




  //   splitSign = ethers.utils.splitSignature(signatures)
  //   const t = verifier.connect(owner).executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, x, deadline)
  //   await expect(t).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Signed transaction expired'")

  // });

  // it("Should delete the mapping when called removeVerification", async function () {

  //   const [signer, owner] = await ethers.getSigners();

  //   const Verifier = await ethers.getContractFactory("Verifier");
  //   const verifier = await Verifier.deploy(signer.address);
  //   await verifier.deployed(signer.address);

  //   const userAddr = owner.address
  //   const x = ethers.utils.formatBytes32String(54236829)
  //   deadline = parseInt(Date.now() / 1000) + 500

  //   const typedData = {
  //     types:
  //     {
  //       set: [
  //         { name: "twitterId", type: "bytes32" },
  //         { name: "userAddr", type: "address" },
  //         { name: "deadline", type: "uint256" },
  //       ]
  //     },
  //     primaryType: "set",
  //     domain: { name: "SublimeTwitter", version: "1" },
  //     message: {
  //       twitterId: x,
  //       userAddr: userAddr,
  //       deadline: deadline,
  //     }
  //   }

  //   signatures = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);




  //   splitSign = ethers.utils.splitSignature(signatures)
  //   await verifier.connect(owner).executeSetIfSignatureMatch(splitSign.v, splitSign.r, splitSign.s, x, deadline)
  //   const t = await verifier.getVerified(userAddr)
  //   expect(t).to.equal(x);
  //   await verifier.connect(owner).removeVerification()
  //   const t2 = await verifier.getVerified(userAddr)
  //   expect(t2).to.equal(ethers.utils.formatBytes32String(0));

  // })

});
