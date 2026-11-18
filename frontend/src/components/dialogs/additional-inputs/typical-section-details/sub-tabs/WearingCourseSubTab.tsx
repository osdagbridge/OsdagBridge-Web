import React from 'react';
import { useBridgeStore } from '../../../../../store/useBridgeStore';
import { inputStyle, readOnlyInputStyle } from '../../styles';

interface WearingCourseSubTabProps {
  railingOffset: number;
}

export const WearingCourseSubTab: React.FC<WearingCourseSubTabProps> = ({ railingOffset }) => {
  const { additionalInputs, updateAdditionalInput } = useBridgeStore();

  const wcMaterial = additionalInputs['typical_section.wearing_course.material'] ?? 'Concrete';
  const isWcCustom = wcMaterial === 'Custom';
  const wcDensity = additionalInputs['typical_section.wearing_course.density'] ?? (wcMaterial === 'Bituminous' ? 24.0 : 25.0);
  const wcThickness = additionalInputs['typical_section.wearing_course.thickness'] ?? 50.0;

  const handleWcMaterialChange = (newMat: string) => {
    updateAdditionalInput('typical_section.wearing_course.material', newMat);
    if (newMat === 'Concrete') {
      updateAdditionalInput('typical_section.wearing_course.density', 25.0);
    } else if (newMat === 'Bituminous') {
      updateAdditionalInput('typical_section.wearing_course.density', 24.0);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
      {/* Material */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: `${railingOffset}px`, flexShrink: 0 }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
            Material:
          </label>
        </div>
        <select
          value={wcMaterial}
          onChange={(e) => handleWcMaterialChange(e.target.value)}
          className="osdag-select-field"
          style={{
            ...inputStyle,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="Concrete">Concrete</option>
          <option value="Bituminous">Bituminous</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {/* Density (kN/m³) */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: `${railingOffset}px`, flexShrink: 0 }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
            Density (kN/m³):
          </label>
        </div>
        <input
          type={isWcCustom ? 'number' : 'text'}
          step="0.1"
          readOnly={!isWcCustom}
          value={isWcCustom ? wcDensity : (wcMaterial === 'Bituminous' ? '24.0' : '25.0')}
          onChange={(e) => updateAdditionalInput('typical_section.wearing_course.density', parseFloat(e.target.value))}
          style={isWcCustom ? inputStyle : readOnlyInputStyle}
        />
      </div>

      {/* Thickness (mm) */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: `${railingOffset}px`, flexShrink: 0 }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
            Thickness (mm):
          </label>
        </div>
        <input
          type="number"
          step="1"
          value={Number(wcThickness).toFixed(2)}
          onChange={(e) => updateAdditionalInput('typical_section.wearing_course.thickness', parseFloat(e.target.value))}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

