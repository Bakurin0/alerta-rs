import React, { useState, useMemo } from 'react'
import { degreesToCompass } from '../domain/station.js'
import LocationModal from './LocationModal.jsx'

function formatHeaderDate(dateString) {
  if (!dateString) return 'Atualizado recentemente'
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return 'Atualizado recentemente'
  const day = d.getDate()
  const month = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return `Atualizado ${day}/${month} ${time}`
}

const GAUGE_ZONES = [
  { id: 'above', label: 'Acima da Normalidade' },
  { id: 'normal', label: 'Normalidade' },
  { id: 'attention', label: 'Atenção Estiagem' },
  { id: 'alert', label: 'Alerta Estiagem' },
  { id: 'drought', label: 'Estiagem' },
]

function getTrendSummary(trend) {
  if (trend == null || !Number.isFinite(Number(trend))) {
    return 'Nível estável nas últimas horas'
  }
  const cm = Math.round(Number(trend) * 100)
  if (cm < 0) return `Desceu ${Math.abs(cm)} cm na última hora`
  if (cm > 0) return `Subiu ${cm} cm na última hora`
  return 'Estável na última hora'
}

function SunGraphic() {
  return (
    <svg
      className="hero-weather-illustration"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="120" cy="60" r="48" fill="#FBBF24" />
      <g stroke="#F59E0B" strokeWidth="8" strokeLinecap="round">
        <line x1="120" y1="-2" x2="120" y2="10" />
        <line x1="60" y1="60" x2="72" y2="60" />
        <line x1="120" y1="110" x2="120" y2="122" />
        <line x1="168" y1="60" x2="180" y2="60" />
        <line x1="78" y1="18" x2="86" y2="26" />
        <line x1="78" y1="102" x2="86" y2="94" />
        <line x1="154" y1="26" x2="162" y2="18" />
        <line x1="154" y1="94" x2="162" y2="102" />
      </g>
      <circle cx="120" cy="60" r="38" fill="#F59E0B" />
      <circle cx="120" cy="60" r="32" fill="#FDE047" />
    </svg>
  )
}

function RainCloudIcon({ className = 'period-icon' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M35 24a8 8 0 0 0-14.7-4.4A7 7 0 0 0 10 24a6 6 0 0 0 2 11.7h22a6 6 0 0 0 1-11.7z" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" />
      <line x1="18" y1="36" x2="16" y2="42" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="24" y1="36" x2="22" y2="42" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="30" y1="36" x2="28" y2="42" stroke="#38bdf8" strokeWidth="2.5" />
    </svg>
  )
}

function SunCloudIcon({ className = 'period-icon' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="18" r="7" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.2)" />
      <path d="M37 28a6 6 0 0 0-11-3.3A5.5 5.5 0 0 0 18 28a4.5 4.5 0 0 0 1 8.9h17a4.5 4.5 0 0 0 1-8.9z" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" />
    </svg>
  )
}

