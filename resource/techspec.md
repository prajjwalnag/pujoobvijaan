# Pujo Planner - Technical Specification for Replication

## 1. PROJECT STRUCTURE

```
pujo-planner/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── api/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── config/
└── database/
    └── migrations/
```

---

## 2. PAGES & ROUTES

| Route | Component | Features | Auth Required |
|-------|-----------|----------|-----------------|
| `/` | Home/Dashboard | Welcome screen | No |
| `/pandals` | PandalList | Grid/list, filters | No |
| `/map` | MapView | Interactive map, markers | No |
| `/chat` | ChatAssistant | Mooshaka AI | Yes |
| `/itinerary` | ItineraryBuilder | Plan journeys | Yes |
| `/weather` | WeatherInsights | Weather + crowds | Yes |

---

## 3. CORE COMPONENTS

### 3.1 Navigation Bar Component
```jsx
<Header>
  - Logo/Link to home
  - Nav tabs (Pandals, Map, Chat, Itinerary, Weather)
  - Sign In button
  - Mobile hamburger menu
</Header>
```

**Props**: `isAuthenticated: boolean`, `userProfile: User`

### 3.2 Pandal Card Component
```jsx
<PandalCard>
  - PandalImage (placeholder)
  - Title
  - Location badge
  - StarRating component
  - WishlistButton (heart)
  - ThemeBadge (Traditional)
  - CrowdBadge (High/Medium/Low)
  - VisitingHours
  - NearestMetro
  - AccessPoint
  - Description
  - DirectionsButton
</PandalCard>
```

**Props**: 
```javascript
{
  id: string,
  name: string,
  location: string,
  rating: number,
  theme: string,
  crowdLevel: 'high' | 'medium' | 'low',
  visitingHours: { start: string, end: string },
  nearestMetro: { station: string, line: string },
  description: string,
  isWishlisted: boolean,
  onWishlist: function,
  onDirections: function
}
```

### 3.3 Filter Bar Component
```jsx
<FilterBar>
  - RegionDropdown
    - All Regions
    - North Kolkata
    - South Kolkata
    - Central Kolkata
    - East Kolkata
    - West Kolkata
  
  - CrowdLevelDropdown
    - All Crowd Levels
    - High
    - Medium
    - Low
  
  - ViewToggle
    - GridView icon
    - ListView icon
</FilterBar>
```

**Props**: 
```javascript
{
  selectedRegion: string,
  selectedCrowdLevel: string,
  viewMode: 'grid' | 'list',
  onRegionChange: function,
  onCrowdChange: function,
  onViewChange: function
}
```

### 3.4 Pandal Grid Component
```jsx
<PandalGrid>
  - ShowingCounter ("Showing X of X pandals")
  - Grid layout (3 columns on desktop)
  - PandalCard[] (repeated)
  - Responsive breakpoints
    - Desktop: 3 columns
    - Tablet: 2 columns
    - Mobile: 1 column
</PandalGrid>
```

### 3.5 Map Component
```jsx
<MapContainer>
  - Leaflet map instance
  - Map controls (zoom in/out)
  - Sidebar
    - Category toggles
    - Stats display
  - Markers (red pins)
  - Popups on click
</MapContainer>
```

### 3.6 Sidebar Panel Component
```jsx
<MapSidebar>
  - CategoriesToggle
    - Pandals (checkbox + count)
    - Food Stalls (checkbox + count)
    - Itinerary (checkbox + count)
  
  - LocationTools
    - FindMyLocation button
    - RouteBuilder button
  
  - QuickStats
    - Total Pandals
    - High Crowd count
    - Medium Crowd count
    - Low Crowd count
    - Metro Connected count
</MapSidebar>
```

### 3.7 Authentication Gate Component
```jsx
<AuthGate>
  - Icon (Chat/Calendar/Cloud)
  - Title
  - Description message
  - Sign In prompt
</AuthGate>
```

**Used on**: Chat, Itinerary, Weather pages

### 3.8 Footer Component
```jsx
<Footer>
  - Developer credit
  - Social links (Facebook, Instagram)
  - Copyright info
</Footer>
```

---

## 4. DATA MODELS

### 4.1 Pandal Model
```javascript
{
  id: string,
  name: string,
  region: string,
  location: {
    latitude: number,
    longitude: number,
    address: string
  },
  rating: number,
  theme: string, // "Traditional", "Modern", etc.
  crowdLevel: 'high' | 'medium' | 'low',
  visitingHours: {
    open: string, // "12:00 AM"
    close: string // "12:00 PM"
  },
  nearestMetro: {
    station: string,
    line: string
  },
  accessPoints: string[],
  description: string,
  image?: string, // Optional image URL
  createdAt: Date,
  updatedAt: Date,
  tags?: string[]
}
```

