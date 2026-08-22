import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyLevel, filterStations, normalizeStation } from '../src/domain/station.js'

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
