"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    })
  }
}

export const navigateWithScrollToTop = async (
  router: AppRouterInstance,
  path: string,
  scrollBehavior: ScrollBehavior = "smooth",
  delay = 0,
) => {
  try {
    // Navigate first
    router.push(path)

    // Add delay if specified
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    // Then scroll to top
    scrollToTop(scrollBehavior)
  } catch (error) {
    console.error("Navigation error:", error)
    throw error
  }
}

export const scrollToElement = (elementId: string, behavior: ScrollBehavior = "smooth", offset = 0) => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior,
      })
    }
  }
}
