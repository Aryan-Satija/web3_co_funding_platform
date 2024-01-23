require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/vnQLJnAO0UOLpqPymtK2aolzWU48a9nv',
      accounts: [`0xf1e0cef316fdf38c41c62bffea4971b8a0805861586bdfa87834c4d48598d119`]
    }
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
