import React, { useState } from 'react';

const mapStations = [
  {
    id: 1,
    name: 'Rio Guaíba',
    station: 'Cais Mauá',
    city: 'Porto Alegre, RS',
    level: '5.40m',
    status: 'critico',
    statusLabel: 'Crítico',
    cotaInundacao: '3.00m',
    trend: 'Subindo (+2cm/h)',
    lastRead: '14:30 BRT',
    left: '30%',
    top: '40%',
    isPulse: true,
  },
  {
    id: 2,
    name: 'Rio Taquari',
    station: 'Estação Estrela',
    city: 'Estrela, RS',
    level: '21.65m',
    status: 'critico',
    statusLabel: 'Inundação Ativa',
    cotaInundacao: '19.00m',
    trend: 'Subindo (+4cm/h)',
    lastRead: '14:28 BRT',
    left: '50%',
    top: '60%',
    isPulse: true,
  },
  {
    id: 3,
    name: 'Rio Caí',
    station: 'Estação Barca',
    city: 'S. Sebastião do Caí, RS',
    level: '12.30m',
    status: 'alerta',
    statusLabel: 'Alerta Laranja',
    cotaInundacao: '10.50m',
    trend: 'Subindo (+1cm/h)',
    lastRead: '14:35 BRT',
    left: '60%',
    top: '20%',
  },
  {
    id: 4,
    name: 'Rio Pelotas',
    station: 'Est. Vacaria',
    city: 'Vacaria, RS',
    level: '1.85m',
    status: 'atencao',
    statusLabel: 'Atenção',
    cotaInundacao: '4.00m',
    trend: 'Estável',
    lastRead: '14:40 BRT',
    left: '70%',
    top: '35%',
  },
];

