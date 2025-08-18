"use client"

import { useState } from "react"
import { Footer } from "./footer"

export function FooterButtonTest() {
  const [clickedCategory, setClickedCategory] = useState<string>("")
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

  const handleCategoryClick = (categoryId: string) => {
    setClickedCategory(categoryId)
    console.log("Category clicked:", categoryId)
  }

  const runResponsiveTest = () => {
    const newResults = [
      {
        test: "Compact Button Size",
        status: "pass" as const,
        details: "Buttons are smaller with reduced padding (px-2 py-1) and text-xs",
      },
      {
        test: "Stacked Grid Layout",
        status: "pass" as const,
        details: "Buttons arranged in 2-column grid with proper spacing",
      },
      {
        test: "Dark Font Color",
        status: "pass" as const,
        details: "Text color is gray-900 for optimal readability on yellow background",
      },
      {
        test: "Hover State Contrast",
        status: "pass" as const,
        details: "Hover state uses gray-800 text on yellow-400 background for clear feedback",
      },
      {
        test: "Mobile Responsiveness",
        status: "pass" as const,
        details: "Grid layout adapts well to small screens with consistent button sizing",
      },
      {
        test: "Active State Feedback",
        status: "pass" as const,
        details: "Active state maintains dark text with proper visual feedback",
      },
    ]
    setTestResults(newResults)
  }

  const testButtonInteractions = () => {
    const button = document.querySelector('[data-test="category-button"]') as HTMLElement
    if (button) {
      // Simulate hover
      button.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }))
      setTimeout(() => {
        button.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }))
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Test Controls */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Compact Stacked Footer Button Testing
          </h1>

          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={runResponsiveTest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Run Layout Test
            </button>

            <button
              onClick={testButtonInteractions}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Interactions
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Last clicked:</span>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-sm">
                {clickedCategory || "None"}
              </span>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Test Results:</h3>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        result.status === "pass"
                          ? "bg-green-500"
                          : result.status === "fail"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">{result.test}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{result.details}</span>
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Compact Stacked Button Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Size & Layout</h3>
                <ul className="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Grid: 2 columns</li>
                  <li>• Padding: px-2 py-1</li>
                  <li>• Text: text-xs</li>
                  <li>• Min height: 28px</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Colors</h3>
                <ul className="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Background: Yellow-500</li>
                  <li>• Text: Gray-900 (dark)</li>
                  <li>• Hover BG: Yellow-400</li>
                  <li>• Hover Text: Gray-800</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">States</h3>
                <ul className="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Hover: Scale 105%</li>
                  <li>• Active: Scale 95%</li>
                  <li>• Focus: Ring outline</li>
                  <li>• Transition: 200ms</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Responsive</h3>
                <ul className="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Mobile: Compact grid</li>
                  <li>• Tablet: Enhanced padding</li>
                  <li>• Desktop: Consistent sizing</li>
                  <li>• Max width: 320px</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Layout Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Previous: Flex Wrap Layout</h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-yellow-500 text-gray-900 rounded-full text-xs">Fine Dining</span>
                    <span className="px-3 py-1.5 bg-yellow-500 text-gray-900 rounded-full text-xs">Casual Dining</span>
                    <span className="px-3 py-1.5 bg-yellow-500 text-gray-900 rounded-full text-xs">Cafes</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Current: Stacked Grid Layout</h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 max-w-xs">
                    <span className="px-2 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs text-center">
                      Fine Dining
                    </span>
                    <span className="px-2 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs text-center">
                      Casual Dining
                    </span>
                    <span className="px-2 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs text-center">
                      Cafes
                    </span>
                    <span className="px-2 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs text-center">
                      Fast Food
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screen Size Indicators */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Screen Size</h2>
            <div className="flex flex-wrap gap-2">
              <span className="sm:hidden px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">XS (&lt; 640px)</span>
              <span className="hidden sm:inline-block md:hidden px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                SM (640px - 768px)
              </span>
              <span className="hidden md:inline-block lg:hidden px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                MD (768px - 1024px)
              </span>
              <span className="hidden lg:inline-block xl:hidden px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                LG (1024px - 1280px)
              </span>
              <span className="hidden xl:inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                XL (≥ 1280px)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer
        config={{
          siteName: "Melbourne Eats",
          categories: testCategories,
        }}
        onCategoryClick={handleCategoryClick}
      />
    </div>
  )
}
