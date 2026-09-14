const HTTP_ENDPOINT = 'https://redehidrometeorologica.defesacivil.rs.gov.br/graphql'
const WS_ENDPOINT = 'wss://redehidrometeorologica.defesacivil.rs.gov.br/graphql'

export const STATIONS_QUERY = `
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
            rio_area_drenagem { value }
            rio_vazao { value }
          }
          chuva {
            acumulado {
              s015 { value }
              min005 { value }
              min010 { value }
              min015 { value }
              h001 { value }
              h003 { value }
              h006 { value }
              h012 { value }
              h024 { value }
              h048 { value }
              h072 { value }
              h096 { value }
              h120 { value }
              h144 { value }
              h168 { value }
              mesatual { value }
              mesanterior { value }
            }
          }
          temperatura {
            atual { value }
            historico {
              diaatual { media { value } maxima { value } minima { value } }
              diaanterior { media { value } }
            }
          }
          umidade { atual { value } }
          pressaoatmos { atual { value } tendencia { value } }
          senstermica { atual { value } }
          radiacaosolar { atual { value } }
          vento {
            velocidade_media { value }
            velocidade_maxima { value }
            direcao { value }
          }
        }
        filter {
          relacao {
            tem_chuva_acumulada
            tem_nivel_do_rio
            tem_pressao_atmosferica
            tem_sensacao_termica
            tem_umidade
            tem_vazao_do_rio
            tem_vento
          }
        }
      }
    }
  }
`

export const NOWCASTING_SUBSCRIPTION = `
  subscription NowcastingRS {
    nowcasting_unique(
      clients: ["casa-militar-defesa-civil-rs"]
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
            rio_area_drenagem { value }
            rio_vazao { value }
          }
          chuva {
            acumulado {
              s015 { value }
              min005 { value }
              min010 { value }
              min015 { value }
              h001 { value }
              h003 { value }
              h006 { value }
              h012 { value }
              h024 { value }
              h048 { value }
              h072 { value }
              h096 { value }
              h120 { value }
              h144 { value }
              h168 { value }
              mesatual { value }
              mesanterior { value }
            }
          }
          temperatura {
            atual { value }
            historico {
              diaatual { media { value } maxima { value } minima { value } }
              diaanterior { media { value } }
            }
          }
          umidade { atual { value } }
          pressaoatmos { atual { value } tendencia { value } }
          senstermica { atual { value } }
          radiacaosolar { atual { value } }
          vento {
            velocidade_media { value }
            velocidade_maxima { value }
            direcao { value }
          }
        }
        filter {
          relacao {
            tem_chuva_acumulada
            tem_nivel_do_rio
            tem_pressao_atmosferica
            tem_sensacao_termica
            tem_umidade
            tem_vazao_do_rio
            tem_vento
          }
        }
      }
    }
  }
`

const valueOf = (field) => {
  if (field == null) return null
  const num = typeof field === 'object' && 'value' in field ? Number(field.value) : Number(field)
  return Number.isFinite(num) ? num : null
}

export function normalizeStation(item) {
  const name = item.name?.general?.trim() || item.name?.local?.trim() || item.codigo || 'Estação sem nome'
  const level = valueOf(item.data?.rio?.rio_nivel)
  const rainfall24h = valueOf(item.data?.chuva?.acumulado?.h024)

  const tempCurrent = valueOf(item.data?.temperatura?.atual)
  const tempMax = valueOf(item.data?.temperatura?.historico?.diaatual?.maxima)
  const tempMin = valueOf(item.data?.temperatura?.historico?.diaatual?.minima)
  const tempAvg = valueOf(item.data?.temperatura?.historico?.diaatual?.media)

  const windSpeed = valueOf(item.data?.vento?.velocidade_media)
  const windGust = valueOf(item.data?.vento?.velocidade_maxima)
  const windDirection = valueOf(item.data?.vento?.direcao)

  const pressure = valueOf(item.data?.pressaoatmos?.atual)
  const pressureTrend = valueOf(item.data?.pressaoatmos?.tendencia)
  const humidity = valueOf(item.data?.umidade?.atual)
  const thermalSensation = valueOf(item.data?.senstermica?.atual)
  const solarRadiation = valueOf(item.data?.radiacaosolar?.atual)
  const drainageArea = valueOf(item.data?.rio?.rio_area_drenagem)
  const riverFlow = valueOf(item.data?.rio?.rio_vazao)

  const hasLevel = Boolean(item.filter?.relacao?.tem_nivel_do_rio || level != null)
  const hasRainfall = Boolean(item.filter?.relacao?.tem_chuva_acumulada || (rainfall24h != null && rainfall24h > 0))
  const hasWind = Boolean(item.filter?.relacao?.tem_vento || windSpeed != null)
  const hasHumidity = Boolean(item.filter?.relacao?.tem_umidade || humidity != null)
  const hasPressure = Boolean(item.filter?.relacao?.tem_pressao_atmosferica || pressure != null)
  const hasThermalSensation = Boolean(item.filter?.relacao?.tem_sensacao_termica || thermalSensation != null)

  return {
    id: item.codigo,
    name,
    city: name.split('/')[0].split(' - ')[0].trim(),
    basin: item.position?.bacia?.replace(/^RS - /, '') || 'Bacia não informada',
    region: item.position?.regiao || 'Região não informada',
    altitude: valueOf(item.position?.altitude),
    latitude: Number(item.position?.latitude),
    longitude: Number(item.position?.longitude),
    measuredAt: item.timestamp,
    level,
    currentLevel: level ?? 0,
    trend: valueOf(item.data?.rio?.rio_nivel_tendencia),
    river: item.data?.rio?.rio_nome?.value || null,
    drainageArea,
    riverFlow,
    rainfall24h: rainfall24h ?? 0,
    rainfall: {
      s015: valueOf(item.data?.chuva?.acumulado?.s015),
      min5: valueOf(item.data?.chuva?.acumulado?.min005),
      min10: valueOf(item.data?.chuva?.acumulado?.min010),
      min15: valueOf(item.data?.chuva?.acumulado?.min015),
      h1: valueOf(item.data?.chuva?.acumulado?.h001),
      h3: valueOf(item.data?.chuva?.acumulado?.h003),
      h6: valueOf(item.data?.chuva?.acumulado?.h006),
      h12: valueOf(item.data?.chuva?.acumulado?.h012),
      h24: rainfall24h,
      h48: valueOf(item.data?.chuva?.acumulado?.h048),
      h72: valueOf(item.data?.chuva?.acumulado?.h072),
      h96: valueOf(item.data?.chuva?.acumulado?.h096),
      h120: valueOf(item.data?.chuva?.acumulado?.h120),
      h144: valueOf(item.data?.chuva?.acumulado?.h144),
      h168: valueOf(item.data?.chuva?.acumulado?.h168),
      currentMonth: valueOf(item.data?.chuva?.acumulado?.mesatual),
      previousMonth: valueOf(item.data?.chuva?.acumulado?.mesanterior),
    },
    temperature: {
      current: tempCurrent,
      max: tempMax,
      min: tempMin,
      avg: tempAvg,
    },
    wind: {
      speed: windSpeed,
      gust: windGust,
      direction: windDirection,
    },
    pressure: {
      current: pressure,
      trend: pressureTrend,
    },
    humidity,
    thermalSensation,
    solarRadiation,
    sensors: {
      hasRiver: hasLevel,
      hasRain: hasRainfall,
      hasWind,
      hasHumidity,
      hasPressure,
      hasThermalSensation,
    },
    hasLevel,
    hasRainfall,
  }
}

