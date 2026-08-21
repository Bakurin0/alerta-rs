import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderNav from './components/HeaderNav';
import BP01NivelRios from './components/BP01NivelRios';
import BP02HistoricoChuva from './components/BP02HistoricoChuva';
import BP03MapaAlertas from './components/BP03MapaAlertas';

export default function App() {
  const [activeTab, setActiveTab] = useState('BP01');
  const [mapSelectedStation, setMapSelectedStation] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleSelectStationForMap = (station) => {
    setMapSelectedStation(station);
    setActiveTab('BP03');
  };

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEmergencyClick={handleEmergencyClick}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="main-canvas">
          <div className="canvas-container">
            {activeTab === 'BP01' && (
              <BP01NivelRios
                onSelectStationForMap={handleSelectStationForMap}
                onEmergencyClick={handleEmergencyClick}
              />
            )}

            {activeTab === 'BP02' && <BP02HistoricoChuva />}

            {activeTab === 'BP03' && (
              <BP03MapaAlertas initialSelectedStation={mapSelectedStation} />
            )}
          </div>
        </main>
      </div>

      {/* Emergency Protocol Modal (Faux-OS Window Chrome) */}
      {showEmergencyModal && (
        <div className="modal-overlay">
          <div className="modal-chrome-container">
            {/* macOS Chrome Bar */}
            <div className="modal-chrome-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#FF5F56', border: '1px solid #E0443E' }} />
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#FFBD2E', border: '1px solid #DEA123' }} />
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#27C93F', border: '1px solid #1AAB29' }} />
              </div>
              <span className="font-code" style={{ fontSize: '11px', color: '#787774', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                EMERGENCY_PROTOCOL.SH
              </span>
              <button
                onClick={() => setShowEmergencyModal(false)}
                style={{ background: 'none', border: 'none', color: '#787774', fontSize: '12px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '6px', backgroundColor: '#FDEBEC', border: '1px solid #F8C4C4', color: '#9F2F2D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>warning</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111111', letterSpacing: '-0.02em' }}>
                    Protocolo de Emergência Estadual
                  </h3>
                  <p style={{ fontSize: '12px', color: '#9F2F2D', fontWeight: 500, marginTop: '0.125rem' }}>
                    Situação de alto risco de inundação e severidade meteorológica.
                  </p>
                </div>
              </div>

              {/* Emergency Call Numbers */}
              <div style={{ backgroundColor: 'rgba(253, 235, 236, 0.6)', border: '1px solid #F8C4C4', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <div className="font-code" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9F2F2D', fontWeight: 600 }}>
                  Canais Oficiais de Resgate
                </div>
                <div className="font-code" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.5rem', fontSize: '12px', color: '#111111' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(248, 196, 196, 0.8)' }}>
                    <span style={{ color: '#787774' }}>Defesa Civil</span>
                    <kbd style={{ backgroundColor: '#FDEBEC', color: '#9F2F2D', borderColor: '#F8C4C4' }}>199</kbd>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(248, 196, 196, 0.8)' }}>
                    <span style={{ color: '#787774' }}>Bombeiros</span>
                    <kbd style={{ backgroundColor: '#FDEBEC', color: '#9F2F2D', borderColor: '#F8C4C4' }}>193</kbd>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(248, 196, 196, 0.8)' }}>
                    <span style={{ color: '#787774' }}>Brigada Mil.</span>
                    <kbd style={{ backgroundColor: '#FDEBEC', color: '#9F2F2D', borderColor: '#F8C4C4' }}>190</kbd>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(248, 196, 196, 0.8)' }}>
                    <span style={{ color: '#787774' }}>SAMU</span>
                    <kbd style={{ backgroundColor: '#FDEBEC', color: '#9F2F2D', borderColor: '#F8C4C4' }}>192</kbd>
                  </div>
                </div>
              </div>

              {/* Safety Directives */}
              <div style={{ backgroundColor: '#FBFBFA', border: '1px solid #EAEAEA', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="font-code" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1F6C9F', fontWeight: 600 }}>
                  Diretrizes de Segurança Imputadas
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '12px', color: '#787774', lineHeight: '1.5' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span className="font-code" style={{ color: '#1F6C9F' }}>•</span>
                    <span>Evacue imediatamente residências em cotas baixas ou áreas de encosta.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span className="font-code" style={{ color: '#1F6C9F' }}>•</span>
                    <span>Desconecte a chave geral elétrica e o registro central de gás.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span className="font-code" style={{ color: '#1F6C9F' }}>•</span>
                    <span>Não tente cruzar pontes ou trechos de via sob lâmina d'água.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="btn-primary"
                style={{ width: '100%', padding: '0.625rem' }}
              >
                Entendido — Fechar Protocolo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
