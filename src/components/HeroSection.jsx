import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getThumbnail } from '../api/dailymotion'

export default function HeroSection({ videos = [] }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const featured = videos.slice(0, 6)

  useEffect(() => {
    if (featured.length < 2) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % featured.length), 7000)
    return () => clearInterval(timer)
  }, [featured.length])

  if (!featured.length) return <HeroSkeleton />

  const video = featured[current]
  const thumb = getThumbnail(video)

  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {thumb && (
          <img key={video.id} src={thumb} alt="" className="w-full h-full object-cover animate-fade-in" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/75 to-dark-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 pb-14 max-w-2xl">
        <div className="animate-slide-up">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-primary text-white uppercase tracking-widest">
              ⭐ Destacado
            </span>
            <span className="text-xs font-semibold text-white/60">K-Drama</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-xl">
            {video.title?.length > 65 ? video.title.slice(0, 65) + '…' : video.title}
          </h1>

          {/* Description */}
          {video.description && (
            <p className="text-white/65 text-sm sm:text-base mb-5 max-w-lg line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/watch/${video.id}`)}
              className="flex items-center gap-2 bg-white text-dark-900 font-bold px-6 py-2.5 rounded-xl hover:bg-white/90 transition-all text-sm"
            >
              <PlayIcon />
              Ver Ahora
            </button>
            <button
              onClick={() => navigate(`/watch/${video.id}`)}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/25 transition-all border border-white/20 text-sm"
            >
              <InfoIcon />
              Más Info
            </button>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      {featured.length > 1 && (
        <div className="absolute bottom-5 left-6 sm:left-10 flex gap-2 z-10">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'bg-white w-8' : 'bg-white/30 w-4 hover:bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Side thumbnails (desktop) */}
      {featured.length > 1 && (
        <div className="absolute right-6 sm:right-10 bottom-10 hidden xl:flex flex-col gap-2 z-10">
          {featured.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setCurrent(i)}
              className={`w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === current ? 'border-white scale-105' : 'border-transparent opacity-40 hover:opacity-70'}`}
            >
              <img src={getThumbnail(v)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[700px] bg-dark-800">
      <div className="absolute inset-0 skeleton opacity-40" />
      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-14">
        <div className="h-5 w-24 skeleton rounded-full mb-3" />
        <div className="h-10 w-2/3 skeleton rounded-xl mb-2" />
        <div className="h-10 w-1/2 skeleton rounded-xl mb-5" />
        <div className="h-4 w-3/5 skeleton rounded mb-2" />
        <div className="h-4 w-2/5 skeleton rounded mb-5" />
        <div className="flex gap-3">
          <div className="h-11 w-32 skeleton rounded-xl" />
          <div className="h-11 w-32 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function PlayIcon() {
  return <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
}
function InfoIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
}
