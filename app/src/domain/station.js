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

export function filterStations(stations, { city = 'all', status = 'all' } = {}) {
  return stations.filter(
    (station) => (city === 'all' || station.city === city) && (status === 'all' || station.status === status),
  )
}

