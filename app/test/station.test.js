import test from 'node:test'
import assert from 'node:assert/strict'
import {
  classifyLevel,
  degreesToCompass,
  filterStations,
  formatHumidity,
  formatPressure,
  formatSolarRadiation,
  formatTemperature,
  formatWind,
  formatRelativeTime,
  normalizeStation,
  projectCoordinates,
} from '../src/domain/station.js'
import { normalizeStation as normalizeDefesaCivil } from '../src/services/defesaCivilRepository.js'

const thresholds = { attention: 5, alert: 7, flood: 9 }

test('classifica cotas inclusive nos respectivos limites', () => {
  assert.equal(classifyLevel(4.99, thresholds), 'normal')
  assert.equal(classifyLevel(5, thresholds), 'attention')
  assert.equal(classifyLevel(7, thresholds), 'alert')
  assert.equal(classifyLevel(9, thresholds), 'flood')
})

test('normaliza e filtra estações por município e situação', () => {
  const stations = [
    normalizeStation({ city: 'Estrela', currentLevel: 8, thresholds }),
    normalizeStation({ city: 'Lajeado', currentLevel: 3, thresholds }),
  ]
  assert.equal(filterStations(stations, { city: 'Estrela', status: 'alert' }).length, 1)
  assert.equal(filterStations(stations, { city: 'all', status: 'normal' }).length, 1)
})

test('projeta coordenadas geográficas do RS para porcentagens do mapa SVG', () => {
  const poa = projectCoordinates(-30.03, -51.23)
  assert.ok(poa)
  assert.equal(poa.x, 80.7)
  assert.equal(poa.y, 44.2)

  assert.equal(projectCoordinates('invalido', -51.23), null)
  assert.equal(projectCoordinates(10, 10), null) // Fora da malha do RS
})

test('normaliza com segurança estações da API da Defesa Civil sem thresholds', () => {
  const rawApiStation = {
    id: 'DCRS-00077',
    name: 'Alegrete',
    city: 'Alegrete',
    level: 2.5,
    rainfall: { h24: 15.0 },
  }
  const normalized = normalizeStation(rawApiStation)
  assert.equal(normalized.currentLevel, 2.5)
  assert.equal(normalized.rainfall24h, 15.0)
  assert.equal(normalized.status, 'normal')
  assert.equal(normalized.statusLabel, 'Normal')
})

test('converte graus azimutais em direções da rosa dos ventos', () => {
  assert.equal(degreesToCompass(0), 'N')
  assert.equal(degreesToCompass(45), 'NE')
  assert.equal(degreesToCompass(90), 'L')
  assert.equal(degreesToCompass(135), 'SE')
  assert.equal(degreesToCompass(180), 'S')
  assert.equal(degreesToCompass(225), 'SO')
  assert.equal(degreesToCompass(270), 'O')
  assert.equal(degreesToCompass(315), 'NO')
  assert.equal(degreesToCompass(360), 'N')
  assert.equal(degreesToCompass(null), '—')
})

test('formata grandezas meteorológicas da Defesa Civil RS com exatidão', () => {
  assert.equal(formatTemperature(21.4), '21,4 °C')
  assert.equal(formatTemperature(null), '—')

  assert.equal(formatWind(15.2, null, 45), '15,2 km/h · NE')
  assert.equal(formatWind(15.2, 28.5, 45), '15,2 km/h (rajadas 28,5 km/h) · NE')

  assert.equal(formatPressure(1013.2, 1.2), '1.013,2 hPa (↑ Subindo)')
  assert.equal(formatPressure(1013.2, -0.8), '1.013,2 hPa (↓ Caindo)')
  assert.equal(formatPressure(1013.2, 0.1), '1.013,2 hPa (→ Estável)')

  assert.equal(formatHumidity(78.2), '78%')
  assert.equal(formatSolarRadiation(0.452), '0,45 kWh/m²')
})

