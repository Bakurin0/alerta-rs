export const ALERT_LEVELS = {
  normal: { label: 'Normal', rank: 0 },
  attention: { label: 'Atenção', rank: 1 },
  alert: { label: 'Alerta', rank: 2 },
  flood: { label: 'Inundação', rank: 3 },
}

export function classifyLevel(level, thresholds) {
  if (level == null || !thresholds) return 'normal'
  if (thresholds.flood != null && level >= thresholds.flood) return 'flood'
  if (thresholds.alert != null && level >= thresholds.alert) return 'alert'
  if (thresholds.attention != null && level >= thresholds.attention) return 'attention'
  return 'normal'
}

export function projectCoordinates(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
  const minLon = -57.5941
  const spanLon = 7.891
  const maxLat = -27.0931
  const spanLat = 6.6508

  const x = ((longitude - minLon) / spanLon) * 100
  const y = ((maxLat - latitude) / spanLat) * 100

  if (x < 0 || x > 100 || y < 0 || y > 100) return null
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }
}

export function degreesToCompass(deg) {
  if (deg == null || !Number.isFinite(Number(deg))) return '—'
  const normalized = ((Number(deg) % 360) + 360) % 360
  const sectors = ['N', 'NNE', 'NE', 'ENE', 'L', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO']
  const index = Math.round(normalized / 22.5) % 16
  return sectors[index]
}

export function formatTemperature(value) {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`
}

export function formatWind(speed, gust, direction) {
  if (speed == null || !Number.isFinite(Number(speed))) return '—'
  const speedStr = `${Number(speed).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km/h`
  const dirStr = direction != null && Number.isFinite(Number(direction)) ? ` · ${degreesToCompass(direction)}` : ''
  if (gust != null && Number.isFinite(Number(gust)) && Number(gust) > Number(speed)) {
    const gustStr = Number(gust).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    return `${speedStr} (rajadas ${gustStr} km/h)${dirStr}`
  }
  return `${speedStr}${dirStr}`
}

export function formatPressure(pressure, trend) {
  if (pressure == null || !Number.isFinite(Number(pressure))) return '—'
  const pStr = `${Number(pressure).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} hPa`
  if (trend != null && Number.isFinite(Number(trend))) {
    const trendLabel = Number(trend) > 0.5 ? ' ↑ Subindo' : Number(trend) < -0.5 ? ' ↓ Caindo' : ' → Estável'
    return `${pStr} (${trendLabel.trim()})`
  }
  return pStr
}

export function formatHumidity(value) {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Math.round(Number(value))}%`
}

export function formatSolarRadiation(value) {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kWh/m²`
}

export function normalizeStation(station) {
  const currentLevel = station.currentLevel ?? station.level ?? 0
  const rainfall24h = station.rainfall24h ?? station.rainfall?.h24 ?? 0
  const thresholds = station.thresholds ?? null
  const status = classifyLevel(currentLevel, thresholds)
  return {
    ...station,
    currentLevel,
    rainfall24h,
    thresholds,
    status: station.status || status,
    statusLabel: ALERT_LEVELS[station.status || status]?.label ?? 'Normal',
  }
}

export function filterStations(stations, { query = '', city = 'all', status = 'all', sensor = 'all' } = {}) {
  const q = query.trim().toLowerCase()
  return stations.filter((station) => {
    if (city !== 'all' && station.city !== city) return false
    if (status !== 'all' && station.status !== status) return false

    if (sensor === 'river') {
      const hasRiver = station.hasLevel || Boolean(station.sensors?.hasRiver) || station.level != null
      if (!hasRiver) return false
    } else if (sensor === 'rain') {
      const hasRain = station.hasRainfall || Boolean(station.sensors?.hasRain) || station.rainfall24h > 0
      if (!hasRain) return false
    } else if (sensor === 'meteo') {
      const hasMeteo = Boolean(station.sensors?.hasWind || station.sensors?.hasTemperature || station.temperature?.current != null || station.wind?.speed != null)
      if (!hasMeteo) return false
    }

    if (q) {
      const matchCity = station.city?.toLowerCase().includes(q)
      const matchName = station.name?.toLowerCase().includes(q)
      const matchRiver = station.river?.toLowerCase().includes(q)
      const matchId = station.id?.toLowerCase().includes(q)
      const matchBasin = station.basin?.toLowerCase().includes(q)
      if (!matchCity && !matchName && !matchRiver && !matchId && !matchBasin) return false
    }

    return true
  })
}


