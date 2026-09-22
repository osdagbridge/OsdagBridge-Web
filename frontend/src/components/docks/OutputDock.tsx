import React from 'react';
import { CheckCircle2, FileText, Download } from 'lucide-react';
import { useBridgeStore } from '../../store/useBridgeStore';

export const OutputDock: React.FC = () => {
  const { inputs, location } = useBridgeStore();

  return (
    <aside style={{
      width: '300px',
      background: 'var(--bg-surface)',
      borderLeft: '1px solid var(--border-color)',
      height: '100%',
      overflowY: 'auto',
      padding: '16px'
    }}>
      <div style={{ fontSize: '13px', fontWeight: 600, paddingBottom: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
        Design Summary
      </div>

      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <CheckCircle2 size={18} color="var(--accent-osdag)" />
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>Ready for Design</div>
          <div style={{ fontSize: '11px', color: '#15803d' }}>All geometric parameters valid</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ color: 'var(--text-sub)' }}>Span:</span>
          <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{inputs.Span} m</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ color: 'var(--text-sub)' }}>Girders:</span>
          <span style={{ fontWeight: 600 }}>{inputs.No_Of_Girders}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ color: 'var(--text-sub)' }}>Steel Grade:</span>
          <span style={{ fontWeight: 600 }}>{inputs.Girder_Steel_Material}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ color: 'var(--text-sub)' }}>Location:</span>
          <span style={{ fontWeight: 600 }}>{location?.station || 'Not Selected'}</span>
        </div>
      </div>
    </aside>
  );
};
