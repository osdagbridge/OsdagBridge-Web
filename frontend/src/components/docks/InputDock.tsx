import React, { useEffect } from 'react';
import { useBridgeStore } from '../../store/useBridgeStore';
import { SchemaField } from '../forms/SchemaField';
import { Sliders } from 'lucide-react';

export const InputDock: React.FC = () => {
  const { schema, fetchSchema, schemaLoading } = useBridgeStore();

  useEffect(() => {
    fetchSchema();
  }, []);

  // Group fields by group name
  const groups = schema.reduce<Record<string, typeof schema>>((acc, item) => {
    const g = item.group || 'General Details';
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  return (
    <aside style={{
      width: '320px',
      minWidth: '280px',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      height: '100%',
      overflowY: 'auto',
      padding: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
        <Sliders size={16} color="var(--accent-osdag)" />
        <span style={{ fontWeight: 600, fontSize: '13px' }}>Input Parameters</span>
      </div>

      {schemaLoading && (
        <div style={{ color: 'var(--text-sub)', fontSize: '12px', padding: '12px 0' }}>
          Loading schema definitions...
        </div>
      )}

      {Object.entries(groups).map(([groupTitle, fields]) => (
        <div key={groupTitle} style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 700, marginBottom: '10px' }}>
            {groupTitle}
          </h4>
          {fields.map((f) => (
            <SchemaField key={f.key} field={f} />
          ))}
        </div>
      ))}
    </aside>
  );
};
