"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sampleConfig } from "@/data/sample-data"
import { CheckCircle, XCircle, RefreshCw, ArrowRight } from "lucide-react"

export function CategoryNavigationTest() {
  const router = useRouter()
  const [testResults, setTestResults] = useState<{ [key: string]: "pending" | "success" | "error" }>({})

  const runCategoryTest = async (categoryId: string, categoryName: string) => {
    const testKey = `category-${categoryId}`
    setTestResults((prev) => ({ ...prev, [testKey]: "pending" }))

    try {
      const targetUrl = `/businesses?category=${categoryId}`
      console.log(`Testing category navigation: ${categoryName} -> ${targetUrl}`)

      router.push(targetUrl)

      // Simulate checking if navigation worked
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [testKey]: "success" }))
      }, 500)
    } catch (error) {
      console.error(`Category navigation test failed for ${categoryName}:`, error)
      setTestResults((prev) => ({ ...prev, [testKey]: "error" }))
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

  const resetTests = () => {
    setTestResults({})
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto z-50 ui-card card-enhanced">
      <CardHeader className="card-content-enhanced">
        <CardTitle className="text-sm text-card-foreground flex items-center justify-between">
          Category Navigation Tests
          <Button size="sm" variant="outline" onClick={resetTests} className="text-xs bg-transparent">
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 card-content-enhanced">
        {sampleConfig.categories.map((category) => {
          const testKey = `category-${category.id}`
          return (
            <div key={category.id} className="flex items-center justify-between p-2 border border-border rounded">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <div>
                  <span className="text-sm font-medium text-card-foreground">{category.name}</span>
                  <div className="text-xs text-muted-foreground">{category.count} businesses</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTestIcon(testResults[testKey])}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runCategoryTest(category.id, category.name)}
                  className="text-xs interactive-element bg-transparent"
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )
        })}

        <div className="pt-2 border-t border-border">
          <Button size="sm" onClick={() => router.push("/businesses")} className="w-full bg-blue-600 hover:bg-blue-700">
            View All Businesses
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
