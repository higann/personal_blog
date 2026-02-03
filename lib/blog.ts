import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

/**
 * Validate that a file path is within the posts directory
 * Prevents path traversal attacks
 */
function validatePath(filePath: string, baseDir: string = postsDirectory): boolean {
  const resolvedPath = path.resolve(filePath)
  const resolvedBase = path.resolve(baseDir)
  return resolvedPath.startsWith(resolvedBase)
}

/**
 * Sanitize slug to prevent path traversal
 */
function sanitizeSlug(slug: string): string {
  // Remove any path separators and dangerous characters
  return slug.replace(/[\/\\\.\.]/g, '').replace(/[^a-zA-Z0-9-_]/g, '')
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  featuredImage?: string
  readingTime?: number
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
      .map((fileName) => {
        // Sanitize filename to prevent path traversal
        const sanitizedFileName = path.basename(fileName)
        const slug = sanitizedFileName.replace(/\.(mdx|md)$/, '')
        const fullPath = path.join(postsDirectory, sanitizedFileName)
        
        // Validate path is within posts directory
        if (!validatePath(fullPath)) {
          console.warn(`Skipping invalid path: ${fullPath}`)
          return null
        }
        
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          content,
          tags: data.tags || [],
          featuredImage: data.featuredImage,
          readingTime: calculateReadingTime(content),
        }
      })
      .filter((post): post is NonNullable<typeof post> => post !== null)


    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Sanitize slug to prevent path traversal
    const sanitizedSlug = sanitizeSlug(slug)
    if (sanitizedSlug !== slug) {
      console.warn(`Invalid slug detected: ${slug}`)
      return null
    }

    const fullPath = path.join(postsDirectory, `${sanitizedSlug}.mdx`)
    
    // Validate path is within posts directory
    if (!validatePath(fullPath)) {
      console.warn(`Invalid path detected: ${fullPath}`)
      return null
    }

    if (!fs.existsSync(fullPath)) {
      const mdPath = path.join(postsDirectory, `${sanitizedSlug}.md`)
      
      // Validate MD path as well
      if (!validatePath(mdPath)) {
        return null
      }
      
      if (!fs.existsSync(mdPath)) {
        return null
      }
      const fileContents = fs.readFileSync(mdPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug: sanitizedSlug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        content,
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        readingTime: calculateReadingTime(content),
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: sanitizedSlug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

