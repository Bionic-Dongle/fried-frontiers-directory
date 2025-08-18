# Instructions for Devin

## 🎯 Mission: WordPress Headless Integration

**Goal:** Add WordPress headless CMS capability to the working directory template WITHOUT breaking existing functionality.

## ✅ What's Already Working
- Most pages and navigation links work
- Component structure is solid
- UI/UX is functional

## 🚨 CRITICAL: Don't Break What Works

**Before making ANY changes:**
1. Test the current site thoroughly
2. Document what's working vs what's not
3. Make incremental changes only
4. Test after each change

## 📋 Specific Tasks (In Order)

### 1. Assessment & Documentation
- [ ] Test all existing pages and functionality
- [ ] Document what's working vs broken
- [ ] Identify static data that could come from WordPress
- [ ] Create status report

### 2. WordPress API Layer (Non-Breaking)
- [ ] Add WordPress API client (`src/lib/wordpress-api.ts`)
- [ ] Create WordPress data types that match existing structure
- [ ] Add environment variables for WordPress URL
- [ ] Implement with mock data fallback (so it works without WordPress)

### 3. Gradual Integration
- [ ] Replace ONE data source at a time with WordPress API
- [ ] Test thoroughly after each replacement
- [ ] Keep mock data as fallback
- [ ] Ensure existing UI continues working

### 4. Environment Configuration
- [ ] Add `.env.example` with WordPress URL template
- [ ] Document WordPress setup requirements
- [ ] Test that site works with and without WordPress backend

## 🛡️ Safety Rules

1. **Never break existing functionality**
2. **Always test before and after changes**
3. **Use progressive enhancement** - add WordPress without removing working features
4. **Mock data fallback** - site must work even if WordPress is down
5. **Small incremental changes** - don't rewrite everything at once

## 📁 Key Files to Create

```
src/lib/wordpress-api.ts     // WordPress API client with fallbacks
src/types/wordpress.ts       // WordPress-specific types
.env.example                 // Environment template
docs/WORDPRESS_SETUP.md      // WordPress configuration guide
```

## 🎯 Success Criteria

- All existing functionality continues working
- WordPress integration is optional and additive
- Site works with mock data (for development/demo)
- Site works with WordPress data (for production)
- Easy to deploy to multiple markets
- Business owners can use WordPress admin to manage listings

## 🚫 What NOT to Do

- Don't rewrite the entire application
- Don't break existing navigation or pages
- Don't remove mock/static data entirely
- Don't make WordPress required for basic functionality
- Don't change the overall architecture significantly

**Remember:** This is about adding WordPress as an option, not replacing everything that works!