# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Included

✅ **Complete Next.js 14 setup** with TypeScript and Tailwind CSS
✅ **Retro-themed design system** with warm colors and modern aesthetics
✅ **All core pages**: Home, About, Videos, Gallery, Blog, Contact
✅ **Blog system** with MDX support (example post included)
✅ **Photo gallery** with Polaroid-style frames and lightbox
✅ **Video gallery** with YouTube integration (ready for API setup)
✅ **Contact form** with validation and spam protection
✅ **SEO optimization** with meta tags, sitemap, and robots.txt
✅ **Security headers** configured in next.config.js
✅ **Accessibility** features built-in

## Next Steps

1. **Customize content**: 
   - Update personal information in `app/about/page.tsx`
   - Add your social links in `components/Footer.tsx`
   - Customize the homepage in `app/page.tsx`

2. **Add blog posts**: 
   - Create `.mdx` or `.md` files in `content/blog/`
   - See `content/blog/example-post.mdx` for format

3. **Set up YouTube integration** (optional):
   - Get API key from Google Cloud Console
   - Add to `.env.local`
   - Uncomment code in `app/api/youtube-videos/route.ts`

4. **Set up contact form** (optional):
   - Sign up for Resend
   - Add API key to `.env.local`
   - Uncomment code in `app/api/contact/route.ts`

5. **Deploy**: 
   - Push to GitHub
   - Deploy to Vercel (recommended) or your preferred platform

## Customization

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Update imports in `app/globals.css`
- **Layout**: Modify components in `components/` directory

Enjoy building your personal website! 🚀

