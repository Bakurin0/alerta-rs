import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyLevel, filterStations, normalizeStation, projectCoordinates } from '../src/domain/station.js'

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

