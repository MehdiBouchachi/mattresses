# E-Commerce Admin Dashboard - Complete Development Prompt

## Project Overview

Build a comprehensive, mobile-first React admin dashboard for managing an e-commerce mattress store. The dashboard must integrate with Supabase backend and strictly follow the existing data structure from the main e-commerce application.

## 🚀 IMPORTANT: Development Approach

**Phase 1 - UI/UX FIRST (Current Phase):**

- Build the complete dashboard layout and all components WITHOUT backend integration
- Use MOCK DATA for all features (products, orders, categories, etc.)
- Focus on responsive design, dark/light mode, and component architecture
- Create reusable components and complete UI flows
- Test all interactions with dummy data

**Phase 2 - Backend Integration (Later):**

- Once UI is complete and approved, integrate Supabase
- Replace mock data with actual API calls
- Implement authentication and security

**For now, skip the Supabase setup and focus entirely on building a beautiful, functional UI with mock data.**

---

## Core Technologies

### Required Stack

- **Frontend Framework**: React 18+ with JavaScript (NO TypeScript)
- **Styling**: Tailwind CSS (use Tailwind color classes only - NO rgba or hex colors)
- **Backend**: Supabase (authentication, database, storage)
- **State Management**: React Context API or Redux Toolkit
- **Routing**: React Router DOM
- **UI Components**: Build reusable, well-engineered components from scratch
- **Icons**: react-icons library
- **Theme**: Dark mode and Light mode implementation

---

## Critical Requirements

### 1. Data Structure Compliance (VERY IMPORTANT)

The dashboard MUST respect the exact data structure used in the e-commerce website. Any deviation will cause conflicts.

#### Categories Structure

```javascript
{
  value: "classic",  // Unique identifier
  translations: {
    en: "Classic Range",
    fr: "Gamme Classique",
    ar: "الفئة الكلاسيكية"
  },
  subcategories: [
    {
      value: "roll",
      translations: {
        en: "Roll Packed",
        fr: "Roulé",
        ar: "ملفوفة"
      },
      types: [  // Optional - not all subcategories have types
        {
          value: "d30",
          translations: {
            en: "D30",
            fr: "D30",
            ar: "D30"
          }
        }
      ]
    }
  ]
}
```

#### Products Structure

```javascript
{
  id: 1,                    // Unique product ID
  slug: "classic-open",     // URL-friendly identifier
  name: "Matelas Classique (Ouvert)",  // Product name
  description: "Classic open foam mattress...",  // Product description

  // Category mapping
  category: "classic",      // Must match category.value
  subcategory: "open",      // Must match subcategory.value

  // Availability & promotion
  available: true,          // Boolean
  featured: false,          // Boolean (shows on homepage)
  discount: 0,              // Percentage (0-100)

  // Media
  images: [                 // Array of image paths
    "/images/classic/classic-D30-5.jpeg",
    "/images/classic/classic-D36-1.jpeg"
  ],

  // Detailed specifications
  details: {
    thickness: 22,          // Default thickness
    firmness: 8,            // Firmness level (1-10)

    // Optional - only for products with density selection
    densities: [
      { value: "D30", label: "D30 High-density foam" },
      { value: "D36", label: "D36 Reinforced foam" }
    ],

    // Dimensions and pricing
    dimensions: [
      {
        size: "90 x 190",   // Size identifier
        options: [          // Variants for this size
          {
            density: "D30",      // Optional - only if densities exist
            thickness: 20,       // Thickness in cm
            price: 14500        // Price in currency
          },
          {
            density: "D36",
            thickness: 20,
            price: 17500
          }
        ]
      }
    ],

    // Marketing content (arrays of strings)
    whyChoose: [
      "Soutien ferme recommandé...",
      "Disponible en D30..."
    ],

    technicalSpecs: [
      { label: "Type de mousse", value: "Mousse polyuréthane..." },
      { label: "Densité", value: "D30 (30 kg/m³)" }
    ],

    advantages: [
      "Choice between D30 and D36",
      "Stable structure"
    ],

    faq: []  // Array of { question: string, answer: string }
  }
}
```

