import { Link } from 'react-router-dom'
import { formatDuration, getThumbnail } from '../api/dailymotion'

export default function VideoCard({ video }) {
  const thumbnail = getThumbnail(video)

  return (
    <Link to={`/watch/${video.id}`} className="group block">
      {/* Poster - vertical 2:3 ratio */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-700 mb-2 shadow-lg">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FilmIcon />
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>

        {/* Duration */}
        {video.duration > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </div>
        )}

        {/* New badge */}
        {video.created_time && Date.now() / 1000 - video.created_time < 7 * 86400 && (
          <div className="absolute top-2 left-2 bg-brand-primary rounded-md px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
            Nuevo
          </div>
        )}
      </div>

      {/* Info below poster */}
      <div>
        <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 leading-snug">
          {video.title}
        </h3>
        {video['owner.screenname'] && (
          <p className="text-xs text-white/40 mt-0.5 truncate">{video['owner.screenname']}</p>
        )}
      </div>
    </Link>
  )
}

export function VideoCardSkeleton() {
  return (
    <div>
      <div className="aspect-[2/3] rounded-xl skeleton mb-2" />
      <div className="h-3 skeleton rounded w-4/5 mb-1.5" />
      <div className="h-3 skeleton rounded w-3/5" />
    </div>
  )
}

function FilmIcon() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-white/20">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="2" y1="17" x2="7" y2="17"/>
    </svg>
  )
}
