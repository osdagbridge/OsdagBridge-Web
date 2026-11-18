import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useBridgeStore } from '../../../../store/useBridgeStore';
import { CrossSectionPreview } from './CrossSectionPreview';
import { DeckDetailsSubTab } from './sub-tabs/DeckDetailsSubTab';
import { CrashBarrierSubTab } from './sub-tabs/CrashBarrierSubTab';
import { MedianSubTab } from './sub-tabs/MedianSubTab';
import { RailingSubTab } from './sub-tabs/RailingSubTab';
import { WearingCourseSubTab } from './sub-tabs/WearingCourseSubTab';
import { inputStyle, readOnlyInputStyle } from '../styles';

interface TypicalSectionDetailsTabProps {
  dialogSize: { width: number; height: number };
}

export const TypicalSectionDetailsTab: React.FC<TypicalSectionDetailsTabProps> = ({ dialogSize }) => {
  const {
    inputs,
    additionalInputs,
    updateAdditionalInput,
    recomputeLayout,
    isAdditionalInputsOpen,
  } = useBridgeStore();

  const [activeSubTab, setActiveSubTab] = useState(0);

  const numGirders = Number(additionalInputs['typical_section.no_of_girders'] ?? 4);
  const girderSpacing = Number(additionalInputs['typical_section.girder_spacing'] ?? 1.98);
  const deckOverhang = Number(additionalInputs['typical_section.deck_overhang'] ?? 0.99);
  const overallBridgeWidth = Number(additionalInputs['typical_section.overall_bridge_width'] ?? 7.90);

  const includeMedian = inputs['geometry.include_median'] === 'Yes';
  const footpathSetting = inputs['geometry.footpath'] ?? 'None';
  const hasFootpath = footpathSetting === 'Single Side' || footpathSetting === 'Both Sides';

  const [adjustmentMessage, setAdjustmentMessage] = useState<string | null>(
    'Values adjusted: overhang 1.16 -> 0.98'
  );
  const lastOverhangRef = useRef<number>(deckOverhang);

  useEffect(() => {
    if (lastOverhangRef.current !== deckOverhang && lastOverhangRef.current > 0) {
      setAdjustmentMessage(
        `Values adjusted: overhang ${lastOverhangRef.current.toFixed(2)} -> ${deckOverhang.toFixed(2)}`
      );
    }
    lastOverhangRef.current = deckOverhang;
  }, [deckOverhang]);

  const railingTabRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [railingOffset, setRailingOffset] = useState<number>(450);

  useLayoutEffect(() => {
    const updateOffset = () => {
      if (cardRef.current && railingTabRef.current) {
        const cRect = cardRef.current.getBoundingClientRect();
        const rRect = railingTabRef.current.getBoundingClientRect();
        const offset = Math.round(rRect.left - cRect.left - 18);
        if (offset > 150) setRailingOffset(offset);
      }
    };
    updateOffset();
    const timer = setTimeout(updateOffset, 50);
    window.addEventListener('resize', updateOffset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateOffset);
    };
  }, [dialogSize, activeSubTab, isAdditionalInputsOpen]);

  const typicalSubTabs = [
    { label: 'Deck Details', disabled: false },
    { label: 'Crash Barrier', disabled: false },
    { label: 'Median', disabled: !includeMedian },
    { label: 'Railing', disabled: !hasFootpath },
    { label: 'Wearing Course', disabled: false },
    { label: 'Lane Details', disabled: true },
  ];

  const handleGirderChange = (valStr: string) => {
    const val = parseInt(valStr, 10);
    if (!isNaN(val) && val >= 2) {
      updateAdditionalInput('typical_section.no_of_girders', val);
      recomputeLayout('girders', val);
    }
  };

  const handleSpacingChange = (valStr: string) => {
    const val = parseFloat(valStr);
    if (!isNaN(val) && val > 0) {
      updateAdditionalInput('typical_section.girder_spacing', val);
      recomputeLayout('spacing', val);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* CAD Cross-Section Graphic Preview */}
      <div
        style={{
          margin: '0 14px 6px 14px',
          border: '1px solid #c0c0c0',
          borderRadius: '6px',
          flex: 1,
          minHeight: '200px',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CrossSectionPreview />
      </div>

      {/* Inputs Group Box */}
      <div
        className="card-scroll"
        style={{
          margin: '4px 14px 6px 14px',
          border: '1px solid #c0c0c0',
          borderRadius: '6px',
          padding: '10px 16px 12px 16px',
          backgroundColor: '#ffffff',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', marginBottom: '8px' }}>
          Inputs:
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '32px',
            rowGap: '8px',
          }}
        >
          {/* No. of Girders */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
              No. of Girders:
            </label>
            <input
              type="number"
              min="2"
              step="1"
              value={numGirders || ''}
              onChange={(e) => handleGirderChange(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Girder Spacing */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
              Girder Spacing (m):
            </label>
            <input
              type="number"
              step="0.01"
              value={girderSpacing ? girderSpacing.toFixed(2) : ''}
              onChange={(e) => handleSpacingChange(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Deck Overhang Width */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
              Deck Overhang Width (m):
            </label>
            <input
              type="text"
              readOnly
              value={deckOverhang ? deckOverhang.toFixed(2) : ''}
              style={readOnlyInputStyle}
            />
          </div>

          {/* Overall Bridge Width */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '12px', color: '#000000', minWidth: '160px' }}>
              Overall Bridge Width (m):
            </label>
            <input
              type="text"
              readOnly
              value={overallBridgeWidth ? overallBridgeWidth.toFixed(2) : ''}
              style={readOnlyInputStyle}
            />
          </div>

          {/* Adjustment Notice */}
          {adjustmentMessage && (
            <>
              <div />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '-2px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontStyle: 'italic',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                    textAlign: 'right',
                    lineHeight: 1.2,
                  }}
                >
                  {adjustmentMessage}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sub-Tabs Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
            marginTop: '16px',
            position: 'relative',
            zIndex: 2,
            marginBottom: '-1px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#eaeaea',
              border: '1px solid #c0c0c0',
              borderBottom: 'none',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {typicalSubTabs.map((st, idx) => {
              const isSelected = activeSubTab === idx;
              const isDisabled = st.disabled;
              return (
                <button
                  key={st.label}
                  ref={st.label === 'Railing' ? railingTabRef : undefined}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setActiveSubTab(idx)}
                  style={{
                    padding: '6px 18px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRight: idx < typicalSubTabs.length - 1 ? '1px solid #c0c0c0' : 'none',
                    borderBottom: isSelected ? 'none' : '1px solid #c0c0c0',
                    backgroundColor: isSelected ? '#8cae11' : isDisabled ? '#f2f2f2' : '#eaeaea',
                    color: isSelected ? '#ffffff' : isDisabled ? '#a8a8a8' : '#333333',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    transition: 'background-color 0.1s',
                  }}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-Tab Inner Card */}
        <div
          ref={cardRef}
          style={{
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            padding: '12px 18px',
            marginTop: '0px',
            backgroundColor: '#ffffff',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {activeSubTab === 0 && <DeckDetailsSubTab />}
          {activeSubTab === 1 && <CrashBarrierSubTab railingOffset={railingOffset} />}
          {activeSubTab === 2 && <MedianSubTab />}
          {activeSubTab === 3 && <RailingSubTab />}
          {activeSubTab === 4 && <WearingCourseSubTab railingOffset={railingOffset} />}
        </div>
      </div>
    </div>
  );
};

