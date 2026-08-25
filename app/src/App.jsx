import { useEffect, useState } from 'react'
import { hydrologyRepository } from './services/hydrologyRepository.js'

const views = [
  { id: 'panel', label: 'Medições atuais' },
  { id: 'map', label: 'Mapa de estações' },
  { id: 'details', label: 'Detalhes da estação' },
]

const formatNumber = (value, unit) => `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1 })} ${unit}`

const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
}).format(new Date(value))

function DemoNotice() {
  return (
    <div className="demo-notice">
      <strong>Dados de demonstração</strong> — valores mockados para o protótipo.
    </div>
  )
}

function PanelView({ stations, onDetails }) {
  return (
    <section className="module">
      <div className="module-heading">
        <div>
          <h1>Medições atuais</h1>
          <p>Acompanhe as medições recentes das estações hidrometeorológicas.</p>
        </div>
      </div>
      <DemoNotice />
      <div className="river-grid">
        {stations.map((station) => (
          <article className="river-card" key={station.id}>
            <div className="river-title">
              <div>
                <span className="eyebrow">{station.basin}</span>
                <h3>{station.city}</h3>
              </div>
            </div>
            <p className="station-name">{station.name}</p>
            <div className="reading-copy">
              <strong>{formatNumber(station.currentLevel, 'm')}</strong>
              <p>Nível atual do rio</p>
              <p>Chuva em 24h: {formatNumber(station.rainfall24h, 'mm')}</p>
            </div>
            <div className="river-footer">
              <small>Última medição: {formatDate(station.measuredAt)}</small>
              <button type="button" onClick={() => onDetails(station)}>Ver detalhes</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MapView({ stations, onDetails }) {
  const [selected, setSelected] = useState(stations[0])

  return (
    <section className="module">
      <div className="module-heading">
        <div>
          <h1>Mapa de estações</h1>
          <p>Localize as estações hidrometeorológicas do Rio Grande do Sul.</p>
        </div>
      </div>
      <DemoNotice />
      <div className="map-layout">
        <div className="mock-map" role="img" aria-label="Mapa do Rio Grande do Sul com estações">
          {stations.map((station, index) => (
            <button
              type="button"
              className={`map-marker ${selected?.id === station.id ? 'selected' : ''}`}
              style={{ left: `${25 + index * 18}%`, top: `${35 + (index % 2) * 22}%` }}
              key={station.id}
              onClick={() => setSelected(station)}
              aria-label={`Selecionar ${station.name}`}
            />
          ))}
          <small className="map-source">Estações demonstrativas</small>
        </div>
        <aside className="side-panel selected-station">
          <span className="eyebrow">Estação selecionada</span>
          <h2>{selected?.city}</h2>
          <p>{selected?.name}</p>
          <strong>{selected && formatNumber(selected.currentLevel, 'm')}</strong>
          <p>Nível atual do rio</p>
          <button type="button" onClick={() => onDetails(selected)}>Abrir detalhes</button>
        </aside>
      </div>
    </section>
  )
}

function DetailsView({ station }) {
  return (
    <section className="module">
      <div className="module-heading">
        <div>
          <h1>Detalhes da estação</h1>
          <p>Informações da estação selecionada.</p>
        </div>
      </div>
      <DemoNotice />
      <article className="side-panel details-page">
        <span className="eyebrow">Estação hidrometeorológica</span>
        <h2>{station.name}</h2>
        <dl className="details">
          <div><dt>Município</dt><dd>{station.city}</dd></div>
          <div><dt>Código</dt><dd>{station.id}</dd></div>
          <div><dt>Bacia</dt><dd>{station.basin}</dd></div>
          <div><dt>Nível do rio</dt><dd>{formatNumber(station.currentLevel, 'm')}</dd></div>
          <div><dt>Chuva acumulada em 24h</dt><dd>{formatNumber(station.rainfall24h, 'mm')}</dd></div>
          <div><dt>Última medição</dt><dd>{formatDate(station.measuredAt)}</dd></div>
        </dl>
      </article>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState('panel')
  const [stations, setStations] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    hydrologyRepository.listStations().then((items) => {
      setStations(items)
      setSelected(items[0])
    })
  }, [])

  const openDetails = (station) => {
    setSelected(station)
    setView('details')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#">Alerta<span>RS</span></a>
        <nav aria-label="Navegação principal">
          {views.map((item) => (
            <button className={view === item.id ? 'active' : ''} key={item.id} onClick={() => setView(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {view === 'panel' && <PanelView stations={stations} onDetails={openDetails} />}
        {view === 'map' && <MapView stations={stations} onDetails={openDetails} />}
        {view === 'details' && selected && <DetailsView station={selected} />}
      </main>
      <footer>AlertaRS · Monitoramento hidrológico do Rio Grande do Sul</footer>
    </div>
  )
}
