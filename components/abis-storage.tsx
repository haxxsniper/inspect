'use client'

import { useState, useEffect, use } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { del, get, set } from 'idb-keyval'

export default function AbiStorage() {
  const [abi, setAbi] = useState('')
  const [abiName, setAbiName] = useState('')
  const [savedABIs, setSavedABIs] = useState<string[]>([])
  useEffect(() => {
    {get('saved_abis_list').then((savedABIs: string[]) => {
      setSavedABIs(savedABIs || []);
      });
    }
  }, [savedABIs]);

  function handleInputABIChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbi(e.target.value)
  }

  function handleInputABINameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAbiName(e.target.value)
  }

  function saveABI() {
    get('saved_abis_list').then((savedABIs: string[]) => {
      var savedABIsList = savedABIs || [];
      savedABIsList.push(abiName);
      set('saved_abis_list', savedABIsList);
      set(abiName, abi);
    }); 
  }

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        placeholder="paste in a contract ABI"
        value={abi}
        onChange={handleInputABIChange}
        className="h-96 w-full"
      />
      <Input 
        placeholder="set abi name" 
        value={abiName}
        onChange={handleInputABINameChange}
      />
      <Button onClick={saveABI}>Save ABI</Button>
      <h2>Current ABIs</h2>
      <ul>
        {savedABIs.map((abiName, index) => (
          <li key={index}>{abiName}</li>
        ))}
      </ul>
    </div>
  );
}