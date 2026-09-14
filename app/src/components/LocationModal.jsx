import React, { useState, useMemo, useEffect, useRef } from 'react'
import { rsMunicipalities } from '../data/rsMunicipalities.js'

function normalizeText(text) {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function LocationModal({
  isOpen,
  onClose,
  currentCity,
  stations = [],
  onSelectCity,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [geoMessage, setGeoMessage] = useState(null)
  const inputRef = useRef(null)

  // Foco automático no campo de busca ao abrir
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setGeoMessage(null)
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  // Fecha no Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Filtra municípios em tempo real
  const filteredMunicipalities = useMemo(() => {
    const q = normalizeText(searchQuery)
    if (!q) return rsMunicipalities

    return rsMunicipalities.filter((m) => {
      return normalizeText(m.name).includes(q) || normalizeText(m.region).includes(q)
    })
  }, [searchQuery])

  // Manipula localização automática por GPS do navegador
  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage('Geolocalização não é suportada pelo seu navegador.')
      return
    }

    setIsLocating(true)
    setGeoMessage(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        let nearestStation = null
        let minDist = Infinity

        for (const s of stations) {
          if (Number.isFinite(s.latitude) && Number.isFinite(s.longitude)) {
            const dist = (latitude - s.latitude) ** 2 + (longitude - s.longitude) ** 2
            if (dist < minDist) {
              minDist = dist
              nearestStation = s
            }
          }
        }

        setIsLocating(false)

        if (nearestStation) {
          onSelectCity(nearestStation.city, nearestStation)
          onClose()
        } else {
          setGeoMessage('Nenhuma estação próxima encontrada.')
        }
      },
      (error) => {
        setIsLocating(false)
        setGeoMessage(
          error.code === error.PERMISSION_DENIED
            ? 'Permissão de localização negada pelo usuário.'
            : 'Não foi possível obter a sua localização atual.'
        )
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  // Manipula seleção de município na lista
  const handleSelect = (municipality) => {
    const cityName = municipality.name
    const exact = stations.find((s) => normalizeText(s.city) === normalizeText(cityName))
    const inRegion = !exact && stations.find((s) => {
      const reg = normalizeText(municipality.region)
      return normalizeText(s.basin).includes(reg) || normalizeText(s.region).includes(reg)
    })
    const matched = exact || inRegion || stations.find((s) => s.currentLevel > 0) || stations[0]
    onSelectCity(cityName, { ...matched, displayCity: cityName })
    onClose()
  }

  if (!isOpen) return null

  const normalizedCurrentCity = normalizeText(currentCity)

  return (
    <div
      className="location-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div className="location-modal-card">
        {/* Cabeçalho da Modal */}
        <header className="location-modal-header">
          <h2 id="location-modal-title" className="location-modal-title">
            Localidade
          </h2>
          <button
            type="button"
            className="location-modal-close-btn"
            onClick={onClose}
            aria-label="Fechar janela de seleção de localidade"
          >
            FECHAR
          </button>
        </header>

        {/* Barra de Pesquisa */}
        <div className="location-search-wrapper">
          <div className="location-search-box">
            <svg
              className="location-search-icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M13.5 13.5L18 18" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="location-search-input"
              placeholder="Busca"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar município"
            />
            {searchQuery && (
              <button
                type="button"
                className="location-clear-btn"
                onClick={() => {
                  setSearchQuery('')
                  inputRef.current?.focus()
                }}
                aria-label="Limpar termo de busca"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Botão de Localização Automática */}
        <div className="location-auto-action-row">
          <button
            type="button"
            className="location-auto-btn"
            onClick={handleAutoLocation}
            disabled={isLocating}
          >
            <svg
              className={`location-nav-arrow-icon ${isLocating ? 'spin' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span>{isLocating ? 'LOCALIZANDO...' : 'LOCALIZAÇÃO AUTOMÁTICA'}</span>
          </button>
          {geoMessage && <p className="location-geo-msg" role="status">{geoMessage}</p>}
        </div>

        {/* Lista de Municípios */}
        <div
          className="location-list-scrollable"
          role="listbox"
          aria-label="Lista de municípios do Rio Grande do Sul"
        >
          {filteredMunicipalities.length === 0 ? (
            <div className="location-empty-state">
              <p>Nenhum município encontrado para &quot;{searchQuery}&quot;</p>
              <small>Verifique a ortografia ou tente outro termo.</small>
            </div>
          ) : (
            filteredMunicipalities.map((m) => {
              const isSelected = normalizeText(m.name) === normalizedCurrentCity
              return (
                <button
                  key={m.name}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`location-list-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(m)}
                >
                  <span className="location-item-name">{m.name}</span>
                  {isSelected && (
                    <span className="location-selected-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
