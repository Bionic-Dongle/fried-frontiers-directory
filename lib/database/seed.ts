// Database seeding script with comprehensive sample data
// CURSOR EXTENSION POINT: Customize sample data for your niche

import { getDatabase } from "./connection"
import { users, categories, businesses, reviews, blogPosts, customFields } from "./schema"
import { sampleConfig, sampleBusinesses, sampleBlogPosts } from "@/data/sample-data"

const db = getDatabase()

export async function seedDatabase() {
  console.log("🌱 Starting database seeding...")

  try {
    // Clear existing data (development only)
    if (process.env.NODE_ENV === "development") {
      console.log("🧹 Clearing existing data...")
      await db.delete(reviews)
      await db.delete(blogPosts)
      await db.delete(businesses)
      await db.delete(categories)
      await db.delete(users)
      await db.delete(customFields)
    }

    // Seed users
    console.log("👥 Seeding users...")
    const seedUsers = [
      {
        email: "admin@example.com",
        name: "Admin User",
        role: "admin" as const,
        isActive: true,
      },
      {
        email: "owner@example.com",
        name: "Business Owner",
        role: "business_owner" as const,
        isActive: true,
      },
      {
        email: "user@example.com",
        name: "Regular User",
        role: "user" as const,
        isActive: true,
      },
    ]

    const insertedUsers = await db.insert(users).values(seedUsers).returning()
    console.log(`✅ Inserted ${insertedUsers.length} users`)

    // Seed categories
    console.log("📂 Seeding categories...")
    const seedCategories = sampleConfig.categories.map((cat) => ({
      name: cat.name,
      slug: cat.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      icon: cat.icon,
      description: `Discover the best ${cat.name.toLowerCase()} in your area`,
      isActive: true,
      sortOrder: 0,
    }))

    const insertedCategories = await db.insert(categories).values(seedCategories).returning()
    console.log(`✅ Inserted ${insertedCategories.length} categories`)

    // Create category ID mapping
    const categoryMap = new Map()
    insertedCategories.forEach((cat) => {
      categoryMap.set(cat.name, cat.id)
    })

    // Seed custom fields
    console.log("🔧 Seeding custom fields...")
    const seedCustomFields = [
      {
        name: "Cuisine Type",
        type: "select" as const,
        required: false,
        options: ["Italian", "Chinese", "Japanese", "Mexican", "Indian", "Thai", "French", "American"],
        displayOrder: 1,
        isSearchable: true,
        isFilterable: true,
        entityType: "business" as const,
      },
      {
        name: "Average Meal Price",
        type: "number" as const,
        required: false,
        validation: { min: 5, max: 200, message: "Price must be between $5 and $200" },
        displayOrder: 2,
        isSearchable: false,
        isFilterable: true,
        entityType: "business" as const,
      },
      {
        name: "Booking Required",
        type: "boolean" as const,
        required: false,
        displayOrder: 3,
        isSearchable: false,
        isFilterable: true,
        entityType: "business" as const,
      },
      {
        name: "Dietary Options",
        type: "multiselect" as const,
        required: false,
        options: ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Dairy-Free"],
        displayOrder: 4,
        isSearchable: true,
        isFilterable: true,
        entityType: "business" as const,
      },
    ]

    const insertedCustomFields = await db.insert(customFields).values(seedCustomFields).returning()
    console.log(`✅ Inserted ${insertedCustomFields.length} custom fields`)

    // Seed businesses
    console.log("🏢 Seeding businesses...")
    const seedBusinessesData = sampleBusinesses
      .map((business) => {
        const categoryId = categoryMap.get(business.category)
        if (!categoryId) {
          console.warn(`Category not found for business: ${business.name}`)
          return null
        }

        return {
          name: business.name,
          slug: business.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
          categoryId,
          ownerId: insertedUsers[1].id, // Assign to business owner
          description: business.description,
          shortDescription: business.description?.substring(0, 150) + "...",
          address: business.address,
          phone: business.phone,
          email: business.email,
          website: business.website,
          priceRange: business.priceRange,
          rating: business.rating.toString(),
          reviewCount: business.reviewCount,
          imageUrl: business.imageUrl,
          isActive: true,
          isFeatured: Math.random() > 0.7, // 30% chance of being featured
          isVerified: Math.random() > 0.5, // 50% chance of being verified
          isPremium: Math.random() > 0.8, // 20% chance of being premium
          businessHours: {
            monday: { open: "09:00", close: "22:00", closed: false },
            tuesday: { open: "09:00", close: "22:00", closed: false },
            wednesday: { open: "09:00", close: "22:00", closed: false },
            thursday: { open: "09:00", close: "22:00", closed: false },
            friday: { open: "09:00", close: "23:00", closed: false },
            saturday: { open: "08:00", close: "23:00", closed: false },
            sunday: { open: "08:00", close: "21:00", closed: false },
          },
          socialMedia: {
            facebook: `https://facebook.com/${business.name.toLowerCase().replace(/\s+/g, "")}`,
            instagram: `https://instagram.com/${business.name.toLowerCase().replace(/\s+/g, "")}`,
          },
          customFields: {
            cuisineType: ["Italian", "Chinese", "Japanese", "Mexican", "Indian"][Math.floor(Math.random() * 5)],
            averageMealPrice: Math.floor(Math.random() * 50) + 15,
            bookingRequired: Math.random() > 0.5,
            dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"].filter(() => Math.random() > 0.7),
          },
        }
      })
      .filter(Boolean)

    const insertedBusinesses = await db.insert(businesses).values(seedBusinessesData).returning()
    console.log(`✅ Inserted ${insertedBusinesses.length} businesses`)

    // Seed reviews
    console.log("⭐ Seeding reviews...")
    const seedReviews = []
    for (const business of insertedBusinesses) {
      const numReviews = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < numReviews; i++) {
        seedReviews.push({
          businessId: business.id,
          userId: insertedUsers[2].id, // Regular user
          rating: Math.floor(Math.random() * 5) + 1,
          title: `Great experience at ${business.name}`,
          content: `I had a wonderful time at ${business.name}. The service was excellent and the atmosphere was perfect. Highly recommend!`,
          isVerified: Math.random() > 0.3,
          isHelpful: Math.floor(Math.random() * 10),
          metadata: {
            visitDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            recommendedFor: ["Families", "Couples", "Business"].filter(() => Math.random() > 0.6),
            pros: ["Great food", "Excellent service", "Nice atmosphere"].filter(() => Math.random() > 0.5),
            cons: ["A bit pricey", "Long wait times"].filter(() => Math.random() > 0.8),
          },
        })
      }
    }

    const insertedReviews = await db.insert(reviews).values(seedReviews).returning()
    console.log(`✅ Inserted ${insertedReviews.length} reviews`)

    // Seed blog posts
    console.log("📝 Seeding blog posts...")
    const seedBlogPostsData = sampleBlogPosts.map((post, index) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: `# ${post.title}\n\n${post.excerpt}\n\nThis is a sample blog post content. In a real application, this would contain the full article content with rich formatting, images, and detailed information about the featured business.\n\n## About the Business\n\nThe featured business in this story represents the best of what our local community has to offer. From their commitment to quality to their dedication to customer service, they exemplify the values that make our directory special.\n\n## Community Impact\n\nLocal businesses like this one are the backbone of our community. They provide jobs, support local suppliers, and contribute to the unique character that makes our area special.\n\n## Visit Today\n\nWe encourage you to visit and experience what makes this business special. Support local, and discover the amazing businesses in your neighborhood.`,
      featuredImage: post.featuredImage,
      authorId: insertedUsers[0].id, // Admin user as author
      author: post.author,
      category: post.category,
      tags: ["local business", "community", "featured story"],
      businessId: insertedBusinesses[index % insertedBusinesses.length]?.id,
      businessName: post.businessName,
      readTime: post.readTime,
      isPublished: true,
      isFeatured: index < 3, // First 3 posts are featured
      viewCount: Math.floor(Math.random() * 1000) + 100,
      seoMetadata: {
        title: post.title,
        description: post.excerpt,
        keywords: ["local business", "restaurant", "community", "Melbourne"],
      },
    }))

    const insertedBlogPosts = await db.insert(blogPosts).values(seedBlogPostsData).returning()
    console.log(`✅ Inserted ${insertedBlogPosts.length} blog posts`)

    console.log("🎉 Database seeding completed successfully!")
    console.log(`
📊 Summary:
- Users: ${insertedUsers.length}
- Categories: ${insertedCategories.length}
- Custom Fields: ${insertedCustomFields.length}
- Businesses: ${insertedBusinesses.length}
- Reviews: ${insertedReviews.length}
- Blog Posts: ${insertedBlogPosts.length}
    `)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed")
      process.exit(0)
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error)
      process.exit(1)
    })
}
