import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { format } from 'date-fns'
import { remark } from 'remark'
import html from 'remark-html'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-display font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-text-light text-sm mb-6">
            <time className="font-mono">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span className="font-mono">{post.readingTime} min read</span>
              </>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-retro"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.featuredImage && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-retro-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-img:rounded-retro-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  )
}

