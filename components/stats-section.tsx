"use client"

interface StatsSectionProps {
  stats?: {
    totalBusinesses: number
    totalReviews: number
    totalLocations: number
    averageRating: number
    // CURSOR EXTENSION POINT: Add dynamic stats
  }
  config?: {
    // CURSOR EXTENSION POINT: Add customization options
    backgroundColor?: string
    showAverageRating?: boolean
  }
}

export function StatsSection({
  stats = {
    totalBusinesses: 123,
    totalReviews: 1847,
    totalLocations: 15,
    averageRating: 4.6,
  },
  config = { showAverageRating: true },
}: StatsSectionProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl mx-auto transition-colors duration-300">
            Join our growing community of business owners and customers
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{formatNumber(stats.totalBusinesses)}+</div>
            <div className="text-blue-100 dark:text-blue-200 font-medium transition-colors duration-300">
              Local Businesses
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{formatNumber(stats.totalReviews)}+</div>
            <div className="text-blue-100 dark:text-blue-200 font-medium transition-colors duration-300">
              Customer Reviews
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stats.totalLocations}+</div>
            <div className="text-blue-100 dark:text-blue-200 font-medium transition-colors duration-300">
              Cities Covered
            </div>
          </div>

          {config.showAverageRating && (
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stats.averageRating}★</div>
              <div className="text-blue-100 dark:text-blue-200 font-medium transition-colors duration-300">
                Average Rating
              </div>
            </div>
          )}
        </div>

        {/* CURSOR EXTENSION POINT: Add real-time stats updates */}
        <div className="text-center mt-8">
          <p className="text-blue-100 dark:text-blue-200 text-sm transition-colors duration-300">
            {/* STUB: Will show real-time updates */}
            Stats updated daily • Last updated: Today
          </p>
        </div>
      </div>
    </section>
  )
}
