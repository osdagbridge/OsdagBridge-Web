/**
 * InputErrorDialog.tsx
 *
 * Modal mirroring desktop CustomMessageBox and CustomTitleBar
 * from osdagbridge.desktop.ui.dialogs.custom_messagebox.
 * Supports Warning (orange) and Critical (red) dialog types.
 */

import React, { useEffect, useCallback, useState } from 'react';
import { useBridgeStore } from '../../store/useBridgeStore';

export const InputErrorDialog: React.FC = () => {
  const inputErrorDialog = useBridgeStore((s) => s.inputErrorDialog);
  const dismissInputErrorDialog = useBridgeStore((s) => s.dismissInputErrorDialog);

  const [closeHover, setCloseHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inputErrorDialog) {
        dismissInputErrorDialog();
      }
    },
    [inputErrorDialog, dismissInputErrorDialog],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!inputErrorDialog) return null;

  const isCritical = inputErrorDialog.type === 'critical';
  const title = inputErrorDialog.title || (isCritical ? 'Empty Required Fields' : 'Input Error');
  const iconSrc = isCritical ? '/vectors/msg_critical.svg' : '/vectors/msg_warning.svg';

  const btnNormalBg = isCritical ? '#F44336' : '#FF9800';
  const btnHoverBg = isCritical ? '#E53935' : '#FB8C00';
  const btnActiveBg = isCritical ? '#D32F2F' : '#F57C00';

  const handleOk = () => {
    if (inputErrorDialog.onOk) {
      inputErrorDialog.onOk();
    }
    dismissInputErrorDialog();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-error-title"
      aria-describedby="input-error-message"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
    >
      {/* Dialog card — mirrors CustomMessageBox (1px solid #90AF13 border, white bg) */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #90AF13',
          borderRadius: '4px',
          minWidth: '380px',
          maxWidth: '460px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* CustomTitleBar — mirrors desktop CustomTitleBar (32px, Osdag_logo.svg, ✕ close button) */}
        <div
          style={{
            height: '32px',
            background: '#ffffff',
            borderBottom: '1px solid #dcdcdc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '8px',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/vectors/Osdag_logo.svg"
              alt="Osdag"
              width={20}
              height={20}
              style={{ display: 'block' }}
            />
            <span
              id="input-error-title"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#1f1f1f',
              }}
            >
              {title}
            </span>
          </div>

          <button
            type="button"
            onClick={dismissInputErrorDialog}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            aria-label="Close"
            style={{
              width: '40px',
              height: '32px',
              border: 'none',
              background: closeHover ? '#e81123' : 'transparent',
              color: closeHover ? '#ffffff' : '#333333',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.1s ease, color 0.1s ease',
            }}
          >
            ✕
          </button>
        </div>

        {/* ContentWidget — mirrors contentLayout (20px margins, icon, 12px text) */}
        <div
          style={{
            padding: '20px 20px 16px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Inner row: warning/critical icon + text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}
          >
            <img
              src={iconSrc}
              alt="Alert"
              width={34}
              height={34}
              style={{
                flexShrink: 0,
                display: 'block',
                marginTop: '2px',
              }}
            />
            <div
              id="input-error-message"
              style={{
                fontSize: '12px',
                color: '#1f1f1f',
                lineHeight: 1.5,
                margin: 0,
                textAlign: 'left',
                whiteSpace: 'pre-line',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {inputErrorDialog.message}
            </div>
          </div>

          {/* Button layout — right-aligned OK button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '16px',
            }}
          >
            <button
              type="button"
              onClick={handleOk}
              autoFocus
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => {
                setBtnHover(false);
                setBtnActive(false);
              }}
              onMouseDown={() => setBtnActive(true)}
              onMouseUp={() => setBtnActive(false)}
              style={{
                height: '30px',
                minWidth: '70px',
                padding: '5px 18px',
                backgroundColor: btnActive ? btnActiveBg : btnHover ? btnHoverBg : btnNormalBg,
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
