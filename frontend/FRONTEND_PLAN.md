# Treasury Solutions Application - Frontend Implementation Plan

## Tech Stack Overview

- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** components with **Tailwind CSS v4**
- **React Query** for server state management
- **React Hook Form** with Zod validation
- **React Router** for navigation

## Page-by-Page Implementation

### 1. Authentication & Layout

#### Auth Pages (`/login`, `/signup`)

- **Components:**
    - `LoginForm` - Form with email/password fields
    - `SignupForm` - Extended form with role selection
    - `AuthLayout` - Shared auth page wrapper
- **Utils:** `auth.ts` - JWT token management
- **API:** `POST /auth/login`, `POST /auth/signup`
- **Types:** `User`, `AuthResponse`, `LoginCredentials`

#### Main Layout (`/dashboard/*`)

- **Components:**
    - `AppSidebar` - Navigation with role-based menu items
    - `AppHeader` - User profile, notifications, theme toggle
    - `ProtectedRoute` - Auth guard wrapper
    - `RoleBasedAccess` - Permission-based rendering
- **Utils:** `permissions.ts` - Role checking utilities
- **Features:** Persistent sidebar state, breadcrumb navigation

### 2. Dashboard & Analytics (`/dashboard`)

#### Dashboard Overview

- **Components:**
    - `DashboardCards` - Key metrics (idle cash, transaction volume)
    - `CashFlowChart` - Time-series visualization using Recharts
    - `RecentAnalyses` - Table of recent client analyses
    - `QuickActions` - Upload/analyze shortcuts
- **API:** `GET /dashboard/metrics`, `GET /dashboard/recent`
- **Types:** `DashboardMetrics`, `RecentAnalysis`
- **Utils:** `formatCurrency.ts`, `chartHelpers.ts`

### 3. Client Management (`/clients`)

#### Client List (`/clients`)

- **Components:**
    - `ClientTable` - Sortable/filterable client list
    - `ClientFilters` - Search and filter controls
    - `ClientCard` - Individual client summary
    - `AddClientDialog` - New client creation modal
- **API:** `GET /clients`, `POST /clients`
- **Types:** `Client`, `ClientFilters`, `ClientSummary`

#### Client Profile (`/clients/:id`)

- **Components:**
    - `ClientHeader` - Basic info and status
    - `ClientAnalysisTabs` - Historical analyses
    - `ClientNotesSection` - Comments and notes
- **API:** `GET /clients/:id`, `PUT /clients/:id`
- **Types:** `ClientDetails`, `ClientAnalysis`, `ClientNote`

### 4. Statement Analysis (`/analysis`)

#### Upload Interface (`/analysis/upload`)

- **Components:**
    - `StatementUploader` - Drag-and-drop file upload
    - `BankConnectionSetup` - API integration form
    - `UploadProgress` - Real-time upload status
    - `FormatValidator` - File format checking
- **Utils:** `fileValidation.ts`, `parseStatements.ts`
- **API:** `POST /statements/upload`, `POST /statements/parse`
- **Types:** `UploadStatus`, `StatementFile`, `ParseResult`
- **Features:** Multi-file upload, format detection (PDF, CSV, OFX)

#### Analysis Dashboard (`/analysis/:id`)

- **Components:**
    - `AnalysisHeader` - Client info and analysis metadata
    - `TransactionSummary` - Categorized transaction overview
    - `LiquidityAnalysis` - Cash flow patterns and idle balances
    - `SpendingBreakdown` - Vendor and category analysis
    - `TransactionTable` - Detailed transaction list with filters
- **API:** `GET /analysis/:id/summary`, `GET /analysis/:id/transactions`
- **Types:** `AnalysisData`, `TransactionCategory`, `LiquidityMetrics`
- **Utils:** `transactionHelpers.ts`, `categoryMapping.ts`

### 5. Treasury Recommendations (`/recommendations`)

#### Recommendations View (`/recommendations/:analysisId`)

