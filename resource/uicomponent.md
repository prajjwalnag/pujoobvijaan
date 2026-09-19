# Pujo Planner - UI Components & Design System

## 1. DESIGN PRINCIPLES

### Visual Hierarchy
- Large headings for page titles (32px)
- Medium headings for sections (24px)
- Body text for content (14-16px)
- Labels for inputs (12px)

### Spacing System
- Baseline: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px

### Color Theory
- **Warm neutrals** (cream/beige) for backgrounds
- **Bold maroon** for primary actions and highlights
- **Pastel badges** for status indicators
- **High contrast** for accessibility (WCAG AA standard)

---

## 2. COMPONENT LIBRARY

### 2.1 Header Component

**Component Name**: `<Header />`

**Location**: Top of all pages

**Layout**:
```
[Logo]  [Nav Tabs.......................] [Sign In]
```

**Props**:
```javascript
{
  isAuthenticated: boolean,
  user?: User,
  onSignIn: function,
  onSignOut: function,
  currentPage: string
}
```

**Sub-Components**:
- Logo/Brand
- Navigation Bar
  - Each nav item is a Link
  - Active state (bold, maroon underline)
  - Icon + Label
- User Avatar (if authenticated)
- Sign In Button

**Styling**:
- Background: Cream (#F5F0E8)
- Height: 64px
- Sticky position
- Box shadow: light
- Responsive: Hamburger menu on mobile

**Responsive**:
- Desktop: Horizontal layout
- Mobile: Hamburger menu reveals vertical tabs

---

### 2.2 Navigation Tab Component

**Component Name**: `<NavTab />`

**Usage**: Used within Header

**Props**:
```javascript
{
  label: string,
  icon: ReactNode,
  href: string,
  isActive: boolean,
  onClick?: function
}
```

**States**:
- **Default**: Gray text, icon
- **Active**: Maroon text, bold, underline
- **Hover**: Maroon color, scale 1.05
- **Mobile**: Full width, larger padding

**Styling**:
- Padding: 8px 12px
- Font weight: 500 (normal), 700 (active)
- Color: #666 (default), #8B0000 (active)
- Border bottom: 3px maroon when active
- Transition: 0.3s ease

---

### 2.3 Button Components

#### Primary Button
```javascript
<Button variant="primary" size="md" onClick={handleClick}>
  Action Label
</Button>
```

**Styling**:
- Background: #8B0000
- Color: White
- Padding: 8px 16px (sm), 12px 24px (md), 16px 32px (lg)
- Border radius: 8px
- Font weight: 600
- Cursor: pointer

**States**:
- Default: Solid maroon
- Hover: #6B0000, shadow-medium, scale 1.02
- Active: #5B0000
- Disabled: Gray, opacity 0.5
- Loading: Spinner animation

#### Secondary Button
```javascript
<Button variant="secondary" size="md">
  Optional Action
</Button>
```

**Styling**:
- Background: Transparent
- Border: 2px solid #8B0000
- Color: #8B0000
- Same padding as primary

#### Text Button
```javascript
<Button variant="text">
  Simple Link
</Button>
```

**Styling**:
- Background: Transparent
- Border: None
- Color: #8B0000
- Underline on hover

---

### 2.4 Filter Dropdown Component

**Component Name**: `<FilterDropdown />`

**Usage**: Region and Crowd Level filters

**Props**:
```javascript
{
  label: string,
  options: { value: string, label: string }[],
  selectedValue: string,
  onChange: function,
  placeholder?: string
}
```

**Structure**:
```
[Label ▼]
└─ Dropdown Menu
   ├─ All [Label]
   ├─ Option 1
   ├─ Option 2
   └─ Option 3
```

**Styling**:
- Background: White
- Border: 1px solid #E0D9CF
- Border radius: 8px
- Padding: 8px 12px
- Height: 40px
- Font size: 14px

**States**:
- Default: Gray text
- Focus: Maroon border (2px)
- Open: Dropdown visible
- Selected: Check mark next to option

---

### 2.5 Badge Component

**Component Name**: `<Badge />`

**Usage**: Theme tags, crowd levels, status indicators

**Props**:
```javascript
{
  variant: 'theme' | 'crowd' | 'status',
  label: string,
  size?: 'sm' | 'md' | 'lg'
}
```

**Variants**:

| Variant | Background | Color | Example |
|---------|-----------|-------|---------|
| Theme | #F4D35E | #2D2D2D | Traditional |
| High Crowd | #E84C8A | White | High |
| Medium Crowd | #52B788 | White | Medium |
| Low Crowd | #4ECDC4 | White | Low |

**Styling**:
- Padding: 4px 8px (sm), 6px 12px (md), 8px 16px (lg)
- Border radius: 4px
- Font size: 12px (sm), 13px (md), 14px (lg)
- Font weight: 500
- Display: inline-block

---

### 2.6 Card Component

**Component Name**: `<Card />`

**Usage**: Pandal cards, itinerary items

**Props**:
```javascript
{
  children: ReactNode,
  clickable?: boolean,
  onClick?: function,
  variant?: 'default' | 'elevated',
  padding?: 'sm' | 'md' | 'lg'
}
```

**Styling**:
- Background: White (#FFFFFF)
- Border: 1px solid #E0D9CF
- Border radius: 8px
- Padding: 12px (sm), 16px (md), 24px (lg)
- Box shadow: light
- Transition: 0.3s ease

**States**:
- Default: Static
- Hover (clickable): Shadow upgrade, scale 1.02
- Focus: Maroon border (2px)

---

### 2.7 Pandal Card Component

**Component Name**: `<PandalCard />`

**Purpose**: Display individual pandal information

**Layout**:
```
┌─────────────────────────────┐
│ ⭐ 4.5          ♥          │
│ Hatibagan Sarbojanin        │
│ North Kolkata               │
│ Traditional    High         │
│ 🕐 12:00 AM - 12:00 PM      │
│ 🚇 Shyambazar (Blue)        │
│ 🏠 Kolkata Station          │
│ Description text...         │
│ → Directions →              │
└─────────────────────────────┘
```

**Props**:
```javascript
{
  pandal: {
    id: string,
    name: string,
    location: string,
    rating: number,
    theme: string,
    crowdLevel: string,
    visitingHours: { start, end },
    nearestMetro: { station, line },
    description: string
  },
  isWishlisted: boolean,
  onWishlist: function,
  onDirections: function
}
```

**Sub-Components**:
- Rating display (star + number)
- Wishlist button (heart icon)
- Title (heading)
- Location label
- Theme badge
- Crowd badge
- Visiting hours (clock icon + time)
- Metro info (train icon + station)
- Access point (location icon + name)
- Description text
- Directions button

**Styling**:
- Width: Auto (responsive)
- Min height: 280px
- Border radius: 8px
- Box shadow: light
- Hover: shadow-medium, lift up

---

### 2.8 Rating Display Component

**Component Name**: `<RatingDisplay />`

**Props**:
```javascript
{
  rating: number, // 0-5
  count?: number,
  size?: 'sm' | 'md' | 'lg'
}
```

**Display**:
- 5 stars (filled, partial, empty)
- Rating number (e.g., "4.5")
- Optional count in parentheses

**Styling**:
- Star color: #FFB700 (gold)
- Text color: #2D2D2D
- Size: Scales with 'size' prop

---

### 2.9 Icon Button Component

**Component Name**: `<IconButton />`

**Props**:
```javascript
{
  icon: ReactNode,
  onClick: function,
  label?: string,
  size?: 'sm' | 'md' | 'lg',
  variant?: 'primary' | 'secondary' | 'danger'
}
```

**Examples**:
- Heart (wishlist)
- Menu (hamburger)
- Map (directions)
- Close (modal dismiss)

**Styling**:
- Background: Transparent (default) or colored
- Width/Height: Equal (square)
- Border radius: 50% (circular) or 8px (rounded)
- Padding: 8px (sm), 12px (md), 16px (lg)
- Cursor: pointer

**States**:
- Default: Gray
- Hover: Maroon, scale 1.1
- Active/Selected: Filled, maroon

---

### 2.10 Input Components

#### Text Input
```javascript
<TextInput 
  placeholder="Enter search..."
  value={value}
  onChange={handleChange}
  type="text"
/>
```

**Styling**:
- Border: 1px solid #E0D9CF
- Border radius: 8px
- Padding: 8px 12px
- Height: 40px
- Font size: 14px
- Focus: Maroon border (2px)

#### Search Input
```javascript
<SearchInput 
  placeholder="Search pandals..."
  onSearch={handleSearch}
/>
```

**Special Features**:
- Search icon on left
- Clear button (X) on right
- Suggestions dropdown (optional)

---

### 2.11 Map Component

**Component Name**: `<PujoMap />`

**Props**:
```javascript
{
  center: { lat: number, lng: number },
  zoom: number,
  markers: Marker[],
  onMarkerClick: function,
  showSidebar: boolean,
  categories: { pandals, foodStalls, itinerary }
}
```

**Features**:
- Leaflet-based interactive map
- Zoom in/out controls
- Marker clustering
- Custom marker icons
- Info popups on marker click
- Sidebar on left

**Marker Styling**:
- Default pandal marker: Red/maroon pin
- Selected marker: Highlighted, larger
- Cluster marker: Number badge

---

### 2.12 Map Sidebar Component

**Component Name**: `<MapSidebar />`

**Layout**:
```
┌──────────────────┐
│ Categories       │
├──────────────────┤
│ ☑ Pandals (105)  │
│ ☐ Food Stalls(3) │
│ ☐ Itinerary (0)  │
├──────────────────┤
│ Tools            │
├──────────────────┤
│ 📍 Find Location │
│ → Route Builder  │
├──────────────────┤
│ Quick Stats      │
├──────────────────┤
│ Total: 105       │
│ High: 3          │
│ Medium: 97       │
│ Low: 5           │
│ Metro: 101       │
└──────────────────┘
```

**Props**:
```javascript
{
  categories: {
    pandals: { visible: boolean, count: number },
    foodStalls: { visible: boolean, count: number },
    itinerary: { visible: boolean, count: number }
  },
  stats: {
    total: number,
    highCrowd: number,
    mediumCrowd: number,
    lowCrowd: number,
    metroConnected: number
  },
  onCategoryToggle: function,
  onFindLocation: function,
  onRouteBuilder: function
}
```

**Styling**:
- Background: Cream (#F5F0E8)
- Width: 280px (desktop), 100% (mobile)
- Padding: 16px
- Border right: 1px solid #E0D9CF

---

### 2.13 Modal/Dialog Component

**Component Name**: `<Modal />`

**Props**:
```javascript
{
  isOpen: boolean,
  onClose: function,
  title: string,
  children: ReactNode,
  footer?: ReactNode,
  size?: 'sm' | 'md' | 'lg'
}
```

**Features**:
- Overlay backdrop
- Centered on screen
- Close button (X) in top right
- Keyboard close (ESC)
- Responsive sizing

**Styling**:
- Background: White
- Border radius: 8px
- Box shadow: heavy
- Max width: 90vw
- Max height: 90vh

---

### 2.14 Loading Spinner Component

**Component Name**: `<Spinner />`

**Props**:
```javascript
{
  size?: 'sm' | 'md' | 'lg',
  color?: string // Default: maroon
}
```

**Animation**:
- Rotating circular spinner
- 1-second rotation cycle

---

### 2.15 Notification/Toast Component

**Component Name**: `<Toast />`

**Types**:
- Success (green)
- Error (red)
- Warning (orange)
- Info (blue)

**Auto-dismiss**: 3-5 seconds

**Positioning**: Top-right corner

---

### 2.16 Pagination Component

**Component Name**: `<Pagination />`

**Props**:
```javascript
{
  currentPage: number,
  totalPages: number,
  onPageChange: function
}
```

**Display**:
```
< 1 2 3 4 5 ... 20 >
```

---

## 3. FORM COMPONENTS

### 3.1 Form Container
```javascript
<Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label>Email</Label>
    <TextInput type="email" />
  </FormGroup>
  <Button type="submit">Submit</Button>
</Form>
```

### 3.2 Form Validation
- Real-time validation
- Error messages below inputs
- Red border on error
- Green checkmark on success

---

## 4. LAYOUT COMPONENTS

### 4.1 Page Container
```javascript
<PageContainer maxWidth="lg">
  {children}
</PageContainer>
```

### 4.2 Grid Layout
```javascript
<Grid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
  {items.map(item => <GridItem key={item.id}>{item}</GridItem>)}
</Grid>
```

### 4.3 Flex Layout
```javascript
<Flex direction="row" justify="space-between" align="center">
  {children}
</Flex>
```

---

## 5. TYPOGRAPHY COMPONENTS

### Heading Levels
```javascript
<H1>Page Title</H1>
<H2>Section Title</H2>
<H3>Subsection</H3>
<H4>Minor Heading</H4>

<P>Body text paragraph</P>
<Small>Small text</Small>
<Label>Input label</Label>
```

### Text Styles
- **Bold**: `<Strong>text</Strong>`
- **Italic**: `<Em>text</Em>`
- **Code**: `<Code>code snippet</Code>`

---

## 6. SPACING UTILITIES

### Margin Classes
- `m-0` to `m-32` (multiples of 4px)
- `mt`, `mr`, `mb`, `ml` for individual sides
- `mx` (horizontal), `my` (vertical)

### Padding Classes
- `p-0` to `p-32`
- `pt`, `pr`, `pb`, `pl` for individual sides

### Gap Classes (for flex/grid)
- `gap-0` to `gap-32`

---

## 7. ACCESSIBILITY FEATURES

### Color Contrast
- All text meets WCAG AA standard
- Additional indicators (icons, patterns)

### Focus States
- Visible outline (maroon, 2px)
- Keyboard navigation support

### Semantic HTML
- `<button>` for buttons
- `<a>` for links
- Proper heading hierarchy
- `<label>` associated with inputs

### Screen Reader Support
- ARIA labels where needed
- Alt text for images
- Semantic section landmarks

---

## 8. ANIMATION GUIDELINES

### Transitions
- Default: 0.3s ease
- Quick interactions: 0.2s
- Page transitions: 0.4s ease-in-out

### Hover Effects
- Subtle scale: 1.02x
- Shadow elevation
- Color shift

### Loading States
- Spinner animation
- Progress bar
- Skeleton loading (card placeholders)

---

## 9. RESPONSIVE GRID SYSTEM

### Breakpoints
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px - 1439px
- Large: 1440px+

### Grid Columns
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns

### Container Max Width
- Tablet: 100%
- Desktop: 1024px
- Large: 1280px

---

## 10. DARK MODE SUPPORT

### Color Variables (Dark Mode)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-main: #1A1A1A;
    --bg-secondary: #2D2D2D;
    --text-primary: #F0F0F0;
    --text-secondary: #B0B0B0;
  }
}
```

### Component Adaptations
- Background colors invert
- Text colors increase contrast
- Borders become lighter

---

## 11. COMPONENT EXPORT LIST

```javascript
// Layout
export { Header, Footer, Sidebar, PageContainer, Grid, Flex }

// Navigation
export { NavTab, Breadcrumb, Pagination }

// Input
export { TextInput, SearchInput, FilterDropdown, Checkbox, RadioButton }

// Display
export { Card, PandalCard, Badge, RatingDisplay, Icon }

// Action
export { Button, IconButton, Link }

// Feedback
export { Modal, Toast, Spinner, ProgressBar }

// Forms
export { Form, FormGroup, Label, FormError }

// Typography
export { H1, H2, H3, H4, P, Small, Label, Code }

// Utilities
export { Spacer, Divider }
```

---

## 12. DESIGN TOKENS REFERENCE

### Color Palette Export
```javascript
const colors = {
  primary: {
    maroon: '#8B0000',
    dark: '#6B0000',
    light: '#A00000'
  },
  neutral: {
    white: '#FFFFFF',
    cream: '#F5F0E8',
    gray: '#666666',
    darkGray: '#2D2D2D'
  },
  status: {
    success: '#52B788',
    warning: '#FFB700',
    error: '#E84C8A',
    info: '#4ECDC4'
  }
}
```

### Typography Export
```javascript
const typography = {
  heading1: { fontSize: '32px', fontWeight: 700, lineHeight: 1.2 },
  heading2: { fontSize: '24px', fontWeight: 700, lineHeight: 1.3 },
  heading3: { fontSize: '20px', fontWeight: 600, lineHeight: 1.4 },
  body: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5 },
  label: { fontSize: '12px', fontWeight: 500, lineHeight: 1.6 }
}
```

### Spacing Export
```javascript
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
}
```

---

## 13. STORYBOOK SETUP

### Installation
```bash
npx sb init
```

### Example Story
```javascript
// PandalCard.stories.jsx
import PandalCard from './PandalCard'

export default {
  component: PandalCard,
  title: 'Components/PandalCard',
  tags: ['autodocs']
}

export const Default = {
  args: {
    pandal: {
      id: '1',
      name: 'Hatibagan Sarbojanin',
      rating: 4.5,
      // ... other props
    }
  }
}

export const WishlitedState = {
  args: {
    ...Default.args,
    isWishlisted: true
  }
}
```

---

## Conclusion

This comprehensive component library and design system ensures:
- **Consistency**: All UI elements follow design rules
- **Scalability**: Components are reusable and composable
- **Maintainability**: Centralized design tokens and patterns
- **Accessibility**: Built-in WCAG compliance
- **Developer Experience**: Clear props, documentation, and examples

Use this as your single source of truth for UI implementation.