"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sampleConfig } from "@/data/sample-data"
import { Users, MapPin, Star, Award, Heart, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation config={{ siteName: sampleConfig.siteName }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 transition-colors duration-300">
              About {sampleConfig.siteName}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              We're passionate about connecting people with amazing local businesses. Our mission is to help you
              discover the best {sampleConfig.niche} in your area while supporting the local community.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-blue-200 dark:border-blue-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed transition-colors duration-300">
                  To create the most comprehensive and trusted directory of local {sampleConfig.niche}, making it easy
                  for people to discover exceptional dining experiences while helping businesses connect with their
                  ideal customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Globe className="h-6 w-6 mr-3 text-green-600 dark:text-green-400" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed transition-colors duration-300">
                  To be the go-to platform that strengthens local communities by bridging the gap between amazing
                  businesses and the people who will love them, fostering lasting relationships and economic growth.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 transition-colors duration-300">
              Why Choose {sampleConfig.siteName}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
                    Community Driven
                  </h3>
                  <p className="text-muted-foreground text-sm transition-colors duration-300">
                    Real reviews from real customers help you make informed decisions about where to dine.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
                    Local Focus
                  </h3>
                  <p className="text-muted-foreground text-sm transition-colors duration-300">
                    We specialize in showcasing the best local businesses in your neighborhood and beyond.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
                    Quality Assured
                  </h3>
                  <p className="text-muted-foreground text-sm transition-colors duration-300">
                    Every business is carefully vetted to ensure you discover only the highest quality establishments.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
                    Easy to Use
                  </h3>
                  <p className="text-muted-foreground text-sm transition-colors duration-300">
                    Our intuitive platform makes finding and exploring local businesses simple and enjoyable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 mb-16 text-white transition-colors duration-300">
            <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">123+</div>
                <div className="text-blue-100 dark:text-blue-200">Local Businesses</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1.8k+</div>
                <div className="text-blue-100 dark:text-blue-200">Customer Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100 dark:text-blue-200">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.6★</div>
                <div className="text-blue-100 dark:text-blue-200">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 transition-colors duration-300">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300">
                  Transparency
                </h3>
                <p className="text-muted-foreground transition-colors duration-300">
                  We believe in honest, authentic reviews and transparent business practices that build trust within our
                  community.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300">
                  Excellence
                </h3>
                <p className="text-muted-foreground transition-colors duration-300">
                  We're committed to showcasing only the finest local businesses and providing an exceptional user
                  experience.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Heart className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300">Community</h3>
                <p className="text-muted-foreground transition-colors duration-300">
                  Supporting local businesses and fostering connections between businesses and customers is at our core.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-muted rounded-2xl p-12 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-4 transition-colors duration-300">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-colors duration-300">
              Join thousands of food lovers who trust {sampleConfig.siteName} to discover their next favorite dining
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/businesses">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  Browse Businesses
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer
          config={{
            siteName: sampleConfig.siteName,
            categories: sampleConfig.categories.slice(0, 4),
          }}
        />
      </div>
    </ThemeProvider>
  )
}
