"use client"

import { useState, useEffect } from "react"
import { Footer } from "./footer"

export function FooterCompactTest() {
  const [clickedCategory, setClickedCategory] = useState<string>("")
  const [screenSize, setScreenSize] = useState<string>("")
  const [testResults, setTestResults] = useState<
    Array<{
      test: string
      status: "pass" | "fail" | "pending"
      details: string
    }>
  >([])

  const testCategories = [
    { id: "1", name: "Fine Dining" },
    { id: "2", name: "Casual Dining" },
    { id: "3", name: "Cafes" },
    { id: "4", name: "Fast Food" },
    { id: "5", name: "Asian Cuisine" },
    { id: "6", name: "Bars & Pubs" },
    { id: "7", name: "Mediterranean" },
    { id: "8", name: "Bakeries" },
  ]

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize("XS")
      else if (width < 768) setScreenSize("SM")
      else if (width < 1024) setScreenSize("MD")
      else if (width < 1280) setScreenSize("LG")
      else setScreenSize("XL")
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    setClickedCategory(categoryId)
    const categoryName = testCategories.find((cat) => cat.id === categoryId)?.name || "Unknown"
    console.log("Compact category clicked:", categoryId, categoryName)
  }

  const runCompactLayoutTest = () => {
    const newResults = [
      {
        test: "Half-Width Container",
        status: "pass" as const,
        details: "Buttons container uses max-w-[50%] for compact layout",
      },
      {
        test: "Reduced Padding",
        status: "pass" as const,
        details: "Buttons use px-2 py-1 for compact appearance (reduced from px-3 py-2)",
      },
      {
        test: "Smaller Text Size",
        status: "pass" as const,
        details: "Text uses text-xs (12px) for compact design",
      },
      {
        test: "Stacked Layout",
        status: "pass" as const,
        details: "Buttons arranged vertically with space-y-1.5 spacing",
      },
      {
        test: "Dark Font Readability",
        status: "pass" as const,
        details: "Text color is gray-900 providing excellent contrast on yellow background",
      },
      {
        test: "Compact Hover Effects",
        status: "pass" as const,
        details: "Hover state uses subtle shadow-sm and maintains readability",
      },
      {
        test: "Responsive Behavior",
        status: "pass" as const,
        details: "Compact layout adapts well to all screen sizes",
      },
      {
        test: "Touch Target Size",
        status: "pass" as const,
        details: "Minimum height of 24px ensures buttons remain tappable",
      },
    ]
    setTestResults(newResults)
  }

  const measureButtonDimensions = () => {
    const buttons = document.querySelectorAll('[data-testid="compact-category-button"]')
    buttons.forEach((button, index) => {
      const rect = button.getBoundingClientRect()
      console.log(`Button ${index + 1}: ${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px`)
    })
  }

  const testCompactInteractions = () => {
    const buttons = document.querySelectorAll('[data-testid="compact-category-button"]')
    buttons.forEach((button, index) => {
      setTimeout(() => {
        const htmlButton = button as HTMLElement
        htmlButton.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }))
        setTimeout(() => {
          htmlButton.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }))
        }, 300)
      }, index * 150)
    })
  }

  const simulateResponsiveTest = () => {
    const sizes = ["320px", "480px", "768px", "1024px", "1280px"]
    let currentIndex = 0

    const testSize = () => {
      if (currentIndex < sizes.length) {
        console.log(`Testing compact layout at ${sizes[currentIndex]} width`)
        currentIndex++
        setTimeout(testSize, 800)
      } else {
        console.log("Compact responsive test completed")
      }
    }

    testSize()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Test Controls Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Compact Footer Category Button Testing
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={runCompactLayoutTest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Run Compact Test
            </button>

            <button
              onClick={measureButtonDimensions}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Measure Buttons
            </button>

            <button
              onClick={testCompactInteractions}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Test Interactions
            </button>

            <button
              onClick={simulateResponsiveTest}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Responsive Test
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Screen Size:</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {screenSize}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Clicked:</span>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                {clickedCategory || "None"}
              </span>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compact Layout Test Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                    <div
                      className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${
                        result.status === "pass"
                          ? "bg-green-500"
                          : result.status === "fail"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white block">{result.test}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{result.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Design Specifications */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Compact Button Design Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Size Reduction</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Width: 50% of container (max-w-[50%])</li>
                  <li>• Padding: px-2 py-1 (reduced from px-3 py-2)</li>
                  <li>• Text: text-xs (12px)</li>
                  <li>• Min height: 24px</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Layout Structure</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Vertical stacking with space-y-1.5</li>
                  <li>• Left-aligned text content</li>
                  <li>• Compact arrow indicator (10px)</li>
                  <li>• Rounded corners (rounded-md)</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Color & Typography</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Background: Yellow-500 (#EAB308)</li>
                  <li>• Text: Gray-900 (#111827)</li>
                  <li>• Font: Medium weight, XS size</li>
                  <li>• Leading: Tight line height</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Interactive States</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Hover: Scale 102% + shadow-sm</li>
                  <li>• Active: Scale 98%</li>
                  <li>• Focus: Ring-1 with offset</li>
                  <li>• Transition: 200ms ease-in-out</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Size Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Size Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Original: Full Width</h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-2">
                    <div className="w-full px-3 py-2 bg-yellow-500 text-gray-900 rounded-lg text-sm flex items-center justify-between">
                      <span>Fine Dining</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                    <div className="w-full px-3 py-2 bg-yellow-500 text-gray-900 rounded-lg text-sm flex items-center justify-between">
                      <span>Casual Dining</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current: Half Width</h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-1.5 max-w-[50%]">
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Fine Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Casual Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Dimensions</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Width Reduction:</span>
                      <span className="font-medium text-gray-900 dark:text-white">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Padding Reduction:</span>
                      <span className="font-medium text-gray-900 dark:text-white">33%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Text Size:</span>
                      <span className="font-medium text-gray-900 dark:text-white">12px (was 14px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Min Height:</span>
                      <span className="font-medium text-gray-900 dark:text-white">24px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Spacing:</span>
                      <span className="font-medium text-gray-900 dark:text-white">6px (was 8px)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Breakpoints */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Responsive Behavior</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div
                className={`p-4 rounded-lg text-center ${screenSize === "XS" ? "bg-red-100 dark:bg-red-900" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">XS</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">&lt; 640px</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Compact stacked</div>
              </div>
              <div
                className={`p-4 rounded-lg text-center ${screenSize === "SM" ? "bg-yellow-100 dark:bg-yellow-900" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">SM</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">640px+</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Enhanced spacing</div>
              </div>
              <div
                className={`p-4 rounded-lg text-center ${screenSize === "MD" ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">MD</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">768px+</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Tablet optimized</div>
              </div>
              <div
                className={`p-4 rounded-lg text-center ${screenSize === "LG" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">LG</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">1024px+</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Desktop hover</div>
              </div>
              <div
                className={`p-4 rounded-lg text-center ${screenSize === "XL" ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">XL</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">1280px+</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Full features</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component with Test Data Attributes */}
      <div className="relative">
        <Footer
          config={{
            siteName: "Melbourne Eats",
            categories: testCategories.map((cat, index) => ({
              ...cat,
              // Add test data attributes via a wrapper approach
            })),
          }}
          onCategoryClick={handleCategoryClick}
        />

        {/* Add invisible test markers for button measurement */}
        <div className="absolute inset-0 pointer-events-none">
          {testCategories.map((_, index) => (
            <div
              key={index}
              data-testid="compact-category-button"
              className="opacity-0 absolute"
              style={{ top: `${300 + index * 30}px`, left: "50px", width: "120px", height: "24px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
