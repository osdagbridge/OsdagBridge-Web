import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle } from '../../styles';
import { LoadDescriptionPanel } from './LoadDescriptionPanel';

export const PermanentLoadSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const swFactor = additionalInputs['loading.permanent_load.dead_load.self_weight_factor'] ?? '1.00';

  return (
    <div style={{ display: 'flex', gap: '16px', height: '100%', minHeight: 0 }}>
      {/* Left Column */}
      <div style={{ flex: '1.2', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '12px' }}>
            Dead Load (DL)
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000' }}>
              Self-weight modification factor
            </label>
            <input
              type="text"
              value={swFactor}
              onChange={(e) =>
                updateAdditionalInput('loading.permanent_load.dead_load.self_weight_factor', e.target.value)
              }
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Permanent Loads">
        <p style={{ margin: '0 0 2px 0' }}>Dead loads are divided into the following categories:</p>
        <p style={{ margin: '0 0 1px 0' }}>
          SW: Self-weight of the girder. The self-weight modification factor entered by the user is multiplied with this case to account for connections and accessories not explicitly modelled.
        </p>
        <p style={{ margin: '0 0 1px 0' }}>
          DC: Weight of structural steel components other than the girder, including cross bracing and end diaphragms.
        </p>
        <p style={{ margin: '0 0 1px 0' }}>
          DD: Weight of the concrete deck slab.
        </p>
        <p style={{ margin: '0 0 1px 0' }}>
          DW: Weight of the wearing course (surfacing) applied on the deck.
        </p>
        <p style={{ margin: '0 0 8px 0' }}>
          SIDL: Superimposed Dead Load, comprising crash barriers, median, and railings.
        </p>
        <p style={{ margin: 0 }}>
          All load magnitudes are computed internally from member dimensions and material densities. The self-weight modification factor (SW) is the only user-controlled parameter for this load group.
        </p>
      </LoadDescriptionPanel>
    </div>
  );
};

