# DramaStream

Una plataforma moderna de streaming de short dramas estilo Dramawave/Reelshort.

## Stack

- **Frontend**: React 18 + Vite + Tailwind CSS v3
- **Router**: React Router v7
- **API**: Dailymotion Public API (sin autenticación)
- **Fuente de contenido**: Videos de Dailymotion (short dramas, romance, fantasía, suspenso)

## Estructura

```
src/
  api/
    dailymotion.js     # Todas las llamadas a la API de Dailymotion
  components/
    Navbar.jsx         # Navbar responsiva con búsqueda
    HeroSection.jsx    # Hero con slider automático
    VideoCard.jsx      # Tarjeta de video con hover effects
    VideoRow.jsx       # Fila de videos con scroll horizontal
    CategoryBar.jsx    # Filtros de categoría
  pages/
    Home.jsx           # Página principal
    Browse.jsx         # Explorador / resultados de búsqueda
    Player.jsx         # Reproductor con videos relacionados
  App.jsx
  main.jsx
  index.css
```

## Comandos

```bash
npm run dev     # Desarrollo en puerto 5000
npm run build   # Build de producción
```

## Diseño

- Tema oscuro (dark purple/black)
- Acento: gradiente púrpura → magenta
- Fuentes: Inter (UI) + Playfair Display (títulos)
- Animaciones suaves con Tailwind CSS
