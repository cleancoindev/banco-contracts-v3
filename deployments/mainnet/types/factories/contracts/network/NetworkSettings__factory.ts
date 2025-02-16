/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  NetworkSettings,
  NetworkSettingsInterface,
} from "../../../contracts/network/NetworkSettings";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "initBnt",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "DoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidExternalAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidFee",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidParam",
    type: "error",
  },
  {
    inputs: [],
    name: "NotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroValue",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "prevFeePPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newFeePPM",
        type: "uint32",
      },
    ],
    name: "DefaultFlashLoanFeePPMUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "prevFeePPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newFeePPM",
        type: "uint32",
      },
    ],
    name: "FlashLoanFeePPMUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prevLimit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLimit",
        type: "uint256",
      },
    ],
    name: "FundingLimitUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevLiquidity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLiquidity",
        type: "uint256",
      },
    ],
    name: "MinLiquidityForTradingUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "prevFeePPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newFeePPM",
        type: "uint32",
      },
    ],
    name: "NetworkFeePPMUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
    ],
    name: "TokenAddedToWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
    ],
    name: "TokenRemovedFromWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "prevBurnRewardPPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newBurnRewardPPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prevBurnRewardMaxAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBurnRewardMaxAmount",
        type: "uint256",
      },
    ],
    name: "VortexBurnRewardUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "prevFeePPM",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newFeePPM",
        type: "uint32",
      },
    ],
    name: "WithdrawalFeePPMUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
    ],
    name: "addTokenToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addTokenToWhitelistWithLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "addTokensToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultFlashLoanFeePPM",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
    ],
    name: "flashLoanFeePPM",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
    ],
    name: "isTokenWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minLiquidityForTrading",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "networkFeePPM",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
    ],
    name: "poolFundingLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "postUpgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "protectedTokenWhitelist",
    outputs: [
      {
        internalType: "contract Token[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "token",
        type: "address",
      },
    ],
    name: "removeTokenFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "roleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "newDefaultFlashLoanFeePPM",
        type: "uint32",
      },
    ],
    name: "setDefaultFlashLoanFeePPM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "newFlashLoanFeePPM",
        type: "uint32",
      },
    ],
    name: "setFlashLoanFeePPM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setFundingLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Token[]",
        name: "pools",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "setFundingLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setMinLiquidityForTrading",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "newNetworkFeePPM",
        type: "uint32",
      },
    ],
    name: "setNetworkFeePPM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "burnRewardPPM",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "burnRewardMaxAmount",
            type: "uint256",
          },
        ],
        internalType: "struct VortexRewards",
        name: "rewards",
        type: "tuple",
      },
    ],
    name: "setVortexRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "newWithdrawalFeePPM",
        type: "uint32",
      },
    ],
    name: "setWithdrawalFeePPM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "vortexRewards",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "burnRewardPPM",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "burnRewardMaxAmount",
            type: "uint256",
          },
        ],
        internalType: "struct VortexRewards",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalFeePPM",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162001e4c38038062001e4c83398101604081905262000034916200007e565b80620000408162000053565b506001600160a01b0316608052620000b0565b6001600160a01b0381166200007b5760405163e6c4247b60e01b815260040160405180910390fd5b50565b6000602082840312156200009157600080fd5b81516001600160a01b0381168114620000a957600080fd5b9392505050565b608051611d80620000cc60003960006105940152611d806000f3fe608060405234801561001057600080fd5b50600436106102065760003560e01c80636161b6261161011a57806393867fb5116100ad578063ca15c8731161007c578063ca15c873146104b5578063cd9d26a5146104c8578063d547741f146104dd578063d84c1b38146104f0578063fa617bf31461050357600080fd5b806393867fb514610473578063a217fddf14610487578063a83e3f0c1461048f578063b5af090f146104a257600080fd5b806387ba006a116100e957806387ba006a1461041a5780638cd2403d146104225780639010d07c1461043557806391d148541461046057600080fd5b80636161b626146103de5780637c36afad146103ec57806380cfdfc2146103ff5780638129fc1c1461041257600080fd5b8063325bae6a1161019d57806343101a451161016c57806343101a451461036d578063467e55df146103805780634f712cff146103a957806354fd4d50146103bc5780635d46faa4146103cb57600080fd5b8063325bae6a1461031f5780633376af511461033457806336568abe146103475780633a1ec78d1461035a57600080fd5b8063248a9ca3116101d9578063248a9ca3146102a15780632aac012c146102d25780632f2ff15d146102f9578063306275be1461030c57600080fd5b806301ffc9a71461020b57806305a4c0f7146102335780630f1913631461027957806314da1add1461028e575b600080fd5b61021e6102193660046117ea565b610516565b60405190151581526020015b60405180910390f35b6040805180820182526000808252602091820152815180830183526101005463ffffffff168082526101015491830191825283519081529051918101919091520161022a565b61028c610287366004611826565b610541565b005b61028c61029c366004611858565b610570565b6102c46102af366004611891565b60009081526065602052604090206001015490565b60405190815260200161022a565b60ff54640100000000900463ffffffff165b60405163ffffffff909116815260200161022a565b61028c6103073660046118aa565b6106c9565b61028c61031a3660046118cf565b6106ef565b60ff54600160401b900463ffffffff166102e4565b61028c610342366004611826565b610766565b61028c6103553660046118aa565b6107fc565b61028c6103683660046118ec565b61087b565b61028c61037b366004611904565b610979565b6102c461038e3660046118cf565b6001600160a01b0316600090815260fd602052604090205490565b61028c6103b7366004611826565b6109a4565b6040516002815260200161022a565b61028c6103d936600461197c565b610a47565b60ff5463ffffffff166102e4565b6102e46103fa3660046118cf565b610aed565b61028c61040d3660046119e8565b610b55565b61028c610bc0565b60fe546102c4565b61028c610430366004611a2a565b610c81565b610448610443366004611a9c565b610cd7565b6040516001600160a01b03909116815260200161022a565b61021e61046e3660046118aa565b610cef565b600080516020611d548339815191526102c4565b6102c4600081565b61028c61049d366004611904565b610d1a565b61021e6104b03660046118cf565b610d32565b6102c46104c3366004611891565b610d3d565b6104d0610d54565b60405161022a9190611abe565b61028c6104eb3660046118aa565b610e04565b61028c6104fe3660046118cf565b610e2a565b61028c610511366004611891565b610e4b565b60006001600160e01b03198216635a05180f60e01b148061053b575061053b82610eb4565b92915050565b610559600080516020611d5483398151915233610ee9565b8061056381610f10565b61056c82610f3a565b5050565b610588600080516020611d5483398151915233610ee9565b8061059281610f10565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116908416141580156105d557506105d383610fbc565b155b156105f357604051630b094f2760e31b815260040160405180910390fd5b6001600160a01b0383166000908152610102602052604090205463ffffffff610100909104811690831681036106295750505050565b6040805180820182526001815263ffffffff85811660208084018281526001600160a01b038a166000818152610102845287902095518654925164ffffffffff1990931690151564ffffffff0019161761010092861692909202919091179094558451928616835282015290917fe9b262e9376e7127d0246f98c1ab2e98fb430e73dcd665322ea46df0ce094af391015b60405180910390a2505b505050565b6000828152606560205260409020600101546106e58133610fc9565b6106c4838361102d565b610707600080516020611d5483398151915233610ee9565b61071260fb8261104f565b61072f5760405163b0ce759160e01b815260040160405180910390fd5b6040516001600160a01b038216907fdd2e6d9f52cbe8f695939d018b7d4a216dc613a669876163ac548b916489d91790600090a250565b61077e600080516020611d5483398151915233610ee9565b8061078881610f10565b60ff5463ffffffff90811690831681036107a157505050565b60ff805463ffffffff191663ffffffff85811691821790925560408051928416835260208301919091527f1f1f36475e04b1709caf649fc7f00350aa38c7f7f110f653e81f79011db0867c91015b60405180910390a1505050565b6001600160a01b03811633146108715760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61056c8282611064565b610893600080516020611d5483398151915233610ee9565b6108a06020820182611826565b6108a981610f10565b81602001356108b781611086565b610100546101015463ffffffff909116906108d56020860186611826565b63ffffffff168263ffffffff161480156108f25750846020013581145b156108fe575050505050565b8461010061090c8282611b0b565b507fc0c001b93aede4379dd063acffffdf190292a31ccf86bbbf5399ab3480f3ebb190508261093e6020880188611826565b6040805163ffffffff938416815292909116602083810191909152908201849052870135606082015260800160405180910390a15050505050565b610991600080516020611d5483398151915233610ee9565b61099a826110a7565b61056c8282611111565b6109bc600080516020611d5483398151915233610ee9565b806109c681610f10565b60ff5463ffffffff640100000000909104811690831681036109e757505050565b60ff805467ffffffff00000000191664010000000063ffffffff8681169182029290921790925560408051918416825260208201929092527f5694fc3b551ce2e4a457649f95500c545f27fce9ef7c3818cfb3c52134223dcb91016107ef565b610a5f600080516020611d5483398151915233610ee9565b82818114610a8057604051633494a40d60e21b815260040160405180910390fd5b60005b81811015610ae557610ad3868683818110610aa057610aa0611b38565b9050602002016020810190610ab591906118cf565b858584818110610ac757610ac7611b38565b90506020020135611111565b80610add81611b64565b915050610a83565b505050505050565b6001600160a01b03811660009081526101026020908152604080832081518083019092525460ff8116151580835261010090910463ffffffff169282019290925290610b485760ff54600160401b900463ffffffff16610b4e565b80602001515b9392505050565b610b6d600080516020611d5483398151915233610ee9565b8060005b81811015610bba57610ba8848483818110610b8e57610b8e611b38565b9050602002016020810190610ba391906118cf565b6110a7565b80610bb281611b64565b915050610b71565b50505050565b600054610100900460ff16610bdb5760005460ff1615610bdf565b303b155b610c425760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610868565b600054610100900460ff16158015610c64576000805461ffff19166101011790555b610c6c6111b9565b8015610c7e576000805461ff00191690555b50565b60c954600090610c969061ffff166001611b7d565b905061ffff8116600214610cbc5760405162dc149f60e41b815260040160405180910390fd5b60c9805461ffff191661ffff83161790556106c483836111f2565b6000828152609760205260408120610b4e90836111fc565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61099a600080516020611d5483398151915233610ee9565b600061053b82610fbc565b600081815260976020526040812061053b90611208565b60606000610d6260fb611208565b905060008167ffffffffffffffff811115610d7f57610d7f611ba3565b604051908082528060200260200182016040528015610da8578160200160208202803683370190505b50905060005b82811015610dfd57610dc160fb826111fc565b828281518110610dd357610dd3611b38565b6001600160a01b039092166020928302919091019091015280610df581611b64565b915050610dae565b5092915050565b600082815260656020526040902060010154610e208133610fc9565b6106c48383611064565b610e42600080516020611d5483398151915233610ee9565b610c7e816110a7565b610e63600080516020611d5483398151915233610ee9565b60fe54818103610e71575050565b60fe82905560408051828152602081018490527fa331479cec90af3eef92e0ee6f6cd19f7912d7bb73f8d9885083d6ffa98b077291015b60405180910390a15050565b60006001600160e01b03198216637965db0b60e01b148061053b57506301ffc9a760e01b6001600160e01b031983161461053b565b610ef38282610cef565b61056c57604051634ca8886760e01b815260040160405180910390fd5b620f424063ffffffff82161115610c7e576040516358d620b360e01b815260040160405180910390fd5b60ff5463ffffffff600160401b90910481169082168103610f59575050565b60ff80546bffffffff00000000000000001916600160401b63ffffffff8581169182029290921790925560408051918416825260208201929092527f3150357e7ae28a36ec737b6b68396e3d6e6045739a37622ef936636add1831069101610ea8565b600061053b60fb83611212565b610fd38282610cef565b61056c57610feb816001600160a01b03166014611234565b610ff6836020611234565b604051602001611007929190611be5565b60408051601f198184030181529082905262461bcd60e51b825261086891600401611c5a565b61103782826113d0565b60008281526097602052604090206106c49082611456565b6000610b4e836001600160a01b03841661146b565b61106e828261155e565b60008281526097602052604090206106c4908261104f565b80600003610c7e57604051637c946ed760e01b815260040160405180910390fd5b806110b1816115c5565b6110bc60fb83611456565b6110d95760405163119b4fd360e11b815260040160405180910390fd5b6040516001600160a01b038316907fa718ddb71589521cab00fa313e3bd14e75ca7204d57a12ff3a5aa40796f3427690600090a25050565b8161111b81611601565b61112483610fbc565b61114157604051630b094f2760e31b815260040160405180910390fd5b6001600160a01b038316600090815260fd60205260409020548281036111675750505050565b6001600160a01b038416600081815260fd602090815260409182902086905581518481529081018690527f1a06df86f888ab7df8687a48f67c1ae98d193e315d76c842736d851adac8dda591016106ba565b600054610100900460ff166111e05760405162461bcd60e51b815260040161086890611c8d565b6111e8611628565b6111f061165f565b565b61056c6000610f3a565b6000610b4e8383611690565b600061053b825490565b6001600160a01b03811660009081526001830160205260408120541515610b4e565b60606000611243836002611cd8565b61124e906002611cf7565b67ffffffffffffffff81111561126657611266611ba3565b6040519080825280601f01601f191660200182016040528015611290576020820181803683370190505b509050600360fc1b816000815181106112ab576112ab611b38565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106112da576112da611b38565b60200101906001600160f81b031916908160001a90535060006112fe846002611cd8565b611309906001611cf7565b90505b6001811115611381576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061133d5761133d611b38565b1a60f81b82828151811061135357611353611b38565b60200101906001600160f81b031916908160001a90535060049490941c9361137a81611d0f565b905061130c565b508315610b4e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610868565b6113da8282610cef565b61056c5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556114123390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610b4e836001600160a01b0384166116ba565b6000818152600183016020526040812054801561155457600061148f600183611d26565b85549091506000906114a390600190611d26565b90508181146115085760008660000182815481106114c3576114c3611b38565b90600052602060002001549050808760000184815481106114e6576114e6611b38565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061151957611519611d3d565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061053b565b600091505061053b565b6115688282610cef565b1561056c5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b03811615806115e357506001600160a01b03811630145b15610c7e57604051638e052b6760e01b815260040160405180910390fd5b6001600160a01b038116610c7e5760405163e6c4247b60e01b815260040160405180910390fd5b600054610100900460ff1661164f5760405162461bcd60e51b815260040161086890611c8d565b611657611709565b6111f0611730565b600054610100900460ff166116865760405162461bcd60e51b815260040161086890611c8d565b6111f06000610f3a565b60008260000182815481106116a7576116a7611b38565b9060005260206000200154905092915050565b60008181526001830160205260408120546117015750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561053b565b50600061053b565b600054610100900460ff166111f05760405162461bcd60e51b815260040161086890611c8d565b600054610100900460ff166117575760405162461bcd60e51b815260040161086890611c8d565b60c9805461ffff1916600117905561177d600080516020611d5483398151915280611795565b6111f0600080516020611d54833981519152336117e0565b600082815260656020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b61056c828261102d565b6000602082840312156117fc57600080fd5b81356001600160e01b031981168114610b4e57600080fd5b63ffffffff81168114610c7e57600080fd5b60006020828403121561183857600080fd5b8135610b4e81611814565b6001600160a01b0381168114610c7e57600080fd5b6000806040838503121561186b57600080fd5b823561187681611843565b9150602083013561188681611814565b809150509250929050565b6000602082840312156118a357600080fd5b5035919050565b600080604083850312156118bd57600080fd5b82359150602083013561188681611843565b6000602082840312156118e157600080fd5b8135610b4e81611843565b6000604082840312156118fe57600080fd5b50919050565b6000806040838503121561191757600080fd5b823561192281611843565b946020939093013593505050565b60008083601f84011261194257600080fd5b50813567ffffffffffffffff81111561195a57600080fd5b6020830191508360208260051b850101111561197557600080fd5b9250929050565b6000806000806040858703121561199257600080fd5b843567ffffffffffffffff808211156119aa57600080fd5b6119b688838901611930565b909650945060208701359150808211156119cf57600080fd5b506119dc87828801611930565b95989497509550505050565b600080602083850312156119fb57600080fd5b823567ffffffffffffffff811115611a1257600080fd5b611a1e85828601611930565b90969095509350505050565b60008060208385031215611a3d57600080fd5b823567ffffffffffffffff80821115611a5557600080fd5b818501915085601f830112611a6957600080fd5b813581811115611a7857600080fd5b866020828501011115611a8a57600080fd5b60209290920196919550909350505050565b60008060408385031215611aaf57600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015611aff5783516001600160a01b031683529284019291840191600101611ada565b50909695505050505050565b8135611b1681611814565b63ffffffff811663ffffffff1983541617825550602082013560018201555050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611b7657611b76611b4e565b5060010190565b600061ffff808316818516808303821115611b9a57611b9a611b4e565b01949350505050565b634e487b7160e01b600052604160045260246000fd5b60005b83811015611bd4578181015183820152602001611bbc565b83811115610bba5750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611c1d816017850160208801611bb9565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611c4e816028840160208801611bb9565b01602801949350505050565b6020815260008251806020840152611c79816040850160208701611bb9565b601f01601f19169190910160400192915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000816000190483118215151615611cf257611cf2611b4e565b500290565b60008219821115611d0a57611d0a611b4e565b500190565b600081611d1e57611d1e611b4e565b506000190190565b600082821015611d3857611d38611b4e565b500390565b634e487b7160e01b600052603160045260246000fdfe2172861495e7b85edac73e3cd5fbb42dd675baadf627720e687bcfdaca025096a164736f6c634300080d000a";

type NetworkSettingsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NetworkSettingsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NetworkSettings__factory extends ContractFactory {
  constructor(...args: NetworkSettingsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initBnt: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NetworkSettings> {
    return super.deploy(initBnt, overrides || {}) as Promise<NetworkSettings>;
  }
  override getDeployTransaction(
    initBnt: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initBnt, overrides || {});
  }
  override attach(address: string): NetworkSettings {
    return super.attach(address) as NetworkSettings;
  }
  override connect(signer: Signer): NetworkSettings__factory {
    return super.connect(signer) as NetworkSettings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NetworkSettingsInterface {
    return new utils.Interface(_abi) as NetworkSettingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NetworkSettings {
    return new Contract(address, _abi, signerOrProvider) as NetworkSettings;
  }
}
