//SPDX-License-Identifier: Unlicense
pragma solidity 0.7.6;

import "hardhat/console.sol";

contract Greeter {
    uint8 storedData = 2;

    function set(uint8 x) public {
        storedData = x;
    }

    function get() public view returns (uint8) {
        return storedData;
    }

    function executeSetIfSignatureMatch(
        uint8 v,
        bytes32 r,
        bytes32 s,
        address sender,
        uint8 x
    ) external {
        bytes32 eip712DomainHash = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version)"),
                keccak256(bytes("SetTest")),
                keccak256(bytes("1"))
            )
        );

        bytes32 hashStruct = keccak256(
            abi.encode(keccak256("set(uint8 x)"), x)
        );

        bytes32 hash = keccak256(
            abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct)
        );
        address signer = ecrecover(hash, v, r, s);
        require(signer == sender, "MyFunction: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        set(x);
    }
}
