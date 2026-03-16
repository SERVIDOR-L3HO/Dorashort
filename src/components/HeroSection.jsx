import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getThumbnail, formatDuration } from '../api/dailymotion'

export default function HeroSection({ videos = [] }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const featured = videos.slice(0, 5)

  useEffect(() => {
    if (featured.length < 2) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % featured.length), 6000)
    return () => clearInterval(timer)
  }, [featured.length])

  if (!featured.length) return <HeroSkeleton />

  const video = featured[current]
  const thumb = getThumbnail(video)

  return (
    <div className="relative h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {thumb && (
          <img
            key={video.id}
            src={thumb}
            alt=""
            className="w-full h-full object-cover animate-fade-in"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40" />
      </div>

      {/* Particle decorations */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 max-w-3xl">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="badge bg-brand-primary/80 text-white">⭐ Destacado</span>
            {video.duration > 0 && (
              <span className="badge bg-dark-600/80 text-white/80">{formatDuration(video.duration)}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-3" style={{textShadow: '0 2px 20px rgba(0,0,0,0.8)'}}>
            {video.title?.length > 80 ? video.title.slice(0, 80) + '…' : video.title}
          </h1>

          {/* Description */}
          {video.description && (
            <p className="text-white/70 text-sm sm:text-base mb-6 max-w-lg line-clamp-2">
              {video.description}
            </p>
          )}

          {/* Author */}
          {video['owner.screenname'] && (
            <p className="text-white/50 text-sm mb-6">
              Por <span className="text-white/80 font-medium">{video['owner.screenname']}</span>
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/watch/${video.id}`)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <PlayIcon />
              Ver Ahora
            </button>
            <button
              onClick={() => navigate(`/watch/${video.id}`)}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <InfoIcon />
              Más Info
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      {featured.length > 1 && (
        <div className="absolute bottom-8 left-4 sm:left-8 flex gap-2 z-10">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-primary w-8' : 'bg-white/30 w-3 hover:bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail row */}
      {featured.length > 1 && (
        <div className="absolute bottom-8 right-4 sm:right-8 hidden lg:flex gap-2 z-10">
          {featured.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setCurrent(i)}
              className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === current ? 'border-brand-primary scale-110' : 'border-transparent opacity-50 hover:opacity-80'}`}
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
    <div className="relative h-[75vh] min-h-[520px] max-h-[800px] bg-dark-800">
      <div className="absolute inset-0 skeleton opacity-50" />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 max-w-2xl">
        <div className="h-6 w-24 skeleton rounded-full mb-4" />
        <div className="h-12 w-3/4 skeleton rounded-xl mb-3" />
        <div className="h-12 w-1/2 skeleton rounded-xl mb-6" />
        <div className="h-4 w-2/3 skeleton rounded mb-2" />
        <div className="h-4 w-1/2 skeleton rounded mb-6" />
        <div className="flex gap-3">
          <div className="h-12 w-32 skeleton rounded-full" />
          <div className="h-12 w-32 skeleton rounded-full" />
        </div>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
}
