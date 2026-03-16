import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Player from './pages/Player'

function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-xs">D</div>
              <span className="text-lg font-display font-bold bg-clip-text text-transparent bg-brand-gradient">DramaStream</span>
            </div>
            <p className="text-white/40 text-xs">Los mejores short dramas, gratis y en un solo lugar.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <span>Contenido provisto por Dailymotion</span>
            <span>•</span>
            <span>© 2026 DramaStream</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watch/:id" element={<Player />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