#### Orders Structure

```javascript
{
  orderId: "LTM-123456",           // Format: LTM-XXXXXX
  createdAt: "2026-03-09T10:30:00Z",  // ISO timestamp

  customer: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",     // Optional
    phone: "+213555123456"
  },

  shipping: {
    wilaya: "Alger",               // Province
    city: "Bab Ezzouar",           // City
    street: "123 Rue Example",     // Street address
    mapLink: "https://maps.google.com/..."  // Optional
  },

  payment: {
    method: "cash_on_delivery",    // Payment method
    status: "pending"              // pending | confirmed | paid
  },

  items: [                         // Cart items
    {
      productId: 1,
      name: "Matelas Classique",
      size: "90 x 190",
      thickness: 20,
      density: "D30",              // Optional - null if not applicable
      price: 14500,
      quantity: 2,
      subtotal: 29000
    }
  ],

  summary: {
    itemsCount: 1,                 // Number of unique products
    totalQuantity: 2,              // Total quantity of all items
    totalPrice: 29000              // Total order value
  },

  status: "new"                    // new | processing | shipped | delivered | cancelled
}
```

---

## 2. Multi-Language Support (AR / FR / EN)

### Implementation Requirements

- **All text inputs must support three languages**: Arabic, French, English
- Each translatable field should have THREE input fields side by side or in tabs
- Field structure:
  ```javascript
  {
    en: "English text",
    fr: "Texte français",
    ar: "النص العربي"
  }
  ```

### Input Layout Example

```
Category Name:
[ English ] [ Français ] [ العربية ]
```

### RTL Support

- Arabic inputs should display RTL automatically
- Use `dir="rtl"` for Arabic text areas
- Ensure proper text alignment for each language

---

## 3. Dashboard Features & Pages

### Authentication

- **Login Page**
  - Email/password authentication via Supabase Auth
  - Remember me option
  - Password reset link
  - Mobile-optimized login form
- **Protected Routes**
  - All dashboard routes require authentication
  - Redirect to login if not authenticated
  - Session persistence

### Dashboard Layout

- **Sidebar Navigation** (collapsible on mobile)
  - Dashboard Overview
  - Products Management
  - Categories Management
  - Orders Management
  - Discounts & Promotions
  - Meta Pixel Settings
  - Settings
- **Top Bar**
  - Hamburger menu (mobile)
  - User profile dropdown
  - Dark/Light mode toggle
  - Logout button
- **Mobile Navigation**
  - Bottom navigation bar on mobile
  - Slide-in sidebar for detailed navigation

---

### Page 1: Dashboard Overview

**Route**: `/dashboard`

**Features**:

- **Key Metrics Cards**
  - Total Orders (today, this week, this month)
  - Total Revenue
  - New Orders (pending)
  - Total Products
  - Low Stock Alerts
- **Recent Orders Table**
  - Last 10 orders
  - Quick status update
  - View details button
- **Quick Stats**
  - Top selling products (this week)
  - Order status distribution (pie chart)
  - Revenue trend (line chart - last 7 days)

**Mock Data** (for now):

- Use hardcoded/imported mock data for metrics
- Generate realistic dummy orders (at least 20-30 samples)
- Create sample revenue data for charts
- Simulate loading states with setTimeout

**Future Supabase Queries** (Phase 2):

- Count orders by date range
- Sum total revenue
- Count products by availability
- Fetch recent orders with pagination

---

### Page 2: Products Management

**Route**: `/dashboard/products`

**Features**:

**Product List View**

- Table/Grid view toggle
- Columns: Image, Name (EN), Category, Price Range, Stock Status, Featured, Actions
- Filters:
  - Category dropdown (dynamic from database)
  - Subcategory dropdown (dependent on category)
  - Availability (All / Available / Unavailable)
  - Featured (All / Featured / Not Featured)
  - Search by name (searches EN/FR/AR)
- Sort by: Name, Price, Date Added, Featured
- Pagination (20 items per page)
- Bulk actions: Delete, Toggle availability, Toggle featured

