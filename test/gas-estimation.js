const { ethers } = require('hardhat');
const { ContractFactory, Contract } = require('ethers');
const { getRandomAddress } = require('./helper');

describe('OZERC721', () => {
    /** @type {ContractFactory} */
    let OZERC721Factory;
    /** @type {Contract} */
    let ozERC721;

    /** @type {SignerWithAddress} */
    let owner;

    before(async () => {
        [owner] = await ethers.getSigners();
    });

    beforeEach(async () => {
        OZERC721Factory = await ethers.getContractFactory('OZERC721');
        ozERC721 = await OZERC721Factory.deploy();
    });

    it('airdrop 1000', async () => {
        let totalGas = 0;

        for (let t = 0; t < 2; t++) {
            let addressList = [];
            for (let i = 0; i < 500; i++) {
                const address = getRandomAddress();
                addressList.push(address);
            }

            const tx = await ozERC721.airdrop(addressList);
            const receipt = await tx.wait();
            const gas = Number(receipt.gasUsed.toString());
            totalGas += gas;
        }

        console.log('total gas', totalGas);
        console.log('average gas', totalGas / 1000);
    });
});

describe('ERC721A', () => {
    /** @type {ContractFactory} */
    let ERC721AFactory;
    /** @type {Contract} */
    let erc721A;

    /** @type {SignerWithAddress} */
    let owner;

    before(async () => {
        [owner] = await ethers.getSigners();
    });

    beforeEach(async () => {
        // NFT initialize settings
        const name = 'TEST NFT';
        const symbol = 'TEST';
        const maxSupply = 3000;
        const supplyLimit = 1000;
        const price = 0;
        const baseURI = 'base/uri/';

        ERC721AFactory = await ethers.getContractFactory('BaseERC721AImpl');
        erc721A = await ERC721AFactory.deploy(
            name,
            symbol,
            maxSupply,
            supplyLimit,
            price,
            baseURI,
            owner.address,
            owner.address
        );
    });

    it('airdrop 1000', async () => {
        let totalGas = 0;

        for (let t = 0; t < 2; t++) {
            let addressList = [];
            for (let i = 0; i < 500; i++) {
                const address = getRandomAddress();
                addressList.push(address);
            }

            const tx = await erc721A.airdrop(addressList, 1);
            const receipt = await tx.wait();
            const gas = Number(receipt.gasUsed.toString());
            totalGas += gas;
        }

        console.log('total gas', totalGas);
        console.log('average gas', totalGas / 1000);
    });

    it('airdrop 1000 (same wallet)', async () => {
        const tx = await erc721A.airdrop([owner.address], 1000);
        const receipt = await tx.wait();
        const gas = Number(receipt.gasUsed.toString());

        console.log('total gas', gas);
        console.log('average gas', gas / 1000);
    });

    // it('airdrop 1000 (mint -> transfer)', async () => {
    //     let totalGas = 0;

    //     const tx = await erc721A.airdrop([owner.address], 1000);
    //     const receipt = await tx.wait();
    //     const gas = Number(receipt.gasUsed.toString());
    //     totalGas += gas;

    //     let addressList = [];
    //     for (let i = 0; i < 1000; i++) {
    //         const address = getRandomAddress();
    //         addressList.push(address);
    //     }
    //     for (let i = 0; i < 1000; i++) {
    //         const tx = await erc721A
    //             .connect(owner)
    //             .transferFrom(owner.address, addressList[i], i);
    //         const receipt = await tx.wait();
    //         const gas = Number(receipt.gasUsed.toString());
    //         totalGas += gas;
    //     }

    //     console.log('total gas', totalGas);
    //     console.log('average gas', totalGas / 1000);
    // });
});

describe('ERC1155', () => {
    /** @type {ContractFactory} */
    let OZERC1155Factory;
    /** @type {Contract} */
    let ozERC1155;

    /** @type {SignerWithAddress} */
    let owner;

    before(async () => {
        [owner] = await ethers.getSigners();
    });

    beforeEach(async () => {
        OZERC1155Factory = await ethers.getContractFactory('OZERC1155');
        ozERC1155 = await OZERC1155Factory.deploy();
    });

    it('airdrop 1000', async () => {
        let totalGas = 0;

        for (let t = 0; t < 2; t++) {
            let addressList = [];
            for (let i = 0; i < 500; i++) {
                const address = getRandomAddress();
                addressList.push(address);
            }

            const tx = await ozERC1155.airdrop(addressList, 0, 1);
            const receipt = await tx.wait();
            const gas = Number(receipt.gasUsed.toString());
            totalGas += gas;
        }

        console.log('total gas', totalGas);
        console.log('average gas', totalGas / 1000);
    });

    it('airdrop 1000 (different id)', async () => {
        let totalGas = 0;
        let id = 0;

        for (let t = 0; t < 2; t++) {
            let addressList = [];
            for (let i = 0; i < 500; i++) {
                const address = getRandomAddress();
                addressList.push(address);
            }

            const tx = await ozERC1155.airdrop(addressList, id, 1);
            id++;
            const receipt = await tx.wait();
            const gas = Number(receipt.gasUsed.toString());
            totalGas += gas;
        }

        console.log('total gas', totalGas);
        console.log('average gas', totalGas / 1000);
    });
});
