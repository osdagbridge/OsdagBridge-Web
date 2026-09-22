import React from 'react';
import { useBridgeStore } from '../../store/useBridgeStore';
import { Eye, Layers, Box } from 'lucide-react';

export const ViewportContainer: React.FC = () => {
  const { activeViewportTab, setActiveViewportTab, inputs } = useBridgeStore();
  const span = Number(inputs.Span) || 30.0;
  const numGirders = Number(inputs.No_Of_Girders) || 4;
  const width = Number(inputs.Carriageway_Width) || 7.5;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', position: 'relative' }}>
      {/* Viewport Toolbar / Tabs */}
      <div style={{
        height: '36px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '6px',
        background: '#f8fafc'
      }}>
        <button
          onClick={() => setActiveViewportTab('plan')}
          style={{
            background: activeViewportTab === 'plan' ? '#ffffff' : 'transparent',
            border: activeViewportTab === 'plan' ? '1px solid var(--border-color)' : 'none',
            borderBottom: activeViewportTab === 'plan' ? '1px solid #ffffff' : 'none',
            padding: '4px 10px',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: activeViewportTab === 'plan' ? 600 : 400,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: activeViewportTab === 'plan' ? 'var(--accent-osdag)' : 'var(--text-sub)'
          }}
        >
          <Layers size={13} /> Bridge Plan (2D)
        </button>

        <button
          onClick={() => setActiveViewportTab('cross_section')}
          style={{
            background: activeViewportTab === 'cross_section' ? '#ffffff' : 'transparent',
            border: activeViewportTab === 'cross_section' ? '1px solid var(--border-color)' : 'none',
            borderBottom: activeViewportTab === 'cross_section' ? '1px solid #ffffff' : 'none',
            padding: '4px 10px',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: activeViewportTab === 'cross_section' ? 600 : 400,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: activeViewportTab === 'cross_section' ? 'var(--accent-osdag)' : 'var(--text-sub)'
          }}
        >
          <Eye size={13} /> Cross Section (2D)
        </button>

        <button
          onClick={() => setActiveViewportTab('3d')}
          style={{
            background: activeViewportTab === '3d' ? '#ffffff' : 'transparent',
            border: activeViewportTab === '3d' ? '1px solid var(--border-color)' : 'none',
            borderBottom: activeViewportTab === '3d' ? '1px solid #ffffff' : 'none',
            padding: '4px 10px',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: activeViewportTab === '3d' ? 600 : 400,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: activeViewportTab === '3d' ? 'var(--accent-osdag)' : 'var(--text-sub)'
          }}
        >
          <Box size={13} /> 3D CAD View
        </button>
      </div>

      {/* Drawing Viewport Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#fafbfc' }}>
        {activeViewportTab === 'plan' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 800 300" style={{ width: '90%', maxHeight: '400px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.05))' }}>
              {/* Abutment lines */}
              <rect x="50" y="30" width="16" height="240" fill="#64748b" rx="2" />
              <rect x="734" y="30" width="16" height="240" fill="#64748b" rx="2" />

              {/* Deck slab boundary */}
              <rect x="66" y="40" width="668" height="220" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />

              {/* Girders */}
              {Array.from({ length: numGirders }).map((_, idx) => {
                const y = 60 + (idx * (180 / Math.max(1, numGirders - 1)));
                return (
                  <g key={idx}>
                    <line x1="66" y1={y} x2="734" y2={y} stroke="var(--accent-osdag)" strokeWidth="6" strokeLinecap="round" />
                    <text x="745" y={y + 4} fontSize="10" fill="#64748b" fontFamily="var(--font-mono)">G{idx + 1}</text>
                  </g>
                );
              })}

              {/* Dimension Annotations */}
              <line x1="66" y1="275" x2="734" y2="275" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="400" y="290" textAnchor="middle" fontSize="12" fill="#475569" fontWeight="600" fontFamily="var(--font-mono)">
                Span: {span.toFixed(2)} m
              </text>
            </svg>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
              Interactive Plan: {numGirders} Girders across {width.toFixed(2)}m Carriageway
            </div>
          </div>
        )}

        {activeViewportTab === 'cross_section' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 600 300" style={{ width: '80%', maxHeight: '400px' }}>
              {/* Deck Slab */}
              <rect x="50" y="70" width="500" height="24" fill="#94a3b8" rx="2" />
              <rect x="50" y="60" width="500" height="10" fill="#cbd5e1" />

              {/* Railings / Crash Barrier */}
              <rect x="50" y="25" width="20" height="35" fill="#475569" rx="2" />
              <rect x="530" y="25" width="20" height="35" fill="#475569" rx="2" />

              {/* Plate Girders (I-sections) */}
              {Array.from({ length: numGirders }).map((_, idx) => {
                const x = 100 + (idx * (400 / Math.max(1, numGirders - 1)));
                return (
                  <g key={idx}>
                    {/* Top Flange */}
                    <rect x={x - 25} y="94" width="50" height="8" fill="var(--accent-osdag)" rx="1" />
                    {/* Web */}
                    <rect x={x - 4} y="102" width="8" height="100" fill="var(--accent-osdag)" />
                    {/* Bottom Flange */}
                    <rect x={x - 25} y="202" width="50" height="10" fill="var(--accent-osdag)" rx="1" />
                  </g>
                );
              })}
            </svg>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
              Cross-Section View: Deck slab with {numGirders} I-Girders
            </div>
          </div>
        )}

        {activeViewportTab === '3d' && (
          <div style={{ textAlign: 'center', color: '#64748b' }}>
            <Box size={40} color="var(--accent-osdag)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '4px' }}>3D WebGL Viewport</h4>
            <p style={{ fontSize: '12px' }}>
              Three.js model renderer will load post-analysis OpenCASCADE .glb geometry here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