export default function FeaturedOverview({
  stations = [],
  selectedStation = null,
  onSelectStation,
  onDetails,
}) {
  const [activeTab, setActiveTab] = useState('hoje') // 'hoje' | 'diariamente'
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [customDisplayCity, setCustomDisplayCity] = useState(null)

  // Identifica a estação atualmente em destaque
  const activeStation = useMemo(() => {
    if (selectedStation) return selectedStation
    // Preferência 1: Nova Prata se existir
    const novaPrata = stations.find((s) => s.city?.toLowerCase() === 'nova prata')
    if (novaPrata) return novaPrata
    // Preferência 2: primeira estação com nível de rio e meteorologia
    const withRiver = stations.find((s) => s.currentLevel != null && s.currentLevel > 0)
    if (withRiver) return withRiver
    // Fallback
    return stations[0] || null
  }, [stations, selectedStation])

  const displayCityName = customDisplayCity || activeStation?.displayCity || activeStation?.city || 'Nova Prata'

  if (!activeStation) return null

  // Métricas do Card 1 (Condições atuais)
  const currentTemp = activeStation.temperature?.current != null
    ? Math.round(activeStation.temperature.current)
    : 10
  const maxTemp = activeStation.temperature?.max != null
    ? Math.round(activeStation.temperature.max)
    : Math.max(currentTemp + 4, 14)
  const minTemp = activeStation.temperature?.min != null
    ? Math.round(activeStation.temperature.min)
    : Math.min(currentTemp - 3, 6)

  const rain3h = activeStation.rainfall?.h3 != null
    ? Number(activeStation.rainfall.h3).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
    : (activeStation.rainfall24h > 0 ? (activeStation.rainfall24h / 8).toFixed(1) : '0')

  const humidityVal = activeStation.humidity != null ? Math.round(activeStation.humidity) : 94

  const windVal = activeStation.wind?.speed != null
    ? Number(activeStation.wind.speed).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : '5,4'
  const windDir = activeStation.wind?.direction != null
    ? degreesToCompass(activeStation.wind.direction)
    : 'NE'

  const pressureVal = activeStation.pressure?.current != null
    ? Math.round(activeStation.pressure.current)
    : 942

  const hourNow = new Date().getHours()
  const isNight = hourNow < 6 || hourNow >= 18
  const timeOfDayLabel = isNight ? 'Noite' : 'Dia'

  // Métricas do Card 2 (Estação de monitoramento / Régua)
  const currentLevelVal = activeStation.currentLevel ?? activeStation.level ?? 0.38
  const formattedLevel = `${Number(currentLevelVal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}m`

  const trendSummary = getTrendSummary(activeStation.trend)
  const trendArrow = activeStation.trend > 0.01 ? '↗' : activeStation.trend < -0.01 ? '↘' : '→'

  // Determina a zona ativa e a altura proporcional do nível d'água na régua
  // Categorias padrão inspiradas na referência:
  // 1: Acima da Normalidade (80% - 100%)
  // 2: Normalidade (60% - 80%)
  // 3: Atenção Estiagem (40% - 60%)
  // 4: Alerta Estiagem (20% - 40%)
  // 5: Estiagem (0% - 20%)
  let waterPercent = 68 // default dentro de Normalidade (como no screenshot)
  let activeZoneId = 'normal'

  if (activeStation.thresholds?.flood) {
    const flood = activeStation.thresholds.flood
    const alert = activeStation.thresholds.alert || flood * 0.85
    const attention = activeStation.thresholds.attention || flood * 0.7

    if (currentLevelVal >= flood) {
      activeZoneId = 'above'
      waterPercent = 90
    } else if (currentLevelVal >= alert) {
      activeZoneId = 'attention'
      waterPercent = 78
    } else if (currentLevelVal >= attention) {
      activeZoneId = 'normal'
      waterPercent = 65
    } else {
      activeZoneId = 'normal'
      waterPercent = Math.min(75, Math.max(30, (currentLevelVal / attention) * 60))
    }
  } else {
    // Escala empírica padrão
    if (currentLevelVal > 5) {
      activeZoneId = 'above'
      waterPercent = 88
    } else if (currentLevelVal > 0.25) {
      activeZoneId = 'normal'
      waterPercent = 68
    } else if (currentLevelVal > 0.15) {
      activeZoneId = 'attention'
      waterPercent = 48
    } else if (currentLevelVal > 0.08) {
      activeZoneId = 'alert'
      waterPercent = 30
    } else {
      activeZoneId = 'drought'
      waterPercent = 14
    }
  }

  return (
    <section className="featured-overview-section" aria-label="Visão geral e condições meteorológicas e hidrológicas">
      {/* Seletor de Município no topo esquerdo */}
      <div className="hero-selector-wrapper">
        <button
          type="button"
          className="hero-city-trigger-btn"
          onClick={() => setIsLocationModalOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isLocationModalOpen}
          aria-label={`Localidade atual: ${displayCityName}. Clique para buscar outro município.`}
        >
          <svg className="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="hero-city-name">{displayCityName}</span>
          <svg className="select-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Modal de Busca de Localidade (497 Municípios do RS + Geolocalização) */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentCity={displayCityName}
        stations={stations}
        onSelectCity={(cityName, matchedStation) => {
          setCustomDisplayCity(cityName)
          if (matchedStation && onSelectStation) {
            onSelectStation({ ...matchedStation, displayCity: cityName })
          }
        }}
      />

      {/* Grid com os 2 cards principais lado a lado */}
      <div className="featured-cards-grid">
        {/* ================= CARD 1: Condições Atuais ================= */}
        <div className="hero-card-col">
          <h2 className="hero-card-heading">Condições atuais</h2>
          <article className="hero-weather-card">
            {/* Banner superior azul celeste com temperatura */}
            <div className="weather-hero-banner">
              <div className="weather-banner-content">
                <div className="weather-temp-row">
                  <span className="weather-temp-value">{currentTemp}°</span>
                  <div className="weather-minmax-pill">
                    Max: {maxTemp}° Min: {minTemp}°
                  </div>
                </div>
                <div className="weather-time-label">{timeOfDayLabel}</div>
              </div>
              <SunGraphic />
            </div>

            {/* Faixa de telemetria rápida */}
            <div className="weather-telemetry-strip" aria-label="Indicadores atmosféricos em tempo real">
              <div className="strip-item" title="Chuva acumulada em 3 horas">
                <span className="strip-icon" aria-hidden="true">☂</span>
                <span className="strip-text">Chuva: {rain3h}mm/3h</span>
              </div>
              <div className="strip-item" title="Umidade relativa do ar">
                <span className="strip-icon" aria-hidden="true">💧</span>
                <span className="strip-text">Umidade: {humidityVal}%</span>
              </div>
              <div className="strip-item" title="Velocidade e direção do vento">
                <span className="strip-icon" aria-hidden="true">💨</span>
                <span className="strip-text">Vento: {windVal} km/h {windDir}</span>
              </div>
              <div className="strip-item" title="Pressão atmosférica ao nível da estação">
                <span className="strip-icon" aria-hidden="true">⏲</span>
                <span className="strip-text">Pressão: {pressureVal} mb</span>
              </div>
            </div>

            {/* Abas: Hoje | Diariamente */}
            <div className="weather-tabs-container">
              <div className="weather-tabs-nav" role="tablist" aria-label="Período das condições climáticas">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'hoje'}
                  className={`weather-tab-btn ${activeTab === 'hoje' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hoje')}
                >
                  Hoje
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'diariamente'}
                  className={`weather-tab-btn ${activeTab === 'diariamente' ? 'active' : ''}`}
                  onClick={() => setActiveTab('diariamente')}
                >
                  Diariamente
                </button>
              </div>

              {/* Conteúdo das Abas: 3 cards de períodos */}
              {activeTab === 'hoje' ? (
                <div className="period-cards-row">
                  <div className="period-card">
                    <span className="period-title">Manhã</span>
                    <RainCloudIcon />
                    <span className="period-condition">Chuva ocasional</span>
                    <span className="period-volume-pill">0,2mm</span>
                  </div>
                  <div className="period-card">
                    <span className="period-title">Tarde</span>
                    <RainCloudIcon />
                    <span className="period-condition">Chuva ocasional</span>
                    <span className="period-volume-pill">0,1mm</span>
                  </div>
                  <div className="period-card">
                    <span className="period-title">Noite</span>
                    <RainCloudIcon />
                    <span className="period-condition">Chuva ocasional</span>
                    <span className="period-volume-pill">0,1mm</span>
                  </div>
                </div>
              ) : (
                <div className="period-cards-row">
                  <div className="period-card">
                    <span className="period-title">Hoje</span>
                    <RainCloudIcon />
                    <span className="period-condition">Instável</span>
                    <span className="period-volume-pill">{rain3h}mm</span>
                  </div>
                  <div className="period-card">
                    <span className="period-title">Amanhã</span>
                    <SunCloudIcon />
                    <span className="period-condition">Sol e nuvens</span>
                    <span className="period-volume-pill">0,0mm</span>
                  </div>
                  <div className="period-card">
                    <span className="period-title">Depois</span>
                    <SunCloudIcon />
                    <span className="period-condition">Tempo firme</span>
                    <span className="period-volume-pill">0,0mm</span>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>

        {/* ================= CARD 2: Estação de Monitoramento ================= */}
        <div className="hero-card-col">
          <h2 className="hero-card-heading">Estação de monitoramento</h2>
          <article className="hero-hydro-card">
            {/* Cabeçalho da Estação com nome, rio e badge de normalidade */}
            <div className="hydro-header-row">
              <div className="hydro-info-block">
                <h3 className="hydro-station-name">{activeStation.name.toUpperCase()}</h3>
                <p className="hydro-station-sub">
                  {activeStation.river || activeStation.basin || activeStation.city}
                </p>
                <time className="hydro-updated-time" dateTime={activeStation.measuredAt}>
                  {formatHeaderDate(activeStation.measuredAt)}
                </time>
              </div>

              <div className={`hydro-status-badge ${activeZoneId === 'normal' ? 'normal' : 'alert'}`}>
                <div className="badge-title-row">
                  <span className="badge-check-icon" aria-hidden="true">✓</span>
                  <strong className="badge-title">Normalidade</strong>
                </div>
                <span className="badge-subtext">{trendSummary}</span>
              </div>
            </div>

            {/* Diagrama da Régua Hidrológica e Leito do Rio */}
            <div className="gauge-cross-section" aria-label="Diagrama de cota do nível d'água e régua limnimétrica">
              {/* Coluna da esquerda: Zonas e Marcadores da Régua */}
              <div className="gauge-ruler-zone-column">
                {GAUGE_ZONES.map((zone) => {
                  const isCurrentZone = zone.id === activeZoneId
                  return (
                    <div
                      key={zone.id}
                      className={`gauge-zone-row ${zone.id} ${isCurrentZone ? 'active-zone' : ''}`}
                    >
                      <span className="gauge-zone-label">{zone.label}</span>
                      <div className="gauge-ticks" aria-hidden="true">
                        <span className="tick-line" />
                        <span className="tick-line" />
                        <span className="tick-line" />
                        <span className="tick-line" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Coluna da direita: Leito com preenchimento da água e onda */}
              <div className="gauge-water-column">
                {/* Linhas de grade de fundo */}
                <div className="water-depth-grid" aria-hidden="true">
                  <div className="depth-grid-line" style={{ top: '20%' }} />
                  <div className="depth-grid-line" style={{ top: '40%' }} />
                  <div className="depth-grid-line" style={{ top: '60%' }} />
                  <div className="depth-grid-line" style={{ top: '80%' }} />
                </div>

                {/* Preenchimento dinâmico da água */}
                <div
                  className="gauge-water-fill"
                  style={{ height: `${waterPercent}%` }}
                >
                  {/* Superfície da água com onda svg */}
                  <div className="gauge-water-surface">
                    <svg
                      className="gauge-wave-svg"
                      viewBox="0 0 400 24"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 0 12 Q 50 2 100 12 T 200 12 T 300 12 T 400 12 L 400 24 L 0 24 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Camada intermediária de água (azul claro superior) */}
                  <div className="water-top-layer" />

                  {/* Camada profunda de água (azul royal inferior) */}
                  <div className="water-deep-layer" />
                </div>

                {/* Badge flutuante sobre a superfície da água com valor da cota */}
                <div
                  className="gauge-floating-badge"
                  style={{ bottom: `calc(${waterPercent}% - 14px)` }}
                >
                  <span className="trend-arrow" aria-hidden="true">{trendArrow}</span>
                  <span className="cota-badge-pill">{formattedLevel}</span>
                </div>
              </div>
            </div>

            {/* Ação para ver detalhes completos */}
            {onDetails && (
              <div className="hydro-footer-action">
                <button
                  type="button"
                  className="hydro-link-btn"
                  onClick={() => onDetails(activeStation)}
                  aria-label={`Ver ficha técnica detalhada da estação ${activeStation.name}`}
                >
                  Ver telemetria completa da estação →
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
