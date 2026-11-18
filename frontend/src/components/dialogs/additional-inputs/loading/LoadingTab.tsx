import React, { useState } from 'react';
import { PermanentLoadSubTab } from './sub-tabs/PermanentLoadSubTab';
import { LiveLoadSubTab } from './sub-tabs/LiveLoadSubTab';
import { SeismicLoadSubTab } from './sub-tabs/SeismicLoadSubTab';
import { WindLoadSubTab } from './sub-tabs/WindLoadSubTab';
import { TemperatureLoadSubTab } from './sub-tabs/TemperatureLoadSubTab';
import { LoadCombinationSubTab } from './sub-tabs/LoadCombinationSubTab';

export const LoadingTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const subTabs = [
    { label: 'Permanent Load', disabled: false },
    { label: 'Live Lo...', tooltip: 'Live Load', disabled: false },
    { label: 'Seismic Load', disabled: false },
    { label: 'Wind Load', disabled: false },
    { label: 'Temperature Load', disabled: false },
    { label: 'Custom Lo...', tooltip: 'Custom Load (coming soon)', disabled: true },
    { label: 'Load Combination', tooltip: 'Load Combination', disabled: false },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        margin: '0 14px 6px 14px',
        overflow: 'hidden',
      }}
    >
      {/* Sub-tabs bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#2b2b2b',
          border: '1px solid #c0c0c0',
          borderBottom: 'none',
          height: '32px',
          flexShrink: 0,
        }}
      >
        {subTabs.map((tab, idx) => {
          const isSelected = activeSubTab === idx;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.label}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && setActiveSubTab(idx)}
              title={tab.tooltip || tab.label}
              style={{
                padding: '0 16px',
                fontSize: '11.5px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
                border: 'none',
                borderRight: '1px solid #c0c0c0',
                backgroundColor: isSelected ? '#8cae11' : '#ffffff',
                color: isSelected ? '#ffffff' : isDisabled ? '#9e9e9e' : '#333333',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.1s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {tab.label}
            </button>
          );
        })}
        {/* Dark spacer filling the rest of the tab bar */}
        <div style={{ flex: 1 }} />
      </div>

      {/* Sub-tab content */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          border: '1px solid #c0c0c0',
          padding: '14px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {activeSubTab === 0 && <PermanentLoadSubTab />}
        {activeSubTab === 1 && <LiveLoadSubTab />}
        {activeSubTab === 2 && <SeismicLoadSubTab />}
        {activeSubTab === 3 && <WindLoadSubTab />}
        {activeSubTab === 4 && <TemperatureLoadSubTab />}
        {activeSubTab === 6 && <LoadCombinationSubTab />}
      </div>
    </div>
  );
};
