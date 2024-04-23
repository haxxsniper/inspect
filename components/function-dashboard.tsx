"use client"

import FunctionAction from "./function-action"
import FunctionList from "./function-list"


export default function FunctionDashboard({ abi }: { abi: any }) {
  
  const functionObject = abi.filter((functionObject: any) => functionObject.type === 'function')

  return (
    <div className="flex flex-row gap-4">
      <FunctionList functionObject={functionObject} />
      <FunctionAction />
    </div>
  )
}