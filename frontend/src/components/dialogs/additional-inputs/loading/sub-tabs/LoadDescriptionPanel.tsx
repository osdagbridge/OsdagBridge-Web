import React from 'react';

interface LoadDescriptionPanelProps {
  title: string;
  children: React.ReactNode;
}

export const LoadDescriptionPanel: React.FC<LoadDescriptionPanelProps> = ({ title, children }) => {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        height: '100%',
        backgroundColor: '#c8c8c8',
        border: '1px solid #b5b5b5',
        borderRadius: '6px',
        padding: '12px 14px',
        overflowY: 'auto',
        boxSizing: 'border-box',
        fontSize: '11px',
        color: '#000000',
        lineHeight: 1.38,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#000000',
          marginBottom: '10px',
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

