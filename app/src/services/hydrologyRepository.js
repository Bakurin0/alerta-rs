import { mockStations, simulateStationFluctuation } from '../data/mockStations.js'
import { normalizeStation } from '../domain/station.js'
import { defesaCivilRepository } from './defesaCivilRepository.js'

export const hydrologyRepository = {
  async listStations() {
    try {
      const liveStations = await defesaCivilRepository.listStations()
      if (Array.isArray(liveStations) && liveStations.length > 0) {
        const normalized = liveStations.map((s) => ({
          ...normalizeStation(s),
          isMock: false,
        }))
        normalized.source = 'API Oficial da Defesa Civil RS'
        normalized.isLive = true
        return normalized
      }
    } catch (err) {
      console.warn('API da Defesa Civil RS indisponível, utilizando dados de demonstração (mock):', err)
    }

    const fallback = mockStations.map((s) => ({
      ...normalizeStation(s),
      isMock: true,
    }))
    fallback.source = 'Dados Simulados de Demonstração (Mock)'
    fallback.isLive = false
    return fallback
  },

  subscribeLiveUpdates(onStationUpdate, onStatusChange) {
    let mockTimer = null
    let mockIndex = 0
    let liveReceived = false

    const startMockSimulation = () => {
      if (mockTimer) return
      mockTimer = setInterval(() => {
        if (liveReceived) {
          clearInterval(mockTimer)
          mockTimer = null
          return
        }
        const station = mockStations[mockIndex % mockStations.length]
        mockIndex++
        const simulated = simulateStationFluctuation(station)
        const normalized = normalizeStation(simulated)
        normalized.isMock = true
        normalized.isLive = false
        onStationUpdate?.(normalized)
      }, 2500)
    }

    const unsubscribeWs = defesaCivilRepository.subscribeNowcasting(
      (station) => {
        liveReceived = true
        if (mockTimer) {
          clearInterval(mockTimer)
          mockTimer = null
        }
        const normalized = normalizeStation(station)
        normalized.isLive = true
        normalized.isMock = false
        onStationUpdate?.(normalized)
      },
      (status) => {
        onStatusChange?.(status)
        if (status === 'error' || status === 'disconnected' || status === 'unsupported') {
          if (!liveReceived) {
            startMockSimulation()
          }
        }
      },
    )

    return () => {
      if (mockTimer) clearInterval(mockTimer)
      unsubscribeWs?.()
    }
  },
}
