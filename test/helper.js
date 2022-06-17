const ethers = require('ethers');
const crypto = require('crypto');

const getRandomAddress = () => {
    const id = crypto.randomBytes(32).toString('hex');
    const privateKey = '0x' + id;

    const wallet = new ethers.Wallet(privateKey);
    return wallet.address;
};

module.exports = {
    getRandomAddress,
};
