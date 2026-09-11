import { mockStations } from '../data/mockStations.js'
import { normalizeStation } from '../domain/station.js'
import { defesaCivilRepository } from './defesaCivilRepository.js'

export const hydrologyRepository = {
  async listStations() {
    try {
      const liveStations = await defesaCivilRepository.listStations()
      if (Array.isArray(liveStations) && liveStations.length > 0) {
        const normalized = liveStations.map(normalizeStation)
        normalized.source = 'API Oficial da Defesa Civil RS'
        normalized.isLive = true
        return normalized
      }
    } catch (err) {
      console.warn('API da Defesa Civil RS indisponível, utilizando dados de demonstração (mock):', err)
    }

    const fallback = mockStations.map(normalizeStation)
    fallback.source = 'Dados Simulados de Demonstração (Mock)'
    fallback.isLive = false
    return fallback
  },
}
