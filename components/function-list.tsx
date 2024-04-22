"use client"

import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function FunctionList({ functionObject }: { functionObject: any }) {

  const searchParams = useSearchParams()
  const functionIndex = searchParams.get('functionIndex')

  return (
    <div className="flex flex-col gap-2 w-1/3">
      {
        functionObject.map((functionObject: any, index: number) => (
          <Link
            href={`?functionIndex=${index}`}  
            key={index} 
            className={`flex flex-col ${functionIndex !== null && parseInt(functionIndex) === index ? "text-background bg-foreground" : "bg-background text-foreground"} gap-2 border-2 p-2 rounded-md`}
          >
            <div className="flex flex-row gap-2 items-center">
              <div className={`${functionIndex !== null && parseInt(functionIndex) === index ? "bg-background text-foreground" : "text-background bg-foreground"} px-2 py-1 rounded font-mono`}>{index}</div>
              {
                functionObject.stateMutability === 'view' && functionObject.inputs.length === 0 
                ? (
                  <Badge variant={`${functionIndex !== null && parseInt(functionIndex) === index ? "secondary" : "default"}`} className="font-mono">read</Badge>
                ) 
                : functionObject.stateMutability === 'view' && functionObject.inputs.length !== 0
                ? (
                  <Badge variant={`${functionIndex !== null && parseInt(functionIndex) === index ? "secondary" : "default"}`} className="font-mono">read</Badge>
                )
                : (
                  <Badge variant={`${functionIndex !== null && parseInt(functionIndex) === index ? "secondary" : "default"}`} className="font-mono">write</Badge>
                )
              }
              <h3 id={functionObject.name} className="scroll-m-20 text-md font-semibold tracking-tight">{functionObject.name}</h3>
            </div>    
          </Link>
        ))
      }
    </div>
  )
}