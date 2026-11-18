import React, { useState, useEffect } from 'react';

interface SetBoundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lowerBound: string;
  upperBound: string;
  onSave: (lower: string, upper: string) => void;
}

export const SetBoundsModal: React.FC<SetBoundsModalProps> = ({
  isOpen,
  onClose,
  lowerBound,
  upperBound,
  onSave,
}) => {
  const [lower, setLower] = useState(lowerBound || '');
  const [upper, setUpper] = useState(upperBound || '');

  useEffect(() => {
    if (isOpen) {
      setLower(lowerBound || '');
      setUpper(upperBound || '');
    }
  }, [isOpen, lowerBound, upperBound]);

  if (!isOpen) return null;

  const handleOK = () => {
    onSave(lower.trim(), upper.trim());
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10005,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '370px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          border: '1.5px solid #8cae11',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'inherit',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: '32px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            borderBottom: '2px solid #8cae11',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/vectors/Osdag_logo.svg"
              alt="Osdag"
              width={18}
              height={18}
              style={{ display: 'block', pointerEvents: 'none' }}
            />
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#000000' }}>
              Set Bounds
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#000000',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '2px 6px',
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '22px 24px 18px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Lower Bound */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#000000' }}>
              Lower Bound:
            </label>
            <input
              type="text"
              value={lower}
              placeholder="Min: 8.00"
              onChange={(e) => setLower(e.target.value)}
              style={{
                width: '145px',
                height: '30px',
                padding: '2px 10px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1.5px solid #8cae11',
                borderRadius: '6px',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#000000',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Upper Bound */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#000000' }}>
              Upper Bound:
            </label>
            <input
              type="text"
              value={upper}
              placeholder="Max: 40.00"
              onChange={(e) => setUpper(e.target.value)}
              style={{
                width: '145px',
                height: '30px',
                padding: '2px 10px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1.5px solid #c0c0c0',
                borderRadius: '6px',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#000000',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '78px',
                height: '30px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #000000',
                borderRadius: '6px',
                color: '#000000',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2f2f2')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOK}
              style={{
                width: '60px',
                height: '30px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #000000',
                borderRadius: '6px',
                color: '#000000',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2f2f2')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

