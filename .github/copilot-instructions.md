# Salem Cyber Vault - GitHub Copilot Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in these instructions is incomplete or found to be in error.**

## Project Overview

Salem Cyber Vault is a Next.js 14.2.5 React application built with TypeScript, Tailwind CSS, and shadcn/ui components. It's a cybersecurity intelligence platform with vulnerability analysis, threat intelligence, and various security scanning capabilities powered by Supabase functions.

## Development Environment Setup

### Required Dependencies
- **Node.js v20.19.5** (confirmed working version)
- **pnpm 10.16.1** (package manager - install with `npm install -g pnpm`)
- **Docker 28.0.4** (available for containerization)

### Bootstrap Commands
Run these commands in order on a fresh clone:

```bash
# 1. Install pnpm globally (if not available)
npm install -g pnpm

# 2. Install dependencies (takes ~5 seconds)
pnpm install

# 3. Start development server (takes ~2 seconds, ready in ~1-2 seconds)
pnpm run dev
```

**CRITICAL TIMING:** 
- Dependencies install: ~5 seconds - NEVER CANCEL
- Dev server startup: ~2 seconds - NEVER CANCEL
- Build process: ~15+ seconds (currently fails, see Known Issues) - NEVER CANCEL, set timeout to 300+ seconds

## Working Commands & Validation

### Development Server
- **Command:** `pnpm run dev`
- **URL:** http://localhost:3000
- **Expected time:** 1-2 seconds to ready
- **Validation:** Application loads and displays "Salem Cyber Vault" title successfully

### Linting
- **Issue:** ESLint configuration conflicts prevent standard linting
- **Status:** Currently broken due to version incompatibilities
- **Workaround:** Development server performs live error checking

### Building
- **Command:** `pnpm run build`
- **Status:** Currently fails due to server-side useState hook issues
- **Time:** ~15 seconds before failure
- **Limitation:** Build works for development but fails during static generation

## Project Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Home page (routes to OverviewPage)
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components (DO NOT EDIT)
│   │   └── providers.tsx    # QueryClient wrapper
│   ├── pages/               # Main application pages
│   │   ├── OverviewPage.tsx # Dashboard overview (default page)
│   │   ├── VulnerabilityAnalysisPage.tsx # CVE search
│   │   ├── ThreatIntelSearch.tsx # Threat intelligence
│   │   ├── IntelligenceScannerPage.tsx # Scanner page
│   │   └── Dashboard.tsx    # Main dashboard
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   └── utils/               # Helper functions
├── supabase/
│   └── functions/           # Serverless functions
│       ├── cve-search-api/
│       ├── virustotal-api/
│       ├── shodan-api/
│       └── [others]/        # Various security API integrations
├── public/                  # Static assets
└── package.json             # pnpm project configuration
```

## Key Development Patterns

### Adding New Components
1. **Always use shadcn/ui components** - they're pre-installed
2. **Create new components in `src/components/`**
3. **Update `src/pages/Index.tsx` or relevant page to display new components**
4. **Use TypeScript for all new code**
5. **Style with Tailwind CSS extensively**

### Working with API Integrations
- **Supabase functions** are located in `supabase/functions/`
- **All functions follow the same pattern** with CORS headers and error handling
- **Environment variables** are in `.env` (Supabase URL and anon key configured)
- **API calls** use React Query (@tanstack/react-query) for state management

### Client vs Server Components
- **Root layout is server component** - do not add hooks directly
- **Use `providers.tsx` wrapper** for QueryClient and other providers
- **Mark components with 'use client'** when using React hooks
- **All page components** should be client components for interactivity

## Known Issues & Limitations

### Build Process
- **Production build fails** due to useState hooks in server-rendered components
- **Development mode works perfectly** - use for all development
- **Static generation errors** occur on multiple pages
- **Workaround:** Only use development server for testing changes

### Linting
- **ESLint configuration conflicts** between Next.js and standalone configs
- **Current state:** Linting disabled due to version incompatibilities
- **Recommendation:** Rely on TypeScript compiler and development server error reporting

### Testing
- **No test suite configured** - manual testing required
- **Validation method:** Run development server and test functionality manually
- **Browser testing:** Use http://localhost:3000 for validation

## Manual Validation Scenarios

After making changes, ALWAYS test these scenarios:

1. **Basic Startup Test:**
   ```bash
   pnpm run dev
   curl http://localhost:3000 | grep "Salem Cyber Vault"
   ```

2. **Page Navigation Test:**
   - Visit http://localhost:3000
   - Verify dashboard loads with "Welcome to Salem Cyber Vault" header
   - Check sidebar navigation is functional
   - Test tab switching between Overview and Recent Activity

3. **Component Integration Test:**
   - Add new components to relevant pages
   - Verify they render without errors
   - Check responsive design with browser dev tools

## Environment Configuration

### Required Environment Variables
- `VITE_SUPABASE_URL` - Configured in `.env`
- `VITE_SUPABASE_ANON_KEY` - Configured in `.env`

### Supabase Functions
- **All functions require API keys** stored as Supabase secrets
- **Functions are deployed separately** from main application
- **Local development** doesn't require function deployment

## Docker Support

- **Dockerfile present** but configured for Tor Browser, not the application
- **Current purpose:** Tor Browser container for privacy testing
- **Application containerization:** Not currently configured

## Troubleshooting

### Development Server Won't Start
1. Check Node.js version: `node --version` (should be v20.19.5)
2. Reinstall dependencies: `rm -rf node_modules .next && pnpm install`
3. Check port 3000 availability: `lsof -i :3000`

### Import Errors
1. **Use absolute imports:** `@/components/...` instead of relative paths
2. **Check TypeScript compilation:** Development server shows type errors
3. **Verify shadcn/ui imports:** All components are pre-installed

### Performance Issues
1. **Development server is fast** - startup in 1-2 seconds is normal
2. **Build times vary** - expect 15+ seconds before current failure
3. **Dependencies install quickly** - 5 seconds is normal

## Critical Reminders

- **NEVER CANCEL** dependency installation (5 seconds)
- **NEVER CANCEL** development server startup (2 seconds)  
- **NEVER CANCEL** build attempts (set 300+ second timeout)
- **ALWAYS test manually** after changes using development server
- **DO NOT edit shadcn/ui components** - create new components instead
- **ALWAYS use TypeScript** for type safety
- **ALWAYS test responsive design** with Tailwind utilities

## Quick Reference Commands

```bash
# Start fresh development
pnpm install && pnpm run dev

# Check application health
curl -s http://localhost:3000 | grep "Salem Cyber Vault"

# Clean restart
rm -rf node_modules .next && pnpm install && pnpm run dev

# View project structure
find src -type f -name "*.tsx" -o -name "*.ts" | head -20
```