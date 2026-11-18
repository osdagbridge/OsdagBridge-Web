import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle, readOnlyInputStyle } from '../../styles';
import { LoadDescriptionPanel } from './LoadDescriptionPanel';

export const WindLoadSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const basicWindSpeed = additionalInputs['loading.wind_load.basic_wind_speed'] ?? '44';
  const exposedHeight = additionalInputs['loading.wind_load.avg_exposed_height'] ?? '10';
  const terrainType = additionalInputs['loading.wind_load.terrain_type'] ?? 'Plain Terrain';
  const siteTopo = additionalInputs['loading.wind_load.site_topography'] ?? 'Flat';

  // Dynamic computation per IRC 6:2017 Table 12
  const computeWindValues = () => {
    const Vb = parseFloat(basicWindSpeed) || 44;
    const H = parseFloat(exposedHeight) || 10;
    const isObstructed = terrainType.includes('Obstruction');

    // Base values for Vb = 33 m/s from IRC 6 Table 12
    const plainTable: [number, number, number][] = [
      [10, 27.80, 463.70],
      [15, 29.20, 512.50],
      [20, 30.30, 550.60],
      [30, 31.40, 590.20],
      [50, 33.10, 659.20],
      [60, 33.60, 676.30],
      [70, 34.00, 693.60],
      [80, 34.40, 711.20],
      [100, 35.30, 747.00],
    ];

    const obstructedTable: [number, number, number][] = [
      [10, 17.80, 190.50],
      [15, 19.60, 230.50],
      [20, 21.00, 265.30],
      [30, 22.80, 312.20],
      [50, 24.90, 373.40],
      [60, 25.60, 392.90],
      [70, 26.20, 412.80],
      [80, 26.90, 433.30],
      [100, 28.20, 475.60],
    ];

    const table = isObstructed ? obstructedTable : plainTable;

    let Vz_33 = table[0][1];
    let Pz_33 = table[0][2];

    if (H <= 10) {
      Vz_33 = table[0][1];
      Pz_33 = table[0][2];
    } else if (H >= 100) {
      Vz_33 = table[table.length - 1][1];
      Pz_33 = table[table.length - 1][2];
    } else {
      for (let i = 0; i < table.length - 1; i++) {
        const [hLow, vLow, pLow] = table[i];
        const [hHigh, vHigh, pHigh] = table[i + 1];
        if (H >= hLow && H <= hHigh) {
          const ratio = (H - hLow) / (hHigh - hLow);
          Vz_33 = vLow + ratio * (vHigh - vLow);
          Pz_33 = pLow + ratio * (pHigh - pLow);
          break;
        }
      }
    }

    const Vz = Vz_33 * (Vb / 33);
    const Pz = Pz_33 * Math.pow(Vb / 33, 2);

    return {
      vzStr: Vz.toFixed(2),
      pzStr: Pz.toFixed(2),
    };
  };

  const { vzStr, pzStr } = computeWindValues();

  const renderModeRow = (
    label: React.ReactNode,
    modeKey: string,
    valKey: string,
    modeChoices: string[] = ['As per IRC 6', 'Custom']
  ) => {
    const mode = additionalInputs[modeKey] ?? modeChoices[0];
    const val = additionalInputs[valKey] ?? '';
    const isCustom = mode === 'Custom';

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '12px', color: '#000000' }}>{label}</label>
        <div style={{ width: '186px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
          <select
            value={mode}
            onChange={(e) => updateAdditionalInput(modeKey, e.target.value)}
            className="osdag-select-field"
            style={{
              ...inputStyle,
              width: isCustom ? '105px' : '186px',
            }}
          >
            {modeChoices.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {isCustom && (
            <input
              type="text"
              value={val}
              onChange={(e) => updateAdditionalInput(valKey, e.target.value)}
              placeholder=""
              style={{
                ...inputStyle,
                width: '75px',
              }}
            />
          )}
        </div>
      </div>
    );
  };

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
        {/* Wind Load (WL) Inputs */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Wind Load (WL) Inputs
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Basic Wind Speed, Vb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Basic Wind Speed, V<sub>b</sub> (m/s)
              </label>
              <input type="text" readOnly value={basicWindSpeed} style={readOnlyInputStyle} />
            </div>

            {/* Average Exposed Height, H */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Average Exposed Height, H (m)</label>
              <input
                type="text"
                value={exposedHeight}
                onChange={(e) => updateAdditionalInput('loading.wind_load.avg_exposed_height', e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Type of Terrain */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Type of Terrain</label>
              <select
                value={terrainType}
                onChange={(e) => updateAdditionalInput('loading.wind_load.terrain_type', e.target.value)}
                className="osdag-select-field"
                style={inputStyle}
              >
                <option value="Plain Terrain">Plain Terrain</option>
                <option value="Terrain with Obstructions">Terrain with Obstructions</option>
              </select>
            </div>

            {/* Site Topography */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>Site Topography</label>
              <select
                value={siteTopo}
                onChange={(e) => updateAdditionalInput('loading.wind_load.site_topography', e.target.value)}
                className="osdag-select-field"
                style={inputStyle}
              >
                <option value="Flat">Flat</option>
                <option value="Hill, ridge, escarpment or cliff">Hill, ridge, escarpment or cliff</option>
              </select>
            </div>

            {/* Gust Factor, G */}
            {renderModeRow(
              'Gust Factor, G',
              'loading.wind_load.gust_factor.mode',
              'loading.wind_load.gust_factor.value',
              ['As per IRC 6', 'Custom']
            )}

            {/* Drag Coefficient, CD */}
            {renderModeRow(
              <>Drag Coefficient, C<sub>D</sub></>,
              'loading.wind_load.drag_coeff.mode',
              'loading.wind_load.drag_coeff.value',
              ['As per IRC 6', 'Custom']
            )}

            {/* Drag Coefficient against Live Load, CDLL */}
            {renderModeRow(
              <>Drag Coefficient against Live Load, C<sub>DLL</sub></>,
              'loading.wind_load.drag_coeff_ll.mode',
              'loading.wind_load.drag_coeff_ll.value',
              ['As per IRC 6', 'Custom']
            )}

            {/* Lift Coefficient, CL */}
            {renderModeRow(
              <>Lift Coefficient, C<sub>L</sub></>,
              'loading.wind_load.lift_coeff.mode',
              'loading.wind_load.lift_coeff.value',
              ['As per IRC 6', 'Custom']
            )}

            {/* Superstructure Area in Elevation, A1 (m²) */}
            {renderModeRow(
              <>Superstructure Area in Elevation, A<sub>1</sub> (m²)</>,
              'loading.wind_load.super_area_elev.mode',
              'loading.wind_load.super_area_elev.value',
              ['Automatic', 'Custom']
            )}

            {/* Superstructure Area in Plain, A3 (m²) */}
            {renderModeRow(
              <>Superstructure Area in Plain, A<sub>3</sub> (m²)</>,
              'loading.wind_load.super_area_plain.mode',
              'loading.wind_load.super_area_plain.value',
              ['Automatic', 'Custom']
            )}

            {/* Exposed Frontal Area of Live Load, A1LL (m²) */}
            {renderModeRow(
              <>Exposed Frontal Area of Live Load, A<sub>1LL</sub> (m²)</>,
              'loading.wind_load.exposed_frontal_area.mode',
              'loading.wind_load.exposed_frontal_area.value',
              ['Automatic', 'Custom']
            )}

            {/* Wind Load Eccentricity from Top of Deck (m) */}
            {renderModeRow(
              'Wind Load Eccentricity from Top of Deck (m)',
              'loading.wind_load.wind_ecc_deck.mode',
              'loading.wind_load.wind_ecc_deck.value',
              ['As per IRC 6', 'Custom']
            )}

            {/* Wind on Live Load Eccentricity from Top of Deck (m) */}
            {renderModeRow(
              'Wind on Live Load Eccentricity from Top of Deck (m)',
              'loading.wind_load.wind_ll_ecc.mode',
              'loading.wind_load.wind_ll_ecc.value',
              ['As per IRC 6', 'Custom']
            )}
          </div>
        </div>

        {/* Computed Values */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Computed Values
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Hourly Mean Wind Speed, V<sub>z</sub> (m/s)
              </label>
              <input type="text" readOnly value={vzStr} style={readOnlyInputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', color: '#000000' }}>
                Hourly Wind Pressure, P<sub>z</sub> (N/m²)
              </label>
              <input type="text" readOnly value={pzStr} style={readOnlyInputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Wind Load (WL)">
        <p style={{ margin: '0 0 8px 0' }}>
          Basic wind speed is auto-filled from the project location.
        </p>
        <p style={{ margin: '0 0 8px 0' }}>
          Hourly mean wind speed (Vz) and design wind pressure (Pz) are computed from the basic wind speed, average exposed height (H), terrain type, and site topography per IRC 6.
        </p>
        <p style={{ margin: '0 0 2px 0' }}>Wind forces computed per IRC 6 include:</p>
        <p style={{ margin: '0 0 1px 0' }}>- Transverse wind force on the structure</p>
        <p style={{ margin: '0 0 1px 0' }}>- Longitudinal wind force (typically 25% of transverse)</p>
        <p style={{ margin: '0 0 1px 0' }}>- Vertical (upward) wind force on the deck</p>
        <p style={{ margin: '0 0 8px 0' }}>- Transverse and longitudinal wind forces due to live load</p>
        <p style={{ margin: 0 }}>
          These forces use the gust factor (G), drag coefficient (CD), lift coefficient (CL), superstructure elevation area, plan area, and exposed frontal area of live load. They are applied at the specified eccentricity or as required by IRC 6.
        </p>
      </LoadDescriptionPanel>
    </div>
  );
};
