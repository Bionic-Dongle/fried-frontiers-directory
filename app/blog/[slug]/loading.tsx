import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Skeleton className="w-full h-full" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          <div className="container mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4 bg-white/20" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-5/6 mb-8" />

              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                </div>

                <div className="border rounded-lg p-6">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
