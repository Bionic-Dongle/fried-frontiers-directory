export interface DirectoryConfig {
  niche: string
  siteName: string
  features: {
    blogSection: boolean
    blogTitle: string
    blogSubtitle: string
  }
  categories: Category[]
  customFields: CustomField[]
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
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
  category: string
  rating: number
  reviewCount: number
  address: string
  priceRange: string
  imageUrl: string
  phone: string
  email: string
  website: string
  description: string
}

export interface DirectoryStats {
  totalBusinesses: number
  totalCategories: number
  totalReviews: number
  averageRating: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  featuredImage: string
  author: string
  publishDate: string
  readTime: string
  category: string
  businessName: string
  slug: string
}

export const sampleConfig: DirectoryConfig = {
  niche: "restaurants",
  siteName: "Melbourne Eats",
  features: {
    blogSection: true,
    blogTitle: "Featured Stories",
    blogSubtitle: "Discover the stories behind your favorite local businesses",
  },
  categories: [
    { id: "fine-dining", name: "Fine Dining", icon: "🍽️", count: 12 },
    { id: "casual-dining", name: "Casual Dining", icon: "🍕", count: 24 },
    { id: "cafes", name: "Cafes", icon: "☕", count: 18 },
    { id: "fast-food", name: "Fast Food", icon: "🍔", count: 15 },
    { id: "asian-cuisine", name: "Asian Cuisine", icon: "🥢", count: 20 },
    { id: "bars-pubs", name: "Bars & Pubs", icon: "🍺", count: 16 },
  ],
  customFields: [],
}

export const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "The Local Bistro",
    category: "Fine Dining", // Matches category name exactly
    rating: 4.8,
    reviewCount: 127,
    address: "123 Collins Street, Melbourne VIC 3000",
    priceRange: "$$$",
    imageUrl: "/images/fine-dining-restaurant.png",
    phone: "+61 3 9123 4567",
    email: "info@localbistro.com.au",
    website: "https://localbistro.com.au",
    description: "An intimate fine dining experience featuring modern Australian cuisine with French influences.",
  },
  {
    id: "2",
    name: "Mario's Pizza Palace",
    category: "Casual Dining", // Matches category name exactly
    rating: 4.5,
    reviewCount: 89,
    address: "456 Brunswick Street, Fitzroy VIC 3065",
    priceRange: "$$",
    imageUrl: "/images/pizza-restaurant.png",
    phone: "+61 3 9876 5432",
    email: "hello@mariospizza.com.au",
    website: "https://mariospizza.com.au",
    description: "Authentic wood-fired pizzas made with fresh, locally sourced ingredients.",
  },
  {
    id: "3",
    name: "Brew & Bean Cafe",
    category: "Cafes", // Matches category name exactly
    rating: 4.6,
    reviewCount: 156,
    address: "789 Chapel Street, South Yarra VIC 3141",
    priceRange: "$",
    imageUrl: "/images/cozy-cafe.png",
    phone: "+61 3 9555 0123",
    email: "info@brewandbean.com.au",
    website: "https://brewandbean.com.au",
    description: "Specialty coffee roasters serving artisanal brews and fresh pastries in a cozy atmosphere.",
  },
  {
    id: "4",
    name: "Dragon Palace",
    category: "Asian Cuisine", // Matches category name exactly
    rating: 4.7,
    reviewCount: 203,
    address: "321 Little Bourke Street, Melbourne VIC 3000",
    priceRange: "$$",
    imageUrl: "/images/asian-restaurant.png",
    phone: "+61 3 9888 7777",
    email: "bookings@dragonpalace.com.au",
    website: "https://dragonpalace.com.au",
    description: "Traditional Cantonese cuisine with modern presentation in the heart of Chinatown.",
  },
  {
    id: "5",
    name: "The Crafty Pint",
    category: "Bars & Pubs", // Matches category name exactly
    rating: 4.4,
    reviewCount: 92,
    address: "654 Smith Street, Collingwood VIC 3066",
    priceRange: "$$",
    imageUrl: "/images/pub-bar.png",
    phone: "+61 3 9777 8888",
    email: "info@craftypint.com.au",
    website: "https://craftypint.com.au",
    description: "Craft beer specialists with rotating taps and hearty pub meals.",
  },
  {
    id: "6",
    name: "Burger Junction",
    category: "Fast Food", // Matches category name exactly
    rating: 4.2,
    reviewCount: 78,
    address: "987 High Street, Prahran VIC 3181",
    priceRange: "$",
    imageUrl: "/images/fine-dining-restaurant.png",
    phone: "+61 3 9444 3333",
    email: "orders@burgerjunction.com.au",
    website: "https://burgerjunction.com.au",
    description: "Gourmet burgers made with premium ingredients and house-made sauces.",
  },
  {
    id: "7",
    name: "Healthy Harvest Cafe",
    category: "Cafes", // Matches category name exactly
    rating: 4.5,
    reviewCount: 134,
    address: "246 Toorak Road, South Yarra VIC 3141",
    priceRange: "$$",
    imageUrl: "/images/healthy-cafe.png",
    phone: "+61 3 9222 1111",
    email: "hello@healthyharvest.com.au",
    website: "https://healthyharvest.com.au",
    description: "Fresh, organic meals and cold-pressed juices for health-conscious diners.",
  },
  {
    id: "8",
    name: "Waterfront Grill",
    category: "Fine Dining", // Matches category name exactly
    rating: 4.9,
    reviewCount: 167,
    address: "1 Southbank Promenade, Southbank VIC 3006",
    priceRange: "$$$$",
    imageUrl: "/images/waterfront-restaurant.png",
    phone: "+61 3 9111 2222",
    email: "reservations@waterfrontgrill.com.au",
    website: "https://waterfrontgrill.com.au",
    description: "Premium steakhouse with stunning river views and an extensive wine list.",
  },
]

