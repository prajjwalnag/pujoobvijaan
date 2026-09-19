# Pujo Planner - Complete Feature Analysis

## Website Overview
**URL:** https://www.pujoplanner.com
**Purpose:** A platform to plan, explore, and navigate Kolkata Durga Puja Pandals
**Target:** Durga Puja celebration enthusiasts in Kolkata
**Year:** 2026

---

## 1. CORE NAVIGATION & STRUCTURE

### Main Navigation Bar (Header)
- **Logo**: "Pujo Planner" branding on the left
- **Navigation Tabs**:
  1. **Pandals** - Main pandal directory
  2. **Map** - Interactive map view
  3. **Chat** - AI Chat assistant (Mooshaka)
  4. **Itinerary** - Trip planning feature
  5. **Weather** - Weather & crowd insights
- **User Authentication**: "Sign In" button in top right
- **Responsive**: Includes mobile-friendly hamburger menu

### Footer
- **Branding**: "Developed with ❤️ by Pujo Planner Team"
- **Social Links**: Facebook and Instagram icons
- **Copyright**: "Copyright © 2026 PujoPlanner"

---

## 2. PANDALS PAGE (Main Feature)

### Display Options
- **Grid View**: Default card-based layout (3 columns)
- **List View**: Alternative list format (toggle button in top right)
- **View Toggle Icons**: Grid icon & list icon

### Filtering System
- **Region Filter**: Dropdown menu
  - "All Regions" option
  - Specific region selections
  
- **Crowd Level Filter**: Dropdown menu
  - "All Crowd Levels" option
  - Individual crowd level options (High, Medium, Low)

### Pandal Card Information
Each pandal card displays:
- **Pandal Name** (Title)
- **Location** (Region - e.g., "North Kolkata")
- **Rating**: Star rating (e.g., 4.5 ⭐)
- **Wishlist Icon**: Heart icon to save/favorite
- **Theme Tags**: 
  - "Traditional" (yellow badge)
  - Crowd level (e.g., "High" in pink, "Medium" in green, "Low" in teal)
- **Visiting Hours**: Time range (e.g., "12:00 AM - 12:00 PM")
- **Nearest Metro**: Station name & line (e.g., "Shyambazar (Blue)")
- **Nearby Access**: Location reference (e.g., "Kolkata Station (Circular)")
- **Description**: Short text about the pandal
- **Directions Button**: Call-to-action button with navigation icon

### Statistics Display
- **Showing Counter**: "Showing X of X pandals"
- **Total Count**: 105 pandals

---

## 3. MAP PAGE (Interactive Feature)

### Map Components
- **Base Map**: Leaflet/OpenStreetMap integration
- **Map Tiles**: Shows Kolkata city layout with roads, landmarks
- **Map Controls**:
  - Zoom in button (+)
  - Zoom out button (-)
  - Attribution: Leaflet © OpenStreetMap contributors

### Location Visualization
- **Pandal Markers**: Red/maroon circular pins with white dots
- **Cluster Markers**: Multiple pins grouped when zoomed out
- **Clickable Pins**: Can click on pandals to see details

### Left Sidebar Panel
- **Category Toggles**: On/off switches for:
  - Pandals (105 total)
  - Food Stalls (3 total)
  - Itinerary (0 total)
  
- **Location Tools**:
  - "Find My Location" button (with GPS icon)
  - "Route Builder" button (with route icon)

- **Quick Stats Section**:
  - Total Pandals: 105
  - High Crowd: 3
  - Medium Crowd: 97
  - Low Crowd: 5
  - Metro Connected: 101

---

## 4. CHAT PAGE (AI Assistant)

### Feature: "Mooshaka Chat Assistant"
- **Purpose**: AI-powered planning assistance for Durga Puja
- **Visual**: Chat icon (speech bubble) in burgundy/maroon color
- **Authentication Required**: Sign-in needed to access
- **Functionality**: 
  - Personalized recommendations
  - Planning assistance
  - Real-time information queries
  - Durga Puja event guidance

### Login Gate Message
- "Sign in to access personalized assistance and chat with Mooshaka for your Durga Puja planning needs"

---

## 5. ITINERARY PAGE (Planning Feature)

### Feature: "Plan Your Pandal Journey"
- **Purpose**: Create and save personalized itineraries
- **Visual**: Calendar icon in burgundy/maroon color
- **Authentication Required**: Sign-in needed
- **Functionality**:
  - Create custom itineraries
  - Save planned routes
  - Personalized journey planning

### Login Gate Message
- "Sign in to create and save personalized itineraries for Durga Puja 2025"

---

## 6. WEATHER PAGE (Real-time Insights)

### Feature: "Weather & Crowd Insights"
- **Purpose**: Real-time conditions and crowd predictions
- **Visual**: Cloud icon in burgundy/maroon color
- **Authentication Required**: Sign-in needed
- **Functionality**:
  - Real-time weather conditions
  - Crowd level predictions
  - Optimal pandal-hopping recommendations

### Login Gate Message
- "Sign in to access real-time weather conditions and crowd insights for optimal pandal hopping during Durga Puja 2025"

---

## 7. AUTHENTICATION SYSTEM

### Sign In Feature
- **Location**: Top right corner of navigation bar
- **Status**: User can sign in/out
- **Integration**: Session management for:
  - Chat access
  - Itinerary saving
  - Wishlist persistence
  - Weather alerts

### Protected Features
- Chat (Mooshaka)
- Itinerary creation/management
- Weather insights
- Personalization features

---

## 8. STYLING & DESIGN SYSTEM

