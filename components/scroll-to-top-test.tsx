"use client"

import { useState } from "react"
import { ArrowUp, Play, CheckCircle, XCircle, Monitor, Smartphone, Tablet } from "lucide-react"
import { scrollToTop, scrollToElement } from "@/utils/scroll-utils"

export function ScrollToTopTest() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [screenSize, setScreenSize] = useState<string>("desktop")

  const tests = [
    {
      id: "smooth-scroll",
      name: "Smooth Scroll to Top",
      description: "Tests smooth scrolling behavior to page top",
      action: () => scrollToTop("smooth"),
    },
    {
      id: "instant-scroll",
      name: "Instant Scroll to Top",
      description: "Tests instant scrolling behavior to page top",
      action: () => scrollToTop("instant"),
    },
    {
      id: "delayed-scroll",
      name: "Delayed Scroll to Top",
      description: "Tests scrolling with 500ms delay",
      action: () => scrollToTop("smooth", 500),
    },
    {
      id: "element-scroll",
      name: "Scroll to Element",
      description: "Tests scrolling to specific element",
      action: () => scrollToElement("test-target"),
    },
  ]

  const runTest = async (test: any) => {
    setIsRunning(true)
    setCurrentTest(test.id)

    try {
      // Scroll down first to test scrolling back up
      window.scrollTo({ top: 1000, behavior: "instant" })
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Run the test
      await test.action()
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if we're at the top (within 10px tolerance)
      const isAtTop = window.pageYOffset <= 10
      setTestResults((prev) => ({ ...prev, [test.id]: isAtTop }))
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [test.id]: false }))
    }

    setCurrentTest(null)
    setIsRunning(false)
  }

  const runAllTests = async () => {
    setTestResults({})
    for (const test of tests) {
      await runTest(test)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  const getScreenSizeClass = () => {
    switch (screenSize) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      default:
        return "max-w-4xl"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className={`mx-auto px-4 ${getScreenSizeClass()}`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scroll Utility Test Suite</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Test the scroll-to-top functionality across different scenarios and screen sizes.
          </p>

          {/* Screen Size Controls */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "mobile", icon: Smartphone, label: "Mobile" },
              { id: "tablet", icon: Tablet, label: "Tablet" },
              { id: "desktop", icon: Monitor, label: "Desktop" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setScreenSize(id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  screenSize === id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4 inline mr-1" />
                {label}
              </button>
            ))}
          </div>

          {/* Test Controls */}
          <div className="flex gap-4">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md font-medium transition-colors"
            >
              <Play className="h-4 w-4 inline mr-2" />
              {isRunning ? "Running Tests..." : "Run All Tests"}
            </button>
            <button
              onClick={() => scrollToTop("smooth")}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
            >
              <ArrowUp className="h-4 w-4 inline mr-2" />
              Scroll to Top
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tests.map((test) => (
            <div key={test.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{test.name}</h3>
                <div className="flex items-center gap-2">
                  {currentTest === test.id && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                  )}
                  {testResults[test.id] !== undefined && (
                    <>
                      {testResults[test.id] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{test.description}</p>
              <button
                onClick={() => runTest(test)}
                disabled={isRunning}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-md text-sm font-medium transition-colors"
              >
                Run Test
              </button>
            </div>
          ))}
        </div>

        {/* Test Target Element */}
        <div id="test-target" className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Test Target Element</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            This element is used for testing the scrollToElement function. The test will scroll to this specific
            element.
          </p>
        </div>

        {/* Spacer Content */}
        <div className="space-y-8 mt-8">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content Block {i + 1}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This is placeholder content to create a scrollable page for testing the scroll-to-top functionality. The
                page needs sufficient height to demonstrate the scrolling behavior effectively.
              </p>
            </div>
          ))}
        </div>

        {/* Test Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Passed Tests</div>
              <div className="text-2xl font-bold text-green-500">
                {Object.values(testResults).filter(Boolean).length}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Failed Tests</div>
              <div className="text-2xl font-bold text-red-500">
                {Object.values(testResults).filter((result) => result === false).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
