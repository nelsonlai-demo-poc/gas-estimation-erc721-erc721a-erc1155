//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OZERC721 is ERC721, Ownable {
    constructor() ERC721("TEST", "TEST") {}

    uint256 supply;

    function airdrop(address[] memory _target) public onlyOwner {
        for (uint256 i = 0; i < _target.length; i++) {
            _mint(_target[i], supply);
            supply++;
        }
    }
}
