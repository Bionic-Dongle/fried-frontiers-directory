"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

export function NavigationVerification() {
  const router = useRouter()
  const pathname = usePathname()
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({})

  const testNavigation = async (route: string, testName: string) => {
    try {
      console.log(`Testing navigation to ${route}`)
      router.push(route)

      // Simulate a small delay to check if navigation worked
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [testName]: true }))
      }, 100)

      return true
    } catch (error) {
      console.error(`Navigation test failed for ${route}:`, error)
      setTestResults((prev) => ({ ...prev, [testName]: false }))
      return false
    }
  }

  const navigationTests = [
    { route: "/", name: "Home", testKey: "home" },
    { route: "/add-business", name: "Add Business", testKey: "addBusiness" },
    { route: "/businesses", name: "Browse Businesses", testKey: "businesses" },
    { route: "/about", name: "About", testKey: "about" },
  ]

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 ui-card card-enhanced">
      <CardHeader className="card-content-enhanced">
        <CardTitle className="text-sm text-card-foreground">Navigation Test Panel</CardTitle>
        <p className="text-xs text-muted-foreground">Current: {pathname}</p>
      </CardHeader>
      <CardContent className="space-y-2 card-content-enhanced">
        {navigationTests.map((test) => (
          <div key={test.testKey} className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">{test.name}</span>
            <div className="flex items-center gap-2">
              {testResults[test.testKey] !== undefined &&
                (testResults[test.testKey] ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => testNavigation(test.route, test.testKey)}
                className="text-xs interactive-element bg-transparent"
              >
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        <Button size="sm" onClick={() => setTestResults({})} className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
          Reset Tests
        </Button>
      </CardContent>
    </Card>
  )
}