- **Components:**
    - `RecommendationCards` - Product suggestions with rationale
    - `BenefitCalculator` - ROI and cost savings projections
    - `ProductComparisonTable` - Side-by-side product features
    - `RecommendationFilters` - Filter by priority/category
    - `ApprovalWorkflow` - Review and approval controls
- **API:** `GET /recommendations/:id`, `PUT /recommendations/:id/approve`
- **Types:** `Recommendation`, `TreasuryProduct`, `BenefitProjection`
- **Utils:** `benefitCalculations.ts`, `productMatching.ts`

#### Product Catalog (`/products`)

- **Components:**
    - `ProductGrid` - Available treasury products
    - `ProductDetailsModal` - Detailed product specifications
    - `EligibilityChecker` - Client eligibility validation
- **API:** `GET /products`, `GET /products/:id/eligibility`
- **Types:** `Product`, `EligibilityRules`, `ProductFeature`

### 6. Reports & Export (`/reports`)

#### Report Generation (`/reports/generate`)

- **Components:**
    - `ReportBuilder` - Template selection and customization
    - `ReportPreview` - Live preview of generated report
    - `ExportOptions` - Format selection (PDF, Excel, HTML)
    - `ReportScheduler` - Automated report scheduling
- **API:** `POST /reports/generate`, `GET /reports/:id/download`
- **Types:** `ReportTemplate`, `ReportConfig`, `ExportFormat`
- **Utils:** `reportFormatters.ts`, `pdfGenerator.ts`

#### Report History (`/reports/history`)

- **Components:**
    - `ReportList` - Historical reports with metadata
    - `ReportActions` - Download, share, delete actions
- **API:** `GET /reports/history`

### 7. Configuration & Admin (`/admin`)

#### System Configuration (`/admin/config`)

- **Components:**
    - `ThresholdSettings` - Idle balance and liquidity thresholds
    - `ProductRulesEditor` - Product eligibility rule management
    - `IntegrationSettings` - External API configurations
- **API:** `GET /config`, `PUT /config`
- **Types:** `SystemConfig`, `ThresholdRules`, `IntegrationConfig`
- **Features:** Role-based access (admin only)

#### Audit Trail (`/admin/audit`)

- **Components:**
    - `AuditLogTable` - System activity tracking
    - `AuditFilters` - Filter by user, action, date
- **API:** `GET /audit/logs`
- **Types:** `AuditEntry`, `AuditAction`

## Common Components & Utils

### Shared Components

- `DataTable` - Reusable table with sorting, filtering, pagination
- `FileDropzone` - Universal file upload component
- `ChartContainer` - Wrapper for all chart components
- `LoadingSpinner` - Consistent loading states
- `EmptyState` - No data placeholders
- `ConfirmationDialog` - Action confirmations
- `ErrorBoundary` - Error handling wrapper
- `TooltipInfo` - Contextual help tooltips

### Common Utils

- `api.ts` - Axios client with interceptors
- `validation.ts` - Zod schemas for form validation
- `dateUtils.ts` - Date formatting and calculations
- `numberUtils.ts` - Currency and percentage formatting
- `constants.ts` - App-wide constants and configurations
- `storage.ts` - Local storage helpers
- `permissions.ts` - Role and permission checking

### Custom Hooks

- `useAuth` - Authentication state management
- `useLocalStorage` - Persistent local state
- `useDebounce` - Input debouncing
- `useInfiniteScroll` - Pagination for large lists
- `useFileUpload` - File upload state management
- `usePermissions` - Role-based access control

## API Integration Strategy

### Data Fetching

- **React Query** for caching, background updates, optimistic updates
- **Axios interceptors** for auth tokens, error handling, loading states
- **Error boundaries** for graceful error recovery

### Key API Endpoints

```typescript
// Authentication
POST /auth/login
POST /auth/logout
GET /auth/me

// Client Management
GET /clients
POST /clients
GET /clients/:id
PUT /clients/:id

// Statement Processing
POST /statements/upload
GET /statements/:id/parse
POST /statements/analyze

// Treasury Recommendations
GET /recommendations/:analysisId
PUT /recommendations/:id/approve
GET /products
GET /products/:id/eligibility

// Reporting
POST /reports/generate
GET /reports/:id/download
GET /reports/history

// Configuration
GET /config
PUT /config
GET /audit/logs
```

