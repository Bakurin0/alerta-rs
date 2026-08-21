import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onEmergencyClick }) {
  return (
    <aside className="sidebar-aside">
      {/* Editorial Brand Header */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '6px', backgroundColor: '#E1F3FE', border: '1px solid #BCE2FC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F6C9F' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>water_drop</span>
          </div>
          <div>
            <div className="font-editorial" style={{ fontSize: '1.125rem', fontStyle: 'italic', color: '#111111', lineHeight: '1' }}>
              Alerta<span style={{ color: '#1F6C9F' }}>RS</span>
            </div>
            <div className="font-code" style={{ fontSize: '10px', color: '#9B9A97', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
              Painel Operacional • RS
            </div>
          </div>
        </div>
        <span className="font-code" style={{ fontSize: '10px', padding: '0.125rem 0.375rem', borderRadius: '4px', backgroundColor: '#EDF3EC', color: '#346538', border: '1px solid #C8E0C5' }}>
          ATIVO
        </span>
      </div>

      {/* Emergency Protocol Trigger Button */}
      <button
        onClick={onEmergencyClick}
        className="btn-emergency"
        style={{ marginBottom: '1.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '9999px', backgroundColor: '#9F2F2D', display: 'inline-block' }} />
          <span>Emergência</span>
        </div>
        <kbd style={{ fontSize: '10px', backgroundColor: '#FDEBEC', borderColor: '#F8C4C4', color: '#9F2F2D' }}>199</kbd>
      </button>

      {/* Navigation Links Group */}
      <div className="font-code" style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9B9A97', paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
        Navegação
      </div>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <button
          onClick={() => setActiveTab('BP01')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: activeTab === 'BP01' ? '1px solid #EAEAEA' : '1px solid transparent',
            backgroundColor: activeTab === 'BP01' ? '#F7F6F3' : 'transparent',
            color: activeTab === 'BP01' ? '#111111' : '#787774',
            fontWeight: activeTab === 'BP01' ? 600 : 400,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: activeTab === 'BP01' ? '#1F6C9F' : '#9B9A97' }}>
              space_dashboard
            </span>
            <span>Visão Geral</span>
          </div>
          <kbd>⌘1</kbd>
        </button>

        <button
          onClick={() => setActiveTab('BP01')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid transparent',
            backgroundColor: 'transparent',
            color: '#787774',
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#9B9A97' }}>waves</span>
            <span>Hidrologia (Rios)</span>
          </div>
          <kbd>⌘H</kbd>
        </button>

        <button
          onClick={() => setActiveTab('BP02')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: activeTab === 'BP02' ? '1px solid #EAEAEA' : '1px solid transparent',
            backgroundColor: activeTab === 'BP02' ? '#F7F6F3' : 'transparent',
            color: activeTab === 'BP02' ? '#111111' : '#787774',
            fontWeight: activeTab === 'BP02' ? 600 : 400,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: activeTab === 'BP02' ? '#1F6C9F' : '#9B9A97' }}>
              rainy
            </span>
            <span>Precipitação</span>
          </div>
          <kbd>⌘2</kbd>
        </button>

        <button
          onClick={() => setActiveTab('BP03')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: activeTab === 'BP03' ? '1px solid #EAEAEA' : '1px solid transparent',
            backgroundColor: activeTab === 'BP03' ? '#F7F6F3' : 'transparent',
            color: activeTab === 'BP03' ? '#111111' : '#787774',
            fontWeight: activeTab === 'BP03' ? 600 : 400,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: activeTab === 'BP03' ? '#1F6C9F' : '#9B9A97' }}>
              map
            </span>
            <span>Mapa de Alertas</span>
          </div>
          <kbd>⌘3</kbd>
        </button>

        <button
          onClick={() => setActiveTab('BP02')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid transparent',
            backgroundColor: 'transparent',
            color: '#787774',
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#9B9A97' }}>dataset</span>
            <span>Relatórios</span>
          </div>
          <kbd>⌘R</kbd>
        </button>
      </nav>

      {/* Footer Items */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <a
          href="#help"
          onClick={(e) => { e.preventDefault(); alert("Central de Ajuda AlertaRS: Defesa Civil do RS — 199 / Corpo de Bombeiros — 193"); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 0.75rem', borderRadius: '6px', color: '#787774', fontSize: '12px', textDecoration: 'none' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#9B9A97' }}>help_outline</span>
          <span>Central de Ajuda</span>
        </a>
        <div className="font-code" style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.25rem', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9B9A97' }}>
          <span>Defesa Civil RS</span>
          <span>199</span>
        </div>
      </div>
    </aside>
  );
}
