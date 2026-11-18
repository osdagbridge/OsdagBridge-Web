import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle, readOnlyInputStyle } from '../../styles';

export const DeckDetailsSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const deckThickness = Number(additionalInputs['typical_section.deck_thickness'] ?? 250.0);
  const footpathWidth = Number(additionalInputs['typical_section.footpath_width'] ?? 0.0);
  const footpathThickness = Number(additionalInputs['typical_section.footpath_thickness'] ?? 250.0);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '32px',
        rowGap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
          Deck Thickness (mm):
        </label>
        <input
          type="number"
          step="1"
          value={deckThickness ? deckThickness.toFixed(2) : '250.00'}
          onChange={(e) => updateAdditionalInput('typical_section.deck_thickness', parseFloat(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
          Footpath Width (m):
        </label>
        <input
          type="text"
          readOnly
          value={footpathWidth ? footpathWidth.toFixed(2) : '0.00'}
          style={readOnlyInputStyle}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
          Footpath Thickness (mm):
        </label>
        <input
          type="text"
          readOnly
          value={footpathThickness ? footpathThickness.toFixed(2) : '250.00'}
          style={readOnlyInputStyle}
        />
      </div>
    </div>
  );
};

