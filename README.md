# Personal Website

A modern personal website with retro aesthetic featuring blog, videos, photo gallery, and contact form.

## Features

- 🎨 **Retro Design** - Warm color palette with modern usability
- 📝 **Blog System** - MDX-based blog with frontmatter support
- 🎥 **Video Gallery** - YouTube integration with lite-youtube-embed
- 📸 **Photo Gallery** - Polaroid-style frames with lightbox
- 📧 **Contact Form** - Secure form with validation and spam protection
- 🔒 **Security** - Security headers and best practices
- ⚡ **Performance** - Optimized for Core Web Vitals
- ♿ **Accessibility** - WCAG 2.1 AA compliant

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Content**: MDX/Markdown
- **Video**: lite-youtube-embed

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (for sitemap and SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# YouTube API (optional - for video gallery)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Email Service (optional - for contact form)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

### YouTube Integration

To enable YouTube video fetching:

1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add `YOUTUBE_API_KEY` and `YOUTUBE_CHANNEL_ID` to `.env.local`
3. Create an API route at `app/api/youtube-videos/route.ts` to fetch videos

### Contact Form

To enable email sending:

1. Sign up for [Resend](https://resend.com/) or another email service
2. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local`
3. Create an API route at `app/api/contact/route.ts` to handle form submissions

## Blog Posts

Create blog posts by adding `.mdx` or `.md` files to the `content/blog` directory with frontmatter:

```markdown
---
title: "My Blog Post"
date: "2024-01-15"
excerpt: "A brief description of the post"
tags: ["tag1", "tag2"]
featuredImage: "https://example.com/image.jpg"
---

Your content here...
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── about/           # About page
│   ├── blog/            # Blog pages
│   ├── contact/         # Contact form
│   ├── gallery/         # Photo gallery
│   ├── videos/          # Video gallery
│   └── layout.tsx       # Root layout
├── components/           # React components
├── content/             # Content files
│   └── blog/           # Blog posts (MDX/MD)
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette.

### Typography

Update font imports in `app/globals.css` and `tailwind.config.ts`.

### Content

- Update personal information in `app/about/page.tsx`
- Add your social links in `components/Footer.tsx`
- Customize the homepage in `app/page.tsx`

## License

MIT

