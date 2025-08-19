# Birthday Website Application

## Overview

This is a modern full-stack web application built as a personalized birthday website for "Dalia". The application features an interactive birthday celebration page with animations, countdown timer, compliments generator, and various festive elements themed around Disney's Stitch character.

## User Preferences

Preferred communication style: Simple, everyday language.
User expressed satisfaction with project completion (August 15, 2025).
Requested automatic music playback on mobile and intelligent video-music coordination.
Requested auto-hide navigation bar on scroll and fullscreen video playback.
Added analytics system to track when Dalia visits the birthday website (August 19, 2025).

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom Stitch-themed color variables
- **UI Components**: Comprehensive component library using Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Component Architecture**: Modular component structure with reusable UI elements

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API structure with /api prefix routing

## Key Components

### Frontend Components
1. **Birthday Page**: Main landing page with festive animations and sections
2. **Navigation**: Responsive navigation with mobile hamburger menu
3. **Floating Hearts**: Animated background elements for visual appeal
4. **Countdown Timer**: Real-time countdown to next birthday (July 13, 2025)
5. **Compliments Generator**: Interactive feature generating random compliments
6. **Music Player**: Background music player with automatic mobile playback and video coordination
7. **Video Player**: Special video section with intelligent music pause/resume functionality
8. **Analytics Page**: Visit tracking dashboard accessible at /analytics route

### Backend Components
1. **Express Server**: Main application server with middleware setup
2. **Storage Interface**: Abstracted storage layer with in-memory implementation
3. **User Management**: Basic user schema and CRUD operations
4. **Route Registration**: Modular route handling system

### Database Schema
- **Users Table**: Basic user management with username/password fields
- **Visits Table**: Analytics tracking with timestamp, user agent, and IP address
- **Drizzle Integration**: Type-safe database operations with schema validation
- **Zod Validation**: Runtime type checking for data integrity

## Data Flow

1. **Client Requests**: Frontend makes API calls to backend endpoints
2. **Server Processing**: Express server handles requests with middleware pipeline
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with proper error handling
5. **State Management**: TanStack Query manages client-side caching and synchronization

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI for accessible component primitives
- **Animations**: Canvas Confetti for celebration effects
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: Date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod resolvers

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **ORM**: Drizzle ORM for database operations
- **Validation**: Zod for schema validation

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (configured via components.json)
- **Build Process**: Vite with React plugin and development optimizations

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild compiles TypeScript server to `dist/index.js`
3. **Database Migrations**: Drizzle Kit handles schema migrations
4. **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Development Workflow
- **Development Server**: Concurrent frontend (Vite) and backend (tsx) servers
- **Hot Reload**: Vite provides fast refresh for frontend changes
- **Database**: Drizzle Kit provides push/migration commands
- **Type Safety**: Shared schema types between frontend and backend

### Production Considerations
- **Static Assets**: Frontend built to static files served by Express
- **Database**: Serverless PostgreSQL through Neon Database
- **Performance**: Optimized builds with tree-shaking and minification
- **Error Handling**: Comprehensive error boundaries and API error responses

The application is designed as a celebratory birthday website with modern web technologies, providing an engaging user experience with animations, interactive elements, and a responsive design that works across devices.