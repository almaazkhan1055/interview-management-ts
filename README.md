# Interview Management Dashboard

A comprehensive React/Next.js application for managing interview processes with role-based access control, built as a demonstration of modern frontend development practices and OWASP Top 10 UI security compliance.

## 🚀 Features

### Core Functionality
- **Authentication System** - Login with role selection (admin, ta_member, panelist)
- **Role-Based Access Control** - Different permissions and UI elements based on user roles
- **Dashboard** - KPI metrics, filtering, and role-specific widgets
- **Candidate Management** - List, search, filter, and detailed candidate views
- **Interview Feedback** - Panelist-only feedback submission with validation
- **Role Management** - Admin-only interface for managing user permissions

### Technical Features
- **Performance Optimizations** - Lazy loading, debounced search, pagination
- **Security Compliance** - OWASP Top 10 UI security measures
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Error Handling** - Comprehensive error states and loading indicators
- **Type Safety** - Full TypeScript implementation

## 🛠 Tech Stack

### Core Technologies
- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- 
### State & Data Management
- **Redux toolkit** - Global state management
- **React Hook Form** - Form handling and validation
- **DummyJSON API** - Mock data source

## 🔐 Security Implementation (OWASP Top 10)

### 1. Broken Access Control
- ✅ Route-level protection with `ProtectedRoute` component
- ✅ Permission-based UI element visibility
- ✅ Role-based navigation restrictions

### 2. Cryptographic Failures
- ✅ No sensitive data stored in localStorage
- ✅ Session tokens truncated for display
- ✅ Secure session management

### 3. Injection
- ✅ Input sanitization in search and forms
- ✅ Parameterized API calls
- ✅ HTML entity encoding

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone (https://github.com/almaazkhan1055/interview-management-ts.git)
   cd interview-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Login Credentials

The application uses DummyJSON for authentication. You can use any username from their API:

- **Username**: `emilys` (or any DummyJSON username)
- **Password**: emilyspass
- **Role**: Select from dropdown (admin, ta_member, panelist)

## 🎨 Design Decisions

### UI/UX Choices
- **Tailwind CSS**: Utility-first approach for consistent styling
- **Mobile-First**: Responsive design prioritizing mobile users

### Performance Optimizations
- **Debounced Search**: delay to reduce API calls
- **Pagination**: Efficient data loading with 10 items per page

### State Management
- **Redux toolkit** - Global state management
- **Local State**: Component-level state for UI interactions
- **Session Storage**: Secure session persistence

## 📊 Performance Features

- **Debounced Search** - Reduces API calls with 300ms delay
- **Pagination** - Efficient data loading
- **Code Splitting** - Automatic route-based splitting
- **Optimized Re-renders** - Strategic use of React.memo and useMemo

## 🔄 Build & Deployment

### Production Build
```bash
npm run build
```

### Static Export
```bash
npm run build
```
The application is configured for static export and can be deployed to any static hosting service.
