import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { hydrologyRepository } from './services/hydrologyRepository.js'
import InteractiveMap from './components/InteractiveMap.jsx'
import FeaturedOverview from './components/FeaturedOverview.jsx'
import {
  filterStations,
  formatTemperature,
  formatWind,
  formatPressure,
  formatHumidity,
  formatSolarRadiation,
  degreesToCompass,
  formatRelativeTime,
} from './domain/station.js'

const views = [
  { id: 'panel', label: 'Medições atuais' },
  { id: 'map', label: 'Mapa de estações' },
  { id: 'details', label: 'Detalhes da estação' },
]

const sensorFilterOptions = [
  { id: 'all', label: 'Todas as estações' },
  { id: 'river', label: 'Com nível de rio' },
  { id: 'rain', label: 'Com pluviômetro' },
  { id: 'meteo', label: 'Meteorologia completa' },
]

const formatNumber = (value, unit) => {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ${unit}`
}

function FilterToolbar({
  searchQuery,
  onSearchChange,
  sensorFilter,
  onSensorFilterChange,
  totalCount,
  filteredCount,
  onRefresh,
  isLoading,
}) {
  return (
    <nav className="filter-toolbar" aria-label="Filtros e busca de estações">
      <div className="search-box">
        <svg className="search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="9" cy="9" r="6" />
          <path d="M13.5 13.5L18 18" />
        </svg>
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por município, rio, bacia ou código..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar estações de monitoramento"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Limpar campo de busca"
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-chips" role="group" aria-label="Filtrar por tipo de sensor">
        {sensorFilterOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`filter-chip ${sensorFilter === opt.id ? 'active' : ''}`}
            onClick={() => onSensorFilterChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="toolbar-actions">
        <span className="results-count">
          Exibindo <strong>{filteredCount}</strong> de {totalCount} estações
        </span>
        <button
          type="button"
          className={`refresh-btn ${isLoading ? 'loading' : ''}`}
          onClick={onRefresh}
          disabled={isLoading}
          title="Atualizar dados telemétricos"
        >
          <span className="refresh-icon" aria-hidden="true">↻</span>
          <span>{isLoading ? 'Atualizando...' : 'Atualizar'}</span>
        </button>
      </div>
    </nav>
  )
}

function SensorBadges({ station, compact = false }) {
  const s = station.sensors || {}
  const hasRiver = Boolean(station.hasLevel || s.hasRiver || station.level != null || (station.currentLevel != null && station.currentLevel > 0))
  const hasRain = Boolean(station.hasRainfall || s.hasRain || station.rainfall24h > 0)
  const hasWind = Boolean(s.hasWind || station.wind?.speed != null)
  const hasTemp = Boolean(s.hasTemperature || station.temperature?.current != null)
  const hasPressure = Boolean(s.hasPressure || station.pressure?.current != null)
  const hasHumidity = Boolean(s.hasHumidity || station.humidity != null)

  return (
    <div className={`sensor-badges-row ${compact ? 'compact' : ''}`} aria-label="Sensores disponíveis">
      {hasRiver && <span className="sensor-badge river" title="Sensor telemétrico de nível de rio">Rio</span>}
      {hasRain && <span className="sensor-badge rain" title="Pluviômetro telemétrico">Chuva</span>}
      {hasTemp && <span className="sensor-badge temp" title="Termômetro de superfície">Temp</span>}
      {hasWind && <span className="sensor-badge wind" title="Anemômetro (velocidade e direção)">Vento</span>}
      {hasPressure && <span className="sensor-badge pressure" title="Sensor barométrico local">Pressão</span>}
      {hasHumidity && <span className="sensor-badge humidity" title="Higrômetro de umidade relativa">Umidade</span>}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="river-card skeleton-card" aria-hidden="true">
      <div className="card-header">
        <div className="card-header-top">
          <span className="skeleton-pill w-30" />
          <span className="skeleton-pill w-20" />
        </div>
        <div className="skeleton-pill w-50 h-title" />
        <div className="skeleton-pill w-70" />
      </div>
      <div className="reading-copy">
        <div className="skeleton-pill w-40 h-metric" />
        <div className="skeleton-pill w-60" />
      </div>
      <div className="river-footer">
        <div className="skeleton-pill w-35" />
        <div className="skeleton-pill w-25 h-btn" />
      </div>
    </div>
  )
}

function LiveTimestamp({ dateTime, className = 'measured-time' }) {
  const [, setTick] = useState(0)

  useEffect(() => {
    // Atualização pontual do texto relativo a cada 5s apenas neste nó folha
    const timer = setInterval(() => setTick((t) => t + 1), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <time className={className} dateTime={dateTime}>
      {formatRelativeTime(dateTime)}
    </time>
  )
}

function PanelView({
  stations,
  allStations = stations,
  onDetails,
  isLoading,
  selectedStation,
  onSelectStation,
}) {
  return (
    <section className="module" aria-labelledby="heading-panel">
      {!isLoading && (allStations.length > 0 || stations.length > 0) && (
        <FeaturedOverview
          stations={allStations.length > 0 ? allStations : stations}
          selectedStation={selectedStation}
          onSelectStation={onSelectStation}
          onDetails={onDetails}
        />
      )}

      <div className="module-intro">
        <div>
          <h2 id="heading-panel" className="module-title">Todas as Estações</h2>
          <p className="module-desc">Monitoramento hidrológico e meteorológico das estações telemétricas ativas no Rio Grande do Sul.</p>
        </div>
      </div>

      <div className="river-grid">
        {isLoading && stations.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={`skeleton-${i}`} />)
        ) : (
          stations.map((station) => {
          const temp = station.temperature?.current
          const wind = station.wind?.speed
          const hasRiver = Boolean(
            station.hasLevel ||
            station.sensors?.hasRiver ||
            station.isDeploying ||
            station.level != null ||
            (station.currentLevel != null && station.currentLevel > 0)
          )
          const isJustUpdated = Boolean(station._lastUpdated && Date.now() - station._lastUpdated < 1800)

          return (
            <article className={`river-card ${isJustUpdated ? 'card-just-updated' : ''}`} key={station.id}>
              <div className="card-header">
                <div className="card-header-top">
                  <span className="basin-tag">{station.basin}</span>
                  <span className="station-code-pill">{station.id}</span>
                </div>
                <h2 className="station-city">{station.city}</h2>
                <p className="station-name">{station.name}</p>
                <SensorBadges station={station} compact />
              </div>

              <div className="reading-copy">
                {hasRiver ? (
                  <>
                    <div className="primary-metric">
                      <strong className="metric-value">
                        {station.isDeploying || station.currentLevel == null
                          ? '-'
                          : formatNumber(station.currentLevel, 'mm')}
                      </strong>
                      <span className="metric-label">
                        {station.river ? `Nível do ${station.river}` : 'Nível do rio'}
                        {station.isDeploying ? (
                          <span className="trend-indicator deploying">Histórico em implantação</span>
                        ) : (
                          station.trend != null && (
                            <span className={`trend-indicator ${station.trend > 0.05 ? 'up' : station.trend < -0.05 ? 'down' : 'stable'}`}>
                              {station.trend > 0.05 ? ' ↑ Subindo' : station.trend < -0.05 ? ' ↓ Descendo' : ' → Estável'}
                            </span>
                          )
                        )}
                      </span>
                    </div>
                    <div className="secondary-metric">
                      <span>Chuva em 24h:</span>
                      <strong>{formatNumber(station.rainfall24h, 'mm')}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="primary-metric">
                      <strong className="metric-value">{formatNumber(station.rainfall24h, 'mm')}</strong>
                      <span className="metric-label">Chuva acumulada em 24h</span>
                    </div>
                    {temp != null && (
                      <div className="secondary-metric">
                        <span>Temperatura:</span>
                        <strong>{formatTemperature(temp)}</strong>
                      </div>
                    )}
                  </>
                )}

                {(temp != null || wind != null) && (
                  <div className="extra-telemetry">
                    {temp != null && <span>🌡 {formatTemperature(temp)}</span>}
                    {temp != null && wind != null && <span className="telemetry-sep">·</span>}
                    {wind != null && <span>💨 {formatNumber(wind, 'km/h')}</span>}
                  </div>
                )}
              </div>

              <div className="river-footer">
                <LiveTimestamp dateTime={station.measuredAt} />
                <button
                  type="button"
                  className="details-btn"
                  onClick={() => onDetails(station)}
                  aria-label={`Ver detalhes da estação ${station.name}`}
                >
                  Ver detalhes
                </button>
              </div>
            </article>
          )
        })
        )}
      </div>

      {!isLoading && stations.length === 0 && (
        <div className="empty-results">
          <p>Nenhuma estação encontrada para os critérios informados.</p>
          <small>Tente alterar o termo de busca ou limpar o filtro de sensores.</small>
        </div>
      )}
    </section>
  )
}

function MapView({ stations, onDetails, selectedStation, onSelectStation }) {
  return (
    <section className="module map-module" aria-labelledby="heading-map">
      <div className="module-intro">
        <div>
          <h1 id="heading-map" className="module-title">Mapa de Estações</h1>
          <p className="module-desc">
            Visualização cartográfica georreferenciada da Rede Hidrometeorológica Oficial da Defesa Civil RS.
          </p>
        </div>
      </div>

      <InteractiveMap
        stations={stations}
        onDetails={onDetails}
        selectedStation={selectedStation}
        onSelectStation={onSelectStation}
      />
    </section>
  )
}

function DetailsView({ station, onBack, isLive = false }) {
  const prevValuesRef = useRef({})
  const [activeFlashes, setActiveFlashes] = useState({})

  useEffect(() => {
    if (!station) return
    const prev = prevValuesRef.current
    const flashes = {}

    if (prev.id === station.id) {
      if (prev.currentLevel != null && Math.abs(prev.currentLevel - station.currentLevel) > 0.001) flashes.level = true
      if (prev.rainfall24h != null && Math.abs(prev.rainfall24h - station.rainfall24h) > 0.001) flashes.rain = true
      if (prev.tempCurrent != null && Math.abs(prev.tempCurrent - (station.temperature?.current ?? 0)) > 0.05) flashes.temp = true
      if (prev.windSpeed != null && Math.abs(prev.windSpeed - (station.wind?.speed ?? 0)) > 0.1) flashes.wind = true
      if (prev.pressure != null && Math.abs(prev.pressure - (station.pressure?.current ?? 0)) > 0.05) flashes.pressure = true
      if (prev.humidity != null && Math.abs(prev.humidity - (station.humidity ?? 0)) > 0.1) flashes.humidity = true
    }

    prevValuesRef.current = {
      id: station.id,
      currentLevel: station.currentLevel,
      rainfall24h: station.rainfall24h,
      tempCurrent: station.temperature?.current,
      windSpeed: station.wind?.speed,
      pressure: station.pressure?.current,
      humidity: station.humidity,
    }

    if (Object.keys(flashes).length > 0) {
      setActiveFlashes(flashes)
      const timeout = setTimeout(() => setActiveFlashes({}), 1400)
      return () => clearTimeout(timeout)
    }
  }, [station])

  if (!station) {
    return (
      <section className="module" aria-labelledby="heading-details-empty">
        <div className="empty-details-card">
          <h2 id="heading-details-empty">Nenhuma estação selecionada</h2>
          <p>Escolha uma estação no painel de medições ou no mapa para visualizar a ficha técnica e a telemetria completa.</p>
          <button type="button" className="primary-action-btn" onClick={onBack}>
            Ver medições atuais
          </button>
        </div>
      </section>
    )
  }

  const r = station.rainfall || {}
  const t = station.temperature || {}
  const w = station.wind || {}
  const p = station.pressure || {}

  return (
    <section className="module" aria-labelledby="heading-details">
      <article className="details-container">
        <div className="details-top-nav">
          <button
            type="button"
            className="back-nav-btn"
            onClick={onBack}
            aria-label="Voltar para a lista de medições atuais"
          >
            ← Voltar para as medições
          </button>
        </div>

        <header className="details-header">
          <div className="details-header-main">
            <div className="details-tags">
              <span className="basin-tag">{station.basin}</span>
              <span className="region-tag">{station.region}</span>
            </div>
            <h1 id="heading-details" className="details-title">{station.name}</h1>
            <p className="details-subtitle">
              Município de <strong>{station.city}</strong> · Código oficial da estação: <code>{station.id}</code>
            </p>
          </div>
          <div className={`details-meta-pill ${station.isLive || isLive ? 'live' : ''}`}>
            <div className="meta-live-row">
              <span className="meta-live-dot" aria-hidden="true" />
              <span className="meta-label">
                {station.isLive || isLive ? 'Transmissão Contínua (Tempo Real)' : 'Última transmissão telemétrica'}
              </span>
            </div>
            <LiveTimestamp dateTime={station.measuredAt} className="meta-value" />
          </div>
        </header>

        <section className="section-block" aria-labelledby="heading-sensors-active">
          <h2 id="heading-sensors-active" className="section-title">Sensores e Recursos Ativos</h2>
          <SensorBadges station={station} />
        </section>

        <section className="section-block" aria-labelledby="heading-telemetry">
          <h2 id="heading-telemetry" className="section-title">Telemetria Hidrometeorológica em Tempo Real</h2>
          <div className="telemetry-grid">
            <div className={`metric-card highlight ${activeFlashes.level ? 'value-updated' : ''}`}>
              <span className="metric-label">Nível do Rio</span>
              <div className="metric-value">
                {station.isDeploying || station.currentLevel == null
                  ? '-'
                  : formatNumber(station.currentLevel, 'mm')}
              </div>
              <small className="metric-hint">
                {station.isDeploying ? (
                  'Histórico em implantação'
                ) : (
                  <>
                    {station.river ? `Rio: ${station.river}` : 'Leito não identificado'}
                    {station.trend != null && (
                      <span> · Tendência: {station.trend > 0.05 ? 'Subindo' : station.trend < -0.05 ? 'Descendo' : 'Estável'}</span>
                    )}
                  </>
                )}
              </small>
            </div>

            <div className={`metric-card ${activeFlashes.rain ? 'value-updated' : ''}`}>
              <span className="metric-label">Chuva em 24h</span>
              <div className="metric-value">{formatNumber(station.rainfall24h, 'mm')}</div>
              <small className="metric-hint">1h: {formatNumber(r.h1, 'mm')} · 6h: {formatNumber(r.h6, 'mm')}</small>
            </div>

            <div className={`metric-card ${activeFlashes.temp ? 'value-updated' : ''}`}>
              <span className="metric-label">Temperatura Atual</span>
              <div className="metric-value">{formatTemperature(t.current)}</div>
              <small className="metric-hint">
                {t.max != null ? `Máx: ${formatTemperature(t.max)} · Mín: ${formatTemperature(t.min)}` : 'Variação não informada'}
              </small>
            </div>

            <div className="metric-card">
              <span className="metric-label">Sensação Térmica</span>
              <div className="metric-value">{formatTemperature(station.thermalSensation)}</div>
              <small className="metric-hint">Índice bioclimático calculado</small>
            </div>

            <div className={`metric-card ${activeFlashes.wind ? 'value-updated' : ''}`}>
              <span className="metric-label">Vento em Superfície</span>
              <div className="metric-value">{formatWind(w.speed, w.gust, w.direction)}</div>
              <small className="metric-hint">
                {w.direction != null ? `Azimute: ${w.direction}° (${degreesToCompass(w.direction)})` : 'Direção não disp.'}
                {w.gust != null && ` · Rajada: ${formatNumber(w.gust, 'km/h')}`}
              </small>
            </div>

            <div className={`metric-card ${activeFlashes.pressure ? 'value-updated' : ''}`}>
              <span className="metric-label">Pressão Atmosférica</span>
              <div className="metric-value">{formatPressure(p.current, p.trend)}</div>
              <small className="metric-hint">Barômetro calibrado</small>
            </div>

            <div className={`metric-card ${activeFlashes.humidity ? 'value-updated' : ''}`}>
              <span className="metric-label">Umidade Relativa</span>
              <div className="metric-value">{formatHumidity(station.humidity)}</div>
              <small className="metric-hint">Higrômetro de superfície</small>
            </div>

            <div className="metric-card">
              <span className="metric-label">Radiação Solar</span>
              <div className="metric-value">{formatSolarRadiation(station.solarRadiation)}</div>
              <small className="metric-hint">Piranômetro de superfície</small>
            </div>
          </div>
        </section>

        <section className="section-block" aria-labelledby="heading-rainfall-history">
          <h2 id="heading-rainfall-history" className="section-title">Histórico de Precipitação Acumulada por Janela Temporal</h2>
          <div className="table-wrapper">
            <table className="rainfall-table">
              <thead>
                <tr>
                  <th scope="col">Janela Temporal</th>
                  <th scope="col">Volume Acumulado</th>
                  <th scope="col">Janela Temporal</th>
                  <th scope="col">Volume Acumulado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Instantâneo (15 segundos)</td>
                  <td>{formatNumber(r.s015, 'mm')}</td>
                  <td>12 horas</td>
                  <td>{formatNumber(r.h12, 'mm')}</td>
                </tr>
                <tr>
                  <td>5 minutos</td>
                  <td>{formatNumber(r.min5, 'mm')}</td>
                  <td>24 horas (1 dia)</td>
                  <td>{formatNumber(r.h24, 'mm')}</td>
                </tr>
                <tr>
                  <td>15 minutos</td>
                  <td>{formatNumber(r.min15, 'mm')}</td>
                  <td>48 horas (2 dias)</td>
                  <td>{formatNumber(r.h48, 'mm')}</td>
                </tr>
                <tr>
                  <td>1 hora</td>
                  <td>{formatNumber(r.h1, 'mm')}</td>
                  <td>72 horas (3 dias)</td>
                  <td>{formatNumber(r.h72, 'mm')}</td>
                </tr>
                <tr>
                  <td>3 horas</td>
                  <td>{formatNumber(r.h3, 'mm')}</td>
                  <td>7 dias (168h)</td>
                  <td>{formatNumber(r.h168, 'mm')}</td>
                </tr>
                <tr>
                  <td>6 horas</td>
                  <td>{formatNumber(r.h6, 'mm')}</td>
                  <td>Mês Atual / Mês Anterior</td>
                  <td>{formatNumber(r.currentMonth, 'mm')} / {formatNumber(r.previousMonth, 'mm')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-block" aria-labelledby="heading-technical-data">
          <h2 id="heading-technical-data" className="section-title">Cadastro Técnico da Estação</h2>
          <dl className="details-grid">
            <div className="detail-item"><dt>Município</dt><dd>{station.city || '—'}</dd></div>
            <div className="detail-item"><dt>Código Oficial</dt><dd>{station.id}</dd></div>
            <div className="detail-item"><dt>Bacia Hidrográfica</dt><dd>{station.basin || '—'}</dd></div>
            <div className="detail-item"><dt>Região Geográfica</dt><dd>{station.region || '—'}</dd></div>
            <div className="detail-item">
              <dt>Coordenadas Geográficas</dt>
              <dd>
                {Number.isFinite(station.latitude) && Number.isFinite(station.longitude)
                  ? `${station.latitude.toFixed(4)}°, ${station.longitude.toFixed(4)}°`
                  : 'Coordenadas não informadas'}
              </dd>
            </div>
            <div className="detail-item"><dt>Altitude</dt><dd>{station.altitude != null ? `${station.altitude} m` : 'Não informada'}</dd></div>
            <div className="detail-item"><dt>Área de Drenagem</dt><dd>{station.drainageArea != null && station.drainageArea > 0 ? `${station.drainageArea} km²` : '—'}</dd></div>
            <div className="detail-item"><dt>Vazão do Rio</dt><dd>{station.riverFlow != null && station.riverFlow > 0 ? `${station.riverFlow} m³/s` : '—'}</dd></div>
          </dl>
        </section>
      </article>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState('panel')
  const [stations, setStations] = useState([])
  const [selected, setSelected] = useState(null)
  const [dataSource, setDataSource] = useState('Carregando dados...')
  const [isLive, setIsLive] = useState(false)
  const [wsStatus, setWsStatus] = useState('disconnected')
  const [searchQuery, setSearchQuery] = useState('')
  const [sensorFilter, setSensorFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    hydrologyRepository.listStations().then((items) => {
      setStations(items)
      setSelected((prev) => {
        if (!prev) return items[0] || null
        const match = items.find((s) => s.id === prev.id)
        return match || items[0] || null
      })
      setDataSource(items.source || 'API Oficial Defesa Civil RS')
      setIsLive(Boolean(items.isLive))
    }).catch((err) => {
      console.error('Erro ao carregar estações:', err)
      setDataSource('Dados de Demonstração (Mock)')
      setIsLive(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    loadData()

    // Buffer de atualizações para evitar renderizações a cada milissegundo e travamentos
    const pendingBatch = new Map()
    let batchTimer = null

    const flushBatch = () => {
      if (pendingBatch.size === 0) return

      const updates = Array.from(pendingBatch.values())
      pendingBatch.clear()

      setStations((prev) => {
        const hasMock = prev.some((s) => s.isMock || s.id.startsWith('ANA-'))
        const hasRealUpdates = updates.some((u) => !u.isMock)

        if (hasMock && hasRealUpdates) {
          const map = new Map()
          updates.forEach((u) => map.set(u.id, { ...u, _lastUpdated: Date.now() }))
          return Array.from(map.values())
        }

        const map = new Map(prev.map((s) => [s.id, s]))
        updates.forEach((u) => {
          const existing = map.get(u.id)
          map.set(u.id, existing ? { ...existing, ...u, _lastUpdated: Date.now() } : { ...u, _lastUpdated: Date.now() })
        })
        return Array.from(map.values())
      })

      setSelected((cur) => {
        if (!cur || cur.isMock || cur.id?.startsWith('ANA-')) {
          const firstReal = updates.find((u) => !u.isMock)
          if (firstReal) return { ...firstReal, _lastUpdated: Date.now() }
          return cur
        }
        const updated = updates.find((u) => u.id === cur.id)
        if (updated) {
          return { ...cur, ...updated, _lastUpdated: Date.now() }
        }
        return cur
      })

      setIsLive(true)
    }

    batchTimer = setInterval(flushBatch, 1500)

    const unsubscribe = hydrologyRepository.subscribeLiveUpdates(
      (updatedStation) => {
        pendingBatch.set(updatedStation.id, updatedStation)
      },
      (status) => {
        setWsStatus(status)
      },
    )

    return () => {
      if (batchTimer) clearInterval(batchTimer)
      unsubscribe?.()
    }
  }, [loadData])

  const filteredStations = useMemo(() => {
    return filterStations(stations, {
      query: searchQuery,
      sensor: sensorFilter,
    })
  }, [stations, searchQuery, sensorFilter])

  const openDetails = (station) => {
    setSelected(station)
    setView('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const liveBadgeInfo = useMemo(() => {
    if (wsStatus === 'connected') {
      return { label: 'Tempo Real (WebSocket)', mode: 'live-ws' }
    }
    if (wsStatus === 'connecting') {
      return { label: 'Conectando WebSocket...', mode: 'connecting' }
    }
    if (isLive) {
      return { label: 'API Oficial Defesa Civil RS', mode: 'live' }
    }
    return { label: dataSource, mode: 'mock' }
  }, [wsStatus, isLive, dataSource])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-group">
          <button
            type="button"
            className="brand-btn"
            onClick={() => setView('panel')}
            aria-label="Ir para a tela inicial"
          >
            Alerta<span className="brand-accent">RS</span>
          </button>
          <span className={`source-badge ${liveBadgeInfo.mode}`}>
            <span className="pulse-dot" aria-hidden="true" />
            <span>{liveBadgeInfo.label}</span>
          </span>
        </div>

        <nav className="nav-tabs" aria-label="Navegação do aplicativo">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-tab ${view === item.id ? 'active' : ''}`}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {view !== 'details' && (
          <FilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sensorFilter={sensorFilter}
            onSensorFilterChange={setSensorFilter}
            totalCount={stations.length}
            filteredCount={filteredStations.length}
            onRefresh={loadData}
            isLoading={isLoading}
          />
        )}

        {view === 'panel' && (
          <PanelView
            stations={filteredStations}
            allStations={stations}
            onDetails={openDetails}
            isLoading={isLoading}
            selectedStation={selected}
            onSelectStation={setSelected}
          />
        )}
        {view === 'map' && (
          <MapView
            stations={filteredStations}
            onDetails={openDetails}
            selectedStation={selected}
            onSelectStation={setSelected}
          />
        )}
        {view === 'details' && (
          <DetailsView
            station={selected}
            onBack={() => setView('panel')}
            isLive={isLive || wsStatus === 'connected'}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          AlertaRS · Monitoramento hidrológico e meteorológico do Rio Grande do Sul · Fonte:{' '}
          <a
            href="https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rede Hidrometeorológica da Defesa Civil RS
          </a>
        </p>
      </footer>
    </div>
  )
}
