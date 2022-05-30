//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

contract example1{

    uint256 private _num;
    bool initialized = false;


    function initialize() public {
        require(!initialized, "already initialized");
        _num = 1;
        initialized = true;
    }

  function getNum() public view returns (uint256) {
    return _num;
  }
  function setNum(uint256 t) public {
    _num = t;
  }
}