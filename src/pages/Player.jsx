import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { getVideoById, getRelatedVideos, formatDuration, formatViews, formatDate, getThumbnail } from '../api/dailymotion'

export default function Player() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      window.scrollTo(0, 0)
      const [v, r] = await Promise.all([
        getVideoById(id),
        getRelatedVideos(id),
      ])
      if (!v) {
        navigate('/', { replace: true })
        return
      }
      setVideo(v)
      setRelated(r)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <PlayerSkeleton />

  return (
    <main className="min-h-screen pt-16 pb-16 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col xl:flex-row gap-8 mt-4">
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/70 aspect-video">
              <iframe
                src={`https://geo.dailymotion.com/player.html?video=${id}&mute=0&autoplay=1`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                {video.title}
              </h1>

              {/* Stats & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4 text-sm text-white/50">
                  {video.views_total > 0 && (
                    <span className="flex items-center gap-1">
                      <EyeIcon /> {formatViews(video.views_total)} vistas
                    </span>
                  )}
                  {video.created_time && (
                    <span>{formatDate(video.created_time)}</span>
                  )}
                  {video.duration > 0 && (
                    <span className="flex items-center gap-1">
                      <ClockIcon /> {formatDuration(video.duration)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${liked ? 'bg-brand-primary text-white' : 'bg-dark-600 text-white/70 hover:bg-dark-500 hover:text-white'}`}
                  >
                    <HeartIcon filled={liked} />
                    {liked ? 'Guardado' : 'Me gusta'}
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: video.title, url: window.location.href })
                      } else {
                        navigator.clipboard?.writeText(window.location.href)
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-dark-600 text-white/70 hover:bg-dark-500 hover:text-white transition-all"
                  >
                    <ShareIcon />
                    Compartir
                  </button>
                </div>
              </div>

              {/* Author */}
              {video['owner.screenname'] && (
                <div className="flex items-center gap-3 py-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {video['owner.screenname'].charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{video['owner.screenname']}</p>
                    <p className="text-white/40 text-xs">Creador</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {video.description && (
                <div className="py-4">
                  <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                    {video.description.slice(0, 400)}{video.description.length > 400 ? '…' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="xl:w-80 shrink-0">
            <div className="sticky top-20">
              <h2 className="text-lg font-bold text-white mb-4">Más dramas</h2>
              <div className="flex flex-col gap-3">
                {related.length === 0
                  ? Array(6).fill(0).map((_, i) => <RelatedSkeleton key={i} />)
                  : related.map(v => (
                      <RelatedCard key={v.id} video={v} />
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function RelatedCard({ video }) {
  return (
    <Link to={`/watch/${video.id}`} className="flex gap-3 group hover:bg-dark-700 rounded-xl p-2 transition-colors">
      <div className="w-32 sm:w-40 h-20 rounded-lg overflow-hidden shrink-0 bg-dark-600">
        {getThumbnail(video) && (
          <img src={getThumbnail(video)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <p className="text-white text-xs font-medium line-clamp-2 leading-snug mb-1">{video.title}</p>
        {video['owner.screenname'] && (
          <p className="text-white/40 text-xs truncate">{video['owner.screenname']}</p>
        )}
        {video.views_total > 0 && (
          <p className="text-white/30 text-xs mt-1">{formatViews(video.views_total)} vistas</p>
        )}
      </div>
    </Link>
  )
}

function RelatedSkeleton() {
  return (
    <div className="flex gap-3 p-2">
      <div className="w-40 h-20 skeleton rounded-lg shrink-0" />
      <div className="flex-1">
        <div className="h-3 skeleton rounded mb-2 w-full" />
        <div className="h-3 skeleton rounded w-3/4" />
      </div>
    </div>
  )
}

function PlayerSkeleton() {
  return (
    <div className="min-h-screen pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="aspect-video skeleton rounded-2xl mb-4" />
      <div className="h-8 skeleton rounded-xl mb-3 w-3/4" />
      <div className="h-4 skeleton rounded mb-2 w-1/2" />
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
