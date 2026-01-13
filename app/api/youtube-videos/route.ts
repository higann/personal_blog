import { NextResponse } from 'next/server'

/**
 * YouTube Videos API Route
 * 
 * This route fetches videos from your YouTube channel using the Data API v3.
 * 
 * Setup:
 * 1. Get a YouTube Data API v3 key from Google Cloud Console
 * 2. Add YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID to .env.local
 * 3. Uncomment the code below and replace with your implementation
 */

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = process.env.YOUTUBE_CHANNEL_ID

    if (!apiKey || !channelId) {
      // Return empty videos array instead of error when not configured
      return NextResponse.json({
        videos: [],
        message: 'YouTube API not configured. Using example videos.',
      })
    }

    // TODO: Implement YouTube API call
    // Example:
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=12&type=video`
    // )
    // const data = await response.json()
    // 
    // const videos = data.items.map((item: any) => ({
    //   id: item.id.videoId,
    //   title: item.snippet.title,
    //   description: item.snippet.description,
    //   thumbnail: item.snippet.thumbnails.high.url,
    //   publishedAt: item.snippet.publishedAt,
    // }))
    //
    // return NextResponse.json({ videos })

    // Placeholder response
    return NextResponse.json({
      videos: [],
      message: 'YouTube API integration pending. See route file for implementation.',
    })
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

