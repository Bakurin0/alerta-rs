const ENDPOINT = 'https://redehidrometeorologica.defesacivil.rs.gov.br/graphql'

const STATIONS_QUERY = `
  query StationsRS {
    tags_data(
      clients: ["casa-militar-defesa-civil-rs"]
      filters: {
        localizacao: [{ codigos: ["43"], tipo: UNIDADE_FEDERATIVA }]
      }
    ) {
      qualle_meteorologia {
        codigo
        name { general local }
        timestamp
        position { bacia latitude longitude regiao altitude }
        data {
          rio {
            rio_nome { value }
            rio_nivel { value }
            rio_nivel_tendencia { value }
          }
          chuva {
            acumulado {
              h001 { value }
              h003 { value }
              h006 { value }
              h012 { value }
              h024 { value }
              h168 { value }
            }
          }
        }
        filter {
          relacao { tem_chuva_acumulada tem_nivel_do_rio }
        }
      }
    }
  }
`

const valueOf = (field) => {
  const value = Number(field?.value)
  return Number.isFinite(value) ? value : null
}

function normalizeStation(item) {
  const name = item.name?.general?.trim() || item.name?.local?.trim() || item.codigo
  const level = valueOf(item.data?.rio?.rio_nivel)
  const rainfall24h = valueOf(item.data?.chuva?.acumulado?.h024)
  return {
    id: item.codigo,
    name,
    city: name.split('/')[0].split(' - ')[0].trim(),
    basin: item.position?.bacia?.replace(/^RS - /, '') || 'Bacia não informada',
    region: item.position?.regiao || 'Região não informada',
    latitude: Number(item.position?.latitude),
    longitude: Number(item.position?.longitude),
    measuredAt: item.timestamp,
    level,
    currentLevel: level ?? 0,
    trend: valueOf(item.data?.rio?.rio_nivel_tendencia),
    river: item.data?.rio?.rio_nome?.value || null,
    rainfall24h: rainfall24h ?? 0,
    rainfall: {
      h1: valueOf(item.data?.chuva?.acumulado?.h001),
      h3: valueOf(item.data?.chuva?.acumulado?.h003),
      h6: valueOf(item.data?.chuva?.acumulado?.h006),
      h12: valueOf(item.data?.chuva?.acumulado?.h012),
      h24: rainfall24h,
      h168: valueOf(item.data?.chuva?.acumulado?.h168),
    },
    hasLevel: Boolean(item.filter?.relacao?.tem_nivel_do_rio),
    hasRainfall: Boolean(item.filter?.relacao?.tem_chuva_acumulada),
  }
}

export const defesaCivilRepository = {
  async listStations() {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: STATIONS_QUERY }),
    })

    if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`)
    const payload = await response.json()
    if (payload.errors?.length) throw new Error(payload.errors[0].message)

    return (payload.data?.tags_data?.qualle_meteorologia ?? [])
      .map(normalizeStation)
      .filter((station) => Number.isFinite(station.latitude) && Number.isFinite(station.longitude))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  },
}
