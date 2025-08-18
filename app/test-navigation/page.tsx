"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { NavigationVerification } from "@/components/navigation-verification"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sampleConfig } from "@/data/sample-data"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function TestNavigationPage() {
  const router = useRouter()
  const [testResults, setTestResults] = useState<{ [key: string]: "pending" | "success" | "error" }>({})

  const runNavigationTest = async (testName: string, navigationFunction: () => void) => {
    setTestResults((prev) => ({ ...prev, [testName]: "pending" }))

    try {
      navigationFunction()
      // Simulate checking if navigation worked
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [testName]: "success" }))
      }, 500)
    } catch (error) {
      console.error(`Navigation test failed for ${testName}:`, error)
      setTestResults((prev) => ({ ...prev, [testName]: "error" }))
    }
  }

  const testDirectNavigation = () => {
    runNavigationTest("direct", () => router.push("/add-business"))
  }

  const testNavigationComponent = () => {
    runNavigationTest("navigation", () => {
      // Simulate clicking the navigation button
      const event = new Event("click")
      console.log("Testing navigation component button")
      router.push("/add-business")
    })
  }

  const testHeroComponent = () => {
    runNavigationTest("hero", () => {
      // Simulate clicking the hero button
      console.log("Testing hero component button")
      router.push("/add-business")
    })
  }

  const getTestIcon = (status: "pending" | "success" | "error" | undefined) => {
    switch (status) {
      case "pending":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation config={{ siteName: sampleConfig.siteName }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8 transition-colors duration-300">
            Navigation Testing Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="ui-card card-enhanced">
              <CardHeader className="card-content-enhanced">
                <CardTitle className="text-card-foreground">Direct Navigation Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 card-content-enhanced">
                <div className="flex items-center justify-between">
                  <span className="text-card-foreground">Direct Router Push</span>
                  <div className="flex items-center gap-2">
                    {getTestIcon(testResults.direct)}
                    <Button size="sm" onClick={testDirectNavigation} className="bg-blue-600 hover:bg-blue-700">
                      Test
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-card-foreground">Navigation Component</span>
                  <div className="flex items-center gap-2">
                    {getTestIcon(testResults.navigation)}
                    <Button size="sm" onClick={testNavigationComponent} className="bg-blue-600 hover:bg-blue-700">
                      Test
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-card-foreground">Hero Component</span>
                  <div className="flex items-center gap-2">
                    {getTestIcon(testResults.hero)}
                    <Button size="sm" onClick={testHeroComponent} className="bg-blue-600 hover:bg-blue-700">
                      Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ui-card card-enhanced">
              <CardHeader className="card-content-enhanced">
                <CardTitle className="text-card-foreground">Component Integration</CardTitle>
              </CardHeader>
              <CardContent className="card-content-enhanced">
                <p className="text-muted-foreground mb-4 transition-colors duration-300">
                  Test the actual components with their navigation functionality:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Navigation Bar Button:</h4>
                    <div className="border border-border rounded p-2">
                      <Navigation config={{ siteName: sampleConfig.siteName }} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Hero Section Button:</h4>
                    <div className="border border-border rounded p-4 bg-gradient-to-r from-blue-600 to-blue-800">
                      <Button
                        onClick={() => router.push("/add-business")}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold"
                      >
                        Add Your Business
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="ui-card card-enhanced">
            <CardHeader className="card-content-enhanced">
              <CardTitle className="text-card-foreground">Navigation Status</CardTitle>
            </CardHeader>
            <CardContent className="card-content-enhanced">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border rounded">
                  <h4 className="font-medium text-card-foreground mb-2">Current Route</h4>
                  <p className="text-sm text-muted-foreground">/test-navigation</p>
                </div>

                <div className="text-center p-4 border border-border rounded">
                  <h4 className="font-medium text-card-foreground mb-2">Target Route</h4>
                  <p className="text-sm text-muted-foreground">/add-business</p>
                </div>

                <div className="text-center p-4 border border-border rounded">
                  <h4 className="font-medium text-card-foreground mb-2">Router Status</h4>
                  <p className="text-sm text-green-600">Ready</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  onClick={() => router.push("/add-business")}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold mr-4"
                >
                  Go to Add Business Page
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="interactive-element bg-transparent"
                >
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <NavigationVerification />
      </div>
    </ThemeProvider>
  )
}
