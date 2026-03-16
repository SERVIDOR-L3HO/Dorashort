const BASE_URL = 'https://api.dailymotion.com'

const FIELDS = 'id,title,thumbnail_url,thumbnail_480_url,thumbnail_360_url,duration,views_total,created_time,description,owner.screenname'

const CATEGORIES = [
  { id: 'kdrama', label: 'K-Dramas', emoji: '🇰🇷', search: 'kdrama korean drama español latino subtitulado completo' },
  { id: 'cdrama', label: 'C-Dramas', emoji: '🇨🇳', search: 'cdrama chinese drama chino español completo subtitulado' },
  { id: 'jdrama', label: 'J-Dramas', emoji: '🇯🇵', search: 'jdrama japones drama español completo subtitulado' },
  { id: 'latino', label: 'Español Latino', emoji: '🎙️', search: 'dorama doblado español latino completo kdrama' },
  { id: 'subtitulado', label: 'Subtitulado', emoji: '💬', search: 'dorama subtitulado español completo episodio kdrama' },
  { id: 'peliculas', label: 'Películas', emoji: '🎬', search: 'pelicula coreana película china asiática español completo' },
  { id: 'reality', label: 'Reality Shows', emoji: '📺', search: 'reality show coreano kpop español subtitulado' },
]

async function fetchVideos(params = {}) {
  const url = new URL(`${BASE_URL}/videos`)
  const defaults = {
    fields: FIELDS,
    limit: 20,
    'longer_than': 5,
  }
  Object.entries({ ...defaults, ...params }).forEach(([k, v]) => url.searchParams.set(k, v))

  try {
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.list || []
  } catch {
    return []
  }
}

export async function getEnEmision() {
  return fetchVideos({ search: 'kdrama 2025 2026 episodio español completo', limit: 10, sort: 'recent' })
}

export async function getTrending() {
  return fetchVideos({ search: 'dorama coreano español completo', limit: 20, sort: 'trending' })
}

export async function getRecientes() {
  return fetchVideos({ search: 'dorama coreano episodio nuevo 2025', limit: 20, sort: 'recent' })
}

export async function getDramasByCategory(categoryId) {
  const category = CATEGORIES.find(c => c.id === categoryId)
  if (!category) return []
  return fetchVideos({ search: category.search, limit: 24, sort: 'visited' })
}

export async function searchDramas(query) {
  return fetchVideos({ search: `dorama ${query} español completo`, limit: 24, sort: 'relevance' })
}

export async function getVideoById(id) {
  try {
    const url = `${BASE_URL}/video/${id}?fields=${FIELDS},embed_url`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Not found')
    return await res.json()
  } catch {
    return null
  }
}

export async function getRelatedVideos(id) {
  try {
    const url = `${BASE_URL}/video/${id}/related?fields=${FIELDS}&limit=12`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return data.list || []
  } catch {
    return []
  }
}

export { CATEGORIES }

export function formatDuration(seconds) {
  if (!seconds) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatViews(views) {
  if (!views) return '0'
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`
  return views.toString()
}

export function formatDate(timestamp) {
  if (!timestamp) return ''
  return new Date(timestamp * 1000).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function getThumbnail(video) {
  return video?.thumbnail_480_url || video?.thumbnail_360_url || video?.thumbnail_url || ''
}
