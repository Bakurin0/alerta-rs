import React from 'react';

export default function HeaderNav({ activeTab, setActiveTab }) {
  return (
    <header className="header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Mobile Brand Logo */}
        <div className="font-editorial" style={{ fontSize: '1rem', fontStyle: 'italic', color: '#111111', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '4px', backgroundColor: '#E1F3FE', border: '1px solid #BCE2FC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F6C9F', fontStyle: 'normal' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>water_drop</span>
          </div>
          Alerta<span style={{ color: '#1F6C9F' }}>RS</span>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('BP01')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: activeTab === 'BP01' ? 600 : 500,
              backgroundColor: activeTab === 'BP01' ? '#F7F6F3' : 'transparent',
              color: activeTab === 'BP01' ? '#111111' : '#787774',
              border: activeTab === 'BP01' ? '1px solid #EAEAEA' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('BP02')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: activeTab === 'BP02' ? 600 : 500,
              backgroundColor: activeTab === 'BP02' ? '#F7F6F3' : 'transparent',
              color: activeTab === 'BP02' ? '#111111' : '#787774',
              border: activeTab === 'BP02' ? '1px solid #EAEAEA' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Precipitação
          </button>
          <button
            onClick={() => setActiveTab('BP03')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: activeTab === 'BP03' ? 600 : 500,
              backgroundColor: activeTab === 'BP03' ? '#F7F6F3' : 'transparent',
              color: activeTab === 'BP03' ? '#111111' : '#787774',
              border: activeTab === 'BP03' ? '1px solid #EAEAEA' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Mapa de Risco
          </button>
        </nav>
      </div>

      {/* Right System Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Search with KBD Shortcut */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.625rem', color: '#9B9A97', fontSize: '0.875rem', pointerEvents: 'none' }}>
            search
          </span>
          <input
            type="text"
            placeholder="Buscar estação..."
            style={{
              backgroundColor: '#FBFBFA',
              border: '1px solid #EAEAEA',
              borderRadius: '6px',
              color: '#111111',
              paddingLeft: '2rem',
              paddingRight: '3rem',
              paddingTop: '0.375rem',
              paddingBottom: '0.375rem',
              fontSize: '12px',
              width: '14rem',
              outline: 'none'
            }}
          />
          <div style={{ position: 'absolute', right: '0.5rem', pointerEvents: 'none' }}>
            <kbd>⌘K</kbd>
          </div>
        </div>

        {/* Live System Time Badge */}
        <div className="font-code badge-pill badge-green" style={{ fontSize: '11px' }}>
          <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', backgroundColor: '#346538', display: 'inline-block' }} />
          <span>14:42 BRT</span>
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => alert("Alertas Recentes:\n- Rio Guaíba: 5.12m (Crítico)\n- Rio Taquari: Inundação ativa\n- Rio Caí: Alerta em alta")}
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '6px',
            backgroundColor: '#FBFBFA',
            border: '1px solid #EAEAEA',
            color: '#787774',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          title="Notificações"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>notifications</span>
          <span style={{ position: 'absolute', top: '0.375rem', right: '0.375rem', width: '0.375rem', height: '0.375rem', backgroundColor: '#9F2F2D', borderRadius: '9999px' }} />
        </button>

        {/* Profile Avatar */}
        <div className="font-code" style={{ width: '2rem', height: '2rem', borderRadius: '6px', backgroundColor: '#E1F3FE', border: '1px solid #BCE2FC', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '12px', color: '#1F6C9F', fontWeight: 600, justifyContent: 'center' }}>
          RS
        </div>
      </div>
    </header>
  );
}
