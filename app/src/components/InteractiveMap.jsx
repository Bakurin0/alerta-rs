import React, { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  formatTemperature,
  formatWind,
  formatRelativeTime,
} from '../domain/station.js'

// Camadas de mapa base 100% livres de marcas d'água / sem necessidade de chave de API
const BASEMAPS = {
  dark: {
    name: 'Escuro',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    labels: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
  },
  satellite: {
    name: 'Satélite',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    labels: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
  osm: {
    name: 'Padrão',
    base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    labels: null,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: 'abc',
  },
}

// Centro e enquadramento ótimo do Rio Grande do Sul
const RS_CENTER = [-30.15, -53.25]
const RS_INITIAL_ZOOM = 7
const RS_BOUNDS = [
  [-33.85, -57.80],
  [-26.95, -49.65],
]

const formatNumber = (value, unit) => {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ${unit}`
}

export default function InteractiveMap({ stations, onDetails, selectedStation, onSelectStation }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersGroupRef = useRef(null)
  const prevSelectedIdRef = useRef(null)
  const baseTileLayerRef = useRef(null)
  const labelsTileLayerRef = useRef(null)
  const stateBoundaryRef = useRef(null)

  const [activeBasemap, setActiveBasemap] = useState('dark')
  const [stationSearch, setStationSearch] = useState('')

  // Inicialização do mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: RS_CENTER,
      zoom: RS_INITIAL_ZOOM,
      minZoom: 6,
      maxZoom: 17,
      zoomControl: false,
      attributionControl: true,
      maxBounds: [
        [-35.0, -60.0],
        [-25.0, -47.0],
      ],
      maxBoundsViscosity: 0.8,
    })

    // Controles de zoom
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Camada base
    const cfg = BASEMAPS[activeBasemap]
    baseTileLayerRef.current = L.tileLayer(cfg.base, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
      subdomains: cfg.subdomains || 'abc',
    }).addTo(map)

    // Camada de rótulos/toponímia
    if (cfg.labels) {
      labelsTileLayerRef.current = L.tileLayer(cfg.labels, {
        maxZoom: cfg.maxZoom,
        opacity: 0.9,
      }).addTo(map)
    }

    // Grupo de marcadores
    markersGroupRef.current = L.featureGroup().addTo(map)

    // Contorno oficial do estado do RS (IBGE) com cancelamento em desmontagem
    const abortCtrl = new AbortController()
    fetch('https://servicodados.ibge.gov.br/api/v3/malhas/estados/43?formato=application/vnd.geo+json&qualidade=minima', {
      signal: abortCtrl.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((geoData) => {
        if (geoData && mapInstanceRef.current) {
          stateBoundaryRef.current = L.geoJSON(geoData, {
            style: {
              color: '#38bdf8',
              weight: 1.8,
              opacity: 0.7,
              fillColor: '#38bdf8',
              fillOpacity: 0.015,
              dashArray: '4, 6',
            },
            interactive: false,
          }).addTo(map)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          // Silencioso se offline ou bloqueado
        }
      })

    mapInstanceRef.current = map

    return () => {
      abortCtrl.abort()
      map.remove()
      mapInstanceRef.current = null
      markersGroupRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Troca dinâmica do mapa base (Escuro / Satélite / Padrão)
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !baseTileLayerRef.current) return

    const cfg = BASEMAPS[activeBasemap]
    baseTileLayerRef.current.setUrl(cfg.base)
    baseTileLayerRef.current.options.maxZoom = cfg.maxZoom
    if (cfg.subdomains) {
      baseTileLayerRef.current.options.subdomains = cfg.subdomains
    }

    // Gerenciamento da camada de rótulos
    if (cfg.labels) {
      if (!labelsTileLayerRef.current) {
        labelsTileLayerRef.current = L.tileLayer(cfg.labels, {
          maxZoom: cfg.maxZoom,
          opacity: 0.9,
        }).addTo(map)
      } else {
        labelsTileLayerRef.current.setUrl(cfg.labels)
        if (!map.hasLayer(labelsTileLayerRef.current)) {
          labelsTileLayerRef.current.addTo(map)
        }
      }
    } else if (labelsTileLayerRef.current && map.hasLayer(labelsTileLayerRef.current)) {
      map.removeLayer(labelsTileLayerRef.current)
    }
  }, [activeBasemap])

  // Centralização no estado
  const resetRsView = useCallback(() => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.fitBounds(RS_BOUNDS, {
      padding: [30, 30],
      maxZoom: 8,
      animate: true,
      duration: 0.8,
    })
  }, [])

  // Foco suave na estação
  const zoomToStation = useCallback((station) => {
    if (!mapInstanceRef.current || !station || !Number.isFinite(station.latitude) || !Number.isFinite(station.longitude)) return
    mapInstanceRef.current.flyTo([station.latitude, station.longitude], 12, {
      animate: true,
      duration: 0.7,
    })
  }, [])

  // ponytail: render native circle marker dots directly; 130 dots re-rendered in ~0.5ms without DOM diffing leaks
  useEffect(() => {
    const map = mapInstanceRef.current
    const group = markersGroupRef.current
    if (!map || !group) return

    group.clearLayers()

    stations.forEach((station) => {
      if (!Number.isFinite(station.latitude) || !Number.isFinite(station.longitude)) return

      const isSelected = selectedStation?.id === station.id
      const color =
        station.status === 'flood' ? '#ef4444' :
        station.status === 'alert' ? '#f97316' :
        station.status === 'attention' ? '#f59e0b' :
        '#38bdf8'

      const hasRiver = Boolean(
        station.hasLevel ||
          station.sensors?.hasRiver ||
          station.level != null ||
          (station.currentLevel != null && station.currentLevel > 0),
      )
      const metric = hasRiver
        ? `Nível: ${formatNumber(station.currentLevel, 'm')}`
        : `Chuva 24h: ${formatNumber(station.rainfall24h, 'mm')}`

      const marker = L.circleMarker([station.latitude, station.longitude], {
        radius: isSelected ? 8 : 5.5,
        fillColor: color,
        fillOpacity: 0.95,
        color: isSelected ? '#ffffff' : '#0b0d0e',
        weight: isSelected ? 2.5 : 1.2,
      })

      marker.bindTooltip(
        `<div class="map-tooltip-content">
          <strong>${station.city}</strong>
          <span>${station.name}</span>
          <div class="tooltip-metric">${metric}</div>
        </div>`,
        { direction: 'top', offset: [0, -6], opacity: 0.95, className: 'custom-map-tooltip' },
      )

      marker.on('click', () => {
        onSelectStation?.(station)
      })

      group.addLayer(marker)
    })
  }, [stations, selectedStation?.id, onSelectStation])

  useEffect(() => {
    if (selectedStation && selectedStation.id !== prevSelectedIdRef.current) {
      prevSelectedIdRef.current = selectedStation.id
      zoomToStation(selectedStation)
    }
  }, [selectedStation?.id, zoomToStation]) // eslint-disable-line react-hooks/exhaustive-deps

  const searchResults = stationSearch.trim()
    ? stations.filter((s) => {
        const q = stationSearch.toLowerCase()
        return (
          s.name?.toLowerCase().includes(q) ||
          s.city?.toLowerCase().includes(q) ||
          s.id?.toLowerCase().includes(q) ||
          s.river?.toLowerCase().includes(q)
        )
      })
    : []

  return (
    <div className="interactive-map-wrapper">
      <div className="map-toolbar-overlay">
        {/* Campo de busca com auto-foco */}
        <div className="map-search-container">
          <input
            type="search"
            className="map-search-input"
            placeholder="Buscar município ou estação..."
            value={stationSearch}
            onChange={(e) => setStationSearch(e.target.value)}
            aria-label="Buscar estação no mapa interativo"
          />
          {searchResults.length > 0 && (
            <ul className="map-search-dropdown" role="listbox">
              {searchResults.slice(0, 6).map((station) => (
                <li key={station.id}>
                  <button
                    type="button"
                    className="map-search-item"
                    onClick={() => {
                      onSelectStation?.(station)
                      zoomToStation(station)
                      setStationSearch('')
                    }}
                  >
                    <strong>{station.city}</strong>
                    <span>{station.name}</span>
                    <code>{station.id}</code>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alternador de camadas sem marcas d'água */}
        <div className="map-controls-group">
          <div className="basemap-switcher" role="radiogroup" aria-label="Camada base do mapa">
            {Object.entries(BASEMAPS).map(([key, config]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={activeBasemap === key}
                className={`basemap-btn ${activeBasemap === key ? 'active' : ''}`}
                onClick={() => setActiveBasemap(key)}
              >
                {config.name}
              </button>
            ))}
          </div>

          <div className="map-stats-pill">
            <span className="live-dot-mini" aria-hidden="true" />
            <span><strong>{stations.length}</strong> estações no mapa</span>
          </div>

          <button
            type="button"
            className="reset-view-btn"
            onClick={resetRsView}
            title="Enquadrar todo o Rio Grande do Sul"
            aria-label="Enquadrar todo o Rio Grande do Sul"
          >
            ⛶ Centralizar RS
          </button>
        </div>
      </div>

      {/* Canvas Leaflet acessível */}
      <div
        className="leaflet-map-canvas"
        ref={mapContainerRef}
        role="region"
        aria-label="Mapa cartográfico do Rio Grande do Sul"
        tabIndex={0}
      />

      {/* Painel lateral da estação selecionada */}
      <aside className="map-selected-drawer" aria-labelledby="drawer-station-title">
        {selectedStation ? (
          <div className="drawer-content">
            <div className="drawer-header">
              <div className="drawer-header-top">
                <div className="drawer-badges">
                  <span className="basin-tag">{selectedStation.basin}</span>
                  <span className="station-code-pill">{selectedStation.id}</span>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => onSelectStation?.(null)}
                  aria-label="Fechar painel de detalhes"
                  title="Fechar"
                >
                  ×
                </button>
              </div>
              <h2 id="drawer-station-title" className="drawer-city">{selectedStation.city}</h2>
              <p className="drawer-name">{selectedStation.name}</p>
              <div className="drawer-time-row">
                <span className="live-dot-mini" aria-hidden="true" />
                <time className="drawer-time-text" dateTime={selectedStation.measuredAt}>
                  Transmissão: {formatRelativeTime(selectedStation.measuredAt)}
                </time>
              </div>
            </div>

            <div className="drawer-telemetry">
              {selectedStation.hasLevel ? (
                <div className="drawer-metric-hero">
                  <span className="metric-label">
                    {selectedStation.river ? `Nível do ${selectedStation.river}` : 'Nível Atual do Rio'}
                  </span>
                  <strong className="metric-value">{formatNumber(selectedStation.currentLevel, 'm')}</strong>
                  {selectedStation.trend != null && (
                    <span className={`trend-indicator ${selectedStation.trend > 0.05 ? 'up' : selectedStation.trend < -0.05 ? 'down' : 'stable'}`}>
                      {selectedStation.trend > 0.05 ? '↑ Nível subindo' : selectedStation.trend < -0.05 ? '↓ Nível descendo' : '→ Nível estável'}
                    </span>
                  )}
                </div>
              ) : (
                <div className="drawer-metric-hero">
                  <span className="metric-label">Chuva Acumulada em 24h</span>
                  <strong className="metric-value">{formatNumber(selectedStation.rainfall24h, 'mm')}</strong>
                </div>
              )}

              <dl className="drawer-stats-grid">
                {selectedStation.hasLevel && (
                  <div>
                    <dt>Chuva em 24h</dt>
                    <dd>{formatNumber(selectedStation.rainfall24h, 'mm')}</dd>
                  </div>
                )}
                {selectedStation.temperature?.current != null && (
                  <div>
                    <dt>Temperatura</dt>
                    <dd>{formatTemperature(selectedStation.temperature.current)}</dd>
                  </div>
                )}
                {selectedStation.wind?.speed != null && (
                  <div>
                    <dt>Vento</dt>
                    <dd>{formatWind(selectedStation.wind.speed, selectedStation.wind.gust)}</dd>
                  </div>
                )}
                {selectedStation.altitude != null && (
                  <div>
                    <dt>Altitude</dt>
                    <dd>{selectedStation.altitude} m</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="drawer-footer">
              <button
                type="button"
                className="primary-action-btn"
                onClick={() => onDetails?.(selectedStation)}
              >
                Abrir ficha completa da estação
              </button>
            </div>
          </div>
        ) : (
          <div className="drawer-empty">
            <p>Clique em um ponto do mapa ou busque acima para inspecionar os sensores da estação.</p>
          </div>
        )}
      </aside>
    </div>
  )
}
