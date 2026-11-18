import React, { useState } from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { LoadDescriptionPanel } from './LoadDescriptionPanel';
import { OsdagCheckbox } from '../../OsdagCheckbox';
import { AddLoadCombinationModal } from './AddLoadCombinationModal';

interface CombinationItem {
  id: string;
  name: string;
  expr: string;
}

const DEFAULT_COMBINATIONS: CombinationItem[] = [
  { id: 'Basic_1', name: 'Basic_1', expr: '1.35DL + 1.75DW + 1.5LL + 0.9WL + 0.9TL' },
  { id: 'Basic_2', name: 'Basic_2', expr: '1.0DL + 1.0DW + 1.5LL + 0.9WL + 0.9TL' },
  { id: 'Basic_3', name: 'Basic_3', expr: '1.35DL + 1.75DW + 1.15LL + 1.5WL + 0.9TL' },
  { id: 'Basic_4', name: 'Basic_4', expr: '1.0DL + 1.0DW + 1.15LL + 1.5WL + 0.9TL' },
  { id: 'Basic_5', name: 'Basic_5', expr: '1.35DL + 1.75DW + 1.15LL + 0.9WL + 1.5TL' },
  { id: 'Basic_6', name: 'Basic_6', expr: '1.0DL + 1.0DW + 1.15LL + 0.9WL + 1.5TL' },
  { id: 'Accidental_1', name: 'Accidental_1', expr: '1.0DL + 1.0DW + 0.75LL + 0.5TL + 1.0VC' },
  { id: 'Accidental_2', name: 'Accidental_2', expr: '1.0DL + 1.0DW + 0.75LL + 0.5TL + 1.0BI' },
  { id: 'Accidental_3', name: 'Accidental_3', expr: '1.0DL + 1.0DW + 0.75LL + 0.5TL + 1.0FB' },
  { id: 'Seismic_1', name: 'Seismic_1', expr: '1.35DL + 1.75DW + 0.2LL + 0.5TL + 1.5EL' },
  { id: 'Seismic_2', name: 'Seismic_2', expr: '1.0DL + 1.0DW + 0.2LL + 0.5TL + 1.5EL' },
  { id: 'Seismic_3', name: 'Seismic_3', expr: '1.35DL + 1.75DW + 0.2LL + 0.5TL + 0.75EL' },
  { id: 'Seismic_4', name: 'Seismic_4', expr: '1.0DL + 1.0DW + 0.2LL + 0.5TL + 0.75EL' },
  { id: 'Rare_1', name: 'Rare_1', expr: '1.0DL + 1.2DW + 1.0LL + 0.6WL + 0.6TL' },
  { id: 'Rare_2', name: 'Rare_2', expr: '1.0DL + 1.0DW + 1.0LL + 0.6WL + 0.6TL' },
  { id: 'Rare_3', name: 'Rare_3', expr: '1.0DL + 1.2DW + 0.75LL + 1.0WL + 0.6TL' },
  { id: 'Rare_4', name: 'Rare_4', expr: '1.0DL + 1.0DW + 0.75LL + 1.0WL + 0.6TL' },
  { id: 'Rare_5', name: 'Rare_5', expr: '1.0DL + 1.2DW + 0.75LL + 0.6WL + 1.0TL' },
  { id: 'Rare_6', name: 'Rare_6', expr: '1.0DL + 1.0DW + 0.75LL + 0.6WL + 1.0TL' },
  { id: 'Frequent_1', name: 'Frequent_1', expr: '1.0DL + 1.2DW + 0.75LL + 0.5WL + 0.5TL' },
  { id: 'Frequent_2', name: 'Frequent_2', expr: '1.0DL + 1.0DW + 0.75LL + 0.5WL + 0.5TL' },
  { id: 'Frequent_3', name: 'Frequent_3', expr: '1.0DL + 1.2DW + 0.2LL + 0.6WL + 0.5TL' },
  { id: 'Frequent_4', name: 'Frequent_4', expr: '1.0DL + 1.0DW + 0.2LL + 0.6WL + 0.5TL' },
  { id: 'Frequent_5', name: 'Frequent_5', expr: '1.0DL + 1.2DW + 0.2LL + 0.5WL + 0.6TL' },
  { id: 'Frequent_6', name: 'Frequent_6', expr: '1.0DL + 1.0DW + 0.2LL + 0.5WL + 0.6TL' },
  { id: 'Quasi-Permanent_1', name: 'Quasi-Permanent_1', expr: '1.0DL + 1.2DW + 0.5TL' },
  { id: 'Quasi-Permanent_2', name: 'Quasi-Permanent_2', expr: '1.0DL + 1.0DW + 0.5TL' },
];

