import { Link } from 'react-router-dom'
import { formatDuration, formatViews, getThumbnail } from '../api/dailymotion'

export default function VideoCard({ video, size = 'md' }) {
  const thumbnail = getThumbnail(video)
  const isLarge = size === 'lg'

  return (
    <Link
      to={`/watch/${video.id}`}
      className={`group block rounded-xl overflow-hidden bg-dark-700 card-hover ${isLarge ? 'aspect-[2/3]' : 'aspect-[16/9]'} relative`}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-dark-600 flex items-center justify-center">
            <PlayIcon className="w-12 h-12 text-white/20" />
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-card-gradient opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-14 h-14 rounded-full bg-brand-primary/90 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-purple-900/50">
          <PlayIcon className="w-6 h-6 text-white ml-1" />
        </div>
      </div>

      {/* Duration Badge */}
      {video.duration > 0 && (
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold text-white">
          {formatDuration(video.duration)}
        </div>
      )}

      {/* NEW badge for recent videos */}
      {video.created_time && Date.now() / 1000 - video.created_time < 7 * 86400 && (
        <div className="absolute top-2 left-2 badge bg-brand-accent text-white">
          Nuevo
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className={`font-semibold text-white line-clamp-2 ${isLarge ? 'text-sm' : 'text-sm'} leading-tight mb-1`}>
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-white/60">
          {video['owner.screenname'] && (
            <span className="truncate">{video['owner.screenname']}</span>
          )}
          {video.views_total > 0 && (
            <>
              <span>•</span>
              <span>{formatViews(video.views_total)} vistas</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export function VideoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden aspect-video bg-dark-700">
      <div className="w-full h-full skeleton" />
    </div>
  )
}

function PlayIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}