### 4.2 User Model
```javascript
{
  id: string,
  email: string,
  name: string,
  avatar?: string,
  authProvider: 'email' | 'google' | 'facebook',
  wishlist: string[], // Array of pandal IDs
  itineraries: string[], // Array of itinerary IDs
  preferences: {
    defaultRegion?: string,
    crowdPreference?: 'high' | 'medium' | 'low'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 4.3 Itinerary Model
```javascript
{
  id: string,
  userId: string,
  title: string,
  pandals: {
    pandalId: string,
    visitOrder: number,
    scheduledTime: string,
    notes?: string
  }[],
  route: {
    startLocation?: { lat: number, lng: number },
    waypoints: { lat: number, lng: number }[],
    optimized: boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 4.4 Rating Model
```javascript
{
  id: string,
  pandalId: string,
  userId: string,
  rating: number, // 1-5
  comment?: string,
  helpful: number, // Upvotes
  createdAt: Date,
  updatedAt: Date
}
```

### 4.5 Weather Model
```javascript
{
  id: string,
  location: string,
  date: Date,
  temperature: number,
  condition: string,
  humidity: number,
  windSpeed: number,
  crowdPrediction: 'high' | 'medium' | 'low',
  recommendation?: string
}
```

---

## 5. API ENDPOINTS

### 5.1 Pandal Endpoints

```
GET /api/pandals
  - Query params: region, crowdLevel, page, limit
  - Returns: Array<Pandal>, total count

GET /api/pandals/:id
  - Returns: Single Pandal with details

GET /api/pandals/search
  - Query params: query
  - Returns: Matching Pandals

GET /api/pandals/by-region/:region
  - Returns: Pandals in specific region

GET /api/pandals/stats
  - Returns: { total, highCrowd, mediumCrowd, lowCrowd, metroConnected }
```

### 5.2 User Endpoints

```
POST /api/auth/login
  - Body: { email, password } or { provider, token }
  - Returns: { user, authToken }

POST /api/auth/logout
  - Returns: { success: true }

GET /api/auth/me
  - Returns: Current user profile

POST /api/auth/google
  - Google OAuth callback
  
POST /api/auth/facebook
  - Facebook OAuth callback

PUT /api/users/:id
  - Body: User update data
  - Returns: Updated user

GET /api/users/:id/wishlist
  - Returns: Array of wishlisted Pandals

POST /api/users/:id/wishlist/:pandalId
  - Returns: Updated wishlist

DELETE /api/users/:id/wishlist/:pandalId
  - Returns: Updated wishlist
```

### 5.3 Itinerary Endpoints

```
GET /api/itineraries
  - Returns: User's itineraries

POST /api/itineraries
  - Body: Itinerary data
  - Returns: Created itinerary

GET /api/itineraries/:id
  - Returns: Single itinerary with details

PUT /api/itineraries/:id
  - Body: Updated itinerary data
  - Returns: Updated itinerary

DELETE /api/itineraries/:id
  - Returns: { success: true }

POST /api/itineraries/:id/optimize
  - Returns: Optimized route (ordered pandals)
```

### 5.4 Chat/AI Endpoints

```
POST /api/chat/message
  - Body: { message, context? }
  - Returns: { response, suggestions[] }

GET /api/chat/history
  - Returns: User's chat history
```

### 5.5 Weather Endpoints

```
GET /api/weather
  - Query params: location, date
  - Returns: Weather data with crowd prediction

GET /api/weather/forecast
  - Returns: 7-day forecast with crowd predictions
```

### 5.6 Directions Endpoints

```
POST /api/directions
  - Body: { origin, destination }
  - Returns: { route, duration, distance }

POST /api/route-builder
  - Body: { waypoints: [{lat, lng}][] }
  - Returns: Optimized route with distances
```

### 5.7 Ratings/Reviews Endpoints

```
POST /api/pandals/:id/ratings
  - Body: { rating, comment }
  - Returns: Created rating

GET /api/pandals/:id/ratings
  - Returns: All ratings for pandal

PUT /api/ratings/:id
  - Body: { rating, comment }
  - Returns: Updated rating

DELETE /api/ratings/:id
  - Returns: { success: true }
```

---

## 6. FRONTEND SERVICES

### 6.1 API Service
```javascript
// src/services/api.js
class ApiService {
  // Pandal methods
  getPandals(filters) {}
  getPandalById(id) {}
  searchPandals(query) {}
  getPandalStats() {}
  
  // Auth methods
  login(credentials) {}
  logout() {}
  getCurrentUser() {}
  
  // Itinerary methods
  getItineraries() {}
  createItinerary(data) {}
  updateItinerary(id, data) {}
  deleteItinerary(id) {}
  optimizeRoute(pandalIds) {}
  
  // Chat methods
  sendChatMessage(message) {}
  getChatHistory() {}
  
  // Weather methods
  getWeather(location, date) {}
  getWeatherForecast(location) {}
  
  // Wishlist methods
  addToWishlist(pandalId) {}
  removeFromWishlist(pandalId) {}
  getWishlist() {}
}
```

### 6.2 Map Service
```javascript
// src/services/mapService.js
class MapService {
  initMap(container, center) {}
  addMarker(location, pandalData) {}
  addMarkers(locations) {}
  clearMarkers() {}
  fitBounds(locations) {}
  getRoute(origin, destination) {}
  optimizeRoute(waypoints) {}
  updateMarkerCluster() {}
}
```

### 6.3 Authentication Service
```javascript
// src/services/authService.js
class AuthService {
  login(email, password) {}
  loginWithGoogle(googleToken) {}
  loginWithFacebook(fbToken) {}
  logout() {}
  isAuthenticated() {}
  getCurrentUser() {}
  refreshToken() {}
  setAuthToken(token) {}
  getAuthToken() {}
}
```

### 6.4 Storage Service
```javascript
// src/services/storageService.js
class StorageService {
  // Local storage for preferences
  setPreference(key, value) {}
  getPreference(key) {}
  removePreference(key) {}
  
  // Session storage for temp data
  setSessionData(key, value) {}
  getSessionData(key) {}
  clearSessionData() {}
}
```

---

## 7. STATE MANAGEMENT

### Using Context API / Redux

```javascript
// State structure
{
  auth: {
    isAuthenticated: boolean,
    user: User | null,
    loading: boolean,
    error: string | null
  },
  
  pandals: {
    items: Pandal[],
    total: number,
    loading: boolean,
    filters: {
      region: string,
      crowdLevel: string,
      page: number,
      limit: number
    },
    error: string | null
  },
  
  map: {
    center: { lat, lng },
    zoom: number,
    markers: Marker[],
    selectedPandal: Pandal | null,
    categoriesVisible: {
      pandals: boolean,
      foodStalls: boolean,
      itinerary: boolean
    }
  },
  
  itinerary: {
    items: Itinerary[],
    current: Itinerary | null,
    loading: boolean,
    error: string | null
  },
  
  ui: {
    viewMode: 'grid' | 'list',
    sidebarOpen: boolean,
    theme: 'light' | 'dark',
    mobileMenuOpen: boolean
  }
}
```

---

## 8. STYLING SYSTEM

### 8.1 CSS Variables (Theme)
```css
:root {
  /* Primary Colors */
  --primary-maroon: #8B0000;
  --primary-dark: #6B0000;
  --primary-light: #A00000;
  
  /* Background Colors */
  --bg-main: #F5F0E8;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #F0EBE3;
  
  /* Text Colors */
  --text-primary: #2D2D2D;
  --text-secondary: #666666;
  --text-light: #999999;
  
  /* Status Colors */
  --status-high: #E84C8A; /* Pink */
  --status-medium: #52B788; /* Green */
  --status-low: #4ECDC4; /* Teal */
  --status-traditional: #F4D35E; /* Yellow */
  
  /* Utilities */
  --shadow-light: 0 2px 8px rgba(0,0,0,0.1);
  --shadow-medium: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-heavy: 0 8px 24px rgba(0,0,0,0.2);
  
  --border-radius: 8px;
  --transition: 0.3s ease;
}
```

### 8.2 Component Styles

**Card Component**
- Rounded corners: 8px
- Box shadow: light shadow
- Padding: 16px
- Border: 1px solid #E0D9CF
- Hover: Lift effect, shadow-medium

**Button Styles**
- Primary: Maroon background, white text
- Secondary: White background, maroon border
- Hover: Color darken, slight scale up
- Active: Darker shade
- Disabled: Gray, reduced opacity

**Badge Styles**
- Padding: 4px 8px
- Border radius: 4px
- Font size: 12px
- Various background colors based on type

---

## 9. RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
@media (min-width: 320px) { /* Mobile */
  .pandal-grid { grid-template-columns: 1fr; }
  .header-nav { flex-direction: column; }
}

@media (min-width: 768px) { /* Tablet */
  .pandal-grid { grid-template-columns: repeat(2, 1fr); }
  .header-nav { flex-direction: row; }
  .sidebar { width: 250px; }
}

@media (min-width: 1024px) { /* Desktop */
  .pandal-grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { width: 300px; }
}

@media (min-width: 1440px) { /* Large Desktop */
  .container { max-width: 1400px; }
  .pandal-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 10. EXTERNAL DEPENDENCIES

### Frontend Libraries
```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "leaflet": "^1.9.0",
  "react-leaflet": "^4.0.0",
  "axios": "^1.3.0",
  "zustand": "^4.3.0", // State management
  "react-query": "^3.39.0",
  "tailwindcss": "^3.0.0",
  "react-icons": "^4.0.0",
  "clsx": "^1.2.0",
  "date-fns": "^2.29.0"
}
```

### Backend Libraries
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.0",
  "helmet": "^7.0.0",
  "express-validator": "^7.0.0",
  "multer": "^1.4.0",
  "nodemailer": "^6.0.0",
  "stripe": "^12.0.0" // Optional for payments
}
```

### External APIs
- **Maps**: Leaflet/OpenStreetMap
- **Directions**: Google Maps API
- **Weather**: OpenWeatherMap API
- **Chat/AI**: OpenAI API (for Mooshaka)
- **Auth**: Google OAuth 2.0, Facebook Login
- **Analytics**: Google Analytics

---

## 11. SECURITY CONSIDERATIONS

### Authentication
- JWT tokens with 24-hour expiration
- Refresh token rotation
- HTTP-only cookies for token storage
- Password hashing with bcryptjs

### API Security
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention (use parameterized queries)
- XSS protection (sanitize inputs)
- CSRF tokens for state-changing operations

### Data Protection
- Encrypt sensitive data in database
- HTTPS only communication
- Helmet.js for security headers
- Secure environment variables

---

## 12. DEPLOYMENT ARCHITECTURE

### Frontend
- **Build**: Next.js or Create React App
- **Hosting**: Vercel, Netlify, or AWS S3 + CloudFront
- **CDN**: CloudFlare or AWS CloudFront
- **Optimization**: Code splitting, lazy loading, compression

### Backend
- **Runtime**: Node.js
- **Hosting**: Heroku, Railway, AWS EC2, or Digital Ocean
- **Database**: MongoDB Atlas or AWS RDS PostgreSQL
- **Caching**: Redis for session/data caching
- **Storage**: AWS S3 for images/media

### DevOps
- **Version Control**: Git (GitHub/GitLab/Bitbucket)
- **CI/CD**: GitHub Actions, GitLab CI, or CircleCI
- **Monitoring**: Sentry for error tracking
- **Logging**: ELK Stack or LogRocket

---

## 13. PERFORMANCE OPTIMIZATION

### Frontend
- Image optimization (lazy loading, WebP format)
- Code splitting per route
- Tree shaking unused code
- Minification and compression
- Service workers for offline support
- Virtual scrolling for large lists

### Backend
- Database indexing
- Query optimization
- API response caching (Redis)
- Pagination for large datasets
- CDN for static assets
- Load balancing

### Monitoring
- Page speed metrics (Core Web Vitals)
- API response times
- Error tracking
- User analytics

---

## 14. DEVELOPMENT WORKFLOW

### Version Control
```
main (production)
├── staging (pre-production)
└── develop (development)
    ├── feature/pandal-filters
    ├── feature/chat-integration
    ├── bug/map-marker-fix
    └── chore/update-dependencies
```

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API testing with Supertest
- **E2E Tests**: Cypress or Playwright
- **Performance Tests**: Lighthouse CI

### Code Quality
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript or PropTypes
- **Pre-commit Hooks**: Husky + lint-staged

---

## 15. MIGRATION & SCALING

### Database Scaling
- Sharding by region
- Read replicas for queries
- Archive old data

### Application Scaling
- Horizontal scaling (multiple instances)
- Load balancing
- Microservices (split into: auth, pandals, itinerary, chat)

### Caching Strategy
- Redis for session data
- Browser caching for static assets
- API response caching
- Database query caching

---

## Conclusion

This technical specification provides a complete blueprint for replicating Pujo Planner. Key components to prioritize:

1. **Phase 1**: Authentication + Pandal listing with filters
2. **Phase 2**: Map integration + route building
3. **Phase 3**: Itinerary creation + optimization
4. **Phase 4**: Chat AI integration
5. **Phase 5**: Weather + real-time insights
6. **Phase 6**: Mobile app (React Native)
7. **Phase 7**: Scaling & performance optimization