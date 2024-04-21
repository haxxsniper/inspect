import InputABI from '@/components/input-abi';
import MobileWarning from '@/components/mobile-warning';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {

  return (
    <main className="flex flex-col gap-8 items-center justify-center py-12 px-4 lg:p-36">
      <div className="hidden lg:flex lg:flex-col lg:gap-12 max-w-3xl">
        <ConnectButton />
        <InputABI />
      </div>
      <MobileWarning />
    </main>
  );
}