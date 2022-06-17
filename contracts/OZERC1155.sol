//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract OZERC1155 is ERC1155 {
    constructor() ERC1155("/") {}

    function airdrop(
        address[] memory _target,
        uint256 id,
        uint256 amount
    ) public {
        for (uint256 i = 0; i < _target.length; i++) {
            _mint(_target[i], id, amount, "");
        }
    }
}
