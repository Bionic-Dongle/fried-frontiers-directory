import Link from "next/link"
import { ArrowLeft, FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <FileX className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Story Not Found</h1>
            <p className="text-muted-foreground">
              The blog post you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/blog">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Stories
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
