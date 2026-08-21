import React, { useState } from 'react';

const dailyPrecipData = [
  0, 0, 5, 12, 45, 62, 10, 2, 0, 0, 0, 0, 15, 8, 2, 0, 0, 0, 1, 0, 0, 0, 12, 5, 0, 0, 0, 0, 0, 5, 0
];

export default function BP02HistoricoChuva() {
  const [selectedStation, setSelectedStation] = useState('Porto Alegre - INMET');
  const [period, setPeriod] = useState('01 OUT - 31 OUT 2023');
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxVal = 70;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="font-sans-ui">
      {/* Left/Main Column: Chart Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Page Header & Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #EAEAEA', gap: '1rem' }}>
          <div>
            <h1 className="font-editorial" style={{ fontSize: '2rem', color: '#111111', fontStyle: 'italic', margin: 0 }}>
              Histórico de Precipitação Pluviométrica
            </h1>
            <p style={{ fontSize: '12px', color: '#787774', marginTop: '0.125rem' }}>
              Telemetria pluviométrica acumulada • {period}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            {/* Date Range Picker */}
            <div className="bento-card-subtle" style={{ display: 'flex', alignItems: 'center', padding: '0.375rem 0.75rem', gap: '0.5rem', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ color: '#1F6C9F', fontSize: '1rem' }}>
                calendar_month
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="font-code" style={{ fontSize: '9px', textTransform: 'uppercase', color: '#9B9A97' }}>
                  Período
                </span>
                <span className="font-code" style={{ fontSize: '12px', color: '#111111' }}>
                  {period}
                </span>
              </div>
            </div>

            {/* Station Selector */}
            <div className="bento-card-subtle" style={{ display: 'flex', alignItems: 'center', padding: '0.375rem 0.75rem', gap: '0.5rem', cursor: 'pointer', minWidth: '180px' }}>
              <span className="material-symbols-outlined" style={{ color: '#1F6C9F', fontSize: '1rem' }}>
                location_on
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span className="font-code" style={{ fontSize: '9px', textTransform: 'uppercase', color: '#9B9A97' }}>
                  Estação Base
                </span>
                <select
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#111111', fontWeight: 500, fontSize: '12px', outline: 'none', cursor: 'pointer', width: '100%', padding: 0 }}
                >
                  <option style={{ backgroundColor: '#FFFFFF', color: '#111111' }}>Porto Alegre - INMET</option>
                  <option style={{ backgroundColor: '#FFFFFF', color: '#111111' }}>Caxias do Sul - INMET</option>
                  <option style={{ backgroundColor: '#FFFFFF', color: '#111111' }}>Pelotas - INMET</option>
                  <option style={{ backgroundColor: '#FFFFFF', color: '#111111' }}>Santa Maria - INMET</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Big Stat Banner */}
        <div className="bento-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyBetween: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="font-code" style={{ color: '#9B9A97', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Acumulado Mensal Total
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="font-code" style={{ fontSize: '2.75rem', fontWeight: 700, color: '#1F6C9F' }}>
                184.5
              </span>
              <span className="font-code" style={{ fontSize: '1.125rem', color: '#787774' }}>
                mm
              </span>
            </div>
          </div>

          <div style={{ height: '3.5rem', width: '1px', backgroundColor: '#EAEAEA' }} />

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-code" style={{ color: '#9B9A97', fontSize: '11px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Média Histórica
              </span>
              <span className="font-code" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111111' }}>
                114.0 mm
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-code" style={{ color: '#9B9A97', fontSize: '11px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Anomalia
              </span>
              <span className="font-code" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#B85314', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>trending_up</span>{' '}
                +61%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '380px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '12px', color: '#111111', margin: 0 }}>
              Precipitação Diária (mm) — {selectedStation}
            </h2>
            <div className="font-code" style={{ display: 'flex', gap: '1rem', fontSize: '12px', color: '#787774' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '0.625rem', height: '0.625rem', backgroundColor: '#1F6C9F', borderRadius: '2px' }} /> Registrado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '0.625rem', height: '0.625rem', border: '1px solid #9F2F2D', borderStyle: 'dashed', borderRadius: '2px', backgroundColor: '#FDEBEC' }} />{' '}
                Limite Crítico (50mm)
              </div>
            </div>
          </div>

          {/* Custom Bar Chart */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyBetween: 'space-between', gap: '0.25rem', position: 'relative', paddingTop: '3rem', minHeight: '250px' }}>
            {/* Critical line */}
            <div style={{ position: 'absolute', top: '28%', left: 0, width: '100%', borderTop: '1px dashed rgba(159, 47, 45, 0.5)', zIndex: 10, display: 'flex', alignItems: 'center' }}>
              <span className="font-code" style={{ position: 'absolute', right: 0, top: '-1rem', color: '#9F2F2D', fontSize: '10px', backgroundColor: '#FDEBEC', padding: '0.125rem 0.375rem', borderRadius: '4px', border: '1px solid #F8C4C4' }}>
                50mm ALERTA
              </span>
            </div>

            {/* Bars */}
            {dailyPrecipData.map((val, index) => {
              const height = (val / maxVal) * 100;
              const isCritical = val >= 50;
              const isHovered = hoveredDay === index + 1;

              return (
                <div
                  key={index}
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 20 }}
                  onMouseEnter={() => setHoveredDay(index + 1)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    className="chart-bar"
                    style={{
                      width: '100%',
                      height: `${height}%`,
                      backgroundColor: isCritical
                        ? isHovered ? '#9F2F2D' : '#B85314'
                        : isHovered ? '#1F6C9F' : '#3b82f6',
                      borderRadius: '2px 2px 0 0',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      animationDelay: `${index * 0.02}s`
                    }}
                  />

                  {/* Tooltip */}
                  {isHovered && (
                    <div className="font-code" style={{ position: 'absolute', top: '-2.75rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#FFFFFF', color: '#111111', fontSize: '11px', padding: '0.25rem 0.5rem', borderRadius: '4px', whiteSpace: 'nowrap', pointerEvents: 'none', border: '1px solid #EAEAEA', zIndex: 30, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      {index + 1} Out: <span style={{ color: '#1F6C9F', fontWeight: 700 }}>{val} mm</span>
                    </div>
                  )}

                  <div className="font-code" style={{ height: '1.25rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9B9A97', borderTop: '1px solid #EAEAEA', paddingTop: '0.25rem', width: '100%' }}>
                    {index % 5 === 0 || index === 0 || index === 30
                      ? index + 1
                      : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Resumo de Alertas Side Panel */}
      <aside style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="bento-card">
          <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#111111', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Resumo de Alertas</span>
            <span className="font-code" style={{ fontSize: '12px', color: '#787774', fontWeight: 400 }}>Outubro</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {/* Crítico */}
            <div className="badge-red" style={{ padding: '0.875rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', cursor: 'pointer', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#9F2F2D', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F8C4C4' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>warning</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#9F2F2D' }}>
                    Crítico
                  </span>
                  <span style={{ fontSize: '11px', color: '#787774' }}>
                    Risco de Inundação
                  </span>
                </div>
              </div>
              <span className="font-code" style={{ fontWeight: 700, fontSize: '1.5rem', color: '#9F2F2D' }}>
                2
              </span>
            </div>

            {/* Atenção */}
            <div className="badge-orange" style={{ padding: '0.875rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', cursor: 'pointer', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#B85314', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F9D6C1' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                    priority_high
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#B85314' }}>
                    Atenção
                  </span>
                  <span style={{ fontSize: '11px', color: '#787774' }}>
                    Chuvas Intensas
                  </span>
                </div>
              </div>
              <span className="font-code" style={{ fontWeight: 700, fontSize: '1.5rem', color: '#B85314' }}>
                4
              </span>
            </div>

            {/* Moderado */}
            <div className="badge-blue" style={{ padding: '0.875rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', cursor: 'pointer', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#1F6C9F', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #BCE2FC' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>info</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-code" style={{ fontWeight: 600, fontSize: '12px', color: '#1F6C9F' }}>
                    Moderado
                  </span>
                  <span style={{ fontSize: '11px', color: '#787774' }}>
                    Ventos Fortes
                  </span>
                </div>
              </div>
              <span className="font-code" style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1F6C9F' }}>
                7
              </span>
            </div>
          </div>

          <button
            onClick={() => alert("Exibindo log completo de telemetria meteorológica de Outubro.")}
            style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', border: '1px solid #EAEAEA', backgroundColor: 'transparent', color: '#111111', fontSize: '12px', fontWeight: 500, borderRadius: '6px', cursor: 'pointer' }}
          >
            Ver Log Completo
          </button>
        </div>

        {/* Quick Action / Export Dataset */}
        <div className="bento-card-subtle" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: '12px', color: '#111111' }}>Dataset Telemetria</span>
            <span className="material-symbols-outlined" style={{ color: '#1F6C9F', fontSize: '1rem' }}>download</span>
          </div>
          <p style={{ fontSize: '12px', color: '#787774', lineHeight: 1.4 }}>
            Baixe o conjunto completo de dados em formato legível por máquina.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            <button
              onClick={() => alert("Download iniciado: precipitação_outubro_2023.csv")}
              style={{ flex: 1, padding: '0.375rem', border: '1px solid #EAEAEA', backgroundColor: '#FFFFFF', color: '#111111', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
            >
              <kbd>.CSV</kbd> Exportar
            </button>
            <button
              onClick={() => alert("Download iniciado: precipitação_outubro_2023.json")}
              style={{ flex: 1, padding: '0.375rem', border: '1px solid #EAEAEA', backgroundColor: '#FFFFFF', color: '#111111', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
            >
              <kbd>.JSON</kbd> Exportar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
