import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Token contract", function () {

  let impl1;
  let impl2;
  let proxy;
  let impl1Contract : Contract;
  let impl2Contract : Contract;
  let proxyContract : Contract;

  let owner : Signer;
  let addr1 : Signer;
  let addr2 : Signer;

 

  beforeEach(async function () {
      

    [owner, addr1, addr2] = await ethers.getSigners();     

    impl1 = await ethers.getContractFactory("example1"); 
    impl1Contract = await impl1.deploy();
    await impl1Contract.deployed();

    

    impl2 = await ethers.getContractFactory("example2"); 
    impl2Contract = await impl2.deploy();

    proxy = await ethers.getContractFactory("Proxy");
    proxyContract = await proxy.deploy();
    await proxyContract.deployed();

    await proxyContract.connect(owner).setImplementation(impl1Contract.address)
    
    



      


      
    });

    describe("full flow", function () {
      
      it("check implementation1", async function () {
        expect(await proxyContract.getImplementation()).equal(impl1Contract.address);

        const abi = ["function initialize() public", "function getNum() public view returns (uint256) ", "function setNum(uint256 t) public "];
        const proxied = new ethers.Contract(proxyContract.address, abi, owner);
        await proxied.initialize()
        expect(await proxied.connect(owner).getNum()).equal(1)
        await proxied.setNum(25)
        expect(await proxied.connect(owner).getNum()).equal(25)
        expect(await proxyContract.getImplementation()).equal(impl1Contract.address);
        await proxyContract.setImplementation(impl2Contract.address)
        expect(await proxyContract.getImplementation()).equal(impl2Contract.address);


        const abi2 = ["function initialize() public", "function getNum() public view returns (uint256) ", "function mulNum() public "];
        const proxied2 = new ethers.Contract(proxyContract.address, abi2, owner);
        //await proxied2.initialize()
        expect(await proxied2.connect(owner).getNum()).equal(25)
        await proxied2.mulNum()
        expect(await proxied2.connect(owner).getNum()).equal(50)




        

      });
      
      
    });

  });