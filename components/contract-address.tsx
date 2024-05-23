'use client'

import { Input } from "./ui/input";
import { useState, useEffect, use } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { del, get, set } from 'idb-keyval'
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function ContractAddress() {
  const searchParams = useSearchParams()
  const abiName = searchParams.get('abiName')
  const [contractAddress, setContractAddress] = useState('0x000000000000000000000000000000000000dEaD')
  const [contractAddressName, setContractAddressName] = useState('')
  const [savedContractAddresses, setSavedContractAddresses] = useState<string[]>([])
  useEffect(() => {
    {get('saved_contract_addresses_list').then((savedContractAddresses: string[]) => {
      setSavedContractAddresses(savedContractAddresses || []);
      });
    }
  }, [savedContractAddresses]);

  useEffect(() => {
    get(contractAddressName).then((val) => setContractAddress(val))
  }, [contractAddressName, searchParams])

  function handleInputContractAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContractAddress(e.target.value)
  }

  function handleInputContractAddressNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContractAddressName(e.target.value)
  }

  function saveContractAddress() {
    get('saved_contract_addresses_list').then((savedContractAddresses: string[]) => {
      var savedContractAddressesList = savedContractAddresses || [];
      savedContractAddressesList.push(`${contractAddressName}=${contractAddress}`);
      set('saved_contract_addresses_list', savedContractAddressesList);
    }); 
  }
  return (
    <div className="flex flex-col gap-4 my-4">
      <Input 
        placeholder="set contract address" 
        value={contractAddress}
        onChange={handleInputContractAddressChange}
      />
      <Input 
        placeholder="set contract address name" 
        value={contractAddressName}
        onChange={handleInputContractAddressNameChange}
      />
      <Button onClick={saveContractAddress}>Save contract address</Button>
      <h2>Current Contract Addresses</h2>
      <div className="flex flex-row gap-4"> 
        {
          // map through savedContractAddresses then return a Link component with
        }

        {savedContractAddresses.map((savedContractAddress, index) => (
          <Link scroll={false} key={index} href={`?abiName=${abiName}&contractAddressName=${savedContractAddress.split("=")[0]}&contractAddress=${savedContractAddress.split("=")[1]}`}>{savedContractAddress.split("=")[0]}</Link>
        ))}
      </div>
    </div>
  )
}