"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function NavigationTest() {
  const router = useRouter()

  const testNavigation = () => {
    console.log("Testing navigation to /add-business")
    router.push("/add-business")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={testNavigation} className="bg-red-600 hover:bg-red-700 text-white shadow-lg" size="sm">
        Test Navigation
      </Button>
    </div>
  )
}
