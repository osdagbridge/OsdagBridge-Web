import React from 'react';
import { UIFieldSchema } from '../../types/schema';
import { useBridgeStore } from '../../store/useBridgeStore';
import { MapPin, AlertCircle } from 'lucide-react';

interface SchemaFieldProps {
  field: UIFieldSchema;
}

export const SchemaField: React.FC<SchemaFieldProps> = ({ field }) => {
  const { inputs, updateField, validateFieldLive, validationErrors, setLocationModalOpen } = useBridgeStore();
  const value = inputs[field.key] ?? field.default ?? '';
  const error = validationErrors[field.key];

  const handleBlur = () => {
    validateFieldLive(field.key, value);
  };

  if (field.ui_type === 'button') {
    return (
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '4px' }}>
          {field.label} {field.required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
        <button
          type="button"
          onClick={() => {
            if (field.action === 'open_project_location_modal') {
              setLocationModalOpen(true);
            }
          }}
          style={{
            width: '100%',
            padding: '7px 10px',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: value ? 'var(--text-main)' : 'var(--text-sub)'
          }}
        >
          <span>{value || 'Select Location...'}</span>
          <MapPin size={15} color="var(--accent-osdag)" />
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-sub)' }}>
          {field.label} {field.required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
        {field.unit && (
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', background: '#e2e8f0', color: '#475569', padding: '1px 4px', borderRadius: '3px' }}>
            {field.unit}
          </span>
        )}
      </div>

      {field.ui_type === 'select' ? (
        <select
          value={value}
          onChange={(e) => {
            updateField(field.key, e.target.value);
            validateFieldLive(field.key, e.target.value);
          }}
          style={{
            width: '100%',
            padding: '6px 8px',
            borderRadius: '4px',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
            background: '#ffffff',
            fontSize: '12px',
            color: 'var(--text-main)',
            outline: 'none'
          }}
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.ui_type === 'number' ? 'number' : 'text'}
          value={value}
          placeholder={field.placeholder || ''}
          onChange={(e) => {
            const val = field.ui_type === 'number' ? (e.target.value === '' ? '' : parseFloat(e.target.value)) : e.target.value;
            updateField(field.key, val);
          }}
          onBlur={handleBlur}
          style={{
            width: '100%',
            padding: '6px 8px',
            borderRadius: '4px',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
            background: '#ffffff',
            fontSize: '12px',
            fontFamily: field.ui_type === 'number' ? 'var(--font-mono)' : 'inherit',
            color: 'var(--text-main)',
            outline: 'none'
          }}
        />
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--danger)', fontSize: '11px' }}>
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