// Add the missing directoryStats export
export const directoryStats = {
  totalBusinesses: sampleBusinesses.length,
  totalCategories: sampleConfig.categories.length,
  totalReviews: sampleBusinesses.reduce((sum, business) => sum + business.reviewCount, 0),
  averageRating: (
    sampleBusinesses.reduce((sum, business) => sum + business.rating, 0) / sampleBusinesses.length
  ).toFixed(1),
}

// Blog posts data
export const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How The Local Bistro Survived COVID and Became Stronger",
    excerpt:
      "Behind the scenes with owner Sarah Martinez as she shares the incredible journey of adapting during the pandemic and emerging with a thriving business.",
    featuredImage: "/images/blog/local-bistro-story.png",
    author: "Melbourne Eats Team",
    publishDate: "2 days ago",
    readTime: "3 min read",
    category: "Success Stories",
    businessName: "The Local Bistro",
    slug: "local-bistro-covid-survival-story",
  },
  {
    id: "2",
    title: "Meet the Chef: Dragon Palace's Secret Family Recipes",
    excerpt:
      "Chef Wong opens up about the traditional recipes passed down through four generations and how they've adapted them for Melbourne palates.",
    featuredImage: "/images/blog/dragon-palace-chef.png",
    author: "Melbourne Eats Team",
    publishDate: "5 days ago",
    readTime: "4 min read",
    category: "Chef Spotlight",
    businessName: "Dragon Palace",
    slug: "dragon-palace-family-recipes",
  },
  {
    id: "3",
    title: "Farm to Table: Green Garden Cafe's Sustainability Story",
    excerpt:
      "Discover how this local cafe sources 90% of ingredients from within 50km and their impact on the local farming community.",
    featuredImage: "/images/blog/green-garden-sustainability.png",
    author: "Melbourne Eats Team",
    publishDate: "1 week ago",
    readTime: "5 min read",
    category: "Sustainability",
    businessName: "Healthy Harvest Cafe",
    slug: "green-garden-farm-to-table",
  },
  {
    id: "4",
    title: "The Art of Mixology: Behind the Bar at Rooftop Lounge",
    excerpt:
      "Master mixologist James Chen reveals the secrets behind the city's most innovative cocktails and the inspiration for his signature drinks.",
    featuredImage: "/images/blog/rooftop-bar-mixology.png",
    author: "Melbourne Eats Team",
    publishDate: "1 week ago",
    readTime: "4 min read",
    category: "Behind the Scenes",
    businessName: "The Crafty Pint",
    slug: "rooftop-lounge-mixology-secrets",
  },
  {
    id: "5",
    title: "Rising at Dawn: The Artisan Bakery's Daily Ritual",
    excerpt:
      "Follow baker Maria Santos through her 4 AM routine as she crafts the perfect sourdough and pastries that keep customers coming back.",
    featuredImage: "/images/blog/artisan-bakery-craft.png",
    author: "Melbourne Eats Team",
    publishDate: "2 weeks ago",
    readTime: "6 min read",
    category: "Artisan Craft",
    businessName: "Brew & Bean Cafe",
    slug: "artisan-bakery-daily-ritual",
  },
  {
    id: "6",
    title: "Mediterranean Traditions in Melbourne: A Family Legacy",
    excerpt:
      "Three generations of the Rossi family share how they've preserved authentic Mediterranean flavors while embracing Australian influences.",
    featuredImage: "/images/blog/mediterranean-traditions.png",
    author: "Melbourne Eats Team",
    publishDate: "3 weeks ago",
    readTime: "5 min read",
    category: "Cultural Heritage",
    businessName: "Mario's Pizza Palace",
    slug: "mediterranean-traditions-family-legacy",
  },
]
