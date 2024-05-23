'use client'

import AbiStorage from "@/components/abis-storage";
import FunctionDashboard from "@/components/function-dashboard";
import { zxstimAbi } from "@/components/abis";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSearchParams } from "next/navigation"
import { del, get, set } from 'idb-keyval'
import { useEffect, useState } from "react";
import ContractAddress from "@/components/contract-address";

export default function Home() {
  const searchParams = useSearchParams()
  const abiName = searchParams.get('abiName')
  const [abi, setAbi] = useState('')
  useEffect(() => {
    if (abiName) {
      get(abiName).then((val) => setAbi(JSON.parse(val)))
    }
  }, [abiName]);
  

  return (
    <div>
      <ConnectButton />
      <AbiStorage />
      <ContractAddress />
      {
        abi && (
          <FunctionDashboard abi={abi}/>
        )
      }
    </div>
  );
}
