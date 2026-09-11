import React, { useEffect, useState } from 'react'
import { hydrologyRepository } from './services/hydrologyRepository.js'
import { mockMapPoints } from './data/mockMapPoints.js'
import { projectCoordinates } from './domain/station.js'

const views = [
  { id: 'panel', label: 'Medições atuais' },
  { id: 'map', label: 'Mapa de estações' },
  { id: 'details', label: 'Detalhes da estação' },
]

const formatNumber = (value, unit) => {
  if (value == null || !Number.isFinite(Number(value))) return '—'
  return `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ${unit}`
}

const formatDate = (value) => {
  if (!value) return 'Data não disponível'
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return String(value)
  }
}

function PanelView({ stations, onDetails }) {
  return (
    <section className="module">
      <div className="module-heading">
        <div>
          <h1>Medições atuais</h1>
          <p>Acompanhe as medições recentes das estações hidrometeorológicas do RS ({stations.length} estações).</p>
        </div>
      </div>
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
              <p>Nível do rio</p>
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
  const [selected, setSelected] = useState(stations[0] || null)

  return (
    <section className="module">
      <div className="module-heading">
        <div>
          <h1>Mapa de estações</h1>
          <p>Localize as estações hidrometeorológicas no mapa do Rio Grande do Sul.</p>
        </div>
      </div>
      <div className="map-layout">
        <div className="mock-map" role="img" aria-label="Mapa do Rio Grande do Sul com estações">
          <svg className="rs-map" viewBox="-57.5941 27.0931 7.891 6.6508" aria-hidden="true">
            <g transform="scale(1,-1)">
            <path d="M-53.9475-31.9546l.2219-.1438.0491-.1397.0325-.1468.2071-.1633.2605-.1103.179.0673.0294.1007.1656.0435.0782.077-.0969.0359.1022.1799.096.0086-.0655-.1739.0861-.1411-.0186-.1773-.1025-.196-.1088-.0811-.1694.1175-.1223.0037-.0505-.2097-.0858-.1039-.0651.0422-.1439-.1902.0444-.1822-.083-.0935-.015-.1582.1008-.0545.052-.0001.5933.4608.1528.1789.1287.237.0723.2384.1299.2905.1958.1766-.0176.2197-.1418.0922.033.0609.0712.0896.1164.0035.0225.0986.0033.0963.0907.1901.1078.0251.1926.0167-.0096.116.0909.038.0958.0276-.0573.1116.0505.1036.0761-.0003-.0082.229.0621-.0026.0534.1663.1296.043-.0743.1355-.1182.0748.0271.1723.0293.0152.0392-.1437.1698-.0769.0073-.1324.1256-.0438.0152.1094.2587.0404.0353.0876.0782-.0539-.0401-.2378-.1468.122.0431-.1327-.0037-.2061-.0637-.112-.213-.0772.0122-.1071-.2244-.131.0215-.1505-.08-.1727-.1236-.0746-.0671.04-.2305-.2749-.179-.0341-.0651-.0695-.1953.0346.0829-.0865-.062-.2208.2463.224.4037.2236.2412.1912.3439.3144.0749.0799.4329.6093.0824.1959.0278.0686.0538.1392.0511.1209.0439.0917.0116.0245.0461.0875.0839.1474.0115.0179.1187.1636.0906.118-.0789.04-.1098.0703-.056.0158-.1567-.0581.0803-.092-.007-.0055-.1036.0849.0068.0765.1215.0109.0587.1146.0019.1193.0048.0554.0162.1678.0945.0126.0576.1033.0785-.0202.001.0011-.0238.11-.0894.0499-.1545.0288-.0979-.039-.3561.0459-.1891.0397-.0817.1237-.0535.0214-.1262.2072-.1031.0931-.0231-.015-.0552.0764.0033.0179-.2199.1334-.0355.016-.1485.112-.0903.0484-.0308-.0179-.0542.0884-.0686.0088-.0868-.035-.0491-.0074-.0211.0471-.1252.1-.0656.0288-.0581.0029-.1177.0128-.0365.0737-.0385-.0622-.098.0266-.0214.0101-.0133.0646-.1038-.0423-.0083.0195-.1469-.0438-.094.0784-.0155.0026-.0503.0331-.1199-.0475-.0213.0778-.0253.0469-.0589-.0147-.111-.0845-.1348-.0176.0263.0775-.0592.0211-.1328-.0825-.0596.0174-.0519-.013-.118.0069-.102.0068-.0174.0073-.1095.0171-.1084-.1127-.0565-.0385-.0751.0376-.0308-.1201-.0665-.0628-.1275.0425-.0632-.0759-.1148.023-.0426-.0875-.0913-.0178-.0938.0279-.0858-.1633-.0964-.0916-.0524-.0619-.151-.0055-.0751-.075-.062-.0331-.0357-.068-.0629-.0523-.3328-.1552.102-.0993-.023-.0756-.1584.061-.0334-.1238-.1392-.0436.0208-.0555-.1918-.1969-.1055-.0329-.0236-.1166-.1071-.1548-.1584-.0403-.0757-.1752-.1155-.125-.1911-.2234-.1608-.1268-.1035-.0106-.0943-.1068.0016-.0843-.1365-.1384-.1295-.0687.0261-.0732.1786-.0503.1852.0174.089.1714.2648.0248.1923-.1124.112-.1593.0839-.0239.0841-.117.0882-.0308.1022-.0724.0376-.1008.1265-.0802.0125-.2959.1403.01.2046.1176.0876.1211.1416-.1718.0856-.0329.1046-.2146.1723-.0799.0387.0482.1993-.158.1352.0062.1144-.0208.114-.1139.0183-.0824.3666-.2784.1405-.0234Z" />
            </g>
          </svg>
          <span className="map-label label-poa">Porto Alegre</span>
          {stations.map((station) => {
            const point = projectCoordinates(station.latitude, station.longitude)
              ?? mockMapPoints.find((item) => item.city === station.city)
              ?? { x: 50, y: 50 }
            return (
              <button
                type="button"
                className={`map-marker ${selected?.id === station.id ? 'selected' : ''}`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                key={station.id}
                onClick={() => setSelected(station)}
                aria-label={`Selecionar ${station.name}`}
                title={`${station.name} (${station.city})`}
              />
            )
          })}
        </div>
        <aside className="side-panel selected-station">
          <span className="eyebrow">Estação selecionada</span>
          <h2>{selected?.city || 'Selecione uma estação'}</h2>
          <p>{selected?.name}</p>
          <strong>{selected && formatNumber(selected.currentLevel, 'm')}</strong>
          <p>Nível atual do rio</p>
          <p style={{ marginTop: '12px' }}>Chuva em 24h: {selected ? formatNumber(selected.rainfall24h, 'mm') : '—'}</p>
          {selected && (
            <button type="button" onClick={() => onDetails(selected)} style={{ marginTop: '16px' }}>
              Abrir detalhes
            </button>
          )}
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
          <p>Informações consolidadas da estação hidrometeorológica.</p>
        </div>
      </div>
      <article className="side-panel details-page">
        <span className="eyebrow">Estação hidrometeorológica</span>
        <h2>{station.name}</h2>
        <dl className="details">
          <div><dt>Município</dt><dd>{station.city || '—'}</dd></div>
          <div><dt>Código da Estação</dt><dd>{station.id}</dd></div>
          <div><dt>Bacia Hidrográfica</dt><dd>{station.basin || '—'}</dd></div>
          <div><dt>Região</dt><dd>{station.region || '—'}</dd></div>
          <div><dt>Nível do Rio</dt><dd>{formatNumber(station.currentLevel, 'm')}</dd></div>
          <div><dt>Chuva Acumulada (24h)</dt><dd>{formatNumber(station.rainfall24h, 'mm')}</dd></div>
          <div><dt>Chuva Acumulada (1h / 3h)</dt><dd>{formatNumber(station.rainfall?.h1, 'mm')} / {formatNumber(station.rainfall?.h3, 'mm')}</dd></div>
          <div><dt>Chuva Acumulada (6h / 12h)</dt><dd>{formatNumber(station.rainfall?.h6, 'mm')} / {formatNumber(station.rainfall?.h12, 'mm')}</dd></div>
          <div><dt>Situação / Cota</dt><dd>{station.statusLabel || 'Normal'}</dd></div>
          <div><dt>Última Medição</dt><dd>{formatDate(station.measuredAt)}</dd></div>
        </dl>
      </article>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState('panel')
  const [stations, setStations] = useState([])
  const [selected, setSelected] = useState(null)
  const [dataSource, setDataSource] = useState('Carregando dados...')
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    hydrologyRepository.listStations().then((items) => {
      setStations(items)
      setSelected(items[0] || null)
      setDataSource(items.source || 'API Oficial Defesa Civil RS')
      setIsLive(Boolean(items.isLive))
    }).catch((err) => {
      console.error('Erro ao carregar estações:', err)
      setDataSource('Dados de Demonstração (Mock)')
      setIsLive(false)
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className={`source-badge ${isLive ? 'live' : 'mock'}`}>
            <span className="pulse-dot" />
            {dataSource}
          </span>
          <nav aria-label="Navegação principal">
            {views.map((item) => (
              <button className={view === item.id ? 'active' : ''} key={item.id} onClick={() => setView(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main>
        {view === 'panel' && <PanelView stations={stations} onDetails={openDetails} />}
        {view === 'map' && <MapView stations={stations} onDetails={openDetails} />}
        {view === 'details' && selected && <DetailsView station={selected} />}
      </main>
      <footer>AlertaRS · Monitoramento hidrológico do Rio Grande do Sul · {dataSource}</footer>
    </div>
  )
}

