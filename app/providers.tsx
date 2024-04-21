'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  klaytnBaobab
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
// import according to docs

const { wallets } = getDefaultWallets();
// initialize and destructure wallets object

const config = getDefaultConfig({
  appName: 'MY_APP', // Name your app
  projectId: "WALLETCONNECT_PROJECT_ID", // Enter your WalletConnect Project ID here
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [
    baseSepolia,
    arbitrumSepolia,
    optimismSepolia
  ],
  transports: {
    [baseSepolia.id]: http('https://rpc.ankr.com/base_sepolia'), 
    [arbitrumSepolia.id]: http('https://rpc.ankr.com/arbitrum_sepolia'),
    [optimismSepolia.id]: http('https://rpc.ankr.com/optimism_sepolia'),
    [klaytnBaobab.id]: http('https://rpc.ankr.com/klaytn_testnet'), 
  },
  ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}