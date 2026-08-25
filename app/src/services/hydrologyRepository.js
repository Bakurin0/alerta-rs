import { mockStations } from '../data/mockStations.js'
import { normalizeStation } from '../domain/station.js'

// Mock local. O formato da estação representa os campos que a API da Defesa
// Civil RS entrega; nenhuma requisição externa é feita nesta etapa.
export const hydrologyRepository = {
  async listStations() {
    return mockStations.map(normalizeStation)
  },
}
