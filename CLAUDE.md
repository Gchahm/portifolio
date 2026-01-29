# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio/website built with **Payload CMS 3.x** and **Next.js 15** (App Router). It uses MongoDB as the database and is deployed on Cloudflare.

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server on localhost:3000

# Build & Production
pnpm build                  # Build for production (generates sitemap post-build)
pnpm start                  # Start production server

# Linting
pnpm lint                   # Run ESLint
pnpm lint:fix               # Run ESLint with auto-fix

# Payload CLI
pnpm payload generate:types # Generate TypeScript types from Payload schema
pnpm payload migrate:create # Create a new database migration
pnpm payload migrate        # Run pending migrations

# Testing (Vitest)
pnpm vitest                 # Run tests in watch mode
pnpm vitest run             # Run tests once
pnpm vitest run <file>      # Run single test file
```

## Architecture

### Tech Stack
- **CMS**: Payload CMS 3.x with Lexical rich text editor
- **Frontend**: Next.js 15 App Router, React 19, TailwindCSS 4, shadcn/ui
- **Database**: MongoDB via `@payloadcms/db-mongodb`
- **Storage**: AWS S3 via `@payloadcms/storage-s3`
- **Deployment**: Cloudflare

### Directory Structure

- `src/app/(frontend)/` - Public-facing Next.js pages
- `src/app/(payload)/` - Payload admin panel routes
- `src/collections/` - Payload collection definitions (Pages, Posts, Media, Users, Categories, WorkExperiences, Projects)
- `src/blocks/` - Layout builder blocks (ArchiveBlock, Banner, Code, Content, Form, MediaBlock)
- `src/heros/` - Hero section components and config
- `src/fields/` - Reusable Payload field configurations
- `src/components/` - Shared React components
- `src/utilities/` - Helper functions
- `src/providers/` - React context providers (Theme, HeaderTheme)
- `src/Footer/` and `src/Header/` - Global configurations

### Path Aliases
- `@/*` maps to `./src/*`
- `@payload-config` maps to `./src/payload.config.ts`

### Payload Collections
Main collections defined in `src/payload.config.ts`:
- **Pages** - Static pages with layout builder
- **Posts** - Blog posts with drafts and scheduled publishing
- **Media** - File uploads (stored in S3)
- **Categories** - Taxonomy for posts (supports nesting)
- **Users** - Authentication and admin access
- **WorkExperiences** - Portfolio work history
- **Projects** - Portfolio projects

### Globals
- **Header** - Navigation configuration
- **Footer** - Footer links and content

### Key Patterns
- Draft/publish workflow with version history
- On-demand revalidation via `afterChange` hooks
- Live preview support for content editing
- SEO plugin integration for meta tags
- Search plugin for SSR search functionality
