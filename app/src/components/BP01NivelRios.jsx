import React, { useState } from 'react';

export default function BP01NivelRios({ onSelectStationForMap, onEmergencyClick }) {
  const [gaugeLevel, setGaugeLevel] = useState(5.12);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="font-sans-ui">
      {/* Editorial Title Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '1rem', borderBottom: '1px solid #EAEAEA', gap: '0.5rem' }}>
        <div>
          <h1 className="font-editorial" style={{ fontSize: '2rem', color: '#111111', fontStyle: 'italic', margin: 0 }}>
            Monitoramento de Rios & Bacias
          </h1>
          <p style={{ fontSize: '12px', color: '#787774', marginTop: '0.125rem' }}>
            Telemetria em tempo real das bacias hidrográficas do Estado do Rio Grande do Sul
          </p>
        </div>
        <div className="font-code" style={{ fontSize: '11px', color: '#9B9A97' }}>
          ATUALIZADO HÁ 2 MIN
        </div>
      </div>

      {/* Main Focus Row */}
      <section className="grid-3-col">
        {/* Main Focus: Guaíba Station */}
        <div className="bento-card span-2-col" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', borderLeft: '3px solid #9F2F2D' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', zIndex: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em', margin: 0 }}>
                  Rio Guaíba
                </h2>
                <span className="badge-pill badge-red">
                  <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', backgroundColor: '#9F2F2D', display: 'inline-block' }} />
                  EMERGÊNCIA
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#787774', fontWeight: 500, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: '#9B9A97' }}>location_on</span>
                Estação Cais Mauá • Porto Alegre, RS
              </p>
            </div>

            <div className="font-code" style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: '#9B9A97', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                Última Leitura
              </span>
              <p style={{ fontSize: '12px', color: '#787774', marginTop: '0.125rem' }}>14:42:09 BRT</p>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', alignItems: 'center', zIndex: 10 }}>
            {/* Level Gauge (SVG Ring Minimalist) */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
              <div style={{ width: '11rem', height: '11rem', borderRadius: '9999px', border: '1px solid #EAEAEA', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFBFA' }}>
                <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#F2F1ED" strokeWidth="6" fill="none" />
                  <circle cx="50" cy="50" r="42" stroke="#9F2F2D" strokeWidth="6" fill="none" strokeDasharray="264" strokeDashoffset="75" strokeLinecap="round" />
                </svg>
                <div className="font-code" style={{ textAlign: 'center', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 700, color: '#111111', letterSpacing: '-0.03em' }}>
                    {gaugeLevel.toFixed(2)}<span style={{ fontSize: '1.25rem', fontWeight: 400, color: '#787774' }}>m</span>
                  </span>
                  <span style={{ fontSize: '10px', color: '#9F2F2D', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginTop: '0.25rem', fontWeight: 600 }}>
                    Cota Alerta: 3.00m
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div className="bento-card-subtle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #9F2F2D' }}>
                <span style={{ color: '#787774', fontSize: '12px', fontWeight: 500 }}>
                  Tendência do Nível
                </span>
                <span className="font-code" style={{ color: '#9F2F2D', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  +2 cm/h <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
                </span>
              </div>

              <div className="bento-card-subtle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #B85314' }}>
                <span style={{ color: '#787774', fontSize: '12px', fontWeight: 500 }}>
                  Vazão Estimada
                </span>
                <span className="font-code" style={{ color: '#111111', fontSize: '12px', fontWeight: 600 }}>
                  18,500 m³/s
                </span>
              </div>

              <div className="bento-card-subtle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #1F6C9F' }}>
                <span style={{ color: '#787774', fontSize: '12px', fontWeight: 500 }}>
                  Cota de Transbordo
                </span>
                <span className="font-code" style={{ color: '#1F6C9F', fontSize: '12px', fontWeight: 600 }}>
                  3.60m
                </span>
              </div>

              <button
                onClick={() =>
                  onSelectStationForMap &&
                  onSelectStationForMap({
                    name: 'Rio Guaíba — Cais Mauá',
                    city: 'Porto Alegre, RS',
                    level: `${gaugeLevel}m`,
                    status: 'critico',
                    statusLabel: 'Emergência',
                    trend: 'Subindo (+2cm/h)',
                    lastRead: '14:42 BRT',
                    cotaAlerta: '3.00m',
                    cotaTransbordo: '3.60m',
                    left: '62%',
                    top: '58%',
                  })
                }
                className="btn-primary"
                style={{ marginTop: '0.75rem', width: '100%' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>map</span>
                Ver no Mapa de Risco
              </button>
            </div>
          </div>
        </div>

        {/* Weather Forecast Card */}
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ color: '#1F6C9F', fontSize: '1.125rem' }}>
                thunderstorm
              </span>
              Previsão Meteorológica
            </h3>

            <div className="bento-card-subtle" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', padding: '1rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.875rem', color: '#1F6C9F', marginBottom: '0.25rem' }}>
                cloud_queue
              </span>
              <div className="font-code" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111111' }}>18°C</div>
              <div className="font-code" style={{ fontSize: '11px', color: '#9F2F2D', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                Alerta de Tempestade
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#787774' }}>Hoje (Acumulado)</span>
                <span className="font-code" style={{ color: '#111111', fontWeight: 600 }}>85 mm</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#787774' }}>Amanhã (Previsão)</span>
                <span className="font-code" style={{ color: '#111111', fontWeight: 600 }}>120 mm</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.25rem' }}>
                <span style={{ color: '#787774' }}>Vento / Rajadas</span>
                <span className="font-code" style={{ color: '#B85314', fontSize: '11px' }}>80 km/h NNE</span>
              </div>
            </div>
          </div>

          <button
            onClick={onEmergencyClick}
            className="btn-emergency"
            style={{ marginTop: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>warning</span>
              <span>Protocolo de Emergência</span>
            </div>
          </button>
        </div>
      </section>

      {/* Bento Grid: Key Stats */}
      <section className="grid-4-col">
        {/* Cidades Monitoradas */}
        <div className="bento-card" style={{ borderLeft: '3px solid #1F6C9F', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <span className="font-code" style={{ color: '#9B9A97', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>
            Cidades Monitoradas
          </span>
          <div className="font-code" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111111' }}>
            497
          </div>
          <div style={{ marginTop: '1rem', height: '4px', width: '100%', backgroundColor: '#F2F1ED', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%', backgroundColor: '#1F6C9F' }} />
          </div>
        </div>

        {/* Alertas Ativos Total */}
        <div className="bento-card" style={{ borderLeft: '3px solid #B85314', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <span className="font-code" style={{ color: '#9B9A97', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>
            Alertas Ativos
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <div className="font-code" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111111' }}>
              12
            </div>
            <span className="font-code" style={{ color: '#B85314', fontSize: '10px', textTransform: 'uppercase' }}>
              No Estado
            </span>
          </div>
          <div style={{ marginTop: '1rem', height: '4px', width: '100%', backgroundColor: '#F2F1ED', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '75%', backgroundColor: '#B85314' }} />
          </div>
        </div>

        {/* Estado Crítico */}
        <div className="bento-card" style={{ borderLeft: '3px solid #9F2F2D', backgroundColor: 'rgba(253, 235, 236, 0.4)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <span className="font-code" style={{ color: '#9F2F2D', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', backgroundColor: '#9F2F2D', display: 'inline-block' }} />
            Estado Crítico
          </span>
          <div className="font-code" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#9F2F2D' }}>
            03
          </div>
          <span style={{ fontSize: '11px', color: '#787774', marginTop: '0.5rem' }}>
            Bacias em colapso
          </span>
        </div>

        {/* Estado de Atenção */}
        <div className="bento-card" style={{ borderLeft: '3px solid #956400', backgroundColor: 'rgba(251, 243, 219, 0.4)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <span className="font-code" style={{ color: '#956400', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', backgroundColor: '#956400', display: 'inline-block' }} />
            Estado de Atenção
          </span>
          <div className="font-code" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#956400' }}>
            09
          </div>
          <span style={{ fontSize: '11px', color: '#787774', marginTop: '0.5rem' }}>
            Monitoramento intensivo
          </span>
        </div>
      </section>
    </div>
  );
}
