import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle, readOnlyInputStyle } from '../../styles';
import { LoadDescriptionPanel } from './LoadDescriptionPanel';

export const TemperatureLoadSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const maxTemp = additionalInputs['loading.temperature_load.highest_max_temp'] ?? '36.4';
  const minTemp = additionalInputs['loading.temperature_load.lowest_min_temp'] ?? '14.6';
  const steelCoeff = additionalInputs['loading.temperature_load.thermal_coeff_steel'] ?? '11.7';
  const rccCoeff = additionalInputs['loading.temperature_load.thermal_coeff_rcc'] ?? '11.7';

  return (
    <div style={{ display: 'flex', gap: '16px', height: '100%', minHeight: 0 }}>
      {/* Left Column */}
      <div
        className="card-scroll"
        style={{
          flex: '1.2',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {/* Temperature Load (TL) Inputs for Evaluation per IRC6 */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Temperature Load (TL) Inputs for Evaluation per IRC6
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Highest Maximum Air Temperature (°C)</label>
              <input type="text" readOnly value={maxTemp} style={readOnlyInputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Lowest Minimum Air Temperature (°C)</label>
              <input type="text" readOnly value={minTemp} style={readOnlyInputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Coefficient of Thermal Expansion for Steel (×10⁻⁶/°C)
              </label>
              <input
                type="text"
                value={steelCoeff}
                onChange={(e) => updateAdditionalInput('loading.temperature_load.thermal_coeff_steel', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Coefficient of Thermal Expansion for RCC (×10⁻⁶/°C)
              </label>
              <input
                type="text"
                value={rccCoeff}
                onChange={(e) => updateAdditionalInput('loading.temperature_load.thermal_coeff_rcc', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Range of Effective Bridge Temperature */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Range of Effective Bridge Temperature
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Minimum (°C)</label>
              <input type="text" readOnly value="4.60" style={readOnlyInputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Maximum (°C)</label>
              <input type="text" readOnly value="51.40" style={readOnlyInputStyle} />
            </div>
          </div>
        </div>

        {/* Temperature for Design */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Temperature for Design
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Rise (°C)</label>
              <input type="text" readOnly value="23.40" style={readOnlyInputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Fall (°C)</label>
              <input type="text" readOnly value="23.40" style={readOnlyInputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Temperature Load (TL)">
        <p style={{ margin: '0 0 8px 0' }}>
          Highest maximum and lowest minimum air shade temperatures are auto-filled from the project location (per IRC 6 Annex B meteorological data).
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Coefficient of thermal expansion (α):</p>
        <p style={{ margin: '0 0 8px 0' }}>
          Governs the unit change in length per degree Celsius. IRC 6 Cl. 215 specifies 12 x 10⁻⁶ /°C for steel and 12 x 10⁻⁶ /°C for RCC; values may be revised if site-specific material data is available. Both coefficients are user-editable.
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Range of effective bridge temperature (EBT):</p>
        <p style={{ margin: '0 0 8px 0' }}>
          The effective bridge temperature is the uniform temperature through the depth of the bridge cross-section at any instant. The minimum and maximum EBT values are derived from the air shade temperatures using IRC 6 Cl. 215. These are computed automatically and shown read-only.
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Temperature for design:</p>
        <p style={{ margin: '0 0 1px 0' }}>• Temperature Rise = Maximum EBT – Mean temperature</p>
        <p style={{ margin: '0 0 1px 0' }}>• Temperature Fall = Mean temperature – Minimum EBT</p>
        <p style={{ margin: 0 }}>
          The Mean temperature is the midpoint of min and max air shade temperatures. The rise and fall values are used to compute thermal expansion and contraction forces, and longitudinal effects throughout the analysis.
        </p>
      </LoadDescriptionPanel>
    </div>
  );
};

