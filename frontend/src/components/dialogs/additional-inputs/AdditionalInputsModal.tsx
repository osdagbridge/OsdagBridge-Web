import React, { useState, useEffect, useRef } from 'react';
import { useBridgeStore } from '../../../store/useBridgeStore';
import { TypicalSectionDetailsTab } from './typical-section-details/TypicalSectionDetailsTab';
import { MemberPropertiesTab } from './member-properties/MemberPropertiesTab';
import { LoadingTab } from './loading/LoadingTab';
import { AnalysisDesignOptionsTab } from './analysis-design-options/AnalysisDesignOptionsTab';
import { DesignOptionsContTab } from './design-options-cont/DesignOptionsContTab';
import { actionBtnStyle } from './styles';

type ResizeEdge =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

const getInitialDialogSize = () => {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;
  return {
    width: Math.min(980, Math.max(750, w - 40)),
    height: Math.min(680, Math.max(500, h - 50)),
  };
};

export const AdditionalInputsModal: React.FC = () => {
  const {
    isAdditionalInputsOpen,
    setAdditionalInputsOpen,
    saveAdditionalInputs,
    resetAdditionalDefaults,
  } = useBridgeStore();

  const [activeMainTab, setActiveMainTab] = useState(0);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [dialogSize, setDialogSize] = useState(getInitialDialogSize);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);

  useEffect(() => {
    if (isAdditionalInputsOpen) {
      setActiveMainTab(0);
      const size = getInitialDialogSize();
      setDialogSize(size);
      const posX = Math.max(10, Math.round((window.innerWidth - size.width) / 2));
      const posY = Math.max(10, Math.round((window.innerHeight - size.height) / 2));
      setPosition({ x: posX, y: posY });
    }
  }, [isAdditionalInputsOpen]);

  // Drag Title Bar to move the window
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    isDraggingRef.current = true;

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = position?.x ?? Math.max(10, (window.innerWidth - dialogSize.width) / 2);
    const startY = position?.y ?? Math.max(10, (window.innerHeight - dialogSize.height) / 2);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = moveEvent.clientX - startMouseX;
      const dy = moveEvent.clientY - startMouseY;

      const nextX = Math.max(0, Math.min(window.innerWidth - 120, startX + dx));
      const nextY = Math.max(0, Math.min(window.innerHeight - 50, startY + dy));

      setPosition({ x: nextX, y: nextY });
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Resize window from edges/corners
  const handleBorderResizeStart = (e: React.MouseEvent, edge: ResizeEdge) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;

    const initialW = dialogSize.width;
    const initialH = dialogSize.height;
    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const initX = position?.x ?? Math.max(10, (window.innerWidth - initialW) / 2);
    const initY = position?.y ?? Math.max(10, (window.innerHeight - initialH) / 2);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizingRef.current) return;
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      let newWidth = initialW;
      let newHeight = initialH;
      let newPosX = initX;
      let newPosY = initY;

      if (edge.includes('right')) {
        newWidth = Math.min(Math.max(initialW + deltaX, 720), window.innerWidth - initX - 10);
      } else if (edge.includes('left')) {
        const potentialWidth = initialW - deltaX;
        if (potentialWidth >= 720) {
          newWidth = potentialWidth;
          newPosX = initX + deltaX;
        }
      }

      if (edge.includes('bottom')) {
        newHeight = Math.min(Math.max(initialH + deltaY, 480), window.innerHeight - initY - 10);
      } else if (edge.includes('top')) {
        const potentialHeight = initialH - deltaY;
        if (potentialHeight >= 480) {
          newHeight = potentialHeight;
          newPosY = initY + deltaY;
        }
      }

      setDialogSize({ width: newWidth, height: newHeight });
      setPosition({ x: newPosX, y: newPosY });
    };

    const onMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  if (!isAdditionalInputsOpen) return null;

  const mainTabs = [
    'Typical Section Details',
    'Member Properties',
    'Loading',
    'Analysis/Design Options',
    'Design Options (Cont.)',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        zIndex: 9999,
      }}
    >
      <div
        className="additional-inputs-modal"
        style={{
          position: 'fixed',
          left: position ? `${position.x}px` : '50%',
          top: position ? `${position.y}px` : '50%',
          transform: position ? undefined : 'translate(-50%, -50%)',
          width: `${dialogSize.width}px`,
          height: `${dialogSize.height}px`,
          maxWidth: 'calc(100vw - 20px)',
          maxHeight: 'calc(100vh - 20px)',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #8cae11',
          overflow: 'hidden',
          zIndex: 10000,
        }}
      >
        {/* Resize Handles */}
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'top')} style={{ position: 'absolute', top: 0, left: 10, right: 10, height: 6, cursor: 'ns-resize', zIndex: 100 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'bottom')} style={{ position: 'absolute', bottom: 0, left: 10, right: 10, height: 6, cursor: 'ns-resize', zIndex: 100 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'left')} style={{ position: 'absolute', left: 0, top: 10, bottom: 10, width: 6, cursor: 'ew-resize', zIndex: 100 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'right')} style={{ position: 'absolute', right: 0, top: 10, bottom: 10, width: 6, cursor: 'ew-resize', zIndex: 100 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'top-left')} style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, cursor: 'nwse-resize', zIndex: 101 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'top-right')} style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, cursor: 'nesw-resize', zIndex: 101 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'bottom-left')} style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, cursor: 'nesw-resize', zIndex: 101 }} />
        <div onMouseDown={(e) => handleBorderResizeStart(e, 'bottom-right')} style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, cursor: 'nwse-resize', zIndex: 101 }} />

        {/* Modal Title Bar (Draggable) */}
        <div
          onMouseDown={handleTitleBarMouseDown}
          style={{
            height: '32px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0 0 10px',
            borderBottom: '1px solid #d5d5d5',
            userSelect: 'none',
            position: 'relative',
            cursor: 'move',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/vectors/Osdag_logo.svg"
              alt="Osdag"
              width={18}
              height={18}
              style={{ display: 'block', userSelect: 'none', pointerEvents: 'none' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#333333' }}>
              Additional Inputs
            </span>
          </div>

          <div style={{ position: 'relative', height: '100%', display: 'flex' }}>
            <button
              type="button"
              onClick={() => setAdditionalInputsOpen(false)}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => {
                setIsCloseHovered(false);
                setIsClosePressed(false);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsClosePressed(true);
              }}
              onMouseUp={() => setIsClosePressed(false)}
              style={{
                width: '46px',
                height: '32px',
                border: 'none',
                borderRadius: '0',
                backgroundColor: isClosePressed ? '#c0392b' : isCloseHovered ? '#fa382f' : 'transparent',
                color: isCloseHovered ? '#ffffff' : '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                fontSize: '15px',
                fontWeight: 'bold',
                fontFamily: 'Segoe UI, Arial, sans-serif',
                transition: 'background-color 0.1s ease',
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Tooltip matching Desktop Osdag (Green border #8cae11) */}
            {isCloseHovered && (
              <div
                style={{
                  position: 'absolute',
                  top: '34px',
                  right: '4px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #8cae11',
                  borderRadius: '2px',
                  padding: '3px 8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  zIndex: 99999,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000000',
                    fontFamily: 'Segoe UI, Arial, sans-serif',
                  }}
                >
                  Close
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Tabs Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #c0c0c0',
            padding: '8px 14px 0 14px',
            gap: '0px',
            flexShrink: 0,
          }}
        >
          {mainTabs.map((tabLabel, idx) => {
            const isSelected = activeMainTab === idx;
            return (
              <button
                key={tabLabel}
                type="button"
                onClick={() => setActiveMainTab(idx)}
                style={{
                  padding: '7px 22px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: '1px solid #c0c0c0',
                  borderBottom: isSelected ? 'none' : '1px solid #c0c0c0',
                  borderRight: idx < mainTabs.length - 1 ? 'none' : '1px solid #c0c0c0',
                  backgroundColor: isSelected ? '#8cae11' : '#eaeaea',
                  color: isSelected ? '#ffffff' : '#333333',
                  cursor: 'pointer',
                  position: 'relative',
                  bottom: '-1px',
                  zIndex: isSelected ? 3 : 1,
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.1s',
                }}
              >
                {tabLabel}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            paddingTop: '6px',
          }}
        >
          {activeMainTab === 0 && <TypicalSectionDetailsTab dialogSize={dialogSize} />}
          {activeMainTab === 1 && <MemberPropertiesTab />}
          {activeMainTab === 2 && <LoadingTab />}
          {activeMainTab === 3 && <AnalysisDesignOptionsTab />}
          {activeMainTab === 4 && <DesignOptionsContTab />}
        </div>

        {/* Bottom Action Bar (Defaults, Save) */}
        <div
          style={{
            backgroundColor: '#ededed',
            border: '1px solid #c8c8c8',
            borderRadius: '6px',
            padding: '8px 16px',
            margin: '4px 14px 10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={resetAdditionalDefaults}
            style={actionBtnStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f6f6f6')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
          >
            Defaults
          </button>
          <button
            type="button"
            onClick={saveAdditionalInputs}
            style={actionBtnStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f6f6f6')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
