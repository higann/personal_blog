# Content Management Guide

This guide explains how to add new blog posts, images, and videos to your personal website after launch.

---

## 📝 Adding Blog Posts

### Step 1: Create a New Blog Post File

1. Navigate to the `content/blog/` directory in your project
2. Create a new file with a descriptive name (use hyphens, not spaces)
   - Example: `my-first-post.mdx` or `traveling-to-japan.mdx`
   - The filename will become the URL slug (e.g., `my-first-post` → `/blog/my-first-post`)

### Step 2: Add Frontmatter

At the top of your file, add frontmatter (metadata) between the `---` markers:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-20"
excerpt: "A brief description of your post (shown on the blog listing page)"
tags: ["tag1", "tag2", "tag3"]
featuredImage: "https://images.unsplash.com/photo-xxxxx?w=1200&q=80"
---
```

**Frontmatter Fields:**
- `title` (required): The title of your blog post
- `date` (required): Publication date in `YYYY-MM-DD` format
- `excerpt` (optional): Short description (1-2 sentences) shown on the blog listing
- `tags` (optional): Array of tags for categorization
- `featuredImage` (optional): URL to the featured image (must be from an allowed domain in `next.config.js`)

### Step 3: Write Your Content

Write your blog post content in Markdown below the frontmatter:

```markdown
---
title: "My First Blog Post"
date: "2024-01-20"
excerpt: "This is my first blog post on my personal website."
tags: ["personal", "getting-started"]
featuredImage: "https://images.unsplash.com/photo-xxxxx?w=1200&q=80"
---

# My First Blog Post

This is the introduction paragraph.

## Section Heading

More content here...

### Subsection

- Bullet point 1
- Bullet point 2

**Bold text** and *italic text*

