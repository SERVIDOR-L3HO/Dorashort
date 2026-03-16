import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import VideoRow from '../components/VideoRow'
import { getEnEmision, getTrending, getRecientes, getDramasByCategory } from '../api/dailymotion'

export default function Home() {
  const [enEmision, setEnEmision] = useState([])
  const [trending, setTrending] = useState([])
  const [recientes, setRecientes] = useState([])
  const [kdrama, setKdrama] = useState([])
  const [cdrama, setCdrama] = useState([])
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [e, t, r, k, c, p] = await Promise.all([
        getEnEmision(),
        getTrending(),
        getRecientes(),
        getDramasByCategory('kdrama'),
        getDramasByCategory('cdrama'),
        getDramasByCategory('peliculas'),
      ])
      setEnEmision(e)
      setTrending(t)
      setRecientes(r)
      setKdrama(k)
      setCdrama(c)
      setPeliculas(p)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection videos={enEmision} />

      {/* Genre quick links */}
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {[
            { to: '/browse?cat=kdrama', label: 'K-Dramas', emoji: '🇰🇷' },
            { to: '/browse?cat=cdrama', label: 'C-Dramas', emoji: '🇨🇳' },
            { to: '/browse?cat=jdrama', label: 'J-Dramas', emoji: '🇯🇵' },
            { to: '/browse?cat=latino', label: 'Latino', emoji: '🎙️' },
            { to: '/browse?cat=subtitulado', label: 'Subtitulado', emoji: '💬' },
            { to: '/browse?cat=peliculas', label: 'Películas', emoji: '🎬' },
            { to: '/browse?cat=reality', label: 'Reality', emoji: '📺' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-dark-700 hover:bg-dark-600 border border-white/5 hover:border-white/15 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="text-xs font-medium text-white/70 group-hover:text-white text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content rows */}
      <div className="pb-16">
        <VideoRow title="Populares" emoji="🔥" videos={trending} loading={loading} viewAllLink="/browse" badge="Hot" />
        <VideoRow title="Recién Agregados" emoji="✨" videos={recientes} loading={loading} viewAllLink="/browse" />
        <VideoRow title="K-Dramas" emoji="🇰🇷" videos={kdrama} loading={loading} viewAllLink="/browse?cat=kdrama" />
        <VideoRow title="C-Dramas" emoji="🇨🇳" videos={cdrama} loading={loading} viewAllLink="/browse?cat=cdrama" />
        <VideoRow title="Películas Asiáticas" emoji="🎬" videos={peliculas} loading={loading} viewAllLink="/browse?cat=peliculas" />
      </div>

      {/* Footer CTA */}
      <div className="mx-4 sm:mx-6 mb-16 rounded-2xl overflow-hidden relative bg-dark-700 border border-white/8">
        <div className="absolute inset-0 bg-brand-gradient opacity-10" />
        <div className="relative px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Todos tus doramas favoritos</h2>
          <p className="text-white/50 text-sm mb-5 max-w-md mx-auto">
            K-Dramas, C-Dramas, J-Dramas y más. Subtitulados y doblados en Español Latino. Totalmente gratis.
          </p>
          <Link to="/browse" className="inline-flex items-center gap-2 bg-white text-dark-900 font-bold px-6 py-2.5 rounded-xl hover:bg-white/90 transition-all text-sm">
            Explorar todo →
          </Link>
        </div>
      </div>
    </main>
  )
}