test('normaliza payload GraphQL bruto com sensores completos da Defesa Civil RS', () => {
  const rawGql = {
    codigo: 'DCRS-00095',
    name: { general: 'Santo Antônio das Missões/São Borja', local: '' },
    timestamp: '2026-09-14T03:13:04.000+00:00',
    position: {
      bacia: 'RS - Rios Butuí – Icamaquã',
      latitude: -28.6177,
      longitude: -55.738,
      regiao: 'Sudoeste Rio-grandense',
      altitude: 120,
    },
    data: {
      rio: {
        rio_nome: { value: 'Rio Icamaquã' },
        rio_nivel: { value: 5.75 },
        rio_nivel_tendencia: { value: 0.05 },
        rio_area_drenagem: { value: 1450.5 },
        rio_vazao: { value: 42.1 },
      },
      chuva: {
        acumulado: {
          s015: { value: 0.2 },
          h001: { value: 1.4 },
          h024: { value: 18.6 },
          h168: { value: 66.6 },
          mesatual: { value: 67.2 },
          mesanterior: { value: 128.6 },
        },
      },
      temperatura: {
        atual: { value: 18.2 },
        historico: {
          diaatual: {
            media: { value: 17.5 },
            maxima: { value: 22.1 },
            minima: { value: 14.3 },
          },
        },
      },
      umidade: { atual: { value: 82 } },
      pressaoatmos: { atual: { value: 1014.2 }, tendencia: { value: 0.2 } },
      senstermica: { atual: { value: 17.8 } },
      radiacaosolar: { atual: { value: 0.62 } },
      vento: {
        velocidade_media: { value: 12.4 },
        velocidade_maxima: { value: 22.0 },
        direcao: { value: 90 },
      },
    },
    filter: {
      relacao: {
        tem_chuva_acumulada: true,
        tem_nivel_do_rio: true,
        tem_pressao_atmosferica: true,
        tem_sensacao_termica: true,
        tem_umidade: true,
        tem_vazao_do_rio: true,
        tem_vento: true,
      },
    },
  }

  const station = normalizeDefesaCivil(rawGql)
  assert.equal(station.id, 'DCRS-00095')
  assert.equal(station.city, 'Santo Antônio das Missões')
  assert.equal(station.basin, 'Rios Butuí – Icamaquã')
  assert.equal(station.currentLevel, 5.75)
  assert.equal(station.river, 'Rio Icamaquã')
  assert.equal(station.drainageArea, 1450.5)
  assert.equal(station.riverFlow, 42.1)
  assert.equal(station.rainfall24h, 18.6)
  assert.equal(station.rainfall.h1, 1.4)
  assert.equal(station.rainfall.h168, 66.6)
  assert.equal(station.temperature.current, 18.2)
  assert.equal(station.temperature.max, 22.1)
  assert.equal(station.humidity, 82)
  assert.equal(station.pressure.current, 1014.2)
  assert.equal(station.wind.speed, 12.4)
  assert.equal(station.wind.direction, 90)
  assert.equal(station.sensors.hasRiver, true)
  assert.equal(station.sensors.hasWind, true)
})

test('filtra por busca de texto e por tipo de sensor', () => {
  const stations = [
    {
      id: 'DCRS-001',
      city: 'Porto Alegre',
      name: 'Guaíba - Cais Mauá',
      river: 'Lago Guaíba',
      basin: 'Bacia do Guaíba',
      currentLevel: 2.1,
      hasLevel: true,
      hasRainfall: false,
      rainfall24h: 0,
      temperature: { current: null },
      sensors: { hasRiver: true, hasRain: false, hasWind: false },
    },
    {
      id: 'DCRS-002',
      city: 'Caxias do Sul',
      name: 'Meteo Caxias',
      river: null,
      basin: 'Taquari-Antas',
      currentLevel: 0,
      hasLevel: false,
      hasRainfall: true,
      rainfall24h: 12.5,
      temperature: { current: 16.4 },
      wind: { speed: 10.0 },
      sensors: { hasRiver: false, hasRain: true, hasWind: true },
    },
  ]

  // Busca por município
  assert.equal(filterStations(stations, { query: 'porto' }).length, 1)
  assert.equal(filterStations(stations, { query: 'caxias' }).length, 1)
  assert.equal(filterStations(stations, { query: 'inexistente' }).length, 0)

  // Filtro por sensor de rio
  const riverOnly = filterStations(stations, { sensor: 'river' })
  assert.equal(riverOnly.length, 1)
  assert.equal(riverOnly[0].city, 'Porto Alegre')

  // Filtro por sensor de chuva
  const rainOnly = filterStations(stations, { sensor: 'rain' })
  assert.equal(rainOnly.length, 1)
  assert.equal(rainOnly[0].city, 'Caxias do Sul')

  // Filtro meteorologia
  const meteoOnly = filterStations(stations, { sensor: 'meteo' })
  assert.equal(meteoOnly.length, 1)
  assert.equal(meteoOnly[0].city, 'Caxias do Sul')
})

test('formata timestamps relativos em tempo real com precisão', () => {
  const now = new Date()
  const justNow = new Date(now.getTime() - 2000).toISOString()
  const thirtySecsAgo = new Date(now.getTime() - 30000).toISOString()
  const fiveMinAgo = new Date(now.getTime() - 5 * 60000).toISOString()

  assert.ok(formatRelativeTime(justNow).includes('Agora há pouco'))
  assert.ok(formatRelativeTime(thirtySecsAgo).includes('Há 30s'))
  assert.ok(formatRelativeTime(fiveMinAgo).includes('Há 5 min'))
  assert.equal(formatRelativeTime(null), 'Data não disponível')
})
