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
      const [v, r] = await Promise.all([getVideoById(id), getRelatedVideos(id)])
      if (!v) { navigate('/', { replace: true }); return }
      setVideo(v)
      setRelated(r)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <PlayerSkeleton />

  return (
    <main className="min-h-screen pt-16 pb-16 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white/70 truncate max-w-xs">{video.title}</span>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Player */}
            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/80 aspect-video">
              <iframe
                src={`https://geo.dailymotion.com/player.html?video=${id}&autoplay=1`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            </div>

            {/* Info */}
            <div className="mt-5">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                {video.title}
              </h1>

              {/* Meta + actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-white/8">
                <div className="flex items-center gap-4 text-sm text-white/40">
                  {video.views_total > 0 && (
                    <span className="flex items-center gap-1.5">
                      <EyeIcon /> {formatViews(video.views_total)} vistas
                    </span>
                  )}
                  {video.created_time && <span>{formatDate(video.created_time)}</span>}
                  {video.duration > 0 && (
                    <span className="flex items-center gap-1.5">
                      <ClockIcon /> {formatDuration(video.duration)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${liked ? 'bg-brand-primary text-white' : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white'}`}
                  >
                    <HeartIcon filled={liked} />
                    {liked ? 'Guardado' : 'Me gusta'}
                  </button>
                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white transition-all"
                  >
                    <ShareIcon />
                    Compartir
                  </button>
                </div>
              </div>

              {/* Channel */}
              {video['owner.screenname'] && (
                <div className="flex items-center gap-3 py-4 border-b border-white/8">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {video['owner.screenname'].charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{video['owner.screenname']}</p>
                    <p className="text-white/35 text-xs">Canal</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {video.description && (
                <p className="text-white/50 text-sm leading-relaxed py-4 whitespace-pre-line">
                  {video.description.slice(0, 500)}{video.description.length > 500 ? '…' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:w-72 shrink-0">
            <div className="sticky top-20">
              <h2 className="text-base font-bold text-white mb-4">Más Doramas</h2>
              <div className="grid grid-cols-2 xl:grid-cols-2 gap-3">
                {related.length === 0
                  ? Array(8).fill(0).map((_, i) => (
                      <div key={i}>
                        <div className="aspect-[2/3] skeleton rounded-xl mb-2" />
                        <div className="h-3 skeleton rounded w-full mb-1" />
                        <div className="h-3 skeleton rounded w-3/4" />
                      </div>
                    ))
                  : related.slice(0, 12).map(v => (
                      <div key={v.id} className="shrink-0">
                        <VideoCard video={v} />
                      </div>
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

function PlayerSkeleton() {
  return (
    <div className="min-h-screen pt-20 pb-16 max-w-7xl mx-auto px-6">
      <div className="aspect-video skeleton rounded-2xl mb-4" />
      <div className="h-7 skeleton rounded-xl mb-3 w-2/3" />
      <div className="h-4 skeleton rounded w-1/3" />
    </div>
  )
}

function EyeIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
}
function ClockIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function HeartIcon({ filled }) {
  return <svg width="15" height="15" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function ShareIcon() {
  return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
}
