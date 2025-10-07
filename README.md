# Frontend Technical Test - Leboncoin

## Technical Stack

- **Next.js 15** - App Router with Server Components
- **React 19** - Latest features
- **TypeScript** - Strict mode
- **Tailwind CSS v4** - Latest @theme syntax
- **React Query v5** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Runtime validation
- **DOMPurify** - XSS protection
- **date-fns** - Date formatting

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment (optional):
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Default values:
NEXT_PUBLIC_API_URL=http://localhost:3005
PORT=3000
```

3. Start the API server (Terminal 1):
```bash
npm run start-server
# API runs on http://localhost:3005
```

4. Start the development server (Terminal 2):
```bash
npm run dev
# App runs on http://localhost:3000
```

5. Open [http://localhost:3000](http://localhost:3000)

---

## Features Implemented

### ✅ Core Features
- View conversations list with avatar and last message timestamp
- View messages in a conversation with proper formatting
- Send messages with React Hook Form validation
- Auto-scroll to bottom when new messages arrive
- Responsive design (mobile + desktop)
- i18n support (en/fr) via URL routing

### ✅ Bonus 1: Create New Conversations
- Modal to select user with visual feedback
- Prevents duplicate conversations (navigates to existing)
- Creates conversation via API
- Optimistic UI updates with React Query
- Form validation with Zod

### ✅ Bonus 2: Handle 503 Errors
- ErrorMessage component with friendly error message
- Retry button with React Query integration
- Error boundaries with error.tsx

### ✅ Additional Features Implemented

**UI Polish:**
- Loading skeletons for better UX
- Partner name displayed in conversation header
- Visual dividing lines in modal
- Consistent color scheme matching Leboncoin brand
- Back button navigation

**Performance:**
- Lazy loading for CreateConversationModal (code splitting)
- React.memo on Avatar component
- useMemo for conversation-user data joining
- React Query caching (30s for conversations, 60s for users)
- Link prefetching for instant navigation
- Visibility-based polling (only polls when tab is active)
- Auto-refresh messages every 5 seconds

**Accessibility:**
- ARIA labels on all interactive elements
- ARIA roles (dialog, alert, log, article, nav)
- Focus visible styles (focus rings) on all interactive elements
- Semantic HTML (<nav>, <main>, <header>)
- aria-hidden on decorative SVG icons
- aria-live for dynamic message content
- Keyboard navigation support

**Security:**
- Input validation with Zod
- XSS protection with DOMPurify on user-generated content
- Normalized data model (no nickname duplication)

---

## Architecture Decisions

### Database & API Choice

**Choice:** json-server with custom middleware

**Mock Backend:**
- Server: `src/server/server.js` (custom middleware)
- Database: `src/server/db.json`
- Port: 3005

**API Endpoints:**
```
GET    /conversations?userId=X          # List conversations
GET    /conversations?userId=X&userId=Y # OR filter (custom)
GET    /messages?conversationId=X       # List messages
POST   /messages                        # Send message
POST   /conversations                   # Create conversation
GET    /users                           # List users
```

**Custom Middleware:**
- OR filtering for conversations (`?userId=1&userId=2`)
- Auto-generates metadata on POST /conversations
- CORS enabled for development

**Why this choice:**
- **Fast setup** - Critical for time constraint
- **Custom logic** - Middleware allows OR filtering, metadata generation
- **Persistent data** - Changes saved during development
- **Real API feel** - Proper endpoints, not just mock data

**Trade-offs:**
- Not production-ready (no auth, validation, relationships)
- Reset required: `git checkout src/server/db.json`

### Data Model: Normalized vs Denormalized
**Choice:** Normalized (users fetched separately, client-side join)

**Trade-offs considered:**
- **Denormalized:** Store nicknames in conversations → 1 API call, but stale data if users change nicknames
- **Normalized:** Fetch users separately → Always fresh data, but 2 API calls

**Why normalized:**
1. **Data integrity** - Single source of truth for user information
2. **Scalability** - Easy to add user features (avatars, status, profiles)
3. **React Query caching** - The "two API calls" concern is mitigated:
   - `['users']` cached for 60s with `staleTime: 60000`
   - `['conversations']` cached for 30s with `staleTime: 30000`
   - After first load, no redundant fetches across components
   - Modal reuses cached users data instantly
4. **Future-proof** - If user editing is added later, no migration needed

**Performance impact:** Minimal. Both queries run in parallel, and React Query ensures users are fetched once and shared across ConversationList, ConversationHeader, and CreateConversationModal.

### Why React Query?
- **Automatic caching** - Reduces API calls
- **Request deduplication** - Multiple components = 1 API call
- **Built-in retry logic** - Perfect for 503 error handling
- **Optimistic updates** - Instant UI feedback

### Why React Hook Form + Zod?
- **Runtime validation** - Catches invalid data
- **TypeScript integration** - Type inference from schemas
- **Better performance** - Uncontrolled components
- **Built-in error handling**

### Why Lazy Loading?
- **Smaller initial bundle** - Modal only loads when needed
- **Faster initial page load**
- **Code splitting** - Automatic with React.lazy

---

## Future Improvements

> **Note:** These are improvements I would add with more time. They represent conscious trade-offs made for the time constraint.

### 🧪 Testing
**Current:** No automated tests
**Improvement:**
- Unit tests for critical functions (utils, sanitization, validation)
- Integration tests for components (React Testing Library)
- E2E tests with Playwright
- Visual regression tests
- Performance testing (Lighthouse CI)

**Why not now:** Time constraint (4h limit for technical test)
**Time needed:** +2-3 hours

**Priority tests to add:**
```typescript
// lib/utils.test.ts
- getAvatarColor() returns consistent colors
- getInitials() handles edge cases (empty, single word, special chars)
- formatTime() works across locales

