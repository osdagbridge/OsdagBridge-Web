import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle } from '../../styles';

export const MedianSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '32px', rowGap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000', minWidth: '160px' }}>Type:</label>
        <select
          value={additionalInputs['typical_section.median.type'] ?? 'None'}
          onChange={(e) => updateAdditionalInput('typical_section.median.type', e.target.value)}
          style={inputStyle}
        >
          <option value="None">None</option>
          <option value="Concrete Barrier">Concrete Barrier</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000', minWidth: '160px' }}>Width (m):</label>
        <input
          type="number"
          step="0.01"
          value={Number(additionalInputs['typical_section.median.width'] ?? 0.0).toFixed(2)}
          onChange={(e) => updateAdditionalInput('typical_section.median.width', parseFloat(e.target.value))}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

