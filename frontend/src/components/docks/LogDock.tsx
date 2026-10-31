/**
 * LogDock.tsx
 *
 * Log dock component for the OsdagBridge workbench.
 * Adapts osdagbridge.desktop.ui.docks.log_dock.LogDock for React.
 *
 * Features (matching desktop behaviour):
 *   - Title bar with dynamic title: "Log Window", "Log Window — Analysing… X%", "Log Window — Complete (100%)"
 *   - Inline progress bar shown while analysis is running (0–99%)
 *   - Color-coded messages by log level: error (red), warning (orange), success (green), info/stdout (grey)
 *   - Smart auto-scroll: scrolls to bottom only if user was already at bottom (within 15px tolerance)
 *   - Copy logs to clipboard (with fallback for older browsers)
 *   - Reset / Clear action restoring initial "Log initialized" state
 *   - Minimizable (collapse title bar only) and closeable
 */

import React, { useEffect, useRef, useState } from 'react';
import { useBridgeStore } from '../../store/useBridgeStore';

// ─── Log Level → Color Map ─────────────────────────────────────────────────────

/** Returns the display color for a given log level, matching desktop log_dock.py colors. */
function getLevelColor(level: string): string {
  switch (level) {
    case 'error':        return '#FF0000'; // Red
    case 'warning':      return '#FFA500'; // Orange
    case 'success':      return '#008000'; // Green
    case 'stdout_print':
    case 'info':
    default:             return 'var(--log-text-color)'; // Grey / theme default
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LogDock: React.FC = () => {
  const {
    isLogDockOpen,
    toggleLogDock,
    isLogDockCollapsed,
    toggleLogDockCollapse,
    logWindowTitle,
    logProgress,
    logs,
    resetLogs,
    activeViewportTab,
  } = useBridgeStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Auto-scroll when new logs arrive; honours the "within 15px of bottom" rule (matches desktop)
  useEffect(() => {
    if (!scrollRef.current || !isAutoScroll || isLogDockCollapsed) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs, isAutoScroll, isLogDockCollapsed]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setIsAutoScroll(scrollHeight - scrollTop - clientHeight <= 15);
  };

  const handleCopyLogs = async () => {
    const text = logs.map((l) => l.message).join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without Clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!isLogDockOpen) return null;

  return (
    <div
      id="logs_dock"
      style={{
        width: '100%',
        height: isLogDockCollapsed ? '26px' : (activeViewportTab === 'plots' ? '140px' : 'clamp(160px, 22vh, 210px)'),
        flexShrink: 0,
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: isLogDockCollapsed ? '0 8px' : '5px 8px 14px 8px',
      }}
    >
      {/* ── Title Bar (mirrors QLabel log_window_title in log_dock.py init_ui) ── */}
      {/* Desktop reference: only shows plain bold "Log Window" text, no action buttons */}
      <div
        style={{
          height: isLogDockCollapsed ? '26px' : '20px',
          minHeight: isLogDockCollapsed ? '26px' : '20px',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          marginBottom: isLogDockCollapsed ? 0 : '4px',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'var(--text-main)',
            fontFamily: 'inherit',
            lineHeight: 1,
          }}
        >
          {logWindowTitle}
        </span>

        {/* Inline progress bar shown while analysis is running (0–99%) */}
        {logProgress !== null && logProgress < 100 && (
          <div
            style={{
              marginLeft: '8px',
              width: '60px',
              height: '4px',
              background: 'rgba(144, 175, 19, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${logProgress}%`,
                height: '100%',
                background: 'var(--accent-osdag)',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Log Display Area (mirrors QTextEdit#textEdit in log_dock.py) ───────── */}
      {!isLogDockCollapsed && (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          id="textEdit"
          role="log"
          className="log-content"
          aria-live="polite"
          aria-label="Design log messages"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '4px 6px',
            background: 'var(--log-bg)',
            color: 'var(--log-text)',
            fontFamily: "'Courier New', monospace",
            fontSize: '12px',
            lineHeight: 1.45,
            borderTop: '1px solid var(--log-border)',
            borderLeft: '1px solid var(--log-border)',
            borderRight: '1px solid var(--log-border)',
            borderBottom: 'none',
            borderRadius: '2px 2px 0 0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            userSelect: 'text',
            boxSizing: 'border-box',
            marginBottom: 0,
            minHeight: 0,
          }}
        >
          {logs.map((entry) => (
            <div
              key={entry.id}
              style={{
                color: getLevelColor(entry.level),
                marginBottom: '2px',
              }}
            >
              {entry.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
