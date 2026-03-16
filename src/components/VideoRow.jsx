import { useRef } from 'react'
import VideoCard, { VideoCardSkeleton } from './VideoCard'
import { Link } from 'react-router-dom'

export default function VideoRow({ title, videos = [], loading = false, viewAllLink, emoji, badge }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          {emoji && <span className="text-lg">{emoji}</span>}
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {badge && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/20 uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm text-white/40 hover:text-white/80 transition-colors">
              Ver todo →
            </Link>
          )}
          <div className="hidden sm:flex gap-1">
            <button onClick={() => scroll(-1)} className="w-7 h-7 rounded-lg bg-dark-600 hover:bg-dark-500 flex items-center justify-center text-white/50 hover:text-white transition-all">
              <ChevronLeft />
            </button>
            <button onClick={() => scroll(1)} className="w-7 h-7 rounded-lg bg-dark-600 hover:bg-dark-500 flex items-center justify-center text-white/50 hover:text-white transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2">
        {loading
          ? Array(8).fill(0).map((_, i) => (
              <div key={i} className="shrink-0 w-36 sm:w-44">
                <VideoCardSkeleton />
              </div>
            ))
          : videos.map(video => (
              <div key={video.id} className="shrink-0 w-36 sm:w-44">
                <VideoCard video={video} />
              </div>
            ))
        }
      </div>
    </section>
  )
}

function ChevronLeft() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
}
function ChevronRight() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
}