**Actions**:

- ✏️ Edit button
- 🗑️ Delete button (with confirmation modal)
- 👁️ View button (shows product as it appears on storefront)
- ⭐ Quick toggle featured status

**Add New Product**

- Modal or separate page
- Form fields with validation:

  **Basic Information** (Tab 1):
  - Product Name (EN / FR / AR) - required
  - Slug (auto-generated from EN name, editable) - required
  - Description (EN / FR / AR) - textarea - required
  - Category - dropdown (required)
  - Subcategory - dropdown (dependent, required)
  - Available - checkbox (default: true)
  - Featured - checkbox (default: false)
  - Discount percentage - number input (0-100)

  **Images** (Tab 2):
  - Image uploader (drag & drop or click)
  - Upload to Supabase Storage
  - Image preview with reorder capability
  - Delete image option
  - Minimum 1 image required

  **Specifications** (Tab 3):
  - Default thickness - number
  - Firmness level - slider (1-10)
  - Densities - optional repeater field
    - Add density option button
    - Value + Label for each density

  **Dimensions & Pricing** (Tab 4):
  - Dynamic repeater for dimensions
  - Each dimension has:
    - Size (e.g., "90 x 190")
    - Options repeater:
      - Thickness (number)
      - Density (dropdown - shown only if densities exist)
      - Price (number)
    - Add/Remove option buttons

  **Marketing Content** (Tab 5):
  - Why Choose (array of strings) - add/remove items
  - Technical Specs (array of {label, value}) - add/remove items
  - Advantages (array of strings)
  - FAQ (array of {question, answer}) - add/remove items

**Edit Product**

- Same form as Add Product
- Pre-filled with existing data
- Update button instead of Create

**Validation Rules**:

- All translations (EN/FR/AR) must be filled
- At least one image required
- At least one dimension with one option required
- Price must be positive number
- Discount between 0-100
- Slug must be unique

**Mock Implementation** (for now):

- Create a `mockData/products.js` file with sample products
- Use local state (useState/Context) to manage CRUD operations
- Simulate image upload with preview only (save base64 or local URLs)
- Show success/error toasts after actions

**Future Supabase Implementation** (Phase 2):

- Table: `products`
- Storage bucket: `product-images`
- CRUD operations with proper error handling
- Image optimization before upload (optional)

---

### Page 3: Categories Management

**Route**: `/dashboard/categories`

**Features**:

**Categories List**

- Expandable tree structure showing:
  - Category → Subcategories → Types (if applicable)
- Display translations for current language
- Show/hide translations toggle
- Actions: Edit, Delete, Add Subcategory, Add Type

**Add/Edit Category**

- Modal form:
  - Value (unique identifier) - lowercase-with-dashes - required
  - Name translations (EN / FR / AR) - required
  - Order/Priority - number (for display order)

**Add/Edit Subcategory**

- Parent category (display only)
- Value - required
- Name translations (EN / FR / AR) - required
- Has Types? - checkbox
- Order/Priority

**Add/Edit Type**

- Parent category and subcategory (display only)
- Value - required
- Name translations (EN / FR / AR) - required
- Order/Priority

**Validation**:

- Value must be unique within scope (category/subcategory/type)
- Cannot delete category if products exist under it
- Cascade warning for deletions

**Mock Implementation** (for now):

- Create a `mockData/categories.js` file with sample category tree
- Use local state to manage category operations
- Simulate hierarchical structure with nested arrays/objects

**Future Supabase Implementation** (Phase 2):

- Table: `categories`
- Columns: id, value, translations (jsonb), parent_id, type (category/subcategory/type), order
- Query products count before deletion

---

### Page 4: Orders Management

**Route**: `/dashboard/orders`

**Features**:

**Orders List**

- Table view with columns:
  - Order ID
  - Customer Name
  - Phone
  - Wilaya
  - Total Amount
  - Items Count
  - Status
  - Date
  - Actions

**Filters**:

