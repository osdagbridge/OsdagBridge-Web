import React from 'react';
import { Play, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useBridgeStore } from '../../store/useBridgeStore';

export const Header: React.FC = () => {
  const { inputs } = useBridgeStore();

  return (
    <header style={{
      height: '48px',
      background: 'var(--header-bg)',
      color: 'var(--header-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: '1px solid #0f172a'
    }}>
      {/* Brand & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'var(--accent-osdag)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '14px',
          padding: '4px 8px',
          borderRadius: '4px'
        }}>
          OsdagBridge
        </div>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>
          Plate Girder Bridge Workbench (IRC Standard)
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => alert('Reset to defaults')}
          style={{
            background: 'transparent',
            border: '1px solid #475569',
            color: '#e2e8f0',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>

        <button
          onClick={() => alert(`Starting analysis for ${inputs.Span}m bridge...`)}
          style={{
            background: 'var(--accent-osdag)',
            border: 'none',
            color: '#ffffff',
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Play size={14} fill="#ffffff" /> Design Bridge
        </button>
      </div>
    </header>
  );
};
