# API Setup Instructions

## Environment Configuration

Create a `.env.local` file in the frontend directory with the following variables:

```env
# Strapi API Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token-here

# Optional: Override default timeout
NEXT_PUBLIC_API_TIMEOUT=10000
```

## Navigation Data Structure

The navigation expects the following data structure from Strapi:

```json
{
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "name": "Strona główna",
        "link": "/"
      },
      {
        "id": 2,
        "name": "Parafia",
        "link": "/parafia",
        "subItems": [
          {
            "id": 21,
            "name": "Ogłoszenia",
            "link": "/parafia/ogloszenia"
          }
        ]
      }
    ]
  }
}
```

## Available Server Actions

### Navigation
- `getNavigation()` - Get navigation data
- `updateNavigation()` - Update navigation
- `deleteNavigation()` - Delete navigation

### Articles
- `getArticles()` - Get all articles
- `getArticle(id)` - Get single article
- `getArticleBySlug(slug)` - Get article by slug
- `createArticle()` - Create new article
- `updateArticle()` - Update article
- `deleteArticle()` - Delete article
- `getPublishedArticles()` - Get only published articles
- `searchArticles(query)` - Search articles

### Footer
- `getFooter()` - Get footer data
- `updateFooter()` - Update footer
- `deleteFooter()` - Delete footer

### Homepage
- `getHomepage()` - Get homepage data
- `updateHomepage()` - Update homepage
- `deleteHomepage()` - Delete homepage

### Authentication
- `loginUser()` - User login
- `registerUser()` - User registration
- `forgotPassword()` - Password reset request
- `resetPassword()` - Password reset
- `changePassword()` - Change password
- `confirmEmail()` - Email confirmation

### File Upload
- `uploadFiles()` - Upload files
- `getUploadedFiles()` - Get all uploaded files
- `getUploadedFile(id)` - Get specific file
- `deleteUploadedFile(id)` - Delete file

## Usage Examples

### In Server Components
```tsx
import { getNavigation } from '@/lib/server-actions/navigation';

export default async function Page() {
  const result = await getNavigation({
    populate: ['items', 'items.subItems'],
    locale: 'pl'
  });
  
  if (result.error) {
    console.error('Navigation error:', result.error);
    return <div>Error loading navigation</div>;
  }
  
  return <div>{/* Your component */}</div>;
}
```

### In Client Components
```tsx
'use client';

import { NavigationWithData } from '@/components/navigation/NavigationWithData';

export default function MyComponent({ navigationData }) {
  return <NavigationWithData navigationData={navigationData} />;
}
```

## Error Handling

The API layer includes comprehensive error handling:

- `ApiError` - General API errors
- `NetworkError` - Network connectivity issues
- `ValidationError` - Data validation errors
- `NotFoundError` - Resource not found
- `UnauthorizedError` - Authentication required
- `ForbiddenError` - Access denied

## Caching

The API includes automatic caching with Next.js cache tags:

- Articles: `articles`
- Navigation: `navigation`
- Footer: `footer`
- Homepage: `homepage`

Cache is automatically invalidated when data is updated. 