- Status filter: All / New / Processing / Shipped / Delivered / Cancelled
- Date range picker (Today / This Week / This Month / Custom)
- Wilaya filter (dropdown of all wilayas)
- Search by: Order ID, Customer Name, Phone
- Sort by: Date (newest first), Amount (high to low), Status

**Status Management**:

- Color-coded status badges:
  - New: blue
  - Processing: yellow
  - Shipped: purple
  - Delivered: green
  - Cancelled: red
- Quick status update dropdown in table
- Bulk status update for selected orders

**Order Details Modal/Page**

- **Customer Information**
  - Name, Email, Phone
  - Edit customer info button
- **Shipping Information**
  - Full Address (Wilaya, City, Street)
  - Map Link (clickable if provided)
  - Copy address button
- **Order Items Table**
  - Product Image
  - Product Name
  - Size, Thickness, Density (if applicable)
  - Quantity
  - Unit Price
  - Subtotal
- **Order Summary**
  - Items Count
  - Total Quantity
  - Total Price
  - Discount (if any)
  - Final Amount
- **Payment Information**
  - Method
  - Status (with update option)
- **Order Status Timeline**
  - Show history of status changes
  - Add status note option
- **Actions**:
  - Update Order Status
  - Print Order (print-friendly format)
  - Send SMS/Email notification (optional)
  - Cancel Order (with reason)
  - Refund (if applicable)

**Create Manual Order** (Optional but useful)

- Admin can create orders manually
- Customer info form
- Product selection with size/thickness/density
- Quantity selection
- Auto-calculate total
- Set initial status

**Export Orders**

- Export filtered orders to CSV/Excel
- Include all order details
- Date range selection for export

**Mock Implementation** (for now):

- Create a `mockData/orders.js` file with 30-50 sample orders
- Use local state to manage order status updates
- Simulate real-time notifications with a "Simulate New Order" button (for testing)
- Store status history in memory (array)

**Future Supabase Implementation** (Phase 2):

- Table: `orders`
- Real-time subscriptions for new orders
- Trigger notifications when new order arrives
- Status change history table: `order_status_history`

---

### Page 5: Discounts & Promotions

**Route**: `/dashboard/discounts`

**Features**:

**Discounts List**

- Table showing active & scheduled discounts:
  - Product Name
  - Current Discount %
  - Start Date
  - End Date
  - Status (Active / Scheduled / Expired)
  - Actions

**Quick Discount Update**

- Select product(s)
- Set discount percentage (0-100)
- Apply immediately or schedule

**Scheduled Promotions**

- Create time-based promotions:
  - Promotion Name
  - Discount Percentage
  - Start Date & Time
  - End Date & Time
  - Affected Products (select multiple or select by category)
  - Auto-enable/disable based on schedule

**Bulk Discount Management**

- Apply discount to entire category
- Apply discount to featured products
- Clear all discounts button

**Coupon Codes** (Future feature - optional)

- Create coupon codes
- Set discount type (percentage / fixed amount)
- Usage limits
- Expiration date
- Applicable products/categories

**Mock Implementation** (for now):

- Store promotions in local state
- Update product discount values in mock data state
- Simulate scheduled promotions with client-side checks

**Future Supabase Implementation** (Phase 2):

- Update `discount` field in products table
- Table: `promotions` for scheduled discounts
- Edge function or cron job to auto-apply/remove scheduled discounts

---

### Page 6: Meta Pixel Management

**Route**: `/dashboard/meta-pixel`

**Features**:

**Pixel Configuration**

- Meta Pixel ID input
- Pixel Name (for reference)
- Status toggle (Active / Inactive)
- Test connection button

**Event Tracking Settings**

- Enable/Disable specific events:
  - PageView
  - ViewContent
  - AddToCart
  - InitiateCheckout
  - Purchase
  - Search
- Event parameters configuration
- Test event firing

**Conversion API Setup** (optional advanced feature)

- Access Token input
- Test API connection
- Server vs Browser events toggle

**Analytics Overview**

- Show recent events tracked
- Event count by type (today)
- Last successful event timestamp
- Connection status indicator

**Instructions/Help Section**

- How to find Meta Pixel ID
- How to verify pixel is working
- Troubleshooting guide

