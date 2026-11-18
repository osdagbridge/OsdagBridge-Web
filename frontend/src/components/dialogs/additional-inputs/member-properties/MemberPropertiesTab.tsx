import React from 'react';
import { useBridgeStore } from '../../../../store/useBridgeStore';
import { inputStyle } from '../styles';

export const MemberPropertiesTab: React.FC = () => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  return (
    <div
      style={{
        margin: '0 14px 6px 14px',
        padding: '16px',
        border: '1px solid #c0c0c0',
        borderTop: 'none',
        borderRadius: '0 0 6px 6px',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#222', marginBottom: '12px' }}>
        Member Properties (Girder Details, Stiffener Details, Cross Bracing, End Diaphragm)
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '32px', rowGap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '12px', color: '#000' }}>Web Type:</label>
          <select
            value={additionalInputs['member_properties.girder_details.section_input.web_type.G1.M1'] ?? 'Thin Web with ITS'}
            onChange={(e) => updateAdditionalInput('member_properties.girder_details.section_input.web_type.G1.M1', e.target.value)}
            style={inputStyle}
          >
            <option value="Thin Web with ITS">Thin Web with ITS</option>
            <option value="Thick Web without ITS">Thick Web without ITS</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '12px', color: '#000' }}>Support Type:</label>
          <select
            value={additionalInputs['member_properties.girder_details.section_inputs.support_type.G1.M1'] ?? 'Major Laterally Supported'}
            onChange={(e) => updateAdditionalInput('member_properties.girder_details.section_inputs.support_type.G1.M1', e.target.value)}
            style={inputStyle}
          >
            <option value="Major Laterally Supported">Major Laterally Supported</option>
            <option value="Laterally Unsupported">Laterally Unsupported</option>
          </select>
        </div>
      </div>
    </div>
  );
};
