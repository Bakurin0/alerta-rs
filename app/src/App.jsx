import React, { useEffect, useState } from 'react'
import { ALERT_LEVELS, filterStations } from './domain/station.js'
import { mockHydrologyRepository } from './services/hydrologyRepository.js'
import { mockRainfall, mockWeatherStation } from './data/mockRainfall.js'
import { mockMapPoints } from './data/mockMapPoints.js'

const views = [
  { id: 'rivers', label: 'Monitoramento' },
  { id: 'rain', label: 'Histórico de chuva' },
  { id: 'map', label: 'Mapa de alertas' },
]
const formatNumber = (value, unit) => `${value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} ${unit}`
const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))

function DemoNotice() {
  return <div className="demo-notice"><span>●</span><strong>Modo demonstração</strong> — valores fictícios, sem validade como alerta oficial.</div>
}

function RiverGauge({ station }) {
  const scaleMax = station.thresholds.flood * 1.15
  const fill = Math.min((station.currentLevel / scaleMax) * 100, 100)
  return (
    <article className={`river-card status-${station.status}`}>
      <div className="river-title"><div><span className="eyebrow">{station.basin}</span><h3>{station.city}</h3></div><span className="status-pill">{station.statusLabel}</span></div>
      <p className="station-name">{station.name}</p>
      <div className="river-reading">
        <div className="level-tube" aria-label={`Nível atual: ${station.currentLevel} metros`}><span style={{ height: `${fill}%` }} /></div>
        <div className="reading-copy"><strong>{formatNumber(station.currentLevel, 'm')}</strong>
          <ul><li><i className="line attention" /> Atenção: {station.thresholds.attention} m</li><li><i className="line alert" /> Alerta: {station.thresholds.alert} m</li><li><i className="line flood" /> Inundação: {station.thresholds.flood} m</li></ul>
        </div>
      </div>
      <div className="river-footer"><strong>{station.statusLabel}</strong><small>Chuva 24h: {formatNumber(station.rainfall24h, 'mm')} · {formatDate(station.measuredAt)}</small></div>
    </article>
  )
}

function RiversView({ stations }) {
  const [city, setCity] = useState('all')
  const cities = [...new Set(stations.map((item) => item.city))].sort()
  const visible = filterStations(stations, { city })
  const counts = Object.fromEntries(Object.keys(ALERT_LEVELS).map((key) => [key, stations.filter((item) => item.status === key).length]))
  return (
    <section className="module">
      <div className="module-heading"><div><h1>Monitoramento em tempo real</h1><p>Acompanhe os níveis dos rios e as condições das estações monitoradas.</p></div><label className="search-label">Buscar município<select value={city} onChange={(event) => setCity(event.target.value)}><option value="all">Todos os municípios</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <DemoNotice />
      <div className="river-layout"><div className="river-grid">{visible.map((station) => <RiverGauge key={station.id} station={station} />)}</div>
        <aside className="side-panel"><h2>Resumo do estado</h2><dl className="summary-list"><div><dt>Estações monitoradas</dt><dd>{stations.length}</dd></div><div><dt>Em inundação</dt><dd>{counts.flood}</dd></div><div><dt>Em alerta</dt><dd>{counts.alert}</dd></div><div><dt>Em atenção</dt><dd>{counts.attention}</dd></div></dl><h3>Sobre as leituras</h3><p>Os medidores reproduzem a hierarquia do protótipo e calculam a situação pelas cotas cadastradas.</p></aside>
      </div>
    </section>
  )
}

function RainChart() {
  const max = 180
  const total = mockRainfall.reduce((sum, value) => sum + value, 0)
  return <div className="chart-card"><div className="chart-heading"><div><span className="eyebrow">Precipitação acumulada diária</span><h2>Período demonstrativo</h2></div><strong>Total: <em>{formatNumber(total, 'mm')}</em></strong></div>
    <div className="rain-chart" aria-label="Gráfico de precipitação diária">{mockRainfall.map((value, index) => <div className="bar-slot" key={index}><span className={value >= 150 ? 'danger' : value >= 80 ? 'warning' : ''} style={{ height: `${(value / max) * 100}%` }} title={`Dia ${index + 1}: ${value} mm`} />{index % 3 === 0 && <small>{String(index + 1).padStart(2, '0')}</small>}</div>)}</div>
    <div className="average-line"><span>Média de referência: 80 mm</span></div>
  </div>
}