**Mock Implementation** (for now):

- Store settings in local state or localStorage
- Display saved configuration in UI
- Show mock event logs with sample data

**Future Supabase Implementation** (Phase 2):

- Table: `meta_pixel_settings`
- Store configuration as JSON
- Update Next.js environment or inject script dynamically
- Log events for debugging in `pixel_events_log` table

---

### Page 7: Settings

**Route**: `/dashboard/settings`

**Features**:

**General Settings**

- Store Name (EN / FR / AR)
- Store Description (EN / FR / AR)
- Contact Email
- Contact Phone
- Store Address

**Available Wilayas** (for shipping)

- Multi-select list of Algerian wilayas
- Enable/Disable specific wilayas for delivery

**Theme Settings**

- Default logo upload
- Brand colors (for customer site)
- Favicon upload

**Notification Settings**

- Email notifications for new orders
- SMS notifications (if integrated)
- Desktop notifications
- Notification recipients (email list)

**Admin User Management**

- List of admin users
- Add new admin
- Revoke admin access
- Role-based permissions (future enhancement):
  - Super Admin (full access)
  - Manager (orders, products)
  - Viewer (read-only)

**Backup & Restore** (Future)

- Export entire database
- Restore from backup
- Scheduled backups

**Mock Implementation** (for now):

- Store settings in local state or localStorage
- Hardcode admin users list
- Show uploaded logo/favicon preview without actual upload

**Future Supabase Implementation** (Phase 2):

- Table: `settings` (key-value pairs or structured JSON)
- Table: `admin_users` with roles
- Supabase Storage for logo/favicon

---

## 4. UI/UX Requirements

### Design Principles

- **Mobile-First**: Design and develop for mobile screens first, then scale up
- **Responsive Breakpoints**:
  - Mobile: 0-640px
  - Tablet: 641px-1024px
  - Desktop: 1025px+

### Component Architecture

All components must be:

- **Reusable**: Can be used across different pages
- **Composable**: Can be combined with other components
- **Accessible**: Proper ARIA labels, keyboard navigation
- **Well-documented**: PropTypes or JSDoc comments

### Component Library to Build

**Layout Components**:

- `<DashboardLayout>` - Main layout wrapper
- `<Sidebar>` - Navigation sidebar
- `<TopBar>` - Top navigation bar
- `<PageHeader>` - Page title and actions
- `<ContentCard>` - Content wrapper with shadow and padding

**Form Components**:

- `<Input>` - Text input with label and error
- `<TextArea>` - Multi-line text input
- `<Select>` - Dropdown select
- `<MultiSelect>` - Multiple selection dropdown
- `<Checkbox>` - Checkbox with label
- `<Radio>` - Radio button
- `<DatePicker>` - Date selection
- `<DateRangePicker>` - Date range selection
- `<ImageUploader>` - Drag and drop image upload
- `<FormGroup>` - Form field wrapper with label/error
- `<LanguageTabs>` - Tabs for EN/FR/AR inputs
- `<ColorPicker>` - Color selection (Tailwind colors only)

**Data Display Components**:

- `<Table>` - Data table with sort/filter
- `<Pagination>` - Page navigation
- `<Card>` - Content card
- `<Badge>` - Status badge
- `<Stat>` - Statistic display card
- `<EmptyState>` - No data message
- `<LoadingSpinner>` - Loading indicator
- `<LoadingTable>` - Table skeleton loader

**Action Components**:

- `<Button>` - Primary/Secondary/Danger buttons
- `<IconButton>` - Button with icon only
- `<Dropdown>` - Action dropdown menu
- `<Modal>` - Modal dialog
- `<ConfirmDialog>` - Confirmation modal
- `<Toast>` - Notification toast
- `<Alert>` - Alert message box

**Utility Components**:

- `<Tooltip>` - Hover tooltip
- `<Tabs>` - Tabbed content
- `<Accordion>` - Collapsible sections
- `<Breadcrumb>` - Navigation breadcrumb

### Dark Mode Implementation

