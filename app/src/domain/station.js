export const ALERT_LEVELS = {
  normal: { label: 'Normal', rank: 0 },
  attention: { label: 'Atenção', rank: 1 },
  alert: { label: 'Alerta', rank: 2 },
  flood: { label: 'Inundação', rank: 3 },
}

export function classifyLevel(level, thresholds) {
  if (level >= thresholds.flood) return 'flood'
  if (level >= thresholds.alert) return 'alert'
  if (level >= thresholds.attention) return 'attention'
  return 'normal'
}

export function normalizeStation(station) {
  const status = classifyLevel(station.currentLevel, station.thresholds)
  return { ...station, status, statusLabel: ALERT_LEVELS[status].label }
}

export function filterStations(stations, { city = 'all', status = 'all' } = {}) {
  return stations.filter(
    (station) => (city === 'all' || station.city === city) && (status === 'all' || station.status === status),
  )
}
