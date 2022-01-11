//SPDX-License-Identifier: Unlicense
pragma solidity 0.7.6;

import "hardhat/console.sol";

contract Greeter {
    bytes32 storedData;
    mapping (address => bytes32) verified;

    address signerAddress;

    function set(bytes32 x) public {
        storedData = x;
    }

    constructor(address signerAddr) {
      signerAddress = signerAddr;
    }

    function get() public view returns (bytes32) {
        return storedData;
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
        address userAddr,
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
            userAddr,
            deadline
            )
        );

        bytes32 hash = keccak256(
            abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct)
        );
        address signer = ecrecover(hash, v, r, s);
        require(signer == signerAddress, "MyFunction: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        verify(userAddr, twitterId);
    }
}