- Use CSS variables for colors OR Tailwind's dark mode
- Persist theme preference in localStorage
- Smooth transition between modes
- Toggle switch in TopBar

**Color Strategy** (Example with Tailwind classes):

```javascript
// Light mode
bg-white text-gray-900 border-gray-200

// Dark mode
dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
```

**Theme Toggle Example**:

```javascript
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setDarkMode(true);
    document.documentElement.classList.add("dark");
  }
}, []);

const toggleTheme = () => {
  setDarkMode(!darkMode);
  if (!darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
```

---

## 5. Supabase Setup & Integration (PHASE 2 - SKIP FOR NOW)

**Note:** This section is for future reference. DO NOT implement Supabase integration in Phase 1. Use mock data instead.

### Database Schema (For Future Reference)

**Table: `categories`**

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT UNIQUE NOT NULL,
  translations JSONB NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('category', 'subcategory', 'type')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: `products`**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  discount INTEGER DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  images TEXT[] NOT NULL,
  details JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_subcategory ON products(subcategory);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_available ON products(available);
```

**Table: `orders`**

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  customer JSONB NOT NULL,
  shipping JSONB NOT NULL,
  payment JSONB NOT NULL,
  items JSONB NOT NULL,
  summary JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_id ON orders(order_id);
```

**Table: `order_status_history`**

```sql
CREATE TABLE order_status_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  note TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP DEFAULT NOW()
);
```

**Table: `promotions`**

```sql
CREATE TABLE promotions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  product_ids INTEGER[],
  category_filter TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Table: `meta_pixel_settings`**

```sql
CREATE TABLE meta_pixel_settings (
  id SERIAL PRIMARY KEY,
  pixel_id TEXT NOT NULL,
  pixel_name TEXT,
  active BOOLEAN DEFAULT true,
  events_config JSONB DEFAULT '{}',
  conversion_api_token TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: `settings`**

```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Storage Buckets

- `product-images` - For product images
- `store-assets` - For logos, favicons, etc.

**Bucket Policies**:

- Public read access for product-images
- Authenticated write access only
- File size limits: 5MB per image

### Row Level Security (RLS)

Enable RLS on all tables and set policies:

- Only authenticated admin users can INSERT/UPDATE/DELETE
- Public can SELECT products and categories (for storefront)
- Orders only accessible by admins

### Realtime Subscriptions (Phase 2)

**For Phase 1:** Add a "Simulate New Order" button in the UI to manually trigger new order notifications and test the notification system.

**Future implementation:** Enable realtime for `orders` table to get instant notifications for new orders:

```javascript
const subscription = supabase
  .channel("orders")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "orders" },
    (payload) => {
      // Show toast notification
      toast.success(`New order received: ${payload.new.order_id}`);
      // Play notification sound
      // Update orders list
    },
  )
  .subscribe();
