'use client'

interface YouTubeEmbedProps {
  id: string
  title: string
  adNetwork?: string
  params?: string
}

export default function YouTubeEmbed({ id, title, adNetwork = 'false', params = 'rel=0' }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video bg-gray-200 rounded-retro overflow-hidden relative">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?${params}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}

