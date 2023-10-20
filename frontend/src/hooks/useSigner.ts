// import { type PublicClient, type WalletClient } from "@wagmi/core";
// import { providers } from "ethers";
// import { type HttpTransport } from "viem";
// import { useEffect, useState } from "react";
// import type { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
// import { usePublicClient, useWalletClient } from "wagmi";


// function walletClientToSigner(walletClient: WalletClient) {
//   const { account, chain, transport } = walletClient;
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address
//   };
//   const provider = new providers.Web3Provider(transport, network);
//   const signer = provider.getSigner(account.address);

//   return signer;
// }

// export function useSigner() {
//   const { data: walletClient } = useWalletClient();

//   const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
//   useEffect(() => {
//     async function getSigner() {
//       if (!walletClient) return;

//       const tmpSigner = walletClientToSigner(walletClient);

//       setSigner(tmpSigner);
//     }

//     getSigner();

//   }, [walletClient]);
//   return signer;
// }