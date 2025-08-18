export interface DirectoryConfig {
  niche: string
  siteName: string
  features?: {
    blogSection?: boolean
    blogTitle?: string
    blogSubtitle?: string
    reviewSystem?: boolean
    userAuthentication?: boolean
    businessClaiming?: boolean
    advancedSearch?: boolean
    mapIntegration?: boolean
    socialSharing?: boolean
    multiLanguage?: boolean
  }
  categories: Category[]
  customFields?: CustomField[]
  databaseConfig?: {
    provider: "supabase" | "neon" | "mongodb" | "mysql" | "postgresql"
    connectionString?: string
    tablePrefix?: string
  }
  apiConfig?: {
    baseUrl: string
    apiKey?: string
    rateLimit?: number
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count: number
  description?: string
  parentId?: string
  isActive: boolean
  sortOrder: number
  customFields?: Record<string, any>
  seoMetadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface CustomField {
  id: string
  name: string
  type: string
  options?: string[]
}

export interface Business {
  id: string
  name: string
  slug: string
  category: string
  categoryId: string
  rating: number
  reviewCount: number
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  priceRange: string
  imageUrl: string
  images?: string[]
  phone?: string
  email?: string
  website?: string
  description?: string
  shortDescription?: string
  isActive: boolean
  isFeatured: boolean
  isVerified: boolean
  isPremium: boolean
  dateAdded: string
  lastUpdated: string
  viewCount: number
  businessHours?: {
    [key: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  seoMetadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  customFields?: Record<string, any>
  ownerId?: string
  claimedBy?: string
  claimedAt?: string
}

export interface DirectoryStats {
  totalBusinesses: number
  totalCategories: number
  totalReviews: number
  totalLocations: number
  averageRating: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  images?: string[]
  author: string
  authorId?: string
  publishDate: string
  lastUpdated?: string
  readTime: string
  category: string
  tags?: string[]
  businessName?: string
  businessId?: string
  isPublished: boolean
  isFeatured: boolean
  viewCount: number
  seoMetadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  customFields?: Record<string, any>
}

export const sampleConfig: DirectoryConfig = {
  niche: "restaurants",
  siteName: "Fried Frontiers",
  features: {
    blogSection: true,
    blogTitle: "Featured Stories",
    blogSubtitle: "Discover the stories behind your favorite local businesses",
  },
  categories: [
    { id: "fine-dining", name: "Fine Dining", slug: "fine-dining", icon: "🍽️", count: 12, isActive: true, sortOrder: 1 },
    { id: "casual-dining", name: "Casual Dining", slug: "casual-dining", icon: "🍕", count: 24, isActive: true, sortOrder: 2 },
    { id: "cafes", name: "Cafes", slug: "cafes", icon: "☕", count: 18, isActive: true, sortOrder: 3 },
    { id: "fast-food", name: "Fast Food", slug: "fast-food", icon: "🍔", count: 15, isActive: true, sortOrder: 4 },
    { id: "asian-cuisine", name: "Asian Cuisine", slug: "asian-cuisine", icon: "🥢", count: 20, isActive: true, sortOrder: 5 },
    { id: "bars-pubs", name: "Bars & Pubs", slug: "bars-pubs", icon: "🍺", count: 16, isActive: true, sortOrder: 6 },
  ],
  customFields: [],
}

export const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "The Local Bistro",
    slug: "the-local-bistro",
    category: "Fine Dining",
    categoryId: "fine-dining",
    rating: 4.8,
    reviewCount: 127,
    address: "123 Collins Street, Melbourne VIC 3000",
    coordinates: { lat: -37.8136, lng: 144.9631 },
    priceRange: "$$$",
    imageUrl: "/images/fine-dining-restaurant.png",
    images: ["/images/fine-dining-restaurant.png"],
    phone: "+61 3 9123 4567",
    email: "info@localbistro.com.au",
    website: "https://localbistro.com.au",
    description: "An intimate fine dining experience featuring modern Australian cuisine with French influences.",
    shortDescription: "Modern Australian cuisine with French influences",
    isActive: true,
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-20T14:45:00Z",
    viewCount: 1250,
    businessHours: {
      monday: { open: "6:00 PM", close: "10:00 PM", closed: false },
      tuesday: { open: "6:00 PM", close: "10:00 PM", closed: false },
      wednesday: { open: "6:00 PM", close: "10:00 PM", closed: false },
      thursday: { open: "6:00 PM", close: "10:00 PM", closed: false },
      friday: { open: "6:00 PM", close: "11:00 PM", closed: false },
      saturday: { open: "6:00 PM", close: "11:00 PM", closed: false },
      sunday: { open: "", close: "", closed: true }
    },
    socialMedia: {
      facebook: "https://facebook.com/localbistro",
      instagram: "https://instagram.com/localbistro"
    },
    customFields: {
      cuisineType: "Modern Australian",
      averageMealPrice: 85,
      bookingRequired: true,
      dietaryOptions: ["Vegetarian", "Gluten-Free", "Vegan"]
    }
  },
  {
    id: "2",
    name: "Mario's Pizza Palace",
    slug: "marios-pizza-palace",
    category: "Casual Dining",
    categoryId: "casual-dining",
    rating: 4.5,
    reviewCount: 89,
    address: "456 Brunswick Street, Fitzroy VIC 3065",
    coordinates: { lat: -37.8014, lng: 144.9784 },
    priceRange: "$$",
    imageUrl: "/images/pizza-restaurant.png",
    images: ["/images/pizza-restaurant.png"],
    phone: "+61 3 9876 5432",
    email: "hello@mariospizza.com.au",
    website: "https://mariospizza.com.au",
    description: "Authentic wood-fired pizzas made with fresh, locally sourced ingredients.",
    shortDescription: "Authentic wood-fired pizzas",
    isActive: true,
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-16T10:30:00Z",
    lastUpdated: "2024-01-21T14:45:00Z",
    viewCount: 890,
    businessHours: {
      monday: { open: "5:00 PM", close: "10:00 PM", closed: false },
      tuesday: { open: "5:00 PM", close: "10:00 PM", closed: false },
      wednesday: { open: "5:00 PM", close: "10:00 PM", closed: false },
      thursday: { open: "5:00 PM", close: "10:00 PM", closed: false },
      friday: { open: "5:00 PM", close: "11:00 PM", closed: false },
      saturday: { open: "12:00 PM", close: "11:00 PM", closed: false },
      sunday: { open: "12:00 PM", close: "9:00 PM", closed: false }
    },
    socialMedia: {
      facebook: "https://facebook.com/mariospizza",
      instagram: "https://instagram.com/mariospizza"
    },
    customFields: {
      cuisineType: "Italian",
      averageMealPrice: 28,
      bookingRequired: false,
      dietaryOptions: ["Vegetarian", "Gluten-Free"]
    }
  },
  {
    id: "3",
    name: "Brew & Bean Cafe",
    slug: "brew-bean-cafe",
    category: "Cafes",
    categoryId: "cafes",
    rating: 4.6,
    reviewCount: 156,
    address: "789 Chapel Street, South Yarra VIC 3141",
    coordinates: { lat: -37.8467, lng: 144.9936 },
    priceRange: "$",
    imageUrl: "/images/cozy-cafe.png",
    images: ["/images/cozy-cafe.png"],
    phone: "+61 3 9555 0123",
    email: "info@brewandbean.com.au",
    website: "https://brewandbean.com.au",
    description: "Specialty coffee roasters serving artisanal brews and fresh pastries in a cozy atmosphere.",
    shortDescription: "Specialty coffee roasters",
    isActive: true,
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-17T10:30:00Z",
    lastUpdated: "2024-01-22T14:45:00Z",
    viewCount: 1560,
    businessHours: {
      monday: { open: "7:00 AM", close: "4:00 PM", closed: false },
      tuesday: { open: "7:00 AM", close: "4:00 PM", closed: false },
      wednesday: { open: "7:00 AM", close: "4:00 PM", closed: false },
      thursday: { open: "7:00 AM", close: "4:00 PM", closed: false },
      friday: { open: "7:00 AM", close: "4:00 PM", closed: false },
      saturday: { open: "8:00 AM", close: "3:00 PM", closed: false },
      sunday: { open: "8:00 AM", close: "3:00 PM", closed: false }
    },
    socialMedia: {
      instagram: "https://instagram.com/brewandbean"
    },
    customFields: {
      cuisineType: "Cafe",
      averageMealPrice: 15,
      bookingRequired: false,
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"]
    }
  },
  {
    id: "4",
    name: "Dragon Palace",
    slug: "dragon-palace",
    category: "Asian Cuisine",
    categoryId: "asian-cuisine",
    rating: 4.7,
    reviewCount: 203,
    address: "321 Little Bourke Street, Melbourne VIC 3000",
    coordinates: { lat: -37.8118, lng: 144.9648 },
    priceRange: "$$",
    imageUrl: "/images/asian-restaurant.png",
    images: ["/images/asian-restaurant.png"],
    phone: "+61 3 9888 7777",
    email: "bookings@dragonpalace.com.au",
    website: "https://dragonpalace.com.au",
    description: "Traditional Cantonese cuisine with modern presentation in the heart of Chinatown.",
    shortDescription: "Traditional Cantonese cuisine",
    isActive: true,
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-18T10:30:00Z",
    lastUpdated: "2024-01-23T14:45:00Z",
    viewCount: 2030,
    businessHours: {
      monday: { open: "11:30 AM", close: "9:30 PM", closed: false },
      tuesday: { open: "11:30 AM", close: "9:30 PM", closed: false },
      wednesday: { open: "11:30 AM", close: "9:30 PM", closed: false },
      thursday: { open: "11:30 AM", close: "9:30 PM", closed: false },
      friday: { open: "11:30 AM", close: "10:00 PM", closed: false },
      saturday: { open: "11:30 AM", close: "10:00 PM", closed: false },
      sunday: { open: "11:30 AM", close: "9:30 PM", closed: false }
    },
    socialMedia: {
      facebook: "https://facebook.com/dragonpalace"
    },
    customFields: {
      cuisineType: "Chinese",
      averageMealPrice: 35,
      bookingRequired: true,
      dietaryOptions: ["Vegetarian"]
    }
  },
  {
    id: "5",
    name: "The Crafty Pint",
    slug: "the-crafty-pint",
    category: "Bars & Pubs",
    categoryId: "bars-pubs",
    rating: 4.4,
    reviewCount: 92,
    address: "654 Smith Street, Collingwood VIC 3066",
    coordinates: { lat: -37.8014, lng: 144.9944 },
    priceRange: "$$",
    imageUrl: "/images/pub-bar.png",
    images: ["/images/pub-bar.png"],
    phone: "+61 3 9777 8888",
    email: "info@craftypint.com.au",
    website: "https://craftypint.com.au",
    description: "Craft beer specialists with rotating taps and hearty pub meals.",
    shortDescription: "Craft beer specialists",
    isActive: true,
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-19T10:30:00Z",
    lastUpdated: "2024-01-24T14:45:00Z",
    viewCount: 920,
    businessHours: {
      monday: { open: "4:00 PM", close: "11:00 PM", closed: false },
      tuesday: { open: "4:00 PM", close: "11:00 PM", closed: false },
      wednesday: { open: "4:00 PM", close: "11:00 PM", closed: false },
      thursday: { open: "4:00 PM", close: "12:00 AM", closed: false },
      friday: { open: "4:00 PM", close: "1:00 AM", closed: false },
      saturday: { open: "12:00 PM", close: "1:00 AM", closed: false },
      sunday: { open: "12:00 PM", close: "11:00 PM", closed: false }
    },
    socialMedia: {
      facebook: "https://facebook.com/craftypint",
      instagram: "https://instagram.com/craftypint"
    },
    customFields: {
      cuisineType: "Pub Food",
      averageMealPrice: 22,
      bookingRequired: false,
      dietaryOptions: ["Vegetarian"]
    }
  },
  {
    id: "6",
    name: "Burger Junction",
    slug: "burger-junction",
    category: "Fast Food",
    categoryId: "fast-food",
    rating: 4.2,
    reviewCount: 78,
    address: "987 High Street, Prahran VIC 3181",
    coordinates: { lat: -37.8467, lng: 144.9936 },
    priceRange: "$",
    imageUrl: "/images/fine-dining-restaurant.png",
    images: ["/images/fine-dining-restaurant.png"],
    phone: "+61 3 9444 3333",
    email: "orders@burgerjunction.com.au",
    website: "https://burgerjunction.com.au",
    description: "Gourmet burgers made with premium ingredients and house-made sauces.",
    shortDescription: "Gourmet burgers",
    isActive: true,
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-20T10:30:00Z",
    lastUpdated: "2024-01-25T14:45:00Z",
    viewCount: 780,
    businessHours: {
      monday: { open: "11:00 AM", close: "9:00 PM", closed: false },
      tuesday: { open: "11:00 AM", close: "9:00 PM", closed: false },
      wednesday: { open: "11:00 AM", close: "9:00 PM", closed: false },
      thursday: { open: "11:00 AM", close: "9:00 PM", closed: false },
      friday: { open: "11:00 AM", close: "10:00 PM", closed: false },
      saturday: { open: "11:00 AM", close: "10:00 PM", closed: false },
      sunday: { open: "11:00 AM", close: "9:00 PM", closed: false }
    },
    socialMedia: {
      instagram: "https://instagram.com/burgerjunction"
    },
    customFields: {
      cuisineType: "Burgers",
      averageMealPrice: 18,
      bookingRequired: false,
      dietaryOptions: ["Vegetarian"]
    }
  },
  {
    id: "7",
    name: "Healthy Harvest Cafe",
    slug: "healthy-harvest-cafe",
    category: "Cafes",
    categoryId: "cafes",
    rating: 4.5,
    reviewCount: 134,
    address: "246 Toorak Road, South Yarra VIC 3141",
    coordinates: { lat: -37.8467, lng: 144.9936 },
    priceRange: "$$",
    imageUrl: "/images/healthy-cafe.png",
    images: ["/images/healthy-cafe.png"],
    phone: "+61 3 9222 1111",
    email: "hello@healthyharvest.com.au",
    website: "https://healthyharvest.com.au",
    description: "Fresh, organic meals and cold-pressed juices for health-conscious diners.",
    shortDescription: "Fresh, organic meals",
    isActive: true,
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    dateAdded: "2024-01-21T10:30:00Z",
    lastUpdated: "2024-01-26T14:45:00Z",
    viewCount: 1340,
    businessHours: {
      monday: { open: "7:00 AM", close: "3:00 PM", closed: false },
      tuesday: { open: "7:00 AM", close: "3:00 PM", closed: false },
      wednesday: { open: "7:00 AM", close: "3:00 PM", closed: false },
      thursday: { open: "7:00 AM", close: "3:00 PM", closed: false },
      friday: { open: "7:00 AM", close: "3:00 PM", closed: false },
      saturday: { open: "8:00 AM", close: "2:00 PM", closed: false },
      sunday: { open: "8:00 AM", close: "2:00 PM", closed: false }
    },
    socialMedia: {
      instagram: "https://instagram.com/healthyharvest"
    },
    customFields: {
      cuisineType: "Healthy",
      averageMealPrice: 20,
      bookingRequired: false,
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Paleo"]
    }
  },
  {
    id: "8",
    name: "Waterfront Grill",
    slug: "waterfront-grill",
    category: "Fine Dining",
    categoryId: "fine-dining",
    rating: 4.9,
    reviewCount: 167,
    address: "1 Southbank Promenade, Southbank VIC 3006",
    coordinates: { lat: -37.8226, lng: 144.9671 },
    priceRange: "$$$$",
    imageUrl: "/images/waterfront-restaurant.png",
    images: ["/images/waterfront-restaurant.png"],
    phone: "+61 3 9111 2222",
    email: "reservations@waterfrontgrill.com.au",
    website: "https://waterfrontgrill.com.au",
    description: "Premium steakhouse with stunning river views and an extensive wine list.",
    shortDescription: "Premium steakhouse with river views",
    isActive: true,
    isFeatured: true,
    isVerified: true,
    isPremium: true,
    dateAdded: "2024-01-22T10:30:00Z",
    lastUpdated: "2024-01-27T14:45:00Z",
    viewCount: 1670,
    businessHours: {
      monday: { open: "", close: "", closed: true },
      tuesday: { open: "6:00 PM", close: "10:30 PM", closed: false },
      wednesday: { open: "6:00 PM", close: "10:30 PM", closed: false },
      thursday: { open: "6:00 PM", close: "10:30 PM", closed: false },
      friday: { open: "6:00 PM", close: "11:00 PM", closed: false },
      saturday: { open: "6:00 PM", close: "11:00 PM", closed: false },
      sunday: { open: "6:00 PM", close: "10:00 PM", closed: false }
    },
    socialMedia: {
      facebook: "https://facebook.com/waterfrontgrill",
      instagram: "https://instagram.com/waterfrontgrill"
    },
    customFields: {
      cuisineType: "Steakhouse",
      averageMealPrice: 120,
      bookingRequired: true,
      dietaryOptions: ["Gluten-Free"]
    }
  },
]

// Add the missing directoryStats export
export const directoryStats = {
  totalBusinesses: sampleBusinesses.length,
  totalCategories: sampleConfig.categories.length,
  totalReviews: sampleBusinesses.reduce((sum, business) => sum + business.reviewCount, 0),
  totalLocations: 1,
  averageRating: parseFloat((
    sampleBusinesses.reduce((sum, business) => sum + business.rating, 0) / sampleBusinesses.length
  ).toFixed(1)),
}

// Blog posts data
export const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How The Local Bistro Survived COVID and Became Stronger",
    slug: "local-bistro-covid-survival-story",
    excerpt:
      "Behind the scenes with owner Sarah Martinez as she shares the incredible journey of adapting during the pandemic and emerging with a thriving business.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/local-bistro-story.png",
    images: ["/images/blog/local-bistro-story.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "2 days ago",
    lastUpdated: "2024-01-20T14:45:00Z",
    readTime: "3 min read",
    category: "Success Stories",
    tags: ["success", "covid", "adaptation"],
    businessName: "The Local Bistro",
    businessId: "1",
    isPublished: true,
    isFeatured: true,
    viewCount: 1250,
    seoMetadata: {
      title: "How The Local Bistro Survived COVID",
      description: "Success story of local business adaptation",
      keywords: ["restaurant", "covid", "success"]
    },
    customFields: {}
  },
  {
    id: "2",
    title: "Meet the Chef: Dragon Palace's Secret Family Recipes",
    slug: "dragon-palace-family-recipes",
    excerpt:
      "Chef Wong opens up about the traditional recipes passed down through four generations and how they've adapted them for Melbourne palates.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/dragon-palace-chef.png",
    images: ["/images/blog/dragon-palace-chef.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "5 days ago",
    lastUpdated: "2024-01-19T14:45:00Z",
    readTime: "4 min read",
    category: "Chef Spotlight",
    tags: ["chef", "recipes", "family"],
    businessName: "Dragon Palace",
    businessId: "4",
    isPublished: true,
    isFeatured: false,
    viewCount: 890,
    seoMetadata: {
      title: "Meet the Chef: Dragon Palace's Secret Family Recipes",
      description: "Traditional recipes passed down through generations",
      keywords: ["chef", "chinese", "recipes"]
    },
    customFields: {}
  },
  {
    id: "3",
    title: "Farm to Table: Green Garden Cafe's Sustainability Story",
    slug: "green-garden-farm-to-table",
    excerpt:
      "Discover how this local cafe sources 90% of ingredients from within 50km and their impact on the local farming community.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/green-garden-sustainability.png",
    images: ["/images/blog/green-garden-sustainability.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "1 week ago",
    lastUpdated: "2024-01-18T14:45:00Z",
    readTime: "5 min read",
    category: "Sustainability",
    tags: ["sustainability", "farm-to-table", "local"],
    businessName: "Healthy Harvest Cafe",
    businessId: "7",
    isPublished: true,
    isFeatured: false,
    viewCount: 567,
    seoMetadata: {
      title: "Farm to Table: Sustainability Story",
      description: "Local sourcing and sustainability practices",
      keywords: ["sustainability", "farm-to-table", "local"]
    },
    customFields: {}
  },
  {
    id: "4",
    title: "The Art of Mixology: Behind the Bar at Rooftop Lounge",
    slug: "rooftop-lounge-mixology-secrets",
    excerpt:
      "Master mixologist James Chen reveals the secrets behind the city's most innovative cocktails and the inspiration for his signature drinks.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/rooftop-bar-mixology.png",
    images: ["/images/blog/rooftop-bar-mixology.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "1 week ago",
    lastUpdated: "2024-01-17T14:45:00Z",
    readTime: "4 min read",
    category: "Behind the Scenes",
    tags: ["mixology", "cocktails", "bartender"],
    businessName: "The Crafty Pint",
    businessId: "5",
    isPublished: true,
    isFeatured: false,
    viewCount: 432,
    seoMetadata: {
      title: "The Art of Mixology",
      description: "Behind the scenes with master mixologist",
      keywords: ["mixology", "cocktails", "bar"]
    },
    customFields: {}
  },
  {
    id: "5",
    title: "Rising at Dawn: The Artisan Bakery's Daily Ritual",
    slug: "artisan-bakery-daily-ritual",
    excerpt:
      "Follow baker Maria Santos through her 4 AM routine as she crafts the perfect sourdough and pastries that keep customers coming back.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/artisan-bakery-craft.png",
    images: ["/images/blog/artisan-bakery-craft.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "2 weeks ago",
    lastUpdated: "2024-01-16T14:45:00Z",
    readTime: "6 min read",
    category: "Artisan Craft",
    tags: ["bakery", "artisan", "craft"],
    businessName: "Brew & Bean Cafe",
    businessId: "3",
    isPublished: true,
    isFeatured: false,
    viewCount: 678,
    seoMetadata: {
      title: "Rising at Dawn: Artisan Bakery",
      description: "Daily ritual of artisan baking",
      keywords: ["bakery", "artisan", "sourdough"]
    },
    customFields: {}
  },
  {
    id: "6",
    title: "Mediterranean Traditions in Melbourne: A Family Legacy",
    slug: "mediterranean-traditions-family-legacy",
    excerpt:
      "Three generations of the Rossi family share how they've preserved authentic Mediterranean flavors while embracing Australian influences.",
    content: "Full blog post content here...",
    featuredImage: "/images/blog/mediterranean-traditions.png",
    images: ["/images/blog/mediterranean-traditions.png"],
    author: "Melbourne Eats Team",
    authorId: "1",
    publishDate: "3 weeks ago",
    lastUpdated: "2024-01-15T14:45:00Z",
    readTime: "5 min read",
    category: "Cultural Heritage",
    tags: ["mediterranean", "family", "tradition"],
    businessName: "Mario's Pizza Palace",
    businessId: "2",
    isPublished: true,
    isFeatured: false,
    viewCount: 345,
    seoMetadata: {
      title: "Mediterranean Traditions in Melbourne",
      description: "Family legacy of Mediterranean cuisine",
      keywords: ["mediterranean", "family", "tradition"]
    },
    customFields: {}
  },
]
