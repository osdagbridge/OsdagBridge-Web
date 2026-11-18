import React, { useState } from 'react';
import { useBridgeStore } from '../../../../store/useBridgeStore';
import { inputStyle } from '../styles';
import { LoadDescriptionPanel } from '../loading/sub-tabs/LoadDescriptionPanel';
import { SetBoundsModal } from './SetBoundsModal';

const REINFORCEMENT_MATERIALS = [
  'Fe 415',
  'Fe 415D',
  'Fe 500',
  'Fe 500D',
  'Fe 550',
  'Fe 550D',
  'Fe 600',
];

const SHEAR_STUD_DIAMETERS = ['12', '16', '20', '22', '25'];

const SHEAR_STUD_COUNTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const AnalysisDesignOptionsTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();
  const [isSetBoundsOpen, setIsSetBoundsOpen] = useState(false);

  // Construction Stages
  const includeDefaultStages =
    additionalInputs['design_options.construction_stages.include_default'] ?? 'Yes';

  // Deck Design
  const rebarLowerBound =
    additionalInputs['design_options.deck.rebar_lower_bound'] ?? '';
  const rebarUpperBound =
    additionalInputs['design_options.deck.rebar_upper_bound'] ?? '';
  const rebarMaterial =
    additionalInputs['design_options.deck.reinforcement_material'] ?? 'Fe 500';
  const topClearCover =
    additionalInputs['design_options.deck.top_clear_cover'] ?? '50';
  const bottomClearCover =
    additionalInputs['design_options.deck.bottom_clear_cover'] ?? '50';
  const sideClearCover =
    additionalInputs['design_options.deck.side_clear_cover'] ?? '50';

  // Shear Studs
  const yieldStrength =
    additionalInputs['design_options.shear_studs.yield_strength'] ?? '385';
  const ultimateStrength =
    additionalInputs['design_options.shear_studs.ultimate_strength'] ?? '495';
  const studDiameter =
    additionalInputs['design_options.shear_studs.diameter'] ?? '20';
  const studHeight =
    additionalInputs['design_options.shear_studs.height'] ?? '100';
  const studCount =
    additionalInputs['design_options.shear_studs.no_of_studs'] ?? '2';
  const transverseSpacing =
    additionalInputs['design_options.shear_studs.transverse_spacing'] ?? '100';

  const handleSaveBounds = (lower: string, upper: string) => {
    updateAdditionalInput('design_options.deck.rebar_lower_bound', lower);
    updateAdditionalInput('design_options.deck.rebar_upper_bound', upper);
  };

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

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        height: '100%',
        margin: '0 14px 6px 14px',
        gap: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Left Column: Input Cards */}
      <div
        className="hide-scrollbar"
        style={{
          flex: '1.2',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingRight: '2px',
          paddingBottom: '8px',
        }}
      >
        {/* Card 1: Construction Stages */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Construction Stages</div>
          <div style={rowStyle}>
            <label style={labelStyle}>Include default</label>
            <select
              value={includeDefaultStages}
              onChange={(e) =>
                updateAdditionalInput(
                  'design_options.construction_stages.include_default',
                  e.target.value
                )
              }
              className="osdag-select-field"
              style={fieldStyle}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Card 2: Deck Design */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Deck Design</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Reinforcement Size */}
            <div style={rowStyle}>
              <label style={labelStyle}>Reinforcement Size</label>
              <button
                type="button"
                onClick={() => setIsSetBoundsOpen(true)}
                style={{
                  width: '186px',
                  height: '24px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #757575',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#222222',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = '#e8e8e8')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = '#f5f5f5')
                }
              >
                Set Bounds
              </button>
            </div>

            {/* Reinforcement Material */}
            <div style={rowStyle}>
              <label style={labelStyle}>Reinforcement Material</label>
              <select
                value={rebarMaterial}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.deck.reinforcement_material',
                    e.target.value
                  )
                }
                className="osdag-select-field"
                style={fieldStyle}
              >
                {REINFORCEMENT_MATERIALS.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            {/* Top Clear Cover (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Top Clear Cover (mm)</label>
              <input
                type="text"
                value={topClearCover}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.deck.top_clear_cover',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>

            {/* Bottom Clear Cover (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Bottom Clear Cover (mm)</label>
              <input
                type="text"
                value={bottomClearCover}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.deck.bottom_clear_cover',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>

            {/* Side Clear Cover (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Side Clear Cover (mm)</label>
              <input
                type="text"
                value={sideClearCover}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.deck.side_clear_cover',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Shear Studs */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Shear Studs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Yield Strength (MPa) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Yield Strength (MPa)</label>
              <input
                type="text"
                value={yieldStrength}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.yield_strength',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>

            {/* Ultimate Strength (MPa) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Ultimate Strength (MPa)</label>
              <input
                type="text"
                value={ultimateStrength}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.ultimate_strength',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>

            {/* Diameter (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Diameter (mm)</label>
              <select
                value={studDiameter}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.diameter',
                    e.target.value
                  )
                }
                className="osdag-select-field"
                style={fieldStyle}
              >
                {SHEAR_STUD_DIAMETERS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Height (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Height (mm)</label>
              <input
                type="text"
                value={studHeight}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.height',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>

            {/* No. of Shear Studs per Section */}
            <div style={rowStyle}>
              <label style={labelStyle}>No. of Shear Studs per Section</label>
              <select
                value={studCount}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.no_of_studs',
                    e.target.value
                  )
                }
                className="osdag-select-field"
                style={fieldStyle}
              >
                {SHEAR_STUD_COUNTS.map((cnt) => (
                  <option key={cnt} value={cnt}>
                    {cnt}
                  </option>
                ))}
              </select>
            </div>

            {/* Transverse Spacing (mm) */}
            <div style={rowStyle}>
              <label style={labelStyle}>Transverse Spacing (mm)</label>
              <input
                type="text"
                value={transverseSpacing}
                onChange={(e) =>
                  updateAdditionalInput(
                    'design_options.shear_studs.transverse_spacing',
                    e.target.value
                  )
                }
                style={fieldStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Construction Stages">
        <p style={{ margin: '0 0 10px 0' }}>
          When included ('Yes'), the analysis accounts for three stages.
          <br />
          In Stage 1, the steel girder carries its self-weight alone.
          <br />
          In Stage 2, the wet concrete deck load (DD) and the weight of other structural
          steel components act on the bare steel section before composite action is
          activated.
          <br />
          In Stage 3, composite action is fully active, and all remaining loads
          (superimposed dead load, live load, wind load, seismic load, and temperature load)
          are applied to the composite section.
          <br />
          Stages 1 and 2 are critical for lateral-torsional buckling (LTB) checks, as the
          compression flange is unrestrained until the deck provides lateral support.
        </p>
        <p style={{ margin: 0 }}>
          When 'No' is selected, only the final composite state is checked and no
          separate construction-stage verification is performed.
        </p>
      </LoadDescriptionPanel>

      {/* Set Bounds Modal */}
      <SetBoundsModal
        isOpen={isSetBoundsOpen}
        onClose={() => setIsSetBoundsOpen(false)}
        lowerBound={rebarLowerBound}
        upperBound={rebarUpperBound}
        onSave={handleSaveBounds}
      />
    </div>
  );
};