```

---

## 6. State Management

### Context Structure (if using Context API)

- `AuthContext` - User authentication state
- `ThemeContext` - Dark/Light mode
- `NotificationContext` - Toast notifications
- `ProductsContext` - Products data (optional)
- `OrdersContext` - Orders data (optional)

### Redux Structure (if using Redux Toolkit)

**Slices**:

- `auth` - Authentication state
- `theme` - Theme preferences
- `products` - Products data with loading/error states
- `categories` - Categories data
- `orders` - Orders data with filters
- `ui` - Modals, toasts, sidebar state

---

## 7. Validation & Error Handling

### Form Validation

Use a validation library or implement custom validation:

- Required field validation
- Email format validation
- Phone number format validation (Algerian format: +213...)
- URL validation (for image URLs, map links)
- Number range validation (prices, discounts, etc.)
- Unique constraint validation (slug, order ID)

### Error Handling

- **Network Errors**: Show retry button with error message
- **Validation Errors**: Display inline field errors
- **Database Errors**: Show user-friendly messages
- **404 Errors**: Redirect to 404 page
- **Authentication Errors**: Redirect to login

### Loading States

- Skeleton loaders for tables and cards
- Spinner for button actions
- Progress bar for image uploads
- Page-level loading indicator

---

## 8. Responsive Design Requirements

### Mobile (0-640px)

- Single column layout
- Bottom navigation bar
- Collapsible sidebar (drawer)
- Stack form fields vertically
- Tables become cards or horizontal scroll
- Touch-friendly buttons (min 44px tap target)
- Simplified filters (bottom sheet modal)

### Tablet (641px-1024px)

- Two column layout where appropriate
- Always-visible sidebar or collapsible
- Grid view for products (2 columns)
- Form fields can be 2 columns

### Desktop (1025px+)

- Full sidebar always visible
- Multi-column layouts
- Grid view for products (3-4 columns)
- More data in tables (all columns visible)
- Hover states and tooltips

---

## 9. Performance Optimization

### Best Practices

- Lazy load routes using React.lazy()
- Debounce search inputs
- Paginate all data tables
- Optimize images before upload
- Use Supabase query optimization:
  - Select only needed columns
  - Use indexes for sorting/filtering
  - Implement pagination with limit/offset
- Cache frequently accessed data (categories, settings)
- Implement virtual scrolling for large lists

---

## 10. Security Considerations

### Authentication

- Use Supabase Auth
- Implement role-based access (admin only)
- Secure routes with protected route wrapper
- Auto-logout on token expiration
- Show session expiration warning

### Input Sanitization

- Sanitize all user inputs
- Prevent XSS attacks
- Validate file uploads (type, size)
- Prevent SQL injection (use Supabase properly)

### API Security

- Use environment variables for sensitive keys
- Never expose Supabase anon key in dashboard (use service_role key properly)
- Implement rate limiting if needed
- Validate all data server-side (Supabase RLS)

---

## 11. Internationalization in Dashboard

While the main storefront is multi-language (AR/FR/EN), the dashboard UI itself can be in one language (English recommended), BUT:

- All data inputs support three languages (product names, categories, descriptions)
- Display current language indicator when viewing translated content
- Preview feature to see how content looks in each language

---

## 12. Testing & Quality Assurance

### Testing Checklist

- [ ] All forms validate properly
- [ ] Image upload works and stores in Supabase
- [ ] Orders update status correctly
- [ ] Real-time order notifications work
- [ ] Dark/Light mode works consistently
- [ ] Mobile navigation works smoothly
- [ ] All CRUD operations function correctly
- [ ] Pagination works on all tables
- [ ] Search and filters work accurately
- [ ] Multi-language inputs save and display correctly
- [ ] Authentication redirects work
- [ ] 404 and error pages display properly

---

## 13. File Structure

```
dashboard/
├── public/
│   ├── logo.svg
│   └── notification.mp3
├── src/
│   ├── mockData/              ⭐ NEW: Mock data for Phase 1
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── orders.js
│   │   ├── settings.js
│   │   └── users.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── forms/
│   │   │   ├── Input.jsx
│   │   │   ├── TextArea.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── LanguageTabs.jsx
│   │   │   └── ...
│   │   ├── tables/
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ...
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ...
│   │   └── common/
│   │       ├── LoadingSpinner.jsx
│   │       ├── EmptyState.jsx
│   │       └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Products/
│   │   │   ├── ProductsList.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── Categories/
│   │   │   └── CategoriesManager.jsx
│   │   ├── Orders/
│   │   │   ├── OrdersList.jsx
│   │   │   └── OrderDetails.jsx
│   │   ├── Discounts/
│   │   │   └── DiscountsManager.jsx
│   │   ├── MetaPixel/
│   │   │   └── MetaPixelSettings.jsx
│   │   ├── Settings/
│   │   │   └── GeneralSettings.jsx
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       └── ForgotPassword.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useSupabase.js
│   │   ├── useToast.js
│   │   └── useDebounce.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── mockHelpers.js     ⭐ Utility functions for mock data
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   └── index.jsx
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 14. Getting Started Steps

### Environment Setup

1. Create new React app: `npx create-react-app dashboard`
2. Install dependencies:

```bash
npm install react-router-dom react-icons
```

3. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Setup Mock Data Structure

Create a `src/mockData/` folder with these files:

