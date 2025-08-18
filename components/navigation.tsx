"use client"

import type React from "react"

import { useState } from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { sampleConfig } from "@/data/sample-data"
import { useRouter, usePathname } from "next/navigation"

interface NavigationProps {
  config?: {
    siteName: string
    // CURSOR EXTENSION POINT: Add dynamic navigation items
  }
  onSearch?: (query: string) => void // STUB function
  onLogin?: () => void // STUB function
  onAddBusiness?: () => void // STUB function
}

export function Navigation({
  config = { siteName: "Melbourne Eats" },
  onSearch,
  onLogin,
  onAddBusiness,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()
  const pathname = usePathname()

  // Determine active page based on current pathname
  const getActivePage = () => {
    if (pathname === "/") return "home"
    if (pathname === "/businesses" || pathname.startsWith("/business/")) return "browse"
    if (pathname === "/blog" || pathname.startsWith("/blog/")) return "blog"
    if (pathname === "/about") return "about"
    return ""
  }

  const activePage = getActivePage()

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Scroll to top first
    window.scrollTo(0, 0)
    // Then navigate to home
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // STUB: Will be replaced with real search functionality
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      console.log("STUB: Search query:", searchQuery)
    }
  }

  const handleLogin = () => {
    // STUB: Will be replaced with real authentication
    if (onLogin) {
      onLogin()
    } else {
      console.log("STUB: Login clicked")
    }
  }

  const handleAddBusiness = () => {
    // Always navigate to the add business page, regardless of callback
    router.push("/add-business")

    // Also call the callback if provided (for backward compatibility)
    if (onAddBusiness) {
      onAddBusiness()
    }
  }

  // Standardized button styling classes
  const getButtonClasses = (isActive = false) => {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-all duration-200 border"

    if (isActive) {
      return `${baseClasses} bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700 shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 hover:shadow-lg hover:scale-105 transform`
    }

    return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md hover:scale-105 transform`
  }

  const getActionButtonClasses = (variant: "secondary" | "primary" | "yellow" = "secondary") => {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-all duration-200 border"

    if (variant === "yellow") {
      return `${baseClasses} bg-yellow-500 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 border-yellow-500 dark:border-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-500 shadow-md hover:shadow-lg hover:scale-105 transform`
    }

    if (variant === "primary") {
      return `${baseClasses} bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 shadow-md hover:shadow-lg hover:scale-105 transform`
    }

    return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md hover:scale-105 transform`
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-2">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-all duration-200 hover:scale-105 transform">
                {config.siteName}
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - Standardized buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={handleHomeClick} className={getButtonClasses(activePage === "home")}>
              Home
            </button>

            <Link href="/businesses" className={getButtonClasses(activePage === "browse")}>
              Browse
            </Link>

            <Link href="/blog" className={getButtonClasses(activePage === "blog")}>
              Blog
            </Link>

            <div className="relative group">
              <button className={`${getButtonClasses()} flex items-center hover:shadow-md hover:scale-105 transform`}>
                Categories
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Categories Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-border">
                <div className="py-2">
                  {sampleConfig.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/businesses?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/about" className={getButtonClasses(activePage === "about")}>
              About
            </Link>

            {/* Action Buttons with standardized styling */}
            <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-border">
              <DarkModeToggle variant="ghost" className={getActionButtonClasses()} />
              <button onClick={handleLogin} className={getActionButtonClasses()}>
                Login
              </button>
              <button onClick={handleAddBusiness} className={getActionButtonClasses("yellow")}>
                Add Your Business
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle variant="ghost" size="sm" className={getActionButtonClasses()} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={getActionButtonClasses()}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Standardized styling */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-4 pb-4 space-y-2">
              <button
                onClick={(e) => {
                  handleHomeClick(e)
                  setIsMenuOpen(false)
                }}
                className={`${getButtonClasses(activePage === "home")} w-full text-left`}
              >
                Home
              </button>

              <Link
                href="/businesses"
                className={`${getButtonClasses(activePage === "browse")} block w-full text-left`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>

              <Link
                href="/blog"
                className={`${getButtonClasses(activePage === "blog")} block w-full text-left`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Mobile Categories */}
              <div className="py-2">
                <div className={`${getButtonClasses()} w-full text-left mb-2`}>Categories</div>
                <div className="pl-4 space-y-1">
                  {sampleConfig.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/businesses?category=${category.id}`}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className={`${getButtonClasses(activePage === "about")} block w-full text-left`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-border space-y-2">
                <button onClick={handleLogin} className={`${getActionButtonClasses()} w-full`}>
                  Login
                </button>
                <button
                  onClick={() => {
                    handleAddBusiness()
                    setIsMenuOpen(false)
                  }}
                  className={`${getActionButtonClasses("yellow")} w-full`}
                >
                  Add Your Business
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
