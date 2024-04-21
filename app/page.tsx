import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-12 px-4 p-48:lg">
      <ConnectButton />
    </div>
  );
}