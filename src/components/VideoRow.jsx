import { useRef } from 'react'
import VideoCard, { VideoCardSkeleton } from './VideoCard'
import { Link } from 'react-router-dom'

export default function VideoRow({ title, videos = [], loading = false, viewAllLink, emoji }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {emoji && <span className="text-xl">{emoji}</span>}
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm text-brand-primary hover:text-purple-300 transition-colors font-medium">
              Ver todo →
            </Link>
          )}
          <div className="hidden sm:flex gap-1">
            <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full bg-dark-600 hover:bg-dark-500 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <ChevronLeft />
            </button>
            <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full bg-dark-600 hover:bg-dark-500 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2"
      >
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <div key={i} className="shrink-0 w-56 sm:w-64">
                <VideoCardSkeleton />
              </div>
            ))
          : videos.map(video => (
              <div key={video.id} className="shrink-0 w-56 sm:w-64">
                <VideoCard video={video} />
              </div>
            ))
        }
      </div>
    </section>
  )
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
