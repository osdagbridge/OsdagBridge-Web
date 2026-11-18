import React from 'react';

interface OsdagCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  ariaLabel?: string;
}

export const OsdagCheckbox: React.FC<OsdagCheckboxProps> = ({ checked, onChange, ariaLabel }) => {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          onChange(!checked);
        }
      }}
      style={{
        width: '15px',
        height: '15px',
        minWidth: '15px',
        minHeight: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #757575',
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 0,
        transition: 'border-color 0.1s ease',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#333333')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#757575')}
    >
      {checked && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          style={{ display: 'block' }}
        >
          <path
            d="M2 5.8L4.4 8.5L9.2 2.5"
            stroke="#7ea10a"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

