import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../api/dailymotion'

export default function CategoryBar() {
  const [params] = useSearchParams()
  const active = params.get('cat')

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 py-4">
      <Link
        to="/browse"
        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !active ? 'bg-brand-gradient text-white shadow-lg shadow-purple-900/30' : 'bg-dark-600 text-white/70 hover:bg-dark-500 hover:text-white'
        }`}
      >
        <span>🎬</span>
        <span>Todo</span>
      </Link>
      {CATEGORIES.map(cat => (
        <Link
          key={cat.id}
          to={`/browse?cat=${cat.id}`}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat.id ? 'bg-brand-gradient text-white shadow-lg shadow-purple-900/30' : 'bg-dark-600 text-white/70 hover:bg-dark-500 hover:text-white'
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </Link>
      ))}
    </div>
  )
}
