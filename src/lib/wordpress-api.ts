// WordPress REST API Client with Mock Data Fallback
// This ensures the site works with or without WordPress backend

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'http://localhost/wp-json'

// Mock data that matches the existing site structure
const MOCK_CATEGORIES = [
  { id: '1', name: 'Restaurants', slug: 'restaurants', icon: 'Utensils', description: 'Local restaurants and dining', business_count: 12 },
  { id: '2', name: 'Cafes', slug: 'cafes', icon: 'Coffee', description: 'Coffee shops and cafes', business_count: 8 },
  { id: '3', name: 'Retail', slug: 'retail', icon: 'ShoppingBag', description: 'Shopping and retail stores', business_count: 15 },
  { id: '4', name: 'Services', slug: 'services', icon: 'Wrench', description: 'Professional services', business_count: 10 },
  { id: '5', name: 'Healthcare', slug: 'healthcare', icon: 'Cross', description: 'Medical and healthcare', business_count: 6 },
  { id: '6', name: 'Beauty', slug: 'beauty', icon: 'Sparkles', description: 'Beauty and wellness', business_count: 4 }
]

const MOCK_BUSINESSES = [
  {
    id: '1',
    name: "Joe's Coffee Shop",
    category_id: '2',
    address: '123 Main St, Melbourne VIC 3000',
    phone: '0312345678',
    website: 'https://joescoffee.com.au',
    email: 'info@joescoffee.com.au',
    description: 'Artisan coffee roasted daily with fresh pastries and light meals. Perfect spot for meetings or casual catch-ups.',
    latitude: -37.8136,
    longitude: 144.9631,
    rating: 4.5,
    review_count: 127,
    hours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '8:00 AM - 4:00 PM',
      sunday: '8:00 AM - 3:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    status: 'active',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Main Street Pizza',
    category_id: '1',
    address: '456 Collins St, Melbourne VIC 3000',
    phone: '0387654321',
    website: 'https://mainstreetpizza.com.au',
    email: 'orders@mainstreetpizza.com.au',
    description: 'Authentic wood-fired pizza with fresh local ingredients. Family-owned restaurant serving Melbourne since 1995.',
    latitude: -37.8142,
    longitude: 144.9632,
    rating: 4.2,
    review_count: 89,
    hours: {},
    photos: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    status: 'active',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Tech Repair Shop',
    category_id: '4',
    address: '789 Bourke St, Melbourne VIC 3000',
    phone: '0398765432',
    website: 'https://techrepair.com.au',
    email: 'support@techrepair.com.au',
    description: 'Professional computer and mobile device repair services. Same-day service available for most repairs.',
    latitude: -37.8140,
    longitude: 144.9633,
    rating: 4.8,
    review_count: 156,
    hours: {},
    photos: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    status: 'active',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Fashion Boutique',
    category_id: '3',
    address: '321 Chapel St, Melbourne VIC 3141',
    phone: '0395551234',
    website: 'https://fashionboutique.com.au',
    email: 'hello@fashionboutique.com.au',
    description: 'Curated collection of contemporary fashion from local and international designers. Personal styling services available.',
    latitude: -37.8200,
    longitude: 144.9900,
    rating: 4.3,
    review_count: 73,
    hours: {},
    photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    status: 'active',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Transform WordPress post to our business format
function transformWordPressBusiness(wpPost: any) {
  return {
    id: wpPost.id.toString(),
    name: wpPost.title.rendered,
    category_id: wpPost.categories[0]?.toString() || '1',
    address: wpPost.acf?.address || '',
    phone: wpPost.acf?.phone || '',
    website: wpPost.acf?.website || '',
    email: wpPost.acf?.email || '',
    description: wpPost.content.rendered.replace(/<[^>]*>/g, ''),
    latitude: wpPost.acf?.latitude || 0,
    longitude: wpPost.acf?.longitude || 0,
    rating: wpPost.acf?.rating || 0,
    review_count: wpPost.acf?.review_count || 0,
    hours: wpPost.acf?.hours || {},
    photos: wpPost.acf?.photos || [],
    status: wpPost.status === 'publish' ? 'active' : 'pending',
    featured: wpPost.acf?.featured || false,
    created_at: wpPost.date,
    updated_at: wpPost.modified
  }
}

export interface SearchParams {
  q?: string
  category?: string
  location?: string
  limit?: number
}

export interface BusinessFilters {
  category?: string
  status?: 'pending' | 'active' | 'inactive'
  featured?: boolean
  limit?: number
}

// API client with WordPress and mock data support
export const apiClient = {
  // Get categories (WordPress or mock)
  async getCategories() {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/categories?per_page=100`)
      if (!response.ok) throw new Error('WordPress API unavailable')
      const wpCategories = await response.json()
      console.log('✅ Using WordPress categories')
      return wpCategories.map((cat: any) => ({
        id: cat.id.toString(),
        name: cat.name,
        slug: cat.slug,
        icon: 'Utensils', // Default icon, could be stored in category meta
        description: cat.description,
        business_count: cat.count
      }))
    } catch (error) {
      console.log('📦 Using mock categories (WordPress unavailable)')
      return MOCK_CATEGORIES
    }
  },

  // Get businesses (WordPress or mock)
  async getBusinesses(filters: BusinessFilters = {}) {
    try {
      const params = new URLSearchParams()
      if (filters.category) params.append('categories', filters.category)
      if (filters.status === 'active') params.append('status', 'publish')
      if (filters.limit) params.append('per_page', filters.limit.toString())
      
      const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/businesses?${params}`)
      if (!response.ok) throw new Error('WordPress API unavailable')
      const wpBusinesses = await response.json()
      
      console.log('✅ Using WordPress businesses')
      let businesses = wpBusinesses.map(transformWordPressBusiness)
      
      if (filters.featured !== undefined) {
        businesses = businesses.filter((b: any) => b.featured === filters.featured)
      }
      
      return businesses
    } catch (error) {
      console.log('📦 Using mock businesses (WordPress unavailable)')
      let businesses = [...MOCK_BUSINESSES]
      
      // Apply filters to mock data
      if (filters.category) {
        businesses = businesses.filter(b => b.category_id === filters.category)
      }
      if (filters.status) {
        businesses = businesses.filter(b => b.status === filters.status)
      }
      if (filters.featured !== undefined) {
        businesses = businesses.filter(b => b.featured === filters.featured)
      }
      
      return businesses
    }
  },

  // Search businesses (WordPress or mock)
  async searchBusinesses(params: SearchParams) {
    try {
      const searchParams = new URLSearchParams()
      if (params.q) searchParams.append('search', params.q)
      if (params.category) searchParams.append('categories', params.category)
      if (params.limit) searchParams.append('per_page', params.limit.toString())

      const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/businesses?${searchParams}`)
      if (!response.ok) throw new Error('WordPress API unavailable')
      const wpBusinesses = await response.json()
      
      console.log('✅ Using WordPress search')
      return wpBusinesses.map(transformWordPressBusiness)
    } catch (error) {
      console.log('📦 Using mock search (WordPress unavailable)')
      let businesses = [...MOCK_BUSINESSES]
      
      if (params.q) {
        const query = params.q.toLowerCase()
        businesses = businesses.filter(b => 
          b.name.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query)
        )
      }
      if (params.category) {
        businesses = businesses.filter(b => b.category_id === params.category)
      }
      
      return businesses
    }
  },

  // Submit new business (WordPress or mock)
  async submitBusiness(business: any) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/businesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: business.name,
          content: business.description,
          status: 'draft', // Pending approval
          categories: [business.category_id],
          acf: {
            address: business.address,
            phone: business.phone,
            website: business.website,
            email: business.email,
            latitude: business.latitude,
            longitude: business.longitude,
            hours: business.hours,
            photos: business.photos
          }
        }),
      })
      
      if (!response.ok) throw new Error('WordPress submission failed')
      console.log('✅ Business submitted to WordPress')
      return await response.json()
    } catch (error) {
      console.log('📦 Mock business submission (WordPress unavailable)')
      return { id: Date.now().toString(), ...business, status: 'pending' }
    }
  }
}

// Export mock data for development/testing
export { MOCK_BUSINESSES, MOCK_CATEGORIES }