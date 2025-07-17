# Strapi Setup Guide for Categories & Listings

## 🎯 Collection Structure

### 1. Categories Collection (already exists)
```json
{
  "name": "Text" (required),
  "slug": "UID" (optional),
  "description": "Text" (optional),
  "image": "Media" (optional)
}
```

### 2. Listings Collection (to create)
```json
{
  "title": "Text" (required),
  "subtitle": "Text" (required),
  "description": "Long Text" (optional),
  "price": "Number" (optional),
  "location": "Text" (optional),
  "featured": "Boolean" (default: false),
  "status": "Enumeration" (active, inactive, pending),
  "image": "Media" (single image),
  "images": "Media" (multiple images),
  "category": "Relation to Categories (Many-to-One)" ⭐ KEY RELATIONSHIP
}
```

## 🔗 Relationship Setup

In Strapi Admin Panel:

1. **Go to Content-Type Builder**
2. **Edit Listings Collection**
3. **Add Relation Field:**
   - Field name: `category`
   - Relation type: `Many-to-One`
   - Target collection: `Categories`
   - This means: Many listings can belong to one category

## 📝 Sample Data

### Categories
```json
[
  {"name": "Restaurant"},
  {"name": "Transport"}, 
  {"name": "Residences"},
  {"name": "Apartments"}
]
```

### Listings
```json
[
  {
    "title": "Luxury Downtown Restaurant",
    "subtitle": "Fine Italian Dining",
    "description": "Experience authentic Italian cuisine...",
    "price": 85,
    "location": "Downtown",
    "featured": true,
    "status": "active",
    "category": "Restaurant", // Link to category
    "image": "upload_restaurant_image.jpg"
  },
  {
    "title": "Quick Taxi Service", 
    "subtitle": "24/7 Available",
    "description": "Fast and reliable transportation...",
    "price": 25,
    "featured": true,
    "status": "active",
    "category": "Transport",
    "image": "upload_taxi_image.jpg"
  }
]
```

## 🚀 API Endpoints

After setup, these endpoints will be available:

```bash
# Get all categories
GET /api/categories

# Get all listings with category info
GET /api/listings?populate=category,image,images

# Get featured listings only
GET /api/listings?populate=category,image,images&filters[featured][$eq]=true

# Get listings by category name
GET /api/listings?populate=category,image,images&filters[category][name][$eq]=Restaurant

# Get listings by category ID
GET /api/listings?populate=category,image,images&filters[category][id][$eq]=2
```

## 🎨 How it Works in the App

1. **HomeTabBar**: Fetches categories from `/api/categories`
2. **HomeMainCarousel**: 
   - Fetches featured listings from `/api/listings` (featured=true)
   - When user selects a category, fetches listings for that category
   - Shows real data from Strapi instead of hardcoded content

3. **Dynamic Content**: 
   - Add new categories in Strapi → They appear in the tab bar
   - Add new listings in Strapi → They appear in the carousel
   - Mark listings as "featured" → They show up in the main carousel

## ✅ Benefits

- ✅ **Dynamic content**: Managed from Strapi admin panel
- ✅ **Real data**: No more hardcoded listings
- ✅ **Proper relationships**: Categories connected to listings
- ✅ **Featured system**: Control which listings appear in carousel
- ✅ **Scalable**: Easy to add new categories and listings
- ✅ **Image support**: Upload real images for listings

## 🛠️ Next Steps

1. Create the Listings collection in Strapi
2. Set up the relationship to Categories
3. Add sample data
4. Test the API endpoints
5. The app will automatically start using real data!