## Testing Strategy

### Testing Framework Setup

- **Vitest** - Fast unit test runner with native TypeScript support
- **React Testing Library** - Component testing with user-centric queries
- **MSW (Mock Service Worker)** - API mocking for integration tests
- **@testing-library/user-event** - User interaction simulation
- **@vitest/coverage-v8** - Code coverage reporting

### Test File Organization

```
src/
├── components/
│   └── __tests__/
│       ├── Button.test.tsx
│       └── DataTable.test.tsx
├── pages/
│   └── __tests__/
│       ├── Dashboard.test.tsx
│       └── Analysis.test.tsx
├── hooks/
│   └── __tests__/
│       └── useAuth.test.ts
├── utils/
│   └── __tests__/
│       └── formatters.test.ts
├── services/
│   └── __tests__/
│       └── api.test.ts
└── test/
    ├── setup.ts
    ├── test-utils.tsx
    ├── mocks/
    │   ├── handlers.ts
    │   └── server.ts
    └── fixtures/
        ├── users.ts
        └── transactions.ts
```

### Component Testing Patterns

```typescript
// Example: Button component test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Page Testing Strategy

```typescript
// Example: Dashboard page test
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Dashboard } from '../Dashboard'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('Dashboard', () => {
  it('displays metrics after loading', async () => {
    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/Total Clients/)).toBeInTheDocument()
    })
  })
})
```

### API Mocking with MSW

```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/clients', () => {
        return HttpResponse.json([
            { id: 1, name: 'ACME Corp', status: 'active' },
            { id: 2, name: 'TechStart Inc', status: 'pending' }
        ]);
    }),

    http.post('/api/statements/upload', () => {
        return HttpResponse.json({
            id: 'upload-123',
            status: 'processing'
        });
    })
];
```

### Test Utilities Setup

```typescript
// test/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### Key Test Cases by Feature

#### Authentication Tests

- Login form validation
- Successful authentication flow
- Token refresh handling
- Logout functionality
- Role-based route protection

#### Statement Upload Tests

- File validation (format, size)
- Upload progress tracking
- Error handling for invalid files
- Multi-file upload scenarios
- Drag and drop functionality

#### Analysis Dashboard Tests

- Data visualization rendering
- Filter functionality
- Table sorting and pagination
- Loading states
- Error boundary activation

#### Recommendation Engine Tests

- Product matching logic
- Benefit calculation accuracy
- Approval workflow states
- Filter and search functionality
- Export functionality

#### Form Validation Tests

```typescript
// Example: Statement upload form validation
describe('StatementUploader validation', () => {
  it('shows error for unsupported file types', async () => {
    render(<StatementUploader />)

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByLabelText(/upload/i)

    await userEvent.upload(input, file)

    expect(screen.getByText(/unsupported file type/i)).toBeInTheDocument()
  })
})
```

### Coverage Goals

- **Components:** 90%+ test coverage
- **Utils/Services:** 95%+ test coverage
- **Critical user flows:** 100% E2E coverage
- **Error handling:** All error boundaries and fallbacks tested

### Continuous Integration

- Run tests on every PR
- Coverage reporting with threshold enforcement
- Visual regression testing for critical components
- Performance testing for data-heavy components

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

- Authentication system
- Basic routing and layout
- Common components library
- API integration setup

### Phase 2: Core Features (Week 3-5)

- Statement upload and parsing
- Basic analysis dashboard
- Client management
- Report generation

### Phase 3: Advanced Features (Week 6-7)

- Recommendation engine
- Product catalog integration
- Advanced analytics
- Admin configuration

### Phase 4: Polish & Testing (Week 8)

- Comprehensive testing
- Performance optimization
- Accessibility compliance
- Documentation completion

## Success Criteria

- All user flows complete within 60 seconds
- 90%+ test coverage on critical components
- WCAG 2.1 AA compliance
- Mobile responsive design
- Sub-3 second page load times
- Error-free TypeScript compilation
- All linting rules passing
