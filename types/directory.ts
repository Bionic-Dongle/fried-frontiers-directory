// Core directory types with comprehensive interfaces for Cursor backend integration

export interface DirectoryConfig {
  niche: string
  siteName: string
  categories: Category[]
  customFields: CustomField[]
  features?: {
    blogSection?: boolean // Toggle blog section on/off
    blogTitle?: string // Default: "Featured Stories"
    blogSubtitle?: string // Default: "Discover the stories..."
    reviewSystem?: boolean // Enable/disable reviews
    userAuthentication?: boolean // Enable/disable user auth
    businessClaiming?: boolean // Allow business owners to claim listings
    advancedSearch?: boolean // Enable advanced search features
    mapIntegration?: boolean // Enable map functionality
    socialSharing?: boolean // Enable social media sharing
    multiLanguage?: boolean // Enable multi-language support
  }
  // CURSOR EXTENSION POINT: Add schema-specific configuration
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
  icon: string
  count: number
  description?: string
  parentId?: string // For subcategories
  slug: string
  isActive: boolean
  sortOrder: number
  // CURSOR EXTENSION POINT: Add dynamic category properties
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
  type:
    | "text"
    | "select"
    | "multiselect"
    | "number"
    | "boolean"
    | "date"
    | "url"
    | "email"
    | "phone"
    | "textarea"
    | "file"
  required: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  displayOrder: number
  isSearchable: boolean
  isFilterable: boolean
  // CURSOR EXTENSION POINT: Add validation rules and display options
  conditionalLogic?: {
    showWhen?: {
      fieldId: string
      value: any
    }
  }
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
  images?: string[] // Additional images
  phone?: string
  email?: string
  website?: string
  description?: string
  shortDescription?: string
  // Business status and metadata
  isActive: boolean
  isFeatured: boolean
  isVerified: boolean
  isPremium: boolean
  dateAdded: string
  lastUpdated: string
  viewCount: number
  // Business hours
  businessHours?: {
    [key: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
  // Social media links
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  // SEO and metadata
  seoMetadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  // CURSOR EXTENSION POINT: Dynamic fields from schema
  customFields?: Record<string, any>
  // Owner information
  ownerId?: string
  claimedBy?: string
  claimedAt?: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "business_owner" | "admin" | "moderator"
  isActive: boolean
  dateJoined: string
  lastLogin?: string
  // User preferences
  preferences?: {
    notifications: boolean
    newsletter: boolean
    publicProfile: boolean
  }
  // Business owner specific
  businessIds?: string[] // Businesses they own/manage
  // CURSOR EXTENSION POINT: Add user profile fields
  profile?: {
    bio?: string
    location?: string
    website?: string
    socialMedia?: Record<string, string>
  }
}

export interface Review {
  id: string
  businessId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title?: string
  content: string
  images?: string[]
  dateCreated: string
  dateUpdated?: string
  isVerified: boolean
  isHelpful: number // Helpful votes count
  response?: {
    content: string
    dateCreated: string
    authorName: string // Business owner/manager name
  }
  // CURSOR EXTENSION POINT: Add review metadata
  metadata?: {
    visitDate?: string
    recommendedFor?: string[]
    pros?: string[]
    cons?: string[]
  }
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
  businessName?: string // Related business
  businessId?: string
  isPublished: boolean
  isFeatured: boolean
  viewCount: number
  // SEO metadata
  seoMetadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  // CURSOR EXTENSION POINT: Add blog-specific fields
  customFields?: Record<string, any>
}

// Component Props Interfaces
export interface BusinessCardProps {
  business: Business
  variant?: "featured" | "grid" | "list"
  onSave?: (businessId: string) => void // STUB function
  onShare?: (businessId: string) => void // STUB function
  onView?: (businessId: string) => void // STUB function
  config?: DirectoryConfig // For niche customization
}

export interface SearchBarProps {
  onSearch?: (query: string, location: string) => void // STUB
  suggestions?: string[] // STUB: Will be real autocomplete
  isLoading?: boolean // STUB: Real loading state
  placeholder?: string
  config?: DirectoryConfig // CURSOR EXTENSION POINT
}

export interface FilterSidebarProps {
  categories: Category[]
  customFields?: CustomField[]
  onFilterChange?: (filterType: string, value: any, checked: boolean) => void // STUB
  activeFilters?: Record<string, any> // STUB
  config?: DirectoryConfig // CURSOR EXTENSION POINT: Dynamic filters
}

export interface BlogPostCardProps {
  post: BlogPost
  onRead?: (postId: string) => void // STUB function
  variant?: "featured" | "standard" // Featured = larger
}

export interface BlogSectionProps {
  config?: DirectoryConfig
  posts?: BlogPost[] // STUB: Sample blog data
  onReadPost?: (postId: string) => void // STUB function
  onViewAllPosts?: () => void // STUB function
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchFilters {
  query?: string
  location?: string
  categoryIds?: string[]
  priceRanges?: string[]
  rating?: number
  radius?: number
  customFields?: Record<string, any>
  sortBy?: "rating" | "reviews" | "name" | "distance" | "date"
  sortOrder?: "asc" | "desc"
}

export interface BusinessSearchParams extends SearchFilters {
  page?: number
  limit?: number
  featured?: boolean
  verified?: boolean
}

// Database Schema Interfaces
export interface DatabaseSchema {
  businesses: Business[]
  categories: Category[]
  users: User[]
  reviews: Review[]
  blogPosts: BlogPost[]
  customFields: CustomField[]
  // CURSOR EXTENSION POINT: Add additional tables
  analytics?: {
    id: string
    entityType: "business" | "blog" | "category"
    entityId: string
    eventType: "view" | "click" | "share" | "save"
    userId?: string
    timestamp: string
    metadata?: Record<string, any>
  }[]
}

// Stub Function Types
export type StubFunction<T extends any[] = any[], R = void> = (...args: T) => R | Promise<R>

export interface StubFunctions {
  // Business operations
  searchBusinesses: StubFunction<[BusinessSearchParams], Promise<ApiResponse<Business[]>>>
  getBusinessById: StubFunction<[string], Promise<ApiResponse<Business>>>
  createBusiness: StubFunction<[Omit<Business, "id" | "dateAdded" | "lastUpdated">], Promise<ApiResponse<Business>>>
  updateBusiness: StubFunction<[string, Partial<Business>], Promise<ApiResponse<Business>>>
  deleteBusiness: StubFunction<[string], Promise<ApiResponse<void>>>

  // Category operations
  getCategories: StubFunction<[], Promise<ApiResponse<Category[]>>>
  getCategoryById: StubFunction<[string], Promise<ApiResponse<Category>>>

  // Review operations
  getReviewsByBusinessId: StubFunction<[string], Promise<ApiResponse<Review[]>>>
  createReview: StubFunction<[Omit<Review, "id" | "dateCreated">], Promise<ApiResponse<Review>>>
  updateReview: StubFunction<[string, Partial<Review>], Promise<ApiResponse<Review>>>
  deleteReview: StubFunction<[string], Promise<ApiResponse<void>>>

  // User operations
  getUserById: StubFunction<[string], Promise<ApiResponse<User>>>
  createUser: StubFunction<[Omit<User, "id" | "dateJoined">], Promise<ApiResponse<User>>>
  updateUser: StubFunction<[string, Partial<User>], Promise<ApiResponse<User>>>

  // Blog operations
  getBlogPosts: StubFunction<[{ page?: number; limit?: number; category?: string }], Promise<ApiResponse<BlogPost[]>>>
  getBlogPostBySlug: StubFunction<[string], Promise<ApiResponse<BlogPost>>>
  createBlogPost: StubFunction<[Omit<BlogPost, "id" | "publishDate">], Promise<ApiResponse<BlogPost>>>

  // Analytics operations
  trackEvent: StubFunction<[string, string, string, Record<string, any>?], Promise<void>>
  getAnalytics: StubFunction<[string, string, string?], Promise<ApiResponse<any>>>
}
