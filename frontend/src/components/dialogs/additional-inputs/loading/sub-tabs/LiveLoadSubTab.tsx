import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle } from '../../styles';
import { LoadDescriptionPanel } from './LoadDescriptionPanel';
import { OsdagCheckbox } from '../../OsdagCheckbox';

export const LiveLoadSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const vehicles = [
    { id: 'loading.live_load.irc.class_a', label: 'Class A' },
    { id: 'loading.live_load.irc.aa_wheeled', label: 'Class AA Wheeled' },
    { id: 'loading.live_load.irc.aa_tracked', label: 'Class AA Tracked' },
    { id: 'loading.live_load.irc.70r_wheeled', label: 'Class 70R Wheeled' },
    { id: 'loading.live_load.irc.70r_tracked', label: 'Class 70R Tracked' },
    { id: 'loading.live_load.irc.70r_bogie', label: 'Class 70R Bogie' },
    { id: 'loading.live_load.irc.class_sv', label: 'Class SV' },
    { id: 'loading.live_load.irc.class_fatigue', label: 'Class Fatigue' },
  ];

  const brakingSv = additionalInputs['bl_irc_class_sv'] ?? true;
  const eccentricity = additionalInputs['loading.live_load.eccentricity'] ?? '1.20';
  const fpPressureMode = additionalInputs['loading.live_load.footpath_pressure.mode'] ?? 'As per IRC 6';
  const fpPressureVal = additionalInputs['loading.live_load.footpath_pressure.value'] ?? '';

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
        {/* Vehicles from IRC 6 */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Vehicles from IRC 6
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {vehicles.map((v) => {
              const checked = additionalInputs[v.id] ?? true;
              return (
                <div
                  key={v.id}
                  onClick={() => updateAdditionalInput(v.id, !checked)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <label
                    style={{
                      fontSize: '12px',
                      color: '#000000',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {v.label}
                  </label>
                  <div style={{ width: '186px', display: 'flex', alignItems: 'center' }}>
                    <OsdagCheckbox
                      checked={Boolean(checked)}
                      onChange={(val) => updateAdditionalInput(v.id, val)}
                      ariaLabel={v.label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Braking Load from Vehicles */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Braking Load from Vehicles
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              onClick={() => updateAdditionalInput('bl_irc_class_sv', !brakingSv)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <label
                style={{
                  fontSize: '12px',
                  color: '#000000',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Class SV
              </label>
              <div style={{ width: '186px', display: 'flex', alignItems: 'center' }}>
                <OsdagCheckbox
                  checked={Boolean(brakingSv)}
                  onChange={(val) => updateAdditionalInput('bl_irc_class_sv', val)}
                  ariaLabel="Class SV"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Eccentricity from top of Deck (m)
              </label>
              <input
                type="text"
                value={eccentricity}
                onChange={(e) => updateAdditionalInput('loading.live_load.eccentricity', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Footpath Pressure */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000' }}>
              Footpath Pressure (kN/mm²)
            </label>
            <div style={{ width: '186px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              <select
                value={fpPressureMode}
                onChange={(e) => updateAdditionalInput('loading.live_load.footpath_pressure.mode', e.target.value)}
                className="osdag-select-field"
                style={{
                  ...inputStyle,
                  width: fpPressureMode === 'Custom' ? '105px' : '186px',
                }}
              >
                <option value="As per IRC 6">As per IRC 6</option>
                <option value="Custom">Custom</option>
              </select>

              {fpPressureMode === 'Custom' && (
                <input
                  type="text"
                  value={fpPressureVal}
                  onChange={(e) => updateAdditionalInput('loading.live_load.footpath_pressure.value', e.target.value)}
                  placeholder=""
                  style={{
                    ...inputStyle,
                    width: '75px',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Live Load (LL)">
        <p style={{ margin: '0 0 1px 0' }}>IRC Vehicles:</p>
        <p style={{ margin: '0 0 8px 0' }}>
          Live load considers standard IRC 6 vehicle classes: Class A, Class 70R (Wheeled, Tracked,
          Bogie), Class AA (Wheeled, Tracked), Class SV (Special Vehicle), and Fatigue vehicle. Only
          checked vehicles are included in the analysis.
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Braking Load (IRC 6 Cl. 211.2):</p>
        <p style={{ margin: '0 0 1px 0' }}>
          Braking forces are derived from the live load. For single- or two-lane bridges: 20% of the
          first train of load plus 10% of succeeding trains in one lane.
        </p>
        <p style={{ margin: '0 0 1px 0' }}>
          For bridges with more than two lanes: as above for the first two lanes, plus 5% for each
          additional lane.
        </p>
        <p style={{ margin: '0 0 8px 0' }}>
          Class SV does not require a braking load by default, but a checkbox is provided if the user
          wishes to include it.
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Braking Load Eccentricity:</p>
        <p style={{ margin: '0 0 8px 0' }}>
          As per IRC 6, braking load acts as a horizontal longitudinal force applied at 1.2 m above the
          top of the deck surface.
        </p>

        <p style={{ margin: '0 0 1px 0' }}>Footpath Pressure:</p>
        <p style={{ margin: 0 }}>
          Footpath live load is applied as a uniform pressure per IRC 6. The default value follows the
          code; the user can switch to 'User-defined' to enter a custom value.
        </p>
      </LoadDescriptionPanel>
    </div>
  );
};
