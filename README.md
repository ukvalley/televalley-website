# Televalley - Blog System & SEO Content Engine

A professional SaaS website for Televalley, a mobile-first, SIM-based telecalling CRM. Built with React and Express.js.

## Project Structure

```
televalley website/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI sections
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.jsx          # Main app with routing
│   │   └── index.css        # Global styles + Tailwind
│   └── dist/                # Production build
├── server/                  # Express backend
│   ├── routes/              # API routes
│   ├── index.js             # Server entry
│   └── .env                 # Environment variables
└── package.json             # Root package with scripts
```

## Tech Stack

**Frontend:**
- React 19 + React Router DOM
- Vite (build tool)
- Tailwind CSS v3
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts)
- Axios (HTTP client)

**Backend:**
- Express.js
- CORS, Helmet, Morgan (middleware)
- Express Rate Limit
- Express Validator

## Features Implemented

### Website Sections
- **Hero Section** - Core value proposition with animated stats
- **About Us** - Mission, vision, and core values
- **Services** - 8 core telecalling services
- **Features** - 8 detailed product features with checklists
- **Case Studies** - 3 industry-specific success stories
- **Industries Served** - Real Estate, Insurance, EdTech, Finance, B2B Sales
- **Testimonials** - Carousel with customer quotes and ratings
- **Team** - Founder and key team members
- **FAQs** - Accordion with 8 common questions
- **CTA Blocks** - Urgency-driven trial signup
- **Contact** - Full contact form with validation

### Backend APIs
- **Leads API** - CRUD, scoring, status tracking, statistics
- **Blog API** - Posts, categories, tags, search, pagination
- **Contact API** - Form submissions with validation
- **Analytics API** - Event tracking, dashboard metrics
- **CMS API** - Content management endpoints
- **Integrations API** - CRM sync status (mock)

### Additional Features
- Responsive design (mobile-first)
- SEO-optimized meta tags and headings
- Analytics event tracking
- Form validation with express-validator
- Rate limiting for API protection
- Dark theme with brand color scheme
- Smooth scroll animations with Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Start both client and server:
```bash
npm run dev
```

This runs the React app at `http://localhost:5173` and the Express server at `http://localhost:5001`.

### Environment Variables

**Server** (`server/.env`):
```env
PORT=5001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Client** (optional, `client/.env`):
```env
VITE_API_URL=http://localhost:5001/api
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server |
| `npm run client` | Start React dev server only |
| `npm run server` | Start Express server only |
| `npm run build` | Build production client |
| `npm run install:all` | Install all dependencies |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/leads` | GET/POST | Lead management |
| `/api/leads/stats/overview` | GET | Lead statistics |
| `/api/blog` | GET | Blog posts list |
| `/api/blog/post/:slug` | GET | Single blog post |
| `/api/blog/categories` | GET | Blog categories |
| `/api/blog/tags` | GET | Blog tags |
| `/api/contact` | POST | Contact form |
| `/api/analytics/event` | POST | Track event |
| `/api/analytics/dashboard` | GET | Analytics dashboard |
| `/api/cms/content/:key` | GET/PUT | CMS content |
| `/api/integrations/crm/status` | GET | CRM integration status |

## SEO Keywords Targeted

- SIM-based telecalling CRM
- Mobile-first CRM for sales
- Telecalling software
- Outbound call management software
- CRM for real estate brokers
- Automated follow-up CRM
- VoIP alternative for sales teams

## Brand Identity

- **Brand Name:** Televalley
- **Tagline:** Sell From Anywhere. Miss Nothing.
- **Primary Color:** #C8FF2E (Lime)
- **Secondary Color:** #1E293B (Slate)
- **Accent Color:** #22D3EE (Cyan)
- **Background:** #0D1117 (Dark)
- **Typography:** Inter (headings + body), JetBrains Mono (accent)

## License

© 2024 Televalley. All rights reserved.
