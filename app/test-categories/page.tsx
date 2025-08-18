"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { CategoriesGrid } from "@/components/categories-grid"
import { CategoryNavigationTest } from "@/components/category-navigation-test"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sampleConfig } from "@/data/sample-data"
import { CheckCircle, XCircle, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestCategoriesPage() {
  const router = useRouter()
  const [testResults, setTestResults] = useState<{ [key: string]: "pending" | "success" | "error" }>({})

  const runFullNavigationTest = async () => {
    // Test each category navigation
    for (const category of sampleConfig.categories) {
      const testKey = `full-${category.id}`
      setTestResults((prev) => ({ ...prev, [testKey]: "pending" }))

      try {
        const targetUrl = `/businesses?category=${category.id}`
        console.log(`Testing full navigation: ${category.name} -> ${targetUrl}`)

        // Simulate navigation test
        await new Promise((resolve) => setTimeout(resolve, 200))

        setTestResults((prev) => ({ ...prev, [testKey]: "success" }))
      } catch (error) {
        console.error(`Full navigation test failed for ${category.name}:`, error)
        setTestResults((prev) => ({ ...prev, [testKey]: "error" }))
      }
    }
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-8 transition-colors duration-300">
            Category Navigation Testing Dashboard
          </h1>

          {/* Test Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="ui-card card-enhanced">
              <CardHeader className="card-content-enhanced">
                <CardTitle className="text-card-foreground">Navigation Test Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 card-content-enhanced">
                <Button onClick={runFullNavigationTest} className="w-full bg-blue-600 hover:bg-blue-700">
                  Run Full Navigation Test
                </Button>

                <Button
                  onClick={() => setTestResults({})}
                  variant="outline"
                  className="w-full interactive-element bg-transparent"
                >
                  Reset Test Results
                </Button>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-card-foreground mb-2">Quick Navigation Tests:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleConfig.categories.slice(0, 4).map((category) => (
                      <Button
                        key={category.id}
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/businesses?category=${category.id}`)}
                        className="text-xs interactive-element bg-transparent"
                      >
                        {category.icon} {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ui-card card-enhanced">
              <CardHeader className="card-content-enhanced">
                <CardTitle className="text-card-foreground">Test Results</CardTitle>
              </CardHeader>
              <CardContent className="card-content-enhanced">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sampleConfig.categories.map((category) => {
                    const testKey = `full-${category.id}`
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between p-2 border border-border rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{category.icon}</span>
                          <span className="text-sm text-card-foreground">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTestIcon(testResults[testKey])}
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Categories Grid for Testing */}
          <Card className="ui-card card-enhanced mb-8">
            <CardHeader className="card-content-enhanced">
              <CardTitle className="text-card-foreground">Live Category Navigation Test</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click any category card below to test the navigation functionality
              </p>
            </CardHeader>
            <CardContent className="card-content-enhanced">
              <CategoriesGrid categories={sampleConfig.categories} config={{ showCounts: true, maxCategories: 6 }} />
            </CardContent>
          </Card>

          {/* Navigation Flow Diagram */}
          <Card className="ui-card card-enhanced">
            <CardHeader className="card-content-enhanced">
              <CardTitle className="text-card-foreground">Navigation Flow</CardTitle>
            </CardHeader>
            <CardContent className="card-content-enhanced">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="text-center p-3 border border-border rounded">
                  <div className="font-medium text-card-foreground">Homepage</div>
                  <div className="text-muted-foreground">Categories Grid</div>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="text-center p-3 border border-border rounded">
                  <div className="font-medium text-card-foreground">Click Category</div>
                  <div className="text-muted-foreground">User Action</div>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="text-center p-3 border border-border rounded">
                  <div className="font-medium text-card-foreground">Businesses Page</div>
                  <div className="text-muted-foreground">Filtered Results</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Expected URL format: <code className="bg-muted px-2 py-1 rounded">/businesses?category=ID</code>
                </p>
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => router.push("/businesses?category=1")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Test Fine Dining
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => router.push("/businesses?category=3")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Test Cafes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <CategoryNavigationTest />
      </div>
    </ThemeProvider>
  )
}
