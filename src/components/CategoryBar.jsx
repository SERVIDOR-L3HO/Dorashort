import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../api/dailymotion'

export default function CategoryBar() {
  const [params] = useSearchParams()
  const active = params.get('cat')

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 py-3 border-b border-white/5">
      <Link
        to="/browse"
        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          !active ? 'bg-white text-dark-900' : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white'
        }`}
      >
        <span>🎬</span>
        <span>Todo</span>
      </Link>
      {CATEGORIES.map(cat => (
        <Link
          key={cat.id}
          to={`/browse?cat=${cat.id}`}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            active === cat.id ? 'bg-white text-dark-900' : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white'
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </Link>
      ))}
    </div>
  )
}