function RainView() {
  return <section className="module"><div className="module-heading"><div><h1>Histórico de chuva</h1><p>Consulte a precipitação acumulada por estação e período.</p></div></div><DemoNotice />
    <div className="filter-bar"><label>Estação meteorológica<select><option>{mockWeatherStation.name}</option></select></label><label>Data inicial<input type="date" defaultValue="2026-08-01" /></label><label>Data final<input type="date" defaultValue="2026-08-28" /></label><button type="button">Exportar demonstração</button></div>
    <div className="rain-layout"><RainChart /><aside className="side-stack"><div className="side-panel"><h2>Detalhes da estação</h2><dl className="details"><div><dt>Localização</dt><dd>{mockWeatherStation.city}</dd></div><div><dt>Coordenadas</dt><dd>{mockWeatherStation.coordinates}</dd></div><div><dt>Operador</dt><dd>{mockWeatherStation.operator}</dd></div></dl></div><div className="side-panel"><h2>Faixas de chuva</h2><p className="rain-alert flood">Acima de 150 mm · muito elevada</p><p className="rain-alert alert">Acima de 80 mm · elevada</p><p className="rain-alert attention">Acompanhamento recomendado</p></div></aside></div>
  </section>
}

function MapView() {
  const [enabled, setEnabled] = useState(Object.keys(ALERT_LEVELS))
  const [selected, setSelected] = useState(mockMapPoints[0])
  const toggle = (status) => setEnabled((current) => current.includes(status) ? current.filter((item) => item !== status) : [...current, status])
  const visible = mockMapPoints.filter((point) => enabled.includes(point.status))
  return <section className="module map-module"><div className="module-heading"><div><h1>Mapa de alertas</h1><p>Visualize a situação das estações monitoradas no Rio Grande do Sul.</p></div></div><DemoNotice />
    <div className="map-layout"><aside className="side-panel map-filters"><h2>Filtros de alerta</h2>{Object.entries(ALERT_LEVELS).map(([key, item]) => <label className="check-row" key={key}><input type="checkbox" checked={enabled.includes(key)} onChange={() => toggle(key)} /><i className={`dot ${key}`} />{item.label}<span>{mockMapPoints.filter((point) => point.status === key).length}</span></label>)}<h3>Legenda</h3><p>Selecione um marcador para abrir os detalhes da estação.</p></aside>
      <div className="mock-map" role="img" aria-label="Malha do Rio Grande do Sul com estações simuladas"><svg className="rs-map" viewBox="-57.5941 27.0931 7.891 6.6508" aria-hidden="true"><g transform="scale(1,-1)"><path d="M-53.9475-31.9546l.2219-.1438.0491-.1397.0325-.1468.2071-.1633.2605-.1103.179.0673.0294.1007.1656.0435.0782.077-.0969.0359.1022.1799.096.0086-.0655-.1739.0861-.1411-.0186-.1773-.1025-.196-.1088-.0811-.1694.1175-.1223.0037-.0505-.2097-.0858-.1039-.0651.0422-.1439-.1902.0444-.1822-.083-.0935-.015-.1582.1008-.0545.052-.0001.5933.4608.1528.1789.1287.237.0723.2384.1299.2905.1958.1766-.0176.2197-.1418.0922.033.0609.0712.0896.1164.0035.0225.0986.0033.0963.0907.1901.1078.0251.1926.0167-.0096.116.0909.038.0958.0276-.0573.1116.0505.1036.0761-.0003-.0082.229.0621-.0026.0534.1663.1296.043-.0743.1355-.1182.0748.0271.1723.0293.0152.0392-.1437.1698-.0769.0073-.1324.1256-.0438.0152.1094.2587.0404.0353.0876.0782-.0539-.0401-.2378-.1468.122.0431-.1327-.0037-.2061-.0637-.112-.213-.0772.0122-.1071-.2244-.131.0215-.1505-.08-.1727-.1236-.0746-.0671.04-.2305-.2749-.179-.0341-.0651-.0695-.1953.0346.0829-.0865-.062-.2208.2463.224.4037.2236.2412.1912.3439.3144.0749.0799.4329.6093.0824.1959.0278.0686.0538.1392.0511.1209.0439.0917.0116.0245.0461.0875.0839.1474.0115.0179.1187.1636.0906.118-.0789.04-.1098.0703-.056.0158-.1567-.0581.0803-.092-.007-.0055-.1036.0849.0068.0765.1215.0109.0587.1146.0019.1193.0048.0554.0162.1678.0945.0126.0576.1033.0785-.0202.001.0011-.0238.11-.0894.0499-.1545.0288-.0979-.039-.3561.0459-.1891.0397-.0817.1237-.0535.0214-.1262.2072-.1031.0931-.0231-.015-.0552.0764.0033.0179-.2199.1334-.0355.016-.1485.112-.0903.0484-.0308-.0179-.0542.0884-.0686.0088-.0868-.035-.0491-.0074-.0211.0471-.1252.1-.0656.0288-.0581.0029-.1177.0128-.0365.0737-.0385-.0622-.098.0266-.0214.0101-.0133.0646-.1038-.0423-.0083.0195-.1469-.0438-.094.0784-.0155.0026-.0503.0331-.1199-.0475-.0213.0778-.0253.0469-.0589-.0147-.111-.0845-.1348-.0176.0263.0775-.0592.0211-.1328-.0825-.0596.0174-.0519-.013-.118.0069-.102.0068-.0174.0073-.1095.0171-.1084-.1127-.0565-.0385-.0751.0376-.0308-.1201-.0665-.0628-.1275.0425-.0632-.0759-.1148.023-.0426-.0875-.0913-.0178-.0938.0279-.0858-.1633-.0964-.0916-.0524-.0619-.151-.0055-.0751-.075-.062-.0331-.0357-.068-.0629-.0523-.3328-.1552.102-.0993-.023-.0756-.1584.061-.0334-.1238-.1392-.0436.0208-.0555-.1918-.1969-.1055-.0329-.0236-.1166-.1071-.1548-.1584-.0403-.0757-.1752-.1155-.125-.1911-.2234-.1608-.1268-.1035-.0106-.0943-.1068.0016-.0843-.1365-.1384-.1295-.0687.0261-.0732.1786-.0503.1852.0174.089.1714.2648.0248.1923-.1124.112-.1593.0839-.0239.0841-.117.0882-.0308.1022-.0724.0376-.1008.1265-.0802.0125-.2959.1403.01.2046.1176.0876.1211.1416-.1718.0856-.0329.1046-.2146.1723-.0799.0387.0482.1993-.158.1352.0062.1144-.0208.114-.1139.0183-.0824.3666-.2784.1405-.0234Z" /></g></svg><span className="map-label label-poa">Porto Alegre</span>{visible.map((point) => <button aria-label={`${point.city}: ${ALERT_LEVELS[point.status].label}`} className={`map-marker ${point.status} ${selected.id === point.id ? 'selected' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} key={point.id} onClick={() => setSelected(point)} />)}<small className="map-source">Malha: IBGE · estações simuladas</small></div>
      <aside className="side-panel selected-station"><span className="eyebrow">Estação detalhada</span><h2>{selected.city}</h2><div className={`selected-status ${selected.status}`}>{ALERT_LEVELS[selected.status].label}</div><span>Nível atual simulado</span><strong>{formatNumber(selected.level, 'm')}</strong><hr /><h3>Variação nas últimas 24h</h3><svg viewBox="0 0 240 80" aria-label="Tendência crescente simulada"><polyline points="0,68 40,57 80,48 120,51 160,32 200,24 240,8" /></svg><div className="civil-notice"><strong>Aviso acadêmico</strong><p>Em uma integração real, este espaço exibirá a mensagem oficial e sua procedência.</p></div></aside>
    </div>
  </section>
}

export default function App() {
  const [view, setView] = useState('rivers')
  const [stations, setStations] = useState([])
  useEffect(() => { mockHydrologyRepository.listStations().then(setStations) }, [])
  return <div className="app-shell"><header className="topbar"><a className="brand" href="#">Alerta<span>RS</span></a><nav aria-label="Navegação principal">{views.map((item) => <button className={view === item.id ? 'active' : ''} key={item.id} onClick={() => setView(item.id)}>{item.label}</button>)}</nav></header>
    <main>{view === 'rivers' && <RiversView stations={stations} />}{view === 'rain' && <RainView />}{view === 'map' && <MapView />}</main>
    <footer>AlertaRS · Monitoramento hidrológico e climático do Rio Grande do Sul</footer></div>
}
