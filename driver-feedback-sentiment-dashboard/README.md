# Driver Feedback & Sentiment Dashboard

A production-quality React application for managing driver feedback and analyzing sentiment data for corporate transport platforms like MoveInSync.

## 🚀 Features

### ✨ Configurable Feedback System

- **Feature Flag Driven**: Dynamic form rendering based on runtime configuration
- **Multi-Entity Support**: Feedback for Driver, Trip, Mobile App, and Marshal
- **Smart Validation**: Real-time validation with inline error messages
- **Multi-Step Flow**: Progressive form with visual step indicator
- **Duplicate Prevention**: Prevents duplicate submissions
- **Accessibility**: WCAG 2.1 compliant with full keyboard navigation

### 📊 Real-Time Analytics Dashboard

- **KPI Cards**: Total feedback, average scores, driver performance metrics
- **Sentiment Distribution**: Visual donut chart showing positive/neutral/negative feedback
- **Driver Leaderboard**: Sortable, filterable table with performance indicators
- **Feedback Timeline**: Virtualized infinite scroll timeline
- **Alert System**: Real-time notifications for drivers below threshold

### 👤 Driver Detail View

- **30-Day Trend Chart**: Line chart showing sentiment over time
- **Tag Frequency**: Bar chart of most common feedback tags
- **Full History**: Complete feedback log with filtering
- **Status Badges**: Visual indicators for driver performance
- **Performance Metrics**: Comprehensive statistics and comparisons

## 🛠 Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing with lazy loading
- **Zustand** - Lightweight state management
- **React Query** - Server state management & caching
- **Recharts** - Composable charting library
- **Headless UI** - Unstyled accessible components
- **Heroicons** - Beautiful hand-crafted icons
- **React Virtual** - Virtualized lists for performance

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── mockApi.ts         # Mock data and API functions
│   └── queries.ts         # React Query hooks
├── components/            # Reusable components
│   ├── common/           # Shared UI components
│   │   ├── AlertBell.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Navbar.tsx
│   │   ├── Skeleton.tsx
│   │   ├── StarRating.tsx
│   │   ├── TagSelector.tsx
│   │   └── Toast.tsx
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── BarChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── DriverTable.tsx
│   │   ├── FeedbackTimeline.tsx
│   │   ├── KpiCard.tsx
│   │   └── LineChart.tsx
│   └── feedback/         # Feedback form components
│       ├── FeedbackSection.tsx
│       └── ProgressIndicator.tsx
├── pages/                # Page components
│   ├── DashboardPage.tsx
│   ├── DriverDetailPage.tsx
│   └── FeedbackPage.tsx
├── stores/               # State management
│   └── appStore.ts      # Zustand store
├── types/                # TypeScript definitions
│   └── index.ts
├── lib/                  # Utilities
│   └── queryClient.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🎯 Key Implementation Details

### Feature Flags

The feedback form dynamically renders sections based on a configuration object:

```typescript
{
  driverFeedback: true,
  tripFeedback: true,
  appFeedback: false,  // Disabled - won't show
  marshalFeedback: true
}
```

### State Management

- **Global State (Zustand)**: Feature flags, alerts, filters, toasts
- **Server State (React Query)**: Drivers, feedback, analytics with automatic caching
- **Local State**: Form inputs, UI toggles, pagination

### Performance Optimizations

- ✅ Lazy-loaded routes with code splitting
- ✅ Virtualized lists for large datasets
- ✅ Memoized components and calculations
- ✅ Debounced search inputs
- ✅ Optimistic UI updates
- ✅ Efficient re-render prevention

### Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader compatibility
- ✅ Color contrast compliance (WCAG AA)
- ✅ Skip links and landmarks

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. **Clone the repository**

```bash
cd driver-feedback-dashboard
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

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Colors

- **Primary**: Indigo (brand color)
- **Success**: Green (positive feedback, high scores)
- **Warning**: Amber (medium scores, caution)
- **Danger**: Red (low scores, alerts)

### Status Indicators

- **Excellent** (≥ 4.0): Green
- **Good** (3.0-3.9): Blue
- **Warning** (2.5-2.9): Amber
- **Alert** (< 2.5): Red

### Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: ≥ 1024px

## 📋 Available Routes

- `/` - Redirects to dashboard
- `/dashboard` - Main analytics dashboard
- `/feedback` - Employee feedback submission form
- `/driver/:id` - Individual driver detail page

## 🔧 Configuration

### Feature Flags

Update feature flags in `src/api/mockApi.ts`:

```typescript
export const mockApi = {
  getConfig: async (): Promise<FeatureFlags> => {
    return {
      driverFeedback: true,
      tripFeedback: true,
      appFeedback: false, // Toggle features here
      marshalFeedback: true,
    };
  },
};
```

### Mock Data

Customize mock data in `src/api/mockApi.ts`:

- `mockDrivers` - Driver list
- `mockFeedback` - Feedback entries
- `FEEDBACK_TAGS` - Available tags per entity

## 🧪 Testing Scenarios

1. **Feature Flag Testing**
   - Toggle flags in `mockApi.ts`
   - Verify dynamic form rendering
   - Check empty state when all flags disabled

2. **Responsive Testing**
   - Test on mobile (< 640px)
   - Test on tablet (640px - 1024px)
   - Test on desktop (≥ 1024px)

3. **Accessibility Testing**
   - Navigate using keyboard only
   - Test with screen reader
   - Verify focus indicators
   - Check color contrast

4. **Performance Testing**
   - Load large driver list (50+ entries)
   - Scroll feedback timeline (200+ items)
   - Test virtualization performance

## 🎓 Learning Highlights

### Production Patterns Used

1. **Component Composition** - Presentational vs Container
2. **Custom Hooks** - Reusable business logic
3. **Error Boundaries** - Graceful error handling
4. **Code Splitting** - Route-based lazy loading
5. **Optimistic Updates** - Better UX for mutations
6. **Virtual Scrolling** - Handle large lists efficiently
7. **Type Safety** - Full TypeScript coverage
8. **Accessible UI** - ARIA, keyboard nav, focus management

### Advanced Features

- Real-time data refetching
- Toast notification system
- Alert management with badges
- Advanced table sorting/filtering
- Multi-step form wizard
- Dynamic chart rendering
- Responsive navigation

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🎉 Interview Ready Features

This project demonstrates:

- ✅ Production-grade architecture
- ✅ Advanced React patterns
- ✅ Performance optimization
- ✅ Accessibility compliance
- ✅ Type safety
- ✅ State management mastery
- ✅ Real-world UI/UX patterns
- ✅ Scalable code organization
- ✅ Modern tooling expertise

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
