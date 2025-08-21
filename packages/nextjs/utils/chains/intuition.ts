import { type Chain } from "viem";

export const intuition: Chain = {
  id: 13579,
  name: "Intuition Testnet",
  nativeCurrency: { name: "tTtrust", symbol: "tTtrust", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_INTUITION_RPC_URL || "https://testnet.rpc.intuition.systems/http"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_INTUITION_RPC_URL || "https://testnet.rpc.intuition.systems/http"],
    },
  },
  // Add block explorer here if available
  testnet: true,
};
