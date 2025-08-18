#!/bin/bash

# Database setup script for development
# CURSOR EXTENSION POINT: Customize for your database provider

echo "🚀 Setting up database for Directory Template..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo "Please copy .env.example to .env.local and configure your database URL"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Generating database schema..."
npm run db:generate

echo "🔄 Running database migrations..."
npm run db:migrate

echo "🌱 Seeding database with sample data..."
npm run db:seed

echo "✅ Database setup complete!"
echo "🎉 You can now run 'npm run dev' to start the development server"
echo "📊 Use 'npm run db:studio' to view your database in Drizzle Studio"