[Link text](https://example.com)

![Image alt text](https://images.unsplash.com/photo-xxxxx?w=800&q=80)

\`\`\`javascript
// Code blocks are supported
function example() {
  return "Hello World";
}
\`\`\`
```

### Step 4: Deploy

After creating your blog post:
1. Commit and push your changes to your repository
2. Your deployment platform (Vercel/Netlify) will automatically rebuild
3. Your new post will appear on the blog page automatically

**Note:** Posts are sorted by date (newest first) automatically.

---

## 📸 Adding Images to Gallery

Currently, images are defined in the `app/gallery/page.tsx` file. Here's how to add new photos:

### Option 1: Edit the Gallery Component (Simple)

1. Open `app/gallery/page.tsx`
2. Find the `examplePhotos` array (around line 15)
3. Add a new photo object:

```typescript
{
  id: '7', // Unique ID (increment from last photo)
  src: 'https://images.unsplash.com/photo-xxxxx?w=800&q=80', // Image URL
  alt: 'Description of the image', // Alt text for accessibility
  title: 'Photo Title', // Optional title shown below the photo
}
```

**Example:**
```typescript
const examplePhotos: Photo[] = [
  // ... existing photos ...
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Beautiful sunset over mountains',
    title: 'Mountain Sunset',
  },
]
```

### Option 2: Use Your Own Images (Recommended for Production)

1. **Upload images to a hosting service:**
   - Use services like Cloudinary, Imgur, or your own CDN
   - Or add images to the `public/images/` folder in your project

2. **If using `public/images/`:**
   - Create a `public/images/gallery/` folder
   - Add your images there
   - Reference them as: `src: '/images/gallery/photo-name.jpg'`

3. **Update the gallery component:**
   ```typescript
   {
     id: '8',
     src: '/images/gallery/my-photo.jpg', // Local image
     alt: 'My photo description',
     title: 'My Photo',
   }
   ```

**Important:** If using external image URLs, make sure the domain is added to `next.config.js` in the `remotePatterns` section.

### Image Requirements:
- **Format:** JPG, PNG, or WebP
- **Recommended size:** 800-1200px width for optimal performance
- **Aspect ratio:** Any (the gallery uses a masonry layout)

---

## 🎥 Adding Videos

### Option 1: YouTube API Integration (Automatic - Recommended)

If you've set up the YouTube Data API v3:

1. **Get your YouTube API credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project and enable YouTube Data API v3
   - Create an API key
   - Get your YouTube Channel ID

2. **Add to environment variables:**
   Create or update `.env.local`:
   ```env
   YOUTUBE_API_KEY=your_api_key_here
   YOUTUBE_CHANNEL_ID=your_channel_id_here
   ```

3. **Implement the API route:**
   - Open `app/api/youtube-videos/route.ts`
   - Uncomment and complete the YouTube API implementation
   - Videos from your channel will automatically appear

4. **Deploy:**
   - Add the environment variables to your hosting platform (Vercel/Netlify)
   - Videos will automatically sync from your YouTube channel

### Option 2: Manual Video Addition

If you prefer to manually add videos:

1. Open `app/videos/page.tsx`
2. Find the `exampleVideos` array (around line 20)
3. Add a new video object:

```typescript
{
  id: 'VIDEO_ID_HERE', // YouTube video ID (from the URL: youtube.com/watch?v=VIDEO_ID)
  title: 'Video Title',
  description: 'Video description',
  thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg', // Auto-generated thumbnail
  publishedAt: '2024-01-20', // Publication date
}
```

**How to get YouTube Video ID:**
- From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID is: `dQw4w9WgXcQ`

**Example:**
```typescript
const exampleVideos: Video[] = [
  // ... existing videos ...
  {
    id: 'NEW_VIDEO_ID',
    title: 'My New Video',
    description: 'This is a description of my video.',
    thumbnail: 'https://img.youtube.com/vi/NEW_VIDEO_ID/maxresdefault.jpg',
    publishedAt: '2024-01-25',
  },
]
```

---

## 🎨 Best Practices

### Blog Posts:
- ✅ Use descriptive, SEO-friendly titles
- ✅ Write compelling excerpts (50-150 characters)
- ✅ Add relevant tags (3-5 tags per post)
- ✅ Use high-quality featured images (1200px width recommended)
- ✅ Format dates consistently: `YYYY-MM-DD`
- ✅ Use descriptive filenames for your `.mdx` files

### Images:
- ✅ Use descriptive alt text for accessibility
- ✅ Optimize images before uploading (compress if needed)
- ✅ Use consistent naming for your photo IDs
- ✅ Add meaningful titles to help with organization

### Videos:
- ✅ Keep video titles concise and descriptive
- ✅ Write helpful descriptions
- ✅ Use consistent date formatting
- ✅ If using YouTube API, ensure your channel is public

---

## 🔄 Workflow Summary

### Adding a Blog Post:
1. Create `.mdx` file in `content/blog/`
2. Add frontmatter with metadata
3. Write content in Markdown
4. Commit, push, and deploy

### Adding an Image:
1. Upload image to hosting service or `public/images/`
2. Add photo object to `app/gallery/page.tsx`
3. Commit, push, and deploy

### Adding a Video:
1. **Option A:** Set up YouTube API (automatic sync)
2. **Option B:** Add video object to `app/videos/page.tsx`
3. Commit, push, and deploy

---

## 🚀 Quick Reference

### File Locations:
- **Blog posts:** `content/blog/*.mdx`
- **Gallery images:** Edit `app/gallery/page.tsx`
- **Videos:** Edit `app/videos/page.tsx` or set up YouTube API

### Required Image Domains:
If using external images, add domains to `next.config.js`:
```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'your-image-host.com',
  },
]
```

### Date Format:
Always use: `YYYY-MM-DD` (e.g., `2024-01-20`)

---

## 💡 Tips

1. **Preview locally:** Run `npm run dev` to preview changes before deploying
2. **Image optimization:** Use tools like [TinyPNG](https://tinypng.com/) to compress images
3. **Markdown cheatsheet:** Use [Markdown Guide](https://www.markdownguide.org/) for formatting help
4. **Version control:** Always commit your content changes to Git
5. **Backup:** Keep backups of your content files

---

## 🆘 Troubleshooting

**Blog post not appearing?**
- Check the file is in `content/blog/` directory
- Verify frontmatter is correctly formatted (between `---`)
- Ensure the date is in `YYYY-MM-DD` format
- Check for syntax errors in the Markdown

**Image not loading?**
- Verify the image URL is accessible
- Check if the domain is in `next.config.js` remotePatterns
- Ensure the image URL uses `https://`

**Video not showing?**
- Verify the YouTube video ID is correct
- Check if the video is public (if using YouTube API)
- Ensure the thumbnail URL format is correct

---

Happy content creating! 🎉

