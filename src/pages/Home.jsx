import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import VideoRow from '../components/VideoRow'
import { getFeaturedDramas, getTrendingDramas, getNewDramas, getDramasByCategory, CATEGORIES } from '../api/dailymotion'
import { Link } from 'react-router-dom'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [trending, setTrending] = useState([])
  const [newDramas, setNewDramas] = useState([])
  const [romance, setRomance] = useState([])
  const [fantasy, setFantasy] = useState([])
  const [doramas, setDoramas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [f, t, n, r, fa, d] = await Promise.all([
        getFeaturedDramas(),
        getTrendingDramas(),
        getNewDramas(),
        getDramasByCategory('romance'),
        getDramasByCategory('fantasy'),
        getDramasByCategory('doramas'),
      ])
      setFeatured(f)
      setTrending(t)
      setNewDramas(n)
      setRomance(r)
      setFantasy(fa)
      setDoramas(d)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection videos={featured} />

      {/* Categories Quick Access */}
      <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-lg font-bold text-white mb-4">Explorar por categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/browse?cat=${cat.id}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-dark-700 hover:bg-dark-600 border border-white/5 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <span className="text-3xl transform group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-sm font-medium text-white/80 group-hover:text-white">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Video Rows */}
      <div className="pb-16">
        <VideoRow
          title="Doramas Coreanos"
          emoji="🌸"
          videos={doramas}
          loading={loading}
          viewAllLink="/browse?cat=doramas"
        />
        <VideoRow
          title="Tendencias"
          emoji="🔥"
          videos={trending}
          loading={loading}
          viewAllLink="/browse"
        />
        <VideoRow
          title="Nuevos Episodios"
          emoji="✨"
          videos={newDramas}
          loading={loading}
          viewAllLink="/browse"
        />
        <VideoRow
          title="Romance"
          emoji="💕"
          videos={romance}
          loading={loading}
          viewAllLink="/browse?cat=romance"
        />
        <VideoRow
          title="Fantasía & Sobrenatural"
          emoji="🌙"
          videos={fantasy}
          loading={loading}
          viewAllLink="/browse?cat=fantasy"
        />
      </div>

      {/* CTA Banner */}
      <div className="mx-4 sm:mx-6 mb-16 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-gradient opacity-20" />
        <div className="relative p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
            Miles de episodios te esperan
          </h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Descubre los mejores short dramas de romance, suspenso, fantasía y más. ¡Totalmente gratis!
          </p>
          <Link to="/browse" className="btn-primary inline-block">
            Explorar Todo
          </Link>
        </div>
      </div>
    </main>
  )
}
