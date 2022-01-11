# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


```
    const msgParams = {
      types:
      {
          EIP712Domain : [
          {name:"name",type:"string"},
          {name:"version",type:"string"},
        ],
        set: [
          { name: "twitterId", type: "bytes32" },
          { name: "userAddr", type: "address" },
          { name: "deadline", type: "uint256" },
        ]
      },
      primaryType: "set",
      domain: { name: "SetTest", version: "1" },
      message: {
        twitterId: x,
        userAddr: userAddr,
        deadline: deadline,
      }
    }

         web3.currentProvider.request({
           method: "eth_signTypedData_v3",
           params: [signer, msgParams],
           from: signer         
          },(err, result)=>{console.log(result)})
     ​

```