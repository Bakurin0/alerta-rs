const ENDPOINT = 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/43?formato=application/vnd.geo+json&qualidade=minima'

export const geographyRepository = {
  async getStateOutline() {
    const response = await fetch(ENDPOINT)
    if (!response.ok) throw new Error('Não foi possível carregar a malha do IBGE.')
    const payload = await response.json()
    return payload.features?.[0]?.geometry?.coordinates?.[0] ?? []
  },
}
