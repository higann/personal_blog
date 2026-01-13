import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

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
        const slug = fileName.replace(/\.(mdx|md)$/, '')
        const fullPath = path.join(postsDirectory, fileName)
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
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      if (!fs.existsSync(mdPath)) {
        return null
      }
      const fileContents = fs.readFileSync(mdPath, 'utf8')
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