export const defesaCivilRepository = {
  async listStations() {
    const isBrowser = typeof window !== 'undefined'
    const endpoints = isBrowser
      ? ['/api-defesa-civil/graphql', HTTP_ENDPOINT]
      : [HTTP_ENDPOINT]

    let lastError = null
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: STATIONS_QUERY }),
        })

        if (!response.ok) continue
        const payload = await response.json()
        if (payload.errors?.length) continue

        const stations = (payload.data?.tags_data?.qualle_meteorologia ?? [])
          .map(normalizeStation)
          .filter((station) => Number.isFinite(station.latitude) && Number.isFinite(station.longitude))
          .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

        if (stations.length > 0) return stations
      } catch (err) {
        lastError = err
      }
    }

    throw lastError || new Error('A API da Defesa Civil RS não pôde ser consultada.')
  },

  subscribeNowcasting(onData, onStatusChange) {
    if (typeof WebSocket === 'undefined') {
      onStatusChange?.('unsupported')
      return () => {}
    }

    let ws = null
    let reconnectTimer = null
    let isDisposed = false

    const connect = () => {
      if (isDisposed) return
      onStatusChange?.('connecting')

      try {
        ws = new WebSocket(WS_ENDPOINT, 'graphql-transport-ws')
      } catch (err) {
        console.warn('Erro ao abrir WebSocket da Defesa Civil RS:', err)
        onStatusChange?.('error')
        scheduleReconnect()
        return
      }

      ws.onopen = () => {
        if (isDisposed) {
          ws.close()
          return
        }
        ws.send(JSON.stringify({ type: 'connection_init' }))
      }

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          if (msg.type === 'connection_ack') {
            onStatusChange?.('connected')
            ws.send(JSON.stringify({
              id: 'alerta-rs-sub',
              type: 'subscribe',
              payload: { query: NOWCASTING_SUBSCRIPTION },
            }))
          } else if (msg.type === 'ping') {
            ws.send(JSON.stringify({ type: 'pong' }))
          } else if (msg.type === 'next') {
            const rawData = msg.payload?.data?.nowcasting_unique?.qualle_meteorologia
            if (Array.isArray(rawData)) {
              rawData.forEach((item) => onData?.(normalizeStation(item)))
            } else if (rawData && typeof rawData === 'object') {
              onData?.(normalizeStation(rawData))
            }
          }
        } catch (err) {
          console.warn('Erro ao processar mensagem do WebSocket:', err)
        }
      }

      ws.onerror = () => {
        onStatusChange?.('error')
      }

      ws.onclose = () => {
        onStatusChange?.('disconnected')
        if (!isDisposed) {
          scheduleReconnect()
        }
      }
    }

    const scheduleReconnect = () => {
      if (reconnectTimer || isDisposed) return
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null
        connect()
      }, 5000)
    }

    connect()

    return () => {
      isDisposed = true
      if (reconnectTimer) clearTimeout(reconnectTimer)
      if (ws) {
        try {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ id: 'alerta-rs-sub', type: 'complete' }))
          }
          ws.close()
        } catch {
          void 0
        }
      }
    }
  },
}
