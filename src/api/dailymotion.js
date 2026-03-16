const BASE_URL = 'https://api.dailymotion.com'

const FIELDS = 'id,title,thumbnail_url,thumbnail_480_url,thumbnail_360_url,duration,views_total,created_time,description,owner.screenname,channel.name'

const DRAMA_SEARCHES = [
  'short drama romance',
  'short drama reelshort',
  'shortdrama episode',
  'korean drama short',
  'mini drama series',
]

const CATEGORIES = [
  { id: 'doramas', label: 'Doramas', emoji: '🌸', search: 'dorama coreano kdrama korean drama series' },
  { id: 'romance', label: 'Romance', emoji: '💕', search: 'short drama romance love story' },
  { id: 'suspense', label: 'Suspenso', emoji: '🔥', search: 'short drama suspense thriller mystery' },
  { id: 'comedy', label: 'Comedia', emoji: '😂', search: 'short drama comedy funny' },
  { id: 'action', label: 'Acción', emoji: '⚡', search: 'short drama action fight' },
  { id: 'fantasy', label: 'Fantasía', emoji: '✨', search: 'short drama fantasy magic supernatural' },
  { id: 'billionaire', label: 'Millonarios', emoji: '💎', search: 'short drama billionaire rich CEO romance' },
]

async function fetchVideos(params = {}) {
  const url = new URL(`${BASE_URL}/videos`)
  const defaults = {
    fields: FIELDS,
    limit: 20,
    sort: 'visited',
    'longer_than': 1,
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

export async function getFeaturedDramas() {
  return fetchVideos({
    search: DRAMA_SEARCHES[Math.floor(Math.random() * DRAMA_SEARCHES.length)],
    limit: 10,
    sort: 'visited',
  })
}

export async function getTrendingDramas() {
  return fetchVideos({
    search: 'short drama reelshort episode',
    limit: 20,
    sort: 'trending',
  })
}

export async function getNewDramas() {
  return fetchVideos({
    search: 'short drama mini series new',
    limit: 20,
    sort: 'recent',
  })
}

export async function getDramasByCategory(categoryId) {
  const category = CATEGORIES.find(c => c.id === categoryId)
  if (!category) return []
  return fetchVideos({
    search: category.search,
    limit: 24,
    sort: 'visited',
  })
}

export async function searchDramas(query) {
  return fetchVideos({
    search: `short drama ${query}`,
    limit: 24,
    sort: 'relevance',
  })
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
  if (!seconds) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
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
