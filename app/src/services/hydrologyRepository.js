import { mockStations } from '../data/mockStations.js'
import { normalizeStation } from '../domain/station.js'

// Contrato único consumido pela interface. O adaptador da ANA substituirá apenas
// esta implementação; componentes e regras de classificação permanecem iguais.
export const mockHydrologyRepository = {
  async listStations() {
    return mockStations.map(normalizeStation)
  },
}