### Color Palette
- **Primary Colors**:
  - Burgundy/Maroon: #8B0000 (navigation highlights, buttons)
  - Cream/Beige: #F5F0E8 (background)
  - White: Cards and content areas
  
- **Secondary Colors**:
  - Yellow: Traditional tag (#F4D35E)
  - Pink/Magenta: High crowd indicator (#E84C8A)
  - Green: Medium crowd indicator (#52B788)
  - Teal: Low crowd indicator (#4ECDC4)

### Typography
- **Headers**: Bold, serif-style fonts
- **Body**: Clean sans-serif
- **Sizes**: Hierarchical sizing for information priority

### Card Design
- **Material Design**: Subtle shadows and rounded corners
- **Padding**: Generous spacing
- **Hover States**: Interactive feedback on elements

---

## 9. ADDITIONAL FEATURES

### Location-Based Features
- **Directions Integration**: Links to navigation (Google Maps/Apple Maps)
- **Nearest Metro Information**: Real-time transit data
- **Route Builder**: Plan routes between pandals

### Social Features
- **Wishlist System**: Save favorite pandals with heart icon
- **Ratings**: User-generated ratings for each pandal
- **Social Sharing**: Links to Facebook and Instagram

### Search & Discovery
- **Multi-filter System**: Region + Crowd level combinations
- **Browse**: Explore all 105 pandals
- **Recommendations**: Based on ratings and crowds

### Mobile Responsiveness
- **Hamburger Menu**: For mobile navigation
- **Responsive Grid**: Adapts to screen size
- **Touch-friendly**: Large tap targets

### Data Integration
- **Real-time Data**: 
  - Crowd levels (updated)
  - Operating hours
  - Metro connectivity
  
- **External APIs**:
  - Maps (Leaflet/OpenStreetMap)
  - Location services
  - Weather APIs (for weather page)

---

## 10. TECHNICAL ARCHITECTURE INDICATORS

### Frontend Stack
- **Framework**: React or Vue.js (SPA architecture)
- **Maps**: Leaflet with OpenStreetMap
- **UI Components**: Custom component library with badges, cards, modals
- **Routing**: Client-side routing for tab navigation

### Backend Services
- **API**: RESTful API for:
  - Pandal data
  - Filtering
  - User management
  - Chat/AI integration
  - Weather data

### Database
- **Structure**: Likely contains:
  - Pandal information
  - User profiles
  - Wishlist/favorites
  - Ratings and reviews

### AI Integration
- **Mooshaka Chat Bot**: Likely powered by Claude or similar LLM
- **Natural language processing** for queries
- **Context-aware recommendations**

---

## 11. KEY METRICS & DATA

### Pandal Directory
- **Total Pandals**: 105
- **Regions Represented**: North Kolkata (primary), likely others
- **Crowd Distribution**:
  - High Crowd: 3 pandals
  - Medium Crowd: 97 pandals
  - Low Crowd: 5 pandals
  
- **Metro Connectivity**: 101 out of 105 pandals

### Operating Hours
- **Typical**: 12:00 AM - 12:00 PM (consistent across shown pandals)
- **May vary**: Different pandals have different hour patterns

---

## 12. USER JOURNEY FLOWS

### Anonymous User Flow
1. Land on home page
2. Browse Pandals (no filters)
3. View Map
4. See sign-in prompts for Chat, Itinerary, Weather
5. Sign in or continue as guest

### Authenticated User Flow
1. Sign in via email/social
2. Access full features (Chat, Itinerary, Weather)
3. Create personalized itinerary
4. Chat with Mooshaka for recommendations
5. Check weather and crowd insights
6. Get real-time navigation

### Exploration Flow
1. View all 105 pandals
2. Filter by region and crowd level
3. Click on pandal for details
4. Get directions
5. Add to itinerary or wishlist

### Planning Flow
1. Use Itinerary page
2. Add selected pandals
3. Optimize route with Route Builder
4. Check weather conditions
5. Get crowd predictions
6. Navigate with directions

---

## 13. FEATURE SUMMARY FOR REPLICATION

### Must-Have Features
✅ Pandal directory with 105+ listings
✅ Multi-filter system (region, crowd level)
✅ Grid/List view toggle
✅ Interactive map with markers
✅ User authentication system
✅ Rating system
✅ Wishlist/favorites
✅ Responsive design

### Should-Have Features
✅ AI Chat Assistant (Mooshaka)
✅ Itinerary builder
✅ Weather integration
✅ Route builder
✅ Crowd level predictions
✅ Metro connectivity info
✅ Directions integration

### Nice-to-Have Features
✅ Social media integration
✅ Real-time data updates
✅ User reviews/comments
✅ Photo gallery per pandal
✅ Estimated visit time
✅ Event notifications
✅ Dark mode toggle

---

## 14. DEPENDENCIES & INTEGRATIONS

- **Maps Library**: Leaflet + OpenStreetMap
- **Authentication**: OAuth (likely Google/Facebook)
- **AI/Chat**: LLM API integration
- **Weather**: Weather API service
- **Directions**: Google Maps API or similar
- **Hosting**: Cloud infrastructure (likely AWS/Vercel)
- **Database**: PostgreSQL or MongoDB
- **Real-time**: WebSocket for live updates

---

## Conclusion

Pujo Planner is a comprehensive, feature-rich event planning platform that combines:
- **Information Architecture**: Well-organized pandal directory
- **Interactive Tools**: Map-based exploration and route planning
- **Personalization**: AI-powered chat and custom itineraries
- **Real-time Data**: Weather and crowd insights
- **Mobile-first Design**: Responsive and touch-optimized

All features work together to create a seamless experience for exploring and planning Durga Puja celebrations in Kolkata.