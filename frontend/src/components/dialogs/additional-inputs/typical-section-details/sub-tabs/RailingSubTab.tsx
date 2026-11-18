import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle } from '../../styles';

export const RailingSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '32px', rowGap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000', minWidth: '160px' }}>Type:</label>
        <select
          value={additionalInputs['typical_section.railing.type'] ?? 'IRC 5 - RCC Railing'}
          onChange={(e) => updateAdditionalInput('typical_section.railing.type', e.target.value)}
          style={inputStyle}
        >
          <option value="IRC 5 - RCC Railing">IRC 5 - RCC Railing</option>
          <option value="IRC 5 - Steel Railing">IRC 5 - Steel Railing</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000', minWidth: '160px' }}>Height (m):</label>
        <input
          type="number"
          step="0.01"
          value={Number(additionalInputs['typical_section.railing.height'] ?? 1.1).toFixed(2)}
          onChange={(e) => updateAdditionalInput('typical_section.railing.height', parseFloat(e.target.value))}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