export const LoadCombinationSubTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const customCombos: CombinationItem[] =
    additionalInputs['loading.load_combination.custom_combos'] || [];

  const handleToggle = (comboId: string, currentVal: boolean) => {
    updateAdditionalInput(`loading.load_combination.${comboId}`, !currentVal);
  };

  const handleSaveCustom = (newCombo: { name: string; expr: string }) => {
    const id = newCombo.name;
    const updatedList = [
      ...customCombos.filter((c) => c.name !== newCombo.name),
      { id, name: newCombo.name, expr: newCombo.expr },
    ];
    updateAdditionalInput('loading.load_combination.custom_combos', updatedList);
    updateAdditionalInput(`loading.load_combination.${id}`, true);
  };

  return (
    <div style={{ display: 'flex', gap: '16px', height: '100%', minHeight: 0 }}>
      {/* Left Column */}
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
        {/* Load Combinations from IRC 6 */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '10px' }}>
            Load Combinations from IRC 6
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {DEFAULT_COMBINATIONS.map((c) => {
              const checked = additionalInputs[`loading.load_combination.${c.id}`] ?? true;
              return (
                <div
                  key={c.id}
                  onClick={() => handleToggle(c.id, Boolean(checked))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    transition: 'background-color 0.1s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f7f7f7')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                >
                  <label
                    style={{
                      fontSize: '11.5px',
                      color: '#000000',
                      cursor: 'pointer',
                      userSelect: 'none',
                      fontFamily: 'inherit',
                      paddingRight: '12px',
                    }}
                  >
                    {c.name} : {c.expr}
                  </label>
                  <div style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <OsdagCheckbox
                      checked={Boolean(checked)}
                      onChange={() => handleToggle(c.id, Boolean(checked))}
                      ariaLabel={c.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Custom Combination Box */}
        <div
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
          }}
        >
          <button
            type="button"
            onClick={() => setIsAddingCustom(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #757575',
              borderRadius: '4px',
              padding: '5px 14px',
              fontSize: '11.5px',
              fontWeight: 600,
              color: '#333333',
              cursor: 'pointer',
              transition: 'background-color 0.1s ease',
              marginBottom: customCombos.length > 0 ? '12px' : 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
          >
            Add Custom Combination
          </button>

          {/* Custom combinations created by user - displayed in this bottom card */}
          {customCombos.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {customCombos.map((c) => {
                const checked = additionalInputs[`loading.load_combination.${c.id}`] ?? true;
                const displayText = c.expr && c.expr !== c.name ? `${c.name} : ${c.expr}` : c.name;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleToggle(c.id, Boolean(checked))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '4px 2px',
                      cursor: 'pointer',
                      borderRadius: '3px',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f7f7f7')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                  >
                    <label
                      style={{
                        fontSize: '11.5px',
                        color: '#000000',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontFamily: 'inherit',
                        paddingRight: '12px',
                      }}
                    >
                      {displayText}
                    </label>
                    <div style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <OsdagCheckbox
                        checked={Boolean(checked)}
                        onChange={() => handleToggle(c.id, Boolean(checked))}
                        ariaLabel={c.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Load Combination Dialog */}
      <AddLoadCombinationModal
        isOpen={isAddingCustom}
        onClose={() => setIsAddingCustom(false)}
        onSave={handleSaveCustom}
      />

      {/* Right Column: Description Panel */}
      <LoadDescriptionPanel title="Load Combinations (IRC 6)">
        <p style={{ margin: '0 0 2px 0' }}>
          Load combinations are formed per IRC 6 Table B.1. The following load cases are considered:
        </p>
        <p style={{ margin: '0 0 1px 0' }}>SW: Self-weight of steel girder</p>
        <p style={{ margin: '0 0 1px 0' }}>
          DC: Weight of structural steel components other than the girder, including cross bracing and end diaphragms
        </p>
        <p style={{ margin: '0 0 1px 0' }}>DD: Deck weight</p>
        <p style={{ margin: '0 0 1px 0' }}>DW: Wearing course</p>
        <p style={{ margin: '0 0 1px 0' }}>SIDL: Crash barriers, median, railing</p>
        <p style={{ margin: '0 0 1px 0' }}>LL: Live load</p>
        <p style={{ margin: '0 0 1px 0' }}>WL: Wind load</p>
        <p style={{ margin: '0 0 1px 0' }}>EL: Seismic / earthquake load</p>
        <p style={{ margin: '0 0 8px 0' }}>TL: Temperature load</p>

        <p style={{ margin: '0 0 2px 0' }}>IRC 6 combination types:</p>
        <p style={{ margin: '0 0 1px 0' }}>- Basic combination</p>
        <p style={{ margin: '0 0 1px 0' }}>- Accidental combination</p>
        <p style={{ margin: '0 0 1px 0' }}>- Seismic combination</p>
        <p style={{ margin: '0 0 1px 0' }}>- Frequent combination</p>
        <p style={{ margin: '0 0 1px 0' }}>- Rare combination</p>
        <p style={{ margin: '0 0 8px 0' }}>- Quasi-permanent combination</p>

        <p style={{ margin: 0 }}>
          Custom load combinations with user-defined partial safety factors can also be added.
        </p>
      </LoadDescriptionPanel>
    </div>
  );
};

