//SPDX-License-Identifier: Unlicense
pragma solidity 0.7.6;

import "hardhat/console.sol";

contract Verifier {
    mapping (address => bytes32) verified;

    address signerAddress;

    constructor(address signerAddr) {
      signerAddress = signerAddr;
    }

    function verify(address addr, bytes32 twitterId) internal {
      verified[addr] = twitterId;
    }

    function getVerified(address addr) public view returns (bytes32) {
      return verified[addr];
    }

    function executeSetIfSignatureMatch(
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes32 twitterId,
        uint256 deadline
    ) external {
      require(block.timestamp < deadline, "Signed transaction expired");
        bytes32 eip712DomainHash = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version)"),
                keccak256(bytes("SublimeTwitter")),
                keccak256(bytes("1"))
            )
        );

        bytes32 hashStruct = keccak256(
            abi.encode(keccak256("set(bytes32 twitterId,address userAddr,uint256 deadline)"), 
            twitterId,
            msg.sender,
            deadline
            )
        );

        bytes32 hash = keccak256(
            abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct)
        );
        address signer = ecrecover(hash, v, r, s);
        require(signer == signerAddress, "MyFunction: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        verify(msg.sender, twitterId);
    }

    function removeVerification() public {
      delete verified[msg.sender];
    }
}
