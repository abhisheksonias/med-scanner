const { ethers } = require('ethers');

// Your smart contract address and ABI
const contractAddress = "0x56F0DeDb1e9f7f84EaBec307dCBE407c5C959AF1";
const abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "metadata",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "manufacturer",
                    "type": "address"
                }
            ],
            "name": "MedicineAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "isReal",
                    "type": "bool"
                }
            ],
            "name": "MedicineChecked",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "metadata",
                    "type": "string"
                }
            ],
            "name": "addMedicine",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "checkMedicine",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getMedicine",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "medicines",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "metadata",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "manufacturer",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

// Connect to the Polygon zkEVM Testnet
const provider = new ethers.providers.JsonRpcProvider("https://rpc.cardona.zkevm-rpc.com"); // Replace with correct RPC URL

// Smart contract interaction
const checkMedicine = async (id) => {
  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    // Call the getMedicine function
    const [name, metadata, manufacturer] = await contract.getMedicine(id);

    console.log(`Medicine ID: ${id}`);
    console.log(`Name: ${name}`);
    console.log(`Metadata: ${metadata}`);
    console.log(`Manufacturer: ${manufacturer}`);
  } catch (err) {
    console.error("Error:", err);
  }
};

// Check the medicine with ID 1 (you can change this to any ID you want to check)
checkMedicine(222);
