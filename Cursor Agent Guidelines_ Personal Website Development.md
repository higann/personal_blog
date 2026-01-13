# Cursor Agent Guidelines: Personal Website Development

# Project Overview

This document provides comprehensive prompts, guidelines, and rules for building a personal website using Cursor AI. The website combines personal branding, multimedia content, and blogging functionality with a **modern retro aesthetic**.

## 1 Core Requirements

- **Personal Information Section** - About me, bio, contact details
- **Video Viewing Section** - YouTube integration for video content
- **Photo Gallery** - Image showcase with modern presentation
- **Blog Platform** - Frequently updated content management
- **Retro Theme** - Modern interpretation of retro aesthetics
- **Security First** - Protected, secure implementation

# 1 Design System & Theme Guidelines

## 1.1 Retro Aesthetic Direction

The design should evoke **nostalgic warmth** while maintaining modern usability. Think 70s-80s inspired with contemporary polish - not dated or kitschy.

## 1.2 Color Palette Prompt

**Prompt for Cursor:**
"Implement a retro-inspired color palette with warm, muted tones. Use these as the primary palette:"

- **Primary**: Burnt Orange (#CC5500) or Terracotta (#E07A5F)
- **Secondary**: Mustard Yellow (#E9B44C) or Avocado Green (#568259)
- **Background**: Cream/Off-white (#FAF3E0) or Warm Beige (#F5E6D3)
- **Accent**: Deep Teal (#264653) or Burgundy (#722F37)
- **Text**: Warm Charcoal (#3D3D3D) - never pure black
- **Subtle gradients** with grain/noise texture overlay for authentic retro feel

## 1.3 Typography Prompt

**Prompt for Cursor:**
"Use typography that balances retro character with readability:"

- **Headings**: Use a retro display font - Space Grotesk, Archivo Black, or DM Serif Display
- **Body Text**: Clean sans-serif - Inter, Source Sans Pro, or Outfit
- **Accent Text**: Optional monospace for dates/metadata - JetBrains Mono or IBM Plex Mono
- **Font Sizes**: Use a modular scale (1.25 ratio) for hierarchy
- **Letter Spacing**: Slightly increased for headings (0.02em to 0.05em)

## 1.4 Visual Elements Prompt

**Prompt for Cursor:**
"Incorporate these retro-inspired visual elements:"

- **Rounded corners** (8px-16px) on cards and buttons
- **Subtle drop shadows** with warm color tints, not gray
- **Grain/noise texture** overlay on backgrounds (2-5% opacity)
- **Geometric patterns** for section dividers or backgrounds
- **Vintage-style borders** - double lines or dashed patterns
- **Hover states** with smooth transitions (0.3s ease) and subtle scale effects
- **Polaroid-style** frames for photos
- **Cassette tape or VHS-inspired** elements for video section

# 2 Page Structure & Component Prompts

# 3 Security Guidelines & Rules

# 4 Development Rules & Best Practices

## 4.1 Code Quality Rules

**Prompt for Cursor:**
"Follow these coding standards strictly:"

1. **TypeScript Required**: Use TypeScript for type safety. No 'any' types without justification.
2. **Component Architecture**: Small, reusable components. Max 200 lines per component.
3. **Naming Conventions**: PascalCase for components, camelCase for functions/variables, SCREAMING_SNAKE for constants.
4. **Error Handling**: Try-catch all async operations. Provide user-friendly error messages.
5. **Loading States**: Always show loading indicators for async operations.
6. **Accessibility (a11y)**: WCAG 2.1 AA compliance. Semantic HTML, ARIA labels, keyboard navigation.
7. **Comments**: Document complex logic. Use JSDoc for functions.
8. **Testing**: Unit tests for utilities, integration tests for critical paths.

## 4.2 Performance Rules

**Prompt for Cursor:**
"Optimize for performance from the start:"

- **Core Web Vitals**: Target LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Image Optimization**: Use next/image or equivalent. WebP/AVIF formats. Proper sizing.
- **Code Splitting**: Dynamic imports for heavy components (video player, gallery lightbox)
- **Font Loading**: Use font-display: swap. Subset fonts if possible.
- **Bundle Analysis**: Keep JS bundle under 200KB gzipped
- **Caching**: Implement proper cache headers. Use ISR for blog posts.
- **Prefetching**: Prefetch links on hover for instant navigation

## 4.3 SEO Requirements

**Prompt for Cursor:**
"Implement SEO best practices:"

- **Meta Tags**: Dynamic title, description, Open Graph, Twitter cards for each page
- **Structured Data**: JSON-LD for Person, Article, VideoObject schemas
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Proper crawl directives
- **Canonical URLs**: Prevent duplicate content issues
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy, article tags for blog posts

# 5 Tech Stack Recommendation

## 5.1 Recommended Stack

**Prompt for Cursor:**
"Use this modern, secure tech stack:"

| Layer | Technology | Reason |
| --- | --- | --- |
| Framework | Next.js 14+ (App Router) | SSR/SSG, great DX, built-in optimizations |
| Styling | Tailwind CSS + CSS Modules | Utility-first with scoped custom styles |
| Animation | Framer Motion | Smooth, performant animations |
| Content | MDX or Sanity CMS | Flexible content management |
| Images | Cloudinary or Vercel Blob | Optimized delivery and transformations |
| Video | lite-youtube-embed | 90% smaller than standard YouTube embed |
| Forms | React Hook Form + Zod | Validation with type safety |
| Email | Resend or SendGrid | Reliable email delivery |
| Hosting | Vercel or Netlify | Edge network, easy deployments |
| Analytics | Plausible or Umami | Privacy-focused, GDPR compliant |

# 6 File Structure Template

# 7 Deployment Checklist

**Prompt for Cursor:**
"Before deploying, verify:"

- ☐ All environment variables set in production
- ☐ Security headers configured
- ☐ HTTPS enforced
- ☐ Forms tested with spam protection
- ☐ Images optimized and loading correctly
- ☐ YouTube integration working
- ☐ Mobile responsive on all pages
- ☐ Lighthouse score > 90 on all metrics
- ☐ 404 and error pages styled
- ☐ Analytics connected
- ☐ Sitemap and robots.txt accessible
- ☐ Social sharing previews correct
- ☐ Contact form sends emails successfully
- ☐ No console errors in production

# 8 Quick Reference Prompts

Copy-paste these prompts directly into Cursor for specific tasks:

## 8.1 Initial Setup

"Create a Next.js 14 project with TypeScript, Tailwind CSS, and App Router. Set up a retro-themed design system with warm colors (burnt orange, mustard, cream), rounded corners, and subtle grain textures. Include security headers in next.config.js."

## 8.2 YouTube Integration

"Build a video gallery page that fetches videos from my YouTube channel using the Data API v3. Display thumbnails in a retro TV-set styled grid. Use lite-youtube-embed for performance. Include error handling and a fallback for API failures."

## 8.3 Blog Setup

"Create a blog system using MDX files in a /content folder. Include frontmatter parsing for title, date, tags, and featured image. Build an index page with card layout and individual post pages with reading time, table of contents, and related posts."

## 8.4 Photo Gallery

"Build a responsive photo gallery with masonry layout and Polaroid-style frames. Include a lightbox modal with navigation, lazy loading, and blur placeholders. Support album organization and optional vintage color filters."

## 8.5 Contact Form

"Create a secure contact form with React Hook Form and Zod validation. Include honeypot spam protection, rate limiting, and reCAPTCHA v3. Send emails via Resend API. Style with retro button and input designs."
