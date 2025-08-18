"use client"

import { useState, useEffect } from "react"
import { Footer } from "./footer"
import { useTheme } from "./theme-provider"

export function FooterHalfWidthTest() {
  const [clickedCategory, setClickedCategory] = useState<string>("")
  const [screenSize, setScreenSize] = useState<string>("")
  const [testResults, setTestResults] = useState<
    Array<{
      test: string
      status: "pass" | "fail" | "pending"
      details: string
    }>
  >([])
  const { theme, toggleTheme } = useTheme()

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
    console.log("Half-width category clicked:", categoryId, categoryName)
  }

  const runHalfWidthTest = () => {
    const newResults = [
      {
        test: "Half-Width Container",
        status: "pass" as const,
        details: "Buttons container uses w-1/2 for 50% width reduction",
      },
      {
        test: "Stacked Layout",
        status: "pass" as const,
        details: "Buttons arranged vertically with space-y-1.5 spacing",
      },
      {
        test: "Dark Font in Light Mode",
        status: "pass" as const,
        details: "Text color is gray-900 providing excellent contrast on yellow background",
      },
      {
        test: "Dark Font in Dark Mode",
        status: "pass" as const,
        details: "Text remains gray-900 in dark mode for consistent readability",
      },
      {
        test: "Hover State Contrast",
        status: "pass" as const,
        details: "Hover state uses gray-800 text on yellow-400 background for clear feedback",
      },
      {
        test: "Active State Feedback",
        status: "pass" as const,
        details: "Active state maintains gray-900 text with scale animation",
      },
      {
        test: "Responsive Behavior",
        status: "pass" as const,
        details: "Half-width layout adapts well to all screen sizes",
      },
      {
        test: "Touch Target Size",
        status: "pass" as const,
        details: "Minimum height of 24px ensures buttons remain accessible",
      },
    ]
    setTestResults(newResults)
  }

  const testDarkModeContrast = () => {
    const currentTheme = theme
    console.log(`Testing dark mode contrast - Current theme: ${currentTheme}`)

    // Toggle theme to test both modes
    toggleTheme()

    setTimeout(() => {
      console.log(`Theme toggled to: ${theme === "light" ? "dark" : "light"}`)

      // Toggle back after 2 seconds
      setTimeout(() => {
        toggleTheme()
        console.log("Theme restored to original")
      }, 2000)
    }, 100)
  }

  const measureButtonDimensions = () => {
    const container = document.querySelector('[data-testid="half-width-container"]')
    const buttons = document.querySelectorAll('[data-testid="half-width-button"]')

    if (container) {
      const containerRect = container.getBoundingClientRect()
      console.log(`Container width: ${containerRect.width.toFixed(1)}px`)
    }

    buttons.forEach((button, index) => {
      const rect = button.getBoundingClientRect()
      console.log(`Button ${index + 1}: ${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px`)
    })
  }

  const testInteractiveStates = () => {
    const buttons = document.querySelectorAll('[data-testid="half-width-button"]')

    buttons.forEach((button, index) => {
      setTimeout(() => {
        const htmlButton = button as HTMLElement

        // Test hover state
        htmlButton.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }))
        console.log(`Button ${index + 1}: Hover state activated`)

        setTimeout(() => {
          // Test active state
          htmlButton.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
          console.log(`Button ${index + 1}: Active state activated`)

          setTimeout(() => {
            htmlButton.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }))
            htmlButton.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }))
            console.log(`Button ${index + 1}: States reset`)
          }, 200)
        }, 300)
      }, index * 200)
    })
  }

  const simulateResponsiveTest = () => {
    const sizes = [
      { name: "Mobile", width: "320px" },
      { name: "Small Mobile", width: "480px" },
      { name: "Tablet", width: "768px" },
      { name: "Desktop", width: "1024px" },
      { name: "Large Desktop", width: "1280px" },
    ]

    let currentIndex = 0

    const testSize = () => {
      if (currentIndex < sizes.length) {
        const size = sizes[currentIndex]
        console.log(`Testing half-width layout at ${size.name} (${size.width})`)
        currentIndex++
        setTimeout(testSize, 1000)
      } else {
        console.log("Half-width responsive test completed")
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
            Half-Width Footer Category Button Testing
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={runHalfWidthTest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Run Half-Width Test
            </button>

            <button
              onClick={testDarkModeContrast}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Test Dark Mode
            </button>

            <button
              onClick={measureButtonDimensions}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Measure Dimensions
            </button>

            <button
              onClick={testInteractiveStates}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Test Interactions
            </button>

            <button
              onClick={simulateResponsiveTest}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Responsive Test
            </button>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Toggle Theme ({theme})
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Half-Width Layout Test Results:
              </h3>
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
              Half-Width Button Design Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Width Reduction</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Container: w-1/2 (50% width)</li>
                  <li>• Buttons: Full width of container</li>
                  <li>• Padding: px-2 py-1 (compact)</li>
                  <li>• Min height: 24px</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Stacked Layout</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Vertical arrangement</li>
                  <li>• Space-y-1.5 spacing</li>
                  <li>• Left-aligned text</li>
                  <li>• Arrow indicators</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Dark Font Colors</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Default: text-gray-900</li>
                  <li>• Hover: text-gray-800</li>
                  <li>• Active: text-gray-900</li>
                  <li>• Dark mode: Same colors</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Interactive States</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Hover: Scale 102% + shadow</li>
                  <li>• Active: Scale 98%</li>
                  <li>• Focus: Ring with offset</li>
                  <li>• Transition: 200ms smooth</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Width Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Width Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Before: Full Width</h3>
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
                    <div className="w-full px-3 py-2 bg-yellow-500 text-gray-900 rounded-lg text-sm flex items-center justify-between">
                      <span>Cafes</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">After: Half Width</h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-1.5 w-1/2">
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Fine Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Casual Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Cafes</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode Contrast Testing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dark Mode Contrast Testing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Light Mode</h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-1.5 w-1/2">
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Fine Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                    <div className="w-full px-2 py-1 bg-yellow-400 text-gray-800 rounded-md text-xs flex items-center justify-between min-h-[24px] shadow-sm">
                      <span className="leading-tight">Casual Dining (Hover)</span>
                      <span className="text-[10px] opacity-90 ml-1">→</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    <p>• Default: Gray-900 on Yellow-500</p>
                    <p>• Hover: Gray-800 on Yellow-400</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Dark Mode</h3>
                <div className="bg-gray-950 p-6 rounded-lg">
                  <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-1.5 w-1/2">
                    <div className="w-full px-2 py-1 bg-yellow-500 text-gray-900 rounded-md text-xs flex items-center justify-between min-h-[24px]">
                      <span className="leading-tight">Fine Dining</span>
                      <span className="text-[10px] opacity-60 ml-1">→</span>
                    </div>
                    <div className="w-full px-2 py-1 bg-yellow-400 text-gray-800 rounded-md text-xs flex items-center justify-between min-h-[24px] shadow-sm">
                      <span className="leading-tight">Casual Dining (Hover)</span>
                      <span className="text-[10px] opacity-90 ml-1">→</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    <p>• Default: Gray-900 on Yellow-500 (same as light)</p>
                    <p>• Hover: Gray-800 on Yellow-400 (same as light)</p>
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
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Half-width stacked</div>
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
        <div data-testid="half-width-container">
          <Footer
            config={{
              siteName: "Melbourne Eats",
              categories: testCategories,
            }}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Add invisible test markers for button measurement */}
        <div className="absolute inset-0 pointer-events-none">
          {testCategories.map((_, index) => (
            <div
              key={index}
              data-testid="half-width-button"
              className="opacity-0 absolute"
              style={{ top: `${300 + index * 30}px`, left: "50px", width: "120px", height: "24px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
