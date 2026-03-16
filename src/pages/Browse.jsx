import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard'
import CategoryBar from '../components/CategoryBar'
import { getDramasByCategory, searchDramas, getTrending, CATEGORIES } from '../api/dailymotion'

export default function Browse() {
  const [params] = useSearchParams()
  const category = params.get('cat')
  const query = params.get('q')

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      let results = []
      if (query) {
        results = await searchDramas(query)
      } else if (category) {
        results = await getDramasByCategory(category)
      } else {
        results = await getTrending()
      }
      setVideos(results)
      setLoading(false)
    }
    load()
  }, [category, query])

  const categoryInfo = CATEGORIES.find(c => c.id === category)
  const title = query
    ? `Resultados: "${query}"`
    : categoryInfo
    ? `${categoryInfo.emoji} ${categoryInfo.label}`
    : '🎬 Todos los Doramas'

  return (
    <main className="min-h-screen pt-16 pb-16">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {!query && (
          <p className="text-white/40 text-sm mt-1">
            {loading ? 'Cargando…' : `${videos.length} doramas encontrados`}
          </p>
        )}
      </div>

      {/* Filter bar */}
      {!query && <CategoryBar />}

      {/* Grid */}
      <div className="px-4 sm:px-6 pt-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {Array(28).fill(0).map((_, i) => <VideoCardSkeleton key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="text-5xl mb-4">🌸</div>
      <h3 className="text-lg font-bold text-white mb-2">No encontramos resultados</h3>
      <p className="text-white/40 text-sm max-w-xs">
        {query
          ? `No hay doramas que coincidan con "${query}".`
          : 'No hay contenido disponible en esta categoría por ahora.'}
      </p>
    </div>
  )
}
