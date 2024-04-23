import AbiStorage from "@/components/abis-storage";
import FunctionDashboard from "@/components/function-dashboard";
import { zxstimAbi } from "@/components/abis";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>
      <ConnectButton />
      <AbiStorage />
      <FunctionDashboard abi={zxstimAbi}/>
    </div>
  );
}
