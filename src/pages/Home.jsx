import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import ContentRow from '../components/ContentRow'
import { getHome } from '../api/tudorama'

export default function Home() {
  const [data, setData] = useState({ recientes: [], populares: [], movies: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHome().then(d => {
      setData(d)
      setLoading(false)
    })
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection items={data.recientes} />

      {/* Rows */}
      <div className="pb-16">
        <ContentRow
          title="Recién Agregados"
          emoji="✨"
          items={data.recientes}
          loading={loading}
          viewAllLink="/browse?type=series"
        />
        <ContentRow
          title="Actualizados Recientemente"
          emoji="🔄"
          items={data.populares}
          loading={loading}
          viewAllLink="/browse?type=series"
          badge="Nueva temporada"
        />
        <ContentRow
          title="Películas"
          emoji="🎬"
          items={data.movies}
          loading={loading}
          viewAllLink="/browse?type=movies"
        />
      </div>

      {/* CTA */}
      <div className="mx-4 sm:mx-6 mb-16 rounded-2xl overflow-hidden border border-white/8 bg-dark-700 relative">
        <div className="absolute inset-0 bg-brand-gradient opacity-8" />
        <div className="relative px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">🌸 Todos tus doramas favoritos</h2>
          <p className="text-white/45 text-sm mb-5 max-w-sm mx-auto">
            K-Dramas, C-Dramas, J-Dramas y más. Subtitulados y doblados en Español Latino.
          </p>
          <Link to="/browse?type=series" className="inline-flex items-center gap-2 bg-white text-dark-900 font-bold px-6 py-2.5 rounded-xl hover:bg-white/90 transition-all text-sm">
            Explorar todo →
          </Link>
        </div>
      </div>
    </main>
  )
}
