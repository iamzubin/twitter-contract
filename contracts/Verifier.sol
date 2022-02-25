//SPDX-License-Identifier: Unlicense
pragma solidity 0.7.6;

import "hardhat/console.sol";
import './EIP712.sol';
import './ECDSA.sol';

contract Verifier is EIP712 {
    mapping (address => string) verified;

    address signerAddress;

    constructor(address signerAddr, string memory a, string memory b) EIP712(a, b) {
      console.log(a);
      console.log(b);
      signerAddress = signerAddr;
    }

    function verify(address addr, string memory twitterId) internal {
      verified[addr] = twitterId;
    }

    function getVerified(address addr) public view returns (string memory) {
      return verified[addr];
    }

    function executeSetIfSignatureMatch(
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory twitterId,
        uint256 deadline
    ) external {
      require(block.timestamp < deadline, "Signed transaction expired");
        bytes32 digest = keccak256(
            abi.encode(
                keccak256('set(string twitterId,address userAddr,uint256 timestamp)'),
                keccak256(bytes(twitterId)),
                msg.sender,
                deadline
            )
        );
        console.log(twitterId, msg.sender, deadline);
        bytes32 hash = EIP712._hashTypedDataV4(digest);


        // bytes32 hash = keccak256(
        //     abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct)
        // );


        address signer = ecrecover(hash, v, r, s);
        console.log(signer);
        require(signer == signerAddress, "MyFunction: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        verify(msg.sender, twitterId);
    }

    function removeVerification() public {
      delete verified[msg.sender];
    }
}