**src/mockData/products.js**

```javascript
export const mockProducts = [
  // Add 15-20 sample products following the data structure
];
```

**src/mockData/categories.js**

```javascript
export const mockCategories = [
  // Add the full category hierarchy
];
```

**src/mockData/orders.js**

```javascript
export const mockOrders = [
  // Add 30-50 sample orders with various statuses
];
```

### Skip Supabase Setup (For Phase 1)

**DO NOT install or configure Supabase yet.** Focus on building the UI with mock data. Supabase integration will be added in Phase 2 after the UI is complete and approved.

---

## 15. Development Priorities

### Phase 1 (UI/UX Development - CURRENT PHASE) ⭐

**Using Mock Data Only - No Backend Integration**

1. **Setup & Foundation**
   - Create project structure
   - Setup Tailwind CSS
   - Create mock data files (products, categories, orders)
   - Setup routing structure

2. **Layout Components**
   - Build Sidebar with navigation
   - Build TopBar with user menu and theme toggle
   - Build Mobile navigation (bottom bar + drawer)
   - Implement Dark/Light mode toggle
   - Create responsive layout wrapper

3. **Reusable UI Components**
   - Form components (Input, TextArea, Select, etc.)
   - Data display components (Table, Card, Badge, etc.)
   - Action components (Button, Modal, Dropdown, etc.)
   - Language tabs for AR/FR/EN inputs
   - Image uploader with preview

4. **Core Pages (with Mock Data)**
   - Dashboard Overview (with mock stats and charts)
   - Products List, Add, Edit (working with mock data)
   - Orders List and Details (using mock orders)
   - Categories Management (tree structure with mock data)

5. **Additional Pages**
   - Discounts & Promotions
   - Settings page
   - Meta Pixel configuration
   - Mock authentication (simple login form, no real auth)

6. **Polish & Testing**
   - Test all responsive breakpoints
   - Test dark/light mode on all pages
   - Test all CRUD operations with mock data
   - Add loading states and transitions
   - Add toast notifications

### Phase 2 (Backend Integration - FUTURE)

**After UI is Complete and Approved**

1. Setup Supabase project and database
2. Implement real authentication
3. Replace mock data with Supabase queries
4. Implement real-time order notifications
5. Add image upload to Supabase Storage
6. Implement Row Level Security
7. Testing with real backend

### Phase 3 (Advanced Features - FUTURE)

1. Export functionality
2. Advanced analytics
3. Bulk operations optimization
4. Performance optimization
5. Additional security features

---

## 16. Critical Reminders

### ✅ DO:

- Use Tailwind color classes only (e.g., `bg-blue-500`, `text-gray-900`)
- Write JavaScript, NOT TypeScript
- Create reusable, composable components
- Implement mobile-first responsive design
- Support three languages (AR/FR/EN) for all content inputs
- Follow the EXACT data structure specified above
- **Use MOCK DATA for Phase 1** (no backend integration yet)
- Store state in React Context or local component state
- Simulate async operations with setTimeout (300-800ms)
- Implement proper error handling everywhere
- Add loading states for all operations
- Test on mobile devices frequently
- Create comprehensive mock data that covers edge cases

### ❌ DON'T:

- Use rgba() or hex color codes
- Use TypeScript
- Try to integrate Supabase in Phase 1 (focus on UI only)
- Deviate from the specified data structure
- Skip validation on forms
- Ignore mobile responsiveness
- Use inline styles (use Tailwind classes)
- Create mock data that doesn't match the exact data structure
- Commit sensitive keys to git (when you add backend later)

---

## 17. Final Notes

This dashboard is a critical business tool. Every feature must be:

- **Reliable**: No data loss, proper error handling
- **Fast**: Optimized queries, efficient rendering
- **User-friendly**: Intuitive UI, clear feedback
- **Mobile-ready**: Works perfectly on phones
- **Secure**: Proper authentication and authorization

The success of this dashboard depends on respecting the data structure and maintaining consistency with the main e-commerce application. Any mismatch will cause serious issues.

Good luck with the development! Build something amazing! 🚀
