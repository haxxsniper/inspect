"use client"

import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function FunctionList({ functionObjects }: { functionObjects: any }) {

  const searchParams = useSearchParams()
  const functionName = searchParams.get('functionName')
  const abiName = searchParams.get('abiName')

  return (
    <div className="flex flex-col gap-2 w-1/3">
      {
        functionObjects.map((functionObject: any, index: number) => (
          <Link
            href={`?abiName=${abiName}&functionIndex=${index}&functionName=${functionObject.name}`}  
            key={index} 
            className={`flex flex-col ${functionName !== null && functionName === functionObject.name ? "text-background bg-foreground" : "bg-background text-foreground"} gap-2 border-2 p-2 rounded-md`}
            scroll={false}
          >
            <div className="flex flex-row gap-2 items-center">
              <div className={`${functionName !== null && functionName === functionObject.name ? "bg-background text-foreground" : "text-background bg-foreground"} px-2 py-1 rounded font-mono`}>{index}</div>
              {
                functionObject.stateMutability === 'view' && functionObject.inputs.length === 0 
                ? (
                  <Badge variant={`${functionName !== null && functionName === functionObject.name ? "secondary" : "default"}`} className="font-mono">read</Badge>
                ) 
                : functionObject.stateMutability === 'view' && functionObject.inputs.length !== 0
                ? (
                  <Badge variant={`${functionName !== null && functionName === functionObject.name ? "secondary" : "default"}`} className="font-mono">read</Badge>
                )
                : (
                  <Badge variant={`${functionName !== null && functionName === functionObject.name ? "secondary" : "default"}`} className="font-mono">write</Badge>
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