import React from 'react';

export const inputStyle: React.CSSProperties = {
  width: '186px',
  height: '26px',
  padding: '2px 8px',
  border: '1px solid #000000',
  borderRadius: '6px',
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
};

export const readOnlyInputStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundColor: '#f2f2f2',
  color: '#000000',
  cursor: 'not-allowed',
};

export const actionBtnStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#2f2f2f',
  fontWeight: 600,
  fontSize: '12px',
  border: '1px solid #8c8c8c',
  borderRadius: '4px',
  padding: '6px 38px',
  minWidth: '125px',
  cursor: 'pointer',
  transition: 'background-color 0.1s ease',
};

