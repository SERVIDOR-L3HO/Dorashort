import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard'
import CategoryBar from '../components/CategoryBar'
import { getDramasByCategory, searchDramas, getTrendingDramas, CATEGORIES } from '../api/dailymotion'

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
        results = await getTrendingDramas()
      }
      setVideos(results)
      setLoading(false)
    }
    load()
  }, [category, query])

  const categoryInfo = CATEGORIES.find(c => c.id === category)
  const title = query
    ? `Resultados para: "${query}"`
    : categoryInfo
    ? `${categoryInfo.emoji} ${categoryInfo.label}`
    : '🎬 Todos los Dramas'

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="px-4 sm:px-6 mb-2 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-4">{title}</h1>
        {!query && (
          <p className="text-white/50 text-sm mt-1">
            {loading ? 'Cargando…' : `${videos.length} dramas encontrados`}
          </p>
        )}
      </div>

      {/* Category Filter */}
      {!query && <CategoryBar />}

      {/* Grid */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array(24).fill(0).map((_, i) => <VideoCardSkeleton key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">🎭</div>
      <h3 className="text-xl font-bold text-white mb-2">No encontramos resultados</h3>
      <p className="text-white/50 max-w-sm">
        {query
          ? `No hay dramas que coincidan con "${query}". Intenta con otra búsqueda.`
          : 'No hay contenido disponible en esta categoría por ahora.'}
      </p>
    </div>
  )
}