// lib/sanitize.test.ts
- sanitize() removes XSS attacks
- sanitize() preserves safe HTML

// components/Avatar.test.tsx
- renders with correct color and initials
- memo prevents unnecessary re-renders
```

### ♿ Advanced Accessibility
**Current:** Basic ARIA labels, semantic HTML, keyboard nav
**Improvement:**
- Full WCAG 2.1 AA compliance
- Focus trap in modal (prevent tabbing out)
- Escape key to close modal
- Automated testing with jest-axe
- Screen reader testing (VoiceOver, NVDA)
- Skip to main content link
- Reduced motion support

**Why not now:** Basic accessibility is production-ready, full audit takes time
**Time needed:** +1 hour

**What would be added:**
- useEffect for focus management in modal
- Keyboard event handlers (Escape, Tab trap)
- @media (prefers-reduced-motion)
- Comprehensive aria-live regions

### ⚡ Performance
**Current:** Lazy loading, React Query caching, useMemo, visibility-based polling
**Improvement:**
- Virtual scrolling for long message lists (react-window)
- Service Worker for offline support
- Image optimization (next/image)
- Web Vitals monitoring
- Bundle analysis and optimization

**Why not now:** Current performance is excellent for demo scale
**Time needed:** +1-2 hours

### 🎨 Additional Features
**Could be added with more time:**

**Conversation Management:**
- Sort conversations (by date, name, unread)
- Delete conversations
- Archive conversations
- Mark as read/unread
- Conversation search with debouncing

**Message Features:**
- Delete messages
- Edit messages
- Message reactions
- Typing indicators
- Read receipts
- File attachments

**User Experience:**
- Dark mode toggle
- Custom themes
- Notification system
- Message drafts
- Infinite scroll for messages

**Why not now:** Core messaging functionality is complete, these are nice-to-haves
**Time needed:** +3-5 hours

### 🔒 Security
**Current:** Zod validation, DOMPurify sanitization
**Improvement:**
- Rate limiting on frontend
- CSRF protection
- Content Security Policy headers
- Input sanitization audit
- Penetration testing
- Authentication (currently hardcoded user ID)

**Why not now:** Basic security is covered, advanced features need backend support
**Time needed:** +1-2 hours

---

## Project Structure

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Conversation list
│   │   ├── error.tsx           # Error boundary
│   │   ├── providers.tsx       # React Query provider
│   │   └── conversations/
│   │       └── [id]/
│   │           └── page.tsx    # Conversation detail
├── components/
│   ├── Avatar.tsx              # Memoized avatar component
│   ├── ConversationHeader.tsx  # Partner name header
│   ├── ConversationList.tsx    # List with useMemo optimization
│   ├── ConversationListWithModal.tsx
│   ├── CreateConversationModal.tsx  # Lazy loaded
│   ├── ErrorMessage.tsx        # Retry UI
│   ├── LoadingSkeleton.tsx
│   ├── MessageInput.tsx
│   └── MessageList.tsx         # With visibility polling
├── lib/
│   ├── api.ts                  # API client
│   ├── sanitize.ts             # XSS protection
│   ├── schemas.ts              # Zod validation
│   └── utils.ts                # Utilities
├── locales/
│   └── index.ts                # i18n translations
├── server/
│   ├── db.json                 # Mock database
│   └── server.js               # Custom middleware
└── utils/
    └── getLoggedUserId.ts      # Auth placeholder
```

---

## Key Implementation Highlights

### 1. Performance Optimization
- **Code splitting:** Modal lazy loaded only when opened
- **Smart caching:** Different staleTime for different data types
- **Efficient polling:** Only when tab is visible
- **Memoization:** Prevents unnecessary re-renders and recalculations

### 2. User Experience
- **Optimistic updates:** UI responds instantly
- **Auto-scroll:** New messages scroll into view
- **Loading states:** Skeleton screens during fetch
- **Error handling:** Friendly messages with retry

### 3. Code Quality
- **Type safety:** TypeScript strict mode
- **Validation:** Zod schemas for runtime safety
- **Security:** DOMPurify for XSS protection
- **Accessibility:** ARIA labels and semantic HTML

---

## Notes for Reviewers

I used **Claude Code as a pair programming partner** to:
- Speed up boilerplate code
- Discuss architecture decisions
- Ensure React/Next.js best practices
- Implement performance optimizations

**All architectural decisions and priorities were mine.**

The implementation showcases:
- Modern React 19/Next.js 15 patterns
- Production-ready performance optimizations
- Accessibility awareness
- Security best practices
- Realistic scope

---

## License

This is a technical test project for Leboncoin.
