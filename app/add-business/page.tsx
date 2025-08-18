"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sampleConfig } from "@/data/sample-data"
import { ArrowLeft, Upload, MapPin, Phone, Mail, Globe, Check } from "lucide-react"
import Link from "next/link"

export default function AddBusinessPage() {
  // Add debugging to verify page loads
  useEffect(() => {
    console.log("Add Business page loaded successfully")
  }, [])

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    priceRange: "",
    cuisineType: "",
    dietaryOptions: [] as string[],
    bookingRequired: false,
    averageMealPrice: "",
    businessHours: {
      monday: { open: "", close: "", closed: false },
      tuesday: { open: "", close: "", closed: false },
      wednesday: { open: "", close: "", closed: false },
      thursday: { open: "", close: "", closed: false },
      friday: { open: "", close: "", closed: false },
      saturday: { open: "", close: "", closed: false },
      sunday: { open: "", close: "", closed: false },
    },
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDietaryOptionChange = (option: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietaryOptions: checked
        ? [...prev.dietaryOptions, option]
        : prev.dietaryOptions.filter((item) => item !== option),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // STUB: Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("STUB: Business application submitted:", formData)
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Dairy-Free"]
  const priceRanges = ["$", "$$", "$$$", "$$$$"]

  if (submitSuccess) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Navigation config={{ siteName: sampleConfig.siteName }} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card className="text-center ui-card card-enhanced">
              <CardContent className="p-12 card-content-enhanced">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-card-foreground mb-4 transition-colors duration-300">
                  Application Submitted Successfully!
                </h1>
                <p className="text-lg text-muted-foreground mb-8 transition-colors duration-300">
                  Thank you for submitting your business application. We'll review your information and get back to you
                  within 2-3 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                      Return to Homepage
                    </Button>
                  </Link>
                  <Link href="/businesses">
                    <Button variant="outline" className="interactive-element bg-transparent">
                      Browse Businesses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <Footer config={{ siteName: sampleConfig.siteName, categories: sampleConfig.categories.slice(0, 4) }} />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation config={{ siteName: sampleConfig.siteName }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 transition-colors duration-300">
              Add Your Business
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
              Join our directory and connect with customers in your area. Fill out the form below to get started.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step <= currentStep
                        ? "bg-blue-600 dark:bg-blue-700 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-colors ${
                        step < currentStep ? "bg-blue-600 dark:bg-blue-700" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-sm text-muted-foreground transition-colors duration-300">
                Step {currentStep} of 3: {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Business Details"}
                {currentStep === 3 && "Hours & Additional Info"}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Card className="ui-card card-enhanced">
              <CardHeader className="card-content-enhanced">
                <CardTitle className="text-card-foreground transition-colors duration-300">
                  {currentStep === 1 && "Basic Business Information"}
                  {currentStep === 2 && "Business Details & Contact"}
                  {currentStep === 3 && "Hours & Additional Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 card-content-enhanced">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessName" className="text-card-foreground font-medium">
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="Enter your business name"
                          required
                          className="bg-input border-border text-card-foreground"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-card-foreground font-medium">
                          Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-input border-border text-card-foreground">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {sampleConfig.categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-card-foreground font-medium">
                        Business Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your business, what makes it special, and what customers can expect..."
                        rows={4}
                        required
                        className="bg-input border-border text-card-foreground"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-card-foreground font-medium">
                        Business Address *
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="123 Main Street, City, State, Postal Code"
                          className="pl-10 bg-input border-border text-card-foreground"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Contact & Details */}
                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-card-foreground font-medium">
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="pl-10 bg-input border-border text-card-foreground"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-card-foreground font-medium">
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="business@example.com"
                            className="pl-10 bg-input border-border text-card-foreground"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-card-foreground font-medium">
                        Website (Optional)
                      </Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          placeholder="https://www.yourbusiness.com"
                          className="pl-10 bg-input border-border text-card-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="priceRange" className="text-card-foreground font-medium">
                          Price Range *
                        </Label>
                        <Select
                          value={formData.priceRange}
                          onValueChange={(value) => handleInputChange("priceRange", value)}
                        >
                          <SelectTrigger className="bg-input border-border text-card-foreground">
                            <SelectValue placeholder="Select price range" />
                          </SelectTrigger>
                          <SelectContent>
                            {priceRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range} {range === "$" && "(Under $20)"}
                                {range === "$$" && "($20-$50)"}
                                {range === "$$$" && "($50-$100)"}
                                {range === "$$$$" && "($100+)"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="cuisineType" className="text-card-foreground font-medium">
                          Cuisine Type
                        </Label>
                        <Input
                          id="cuisineType"
                          value={formData.cuisineType}
                          onChange={(e) => handleInputChange("cuisineType", e.target.value)}
                          placeholder="e.g., Italian, Asian, Modern Australian"
                          className="bg-input border-border text-card-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-card-foreground font-medium">Dietary Options</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {dietaryOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={option}
                              checked={formData.dietaryOptions.includes(option)}
                              onCheckedChange={(checked) => handleDietaryOptionChange(option, checked as boolean)}
                            />
                            <Label htmlFor={option} className="text-card-foreground cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Hours & Additional Info */}
                {currentStep === 3 && (
                  <>
                    <div>
                      <Label className="text-card-foreground font-medium mb-4 block">Business Hours</Label>
                      <div className="space-y-3">
                        {Object.entries(formData.businessHours).map(([day, hours]) => (
                          <div key={day} className="flex items-center space-x-4">
                            <div className="w-24 text-sm font-medium text-card-foreground capitalize">{day}</div>
                            <div className="flex items-center space-x-2 flex-1">
                              <Input
                                type="time"
                                value={hours.open}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    businessHours: {
                                      ...prev.businessHours,
                                      [day]: { ...hours, open: e.target.value },
                                    },
                                  }))
                                }
                                disabled={hours.closed}
                                className="bg-input border-border text-card-foreground"
                              />
                              <span className="text-muted-foreground">to</span>
                              <Input
                                type="time"
                                value={hours.close}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    businessHours: {
                                      ...prev.businessHours,
                                      [day]: { ...hours, close: e.target.value },
                                    },
                                  }))
                                }
                                disabled={hours.closed}
                                className="bg-input border-border text-card-foreground"
                              />
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${day}-closed`}
                                  checked={hours.closed}
                                  onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      businessHours: {
                                        ...prev.businessHours,
                                        [day]: { ...hours, closed: checked as boolean },
                                      },
                                    }))
                                  }
                                />
                                <Label htmlFor={`${day}-closed`} className="text-sm text-card-foreground">
                                  Closed
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="averageMealPrice" className="text-card-foreground font-medium">
                          Average Meal Price
                        </Label>
                        <Input
                          id="averageMealPrice"
                          type="number"
                          value={formData.averageMealPrice}
                          onChange={(e) => handleInputChange("averageMealPrice", e.target.value)}
                          placeholder="25"
                          className="bg-input border-border text-card-foreground"
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          id="bookingRequired"
                          checked={formData.bookingRequired}
                          onCheckedChange={(checked) => handleInputChange("bookingRequired", checked as boolean)}
                        />
                        <Label htmlFor="bookingRequired" className="text-card-foreground font-medium">
                          Booking/Reservation Required
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label className="text-card-foreground font-medium">Photo Upload</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors duration-300">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2 transition-colors duration-300">
                          Upload photos of your business
                        </p>
                        <p className="text-sm text-muted-foreground transition-colors duration-300">
                          Drag and drop files here, or click to browse
                        </p>
                        <Button type="button" variant="outline" className="mt-4 interactive-element bg-transparent">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="interactive-element bg-transparent"
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  <div>
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 dark:text-gray-100"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <Footer config={{ siteName: sampleConfig.siteName, categories: sampleConfig.categories.slice(0, 4) }} />
      </div>
    </ThemeProvider>
  )
}
