import React from 'react';
import { useBridgeStore } from '../../../../store/useBridgeStore';
import { inputStyle } from '../styles';
import { LoadDescriptionPanel } from '../loading/sub-tabs/LoadDescriptionPanel';
import { OsdagCheckbox } from '../OsdagCheckbox';

export const DesignOptionsContTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  // Partial Factors
  const concreteBasic =
    additionalInputs['design_options_cont.partial_factor.concrete_basic'] ?? '1.50';
  const concreteAccidental =
    additionalInputs['design_options_cont.partial_factor.concrete_accidental'] ?? '1.20';
  const steelYielding =
    additionalInputs['design_options_cont.partial_factor.steel_yielding'] ?? '1.10';
  const steelUltimate =
    additionalInputs['design_options_cont.partial_factor.steel_ultimate'] ?? '1.25';
  const reinforcingSteel =
    additionalInputs['design_options_cont.partial_factor.reinforcing_steel'] ?? '1.15';
  const shearConnectors =
    additionalInputs['design_options_cont.partial_factor.shear_connectors'] ?? '1.25';
  const fatigueLoad =
    additionalInputs['design_options_cont.partial_factor.fatigue_load'] ?? '1.00';
  const fatigueStrength =
    additionalInputs['design_options_cont.partial_factor.fatigue_strength'] ?? '1.35';

  // Resistance to Fatigue
  const loadCycles =
    additionalInputs['design_options_cont.fatigue.number_of_cycles'] ?? '2000000';

  // Deflection Control
  const camberMode =
    additionalInputs['design_options_cont.deflection.camber.mode'] ?? 'Default';
  const camberCustomVal =
    additionalInputs['design_options_cont.deflection.camber.value'] ?? '';

  // Limit States Checkboxes (Default: all true)
  const isULS_Bending =
    additionalInputs['design_options_cont.limit_states.bending_resistance'] ?? true;
  const isULS_VerticalShear =
    additionalInputs['design_options_cont.limit_states.vertical_shear'] ?? true;
  const isULS_LTB =
    additionalInputs['design_options_cont.limit_states.ltb'] ?? true;
  const isULS_Transverse =
    additionalInputs['design_options_cont.limit_states.transverse_force'] ?? true;
  const isULS_LongShear =
    additionalInputs['design_options_cont.limit_states.longitudinal_shear'] ?? true;
  const isULS_Fatigue =
    additionalInputs['design_options_cont.limit_states.fatigue'] ?? true;

  const isSLS_Stress =
    additionalInputs['design_options_cont.limit_states.stress_limitation'] ?? true;
  const isSLS_LongShear =
    additionalInputs['design_options_cont.limit_states.longitudinal_shear_sls'] ?? true;
  const isSLS_Deflection =
    additionalInputs['design_options_cont.limit_states.deflection_control'] ?? true;
  const isSLS_Crack =
    additionalInputs['design_options_cont.limit_states.crack_width'] ?? true;

  const cardStyle: React.CSSProperties = {
    border: '1px solid #c0c0c0',
    borderRadius: '6px',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '10px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#000000',
  };

  const fieldStyle: React.CSSProperties = {
    ...inputStyle,
    width: '186px',
  };

  const fieldsetStyle: React.CSSProperties = {
    border: '1px solid #757575',
    borderRadius: '6px',
    padding: '8px 14px 12px 14px',
    flex: 1,
    minWidth: 0,
    backgroundColor: '#ffffff',
  };

  const legendStyle: React.CSSProperties = {
    fontSize: '11.5px',
    fontWeight: 'bold',
    color: '#000000',
    padding: '0 6px',
  };

  const renderCheckboxRow = (
    label: string,
    key: string,
    val: boolean,
    onToggle: () => void
  ) => (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '3px 0',
        cursor: 'pointer',
      }}
    >
      <OsdagCheckbox checked={Boolean(val)} onChange={onToggle} ariaLabel={label} />
      <span
        style={{
          fontSize: '11.5px',
          color: '#000000',
          userSelect: 'none',
          fontFamily: 'inherit',
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="hide-scrollbar"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100%',
        margin: '0 14px 6px 14px',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        paddingBottom: '8px',
      }}
    >
      {/* Top Section: Left cards + Right Description Panel */}
      <div style={{ display: 'flex', gap: '16px', minHeight: 0, flexShrink: 0 }}>
        {/* Left Column (Cards) */}
        <div
          style={{
            flex: '1.2',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Card 1: Partial Factor */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Partial Factor</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={rowStyle}>
                <label style={labelStyle}>
                  Concrete basic & seismic, γ<sub>c</sub>
                </label>
                <input
                  type="text"
                  value={concreteBasic}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.concrete_basic',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Concrete Accidental, γ<sub>c</sub>
                </label>
                <input
                  type="text"
                  value={concreteAccidental}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.concrete_accidental',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Structural steel for Yielding and Buckling, γ<sub>M0</sub>
                </label>
                <input
                  type="text"
                  value={steelYielding}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.steel_yielding',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Structural Steel For Ultimate Stress, γ<sub>M1</sub>
                </label>
                <input
                  type="text"
                  value={steelUltimate}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.steel_ultimate',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Reinforcing Steel, γ<sub>s</sub>
                </label>
                <input
                  type="text"
                  value={reinforcingSteel}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.reinforcing_steel',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Shear Connectors For Yield, γ<sub>v</sub>
                </label>
                <input
                  type="text"
                  value={shearConnectors}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.shear_connectors',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Fatigue Load, γ<sub>Ff</sub>
                </label>
                <input
                  type="text"
                  value={fatigueLoad}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.fatigue_load',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>
                  Fatigue Strength, γ<sub>Mf, f</sub>
                </label>
                <input
                  type="text"
                  value={fatigueStrength}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.partial_factor.fatigue_strength',
                      e.target.value
                    )
                  }
                  style={fieldStyle}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Resistance to Fatigue */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Resistance to Fatigue</div>
            <div style={rowStyle}>
              <label style={labelStyle}>Number of Load Cycles</label>
              <input
                type="text"
                value={loadCycles}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options_cont.fatigue.number_of_cycles',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Card 3: Deflection Control */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Deflection Control</div>
            <div style={rowStyle}>
              <label style={labelStyle}>Camber (mm)</label>
              <div
                style={{
                  width: '186px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'flex-end',
                }}
              >
                <select
                  value={camberMode}
                  onChange={(e) =>
                    updateAdditionalInput(
                      'design_options_cont.deflection.camber.mode',
                      e.target.value
                    )
                  }
                  className="osdag-select-field"
                  style={{
                    ...inputStyle,
                    width: camberMode === 'Custom' ? '105px' : '186px',
                  }}
                >
                  <option value="Default">Default</option>
                  <option value="Custom">Custom</option>
                </select>

                {camberMode === 'Custom' && (
                  <input
                    type="text"
                    value={camberCustomVal}
                    onChange={(e) =>
                      updateAdditionalInput(
                        'design_options_cont.deflection.camber.value',
                        e.target.value
                      )
                    }
                    placeholder="0 - 4000"
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

        {/* Right Column (Description Panel) */}
        <LoadDescriptionPanel title="Design Options">
          <p style={{ margin: '0 0 10px 0' }}>
            Default values for partial factors are per IRC 22, and the default number of
            fatigue load cycles is per IRC 6.
          </p>
          <p style={{ margin: '0 0 10px 0' }}>
            Deflection limits per IRC 6: L/800 for live load alone, L/600 for DL+LL.
          </p>
          <p style={{ margin: '0 0 2px 0' }}>Camber operates in two modes:</p>
          <p style={{ margin: '0 0 4px 0' }}>
            • Default — camber equals the dead load deflection, where DL comprises
            self-weight (SW), dead load on steel (DC), deck dead load (DD), and
            superimposed dead load (SIDL), excluding the wearing surface (DW).
          </p>
          <p style={{ margin: 0 }}>
            • Custom — the user specifies the camber value directly.
          </p>
        </LoadDescriptionPanel>
      </div>

      {/* Bottom Section: Limit States */}
      <div style={{ marginTop: '14px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8px',
          }}
        >
          Limit States
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Group 1: Ultimate Limit States */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Ultimate Limit States</legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {renderCheckboxRow(
                'Bending Resistance',
                'design_options_cont.limit_states.bending_resistance',
                Boolean(isULS_Bending),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.bending_resistance',
                    !isULS_Bending
                  )
              )}
              {renderCheckboxRow(
                'Resistance to Vertical Shear',
                'design_options_cont.limit_states.vertical_shear',
                Boolean(isULS_VerticalShear),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.vertical_shear',
                    !isULS_VerticalShear
                  )
              )}
              {renderCheckboxRow(
                'Resistance to Lateral-torsional Buckling',
                'design_options_cont.limit_states.ltb',
                Boolean(isULS_LTB),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.ltb',
                    !isULS_LTB
                  )
              )}
              {renderCheckboxRow(
                'Resistance to Transverse force',
                'design_options_cont.limit_states.transverse_force',
                Boolean(isULS_Transverse),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.transverse_force',
                    !isULS_Transverse
                  )
              )}
              {renderCheckboxRow(
                'Resistance to Longitudinal Shear',
                'design_options_cont.limit_states.longitudinal_shear',
                Boolean(isULS_LongShear),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.longitudinal_shear',
                    !isULS_LongShear
                  )
              )}
              {renderCheckboxRow(
                'Resistance to Fatigue',
                'design_options_cont.limit_states.fatigue',
                Boolean(isULS_Fatigue),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.fatigue',
                    !isULS_Fatigue
                  )
              )}
            </div>
          </fieldset>

          {/* Group 2: Serviceability Limit States */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Serviceability Limit States</legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {renderCheckboxRow(
                'Stress Limitation',
                'design_options_cont.limit_states.stress_limitation',
                Boolean(isSLS_Stress),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.stress_limitation',
                    !isSLS_Stress
                  )
              )}
              {renderCheckboxRow(
                'Longitudinal Shear (SLS)',
                'design_options_cont.limit_states.longitudinal_shear_sls',
                Boolean(isSLS_LongShear),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.longitudinal_shear_sls',
                    !isSLS_LongShear
                  )
              )}
              {renderCheckboxRow(
                'Deflection Control',
                'design_options_cont.limit_states.deflection_control',
                Boolean(isSLS_Deflection),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.deflection_control',
                    !isSLS_Deflection
                  )
              )}
              {renderCheckboxRow(
                'Crack Width Check',
                'design_options_cont.limit_states.crack_width',
                Boolean(isSLS_Crack),
                () =>
                  updateAdditionalInput(
                    'design_options_cont.limit_states.crack_width',
                    !isSLS_Crack
                  )
              )}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