export default function BP03MapaAlertas({ initialSelectedStation }) {
  const [selectedStation, setSelectedStation] = useState(
    initialSelectedStation || mapStations[0]
  );
  const [filters, setFilters] = useState({
    riverLevel: true,
    landslide: true,
    storm: true,
  });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)', position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid #EAEAEA', backgroundColor: '#FBFBFA' }} className="font-sans-ui">
      {/* Warm Technical Grid Background */}
      <div className="technical-grid-light" style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* SVG RS Contour */}
        <svg
          viewBox="0 0 800 600"
          style={{ width: '100%', height: '100%', maxWidth: '64rem', opacity: 0.8, pointerEvents: 'none' }}
        >
          <path
            d="M 280,60 L 340,50 L 420,55 L 490,70 L 560,90 L 620,120 L 660,160 L 680,210 L 675,260 L 660,300 L 640,340 L 620,370 L 600,400 L 580,430 L 540,460 L 500,490 L 460,510 L 420,530 L 380,545 L 340,550 L 300,545 L 270,530 L 250,510 L 230,480 L 215,450 L 200,420 L 190,390 L 185,360 L 185,320 L 190,280 L 200,240 L 215,200 L 230,165 L 245,130 L 260,100 Z"
            fill="#FFFFFF"
            stroke="#EAEAEA"
            strokeWidth="2"
          />
          <path
            d="M 300,200 Q 350,250 400,300 Q 440,340 480,360"
            fill="none"
            stroke="#1F6C9F"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <text
            x="400"
            y="310"
            textAnchor="middle"
            fill="#DCDCDA"
            fontSize="32"
            fontWeight="700"
            letterSpacing="6"
            className="font-code"
          >
            RIO GRANDE DO SUL
          </text>
        </svg>

        {/* Map Station Markers */}
        {mapStations.map((m) => (
          <div
            key={m.id}
            style={{ position: 'absolute', zIndex: 10, cursor: 'pointer', left: m.left, top: m.top }}
            onClick={() => setSelectedStation(m)}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.status === 'critico' && (
                <div style={{ width: '2rem', height: '2rem', backgroundColor: '#FDEBEC', borderRadius: '9999px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              )}
              <div
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#FFFFFF',
                  backgroundColor: m.status === 'critico' ? '#9F2F2D' : m.status === 'alerta' ? '#B85314' : '#956400',
                  borderColor: m.status === 'critico' ? '#F8C4C4' : m.status === 'alerta' ? '#F9D6C1' : '#F3E5AB'
                }}
              >
                ●
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Panel: Filters & Legend */}
      <div style={{ zIndex: 20, width: '18rem', height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', pointerEvents: 'none' }}>
        {/* Filters */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', border: '1px solid #EAEAEA', padding: '1rem', borderRadius: '12px', pointerEvents: 'auto' }}>
          <h3 className="font-code" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', color: '#111111', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.5rem', fontWeight: 600 }}>
            Filtros de Alerta
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.riverLevel}
                onChange={() => setFilters((f) => ({ ...f, riverLevel: !f.riverLevel }))}
                style={{ width: '0.875rem', height: '0.875rem', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ color: '#787774', fontWeight: 500, flex: 1 }}>
                Nível de Rio (Inundação)
              </span>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9F2F2D', borderRadius: '9999px', display: 'inline-block' }} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.landslide}
                onChange={() => setFilters((f) => ({ ...f, landslide: !f.landslide }))}
                style={{ width: '0.875rem', height: '0.875rem', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ color: '#787774', fontWeight: 500, flex: 1 }}>
                Risco Deslizamento
              </span>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#1F6C9F', borderRadius: '9999px', display: 'inline-block' }} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.storm}
                onChange={() => setFilters((f) => ({ ...f, storm: !f.storm }))}
                style={{ width: '0.875rem', height: '0.875rem', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ color: '#787774', fontWeight: 500, flex: 1 }}>
                Tempestade Severa
              </span>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#B85314', borderRadius: '9999px', display: 'inline-block' }} />
            </label>
          </div>
        </div>

        {/* Legend */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', border: '1px solid #EAEAEA', padding: '1rem', borderRadius: '12px', marginTop: 'auto', pointerEvents: 'auto' }}>
          <h4 className="font-code" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: '#9B9A97' }}>
            Legenda de Status
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '12px', color: '#787774' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9F2F2D', borderRadius: '9999px' }} /> Emergência / Crítico
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#B85314', borderRadius: '9999px' }} /> Alerta Laranja
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#956400', borderRadius: '9999px' }} /> Atenção / Observação
            </li>
          </ul>
        </div>
      </div>

      {/* Right Detail Panel */}
      <div style={{ zIndex: 20, width: '22rem', height: '100%', backgroundColor: '#FFFFFF', borderLeft: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', pointerEvents: 'auto', marginLeft: 'auto', overflowY: 'auto' }}>
        {selectedStation && (
          <div>
            {/* Station Header */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #EAEAEA', backgroundColor: '#FBFBFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                <span
                  className="font-code badge-pill"
                  style={{
                    backgroundColor: selectedStation.status === 'critico' ? '#FDEBEC' : selectedStation.status === 'alerta' ? '#FDF0E6' : '#FBF3DB',
                    borderColor: selectedStation.status === 'critico' ? '#F8C4C4' : selectedStation.status === 'alerta' ? '#F9D6C1' : '#F3E5AB',
                    color: selectedStation.status === 'critico' ? '#9F2F2D' : selectedStation.status === 'alerta' ? '#B85314' : '#956400'
                  }}
                >
                  ● {selectedStation.statusLabel || selectedStation.status}
                </span>
                <span className="font-code" style={{ color: '#9B9A97', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>schedule</span>
                  {selectedStation.lastRead || '14:30 BRT'}
                </span>
              </div>

              <h2 style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#111111', marginTop: '0.25rem' }}>
                {selectedStation.name}
              </h2>
              <h3 className="font-code" style={{ fontSize: '12px', color: '#1F6C9F', textTransform: 'uppercase', marginTop: '0.125rem' }}>
                {selectedStation.station}
              </h3>
              <p style={{ fontSize: '12px', color: '#787774', marginTop: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: '#9B9A97' }}>location_on</span>
                {selectedStation.city}
              </p>
            </div>

            {/* Station Data */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
                <div className="bento-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <span className="font-code" style={{ fontSize: '10px', color: '#787774', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Nível Atual
                  </span>
                  <span className="font-code" style={{ fontWeight: 700, fontSize: '1.875rem', color: '#9F2F2D' }}>
                    {selectedStation.level}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="bento-card-subtle" style={{ padding: '0.625rem', display: 'flex', flexDirection: 'column' }}>
                    <span className="font-code" style={{ fontSize: '9px', color: '#9B9A97', textTransform: 'uppercase' }}>
                      Cota Inundação
                    </span>
                    <span className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#111111' }}>
                      {selectedStation.cotaInundacao || '3.00m'}
                    </span>
                  </div>
                  <div className="bento-card-subtle" style={{ padding: '0.625rem', display: 'flex', flexDirection: 'column' }}>
                    <span className="font-code" style={{ fontSize: '9px', color: '#9B9A97', textTransform: 'uppercase' }}>
                      Tendência
                    </span>
                    <span className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#9F2F2D', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
                      {selectedStation.trend || 'Subindo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Defesa Civil Alert Box */}
              {selectedStation.status === 'critico' && (
                <div style={{ backgroundColor: '#FDEBEC', border: '1px solid #F8C4C4', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#9F2F2D', fontSize: '1rem' }}>warning</span>
                    <h4 className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#9F2F2D', textTransform: 'uppercase' }}>
                      Alerta Defesa Civil
                    </h4>
                  </div>
                  <p style={{ fontSize: '12px', color: '#787774', lineHeight: 1.4 }}>
                    Risco extremo de inundação. Evacuação imediata de áreas ribeirinhas e cotas baixas.
                  </p>
                  <button
                    onClick={() =>
                      alert(
                        "Diretrizes da Defesa Civil:\n1. Desligue a chave geral de energia elétrica.\n2. Evacue para abrigos municipais ou pontos altos.\n3. Em caso de socorro imediato, ligue 199 ou 193."
                      )
                    }
                    style={{ marginTop: '0.75rem', width: '100%', backgroundColor: '#FFFFFF', hover: '#FBFBFA', color: '#9F2F2D', border: '1px solid #F8C4C4', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', padding: '0.375rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Ver Diretrizes Evacuação
                  </button>
                </div>
              )}

              {/* Chart Placeholder Box */}
              <div className="bento-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '12px', color: '#111111', fontWeight: 600 }}>
                    Histórico Recente (48h)
                  </span>
                  <span className="material-symbols-outlined" style={{ color: '#9B9A97', fontSize: '0.875rem' }}>
                    show_chart
                  </span>
                </div>
                <div style={{ height: '5rem', width: '100%', backgroundColor: '#FBFBFA', borderRadius: '4px', border: '1px solid #EAEAEA', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '0.5rem' }}>
                  <svg
                    style={{ width: '100%', height: '100%', stroke: '#9F2F2D', fill: '#FDEBEC', strokeWidth: '1.5px' }}
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <polyline fill="none" points="0,80 20,75 40,60 60,50 80,20 100,10" />
                    <polygon points="0,100 0,80 20,75 40,60 60,50 80,20 100,10 100,100" stroke="none" />
                  </svg>
                  <div style={{ position: 'absolute', top: '30%', left: 0, width: '100%', borderTop: '1px dashed #F8C4C4' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
