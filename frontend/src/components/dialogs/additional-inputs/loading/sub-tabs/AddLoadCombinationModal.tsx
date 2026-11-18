import React, { useState } from 'react';

export interface CombinationTableRow {
  sNo: number;
  loadCase: string;
  factor: string;
}

interface AddLoadCombinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (combination: { name: string; expr: string }) => void;
}

const LOAD_CASES = ['DL', 'DW', 'SIDL', 'LL', 'WL', 'EL', 'TL'];

export const AddLoadCombinationModal: React.FC<AddLoadCombinationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [comboName, setComboName] = useState('');
  const [currentLoadCase, setCurrentLoadCase] = useState('DL');
  const [currentFactor, setCurrentFactor] = useState('1.0');
  const [rows, setRows] = useState<CombinationTableRow[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setComboName('');
    setCurrentLoadCase('DL');
    setCurrentFactor('1.0');
    setRows([]);
    setSelectedRowIndex(null);
    setErrorMsg('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleAdd = () => {
    setErrorMsg('');
    const factorTrimmed = currentFactor.trim();
    if (!factorTrimmed || isNaN(Number(factorTrimmed))) {
      setErrorMsg('Please enter a valid Partial Safety Factor (e.g. 1.0, 1.35).');
      return;
    }

    // If load case already exists in table, update it
    const existingIndex = rows.findIndex((r) => r.loadCase === currentLoadCase);
    if (existingIndex !== -1) {
      setRows((prev) =>
        prev.map((r, i) => (i === existingIndex ? { ...r, factor: factorTrimmed } : r))
      );
      setSelectedRowIndex(existingIndex);
    } else {
      const newRow: CombinationTableRow = {
        sNo: rows.length + 1,
        loadCase: currentLoadCase,
        factor: factorTrimmed,
      };
      setRows((prev) => [...prev, newRow]);
      setSelectedRowIndex(rows.length);
    }
  };

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
    const row = rows[index];
    if (row) {
      setCurrentLoadCase(row.loadCase);
      setCurrentFactor(row.factor);
    }
  };

  const handleModify = () => {
    setErrorMsg('');
    if (selectedRowIndex === null || !rows[selectedRowIndex]) {
      setErrorMsg('Please select a row from the table to modify.');
      return;
    }
    const factorTrimmed = currentFactor.trim();
    if (!factorTrimmed || isNaN(Number(factorTrimmed))) {
      setErrorMsg('Please enter a valid Partial Safety Factor.');
      return;
    }

    setRows((prev) => {
      const updated = [...prev];
      updated[selectedRowIndex] = {
        ...updated[selectedRowIndex],
        loadCase: currentLoadCase,
        factor: factorTrimmed,
      };
      return updated;
    });
  };

  const handleDelete = () => {
    setErrorMsg('');
    if (selectedRowIndex === null || !rows[selectedRowIndex]) {
      setErrorMsg('Please select a row from the table to delete.');
      return;
    }
    setRows((prev) => {
      const filtered = prev.filter((_, i) => i !== selectedRowIndex);
      return filtered.map((r, idx) => ({ ...r, sNo: idx + 1 }));
    });
    setSelectedRowIndex(null);
  };

  const handleSave = () => {
    setErrorMsg('');
    const trimmedName = comboName.trim();
    if (!trimmedName) {
      setErrorMsg('Please enter a Combination Name.');
      return;
    }
    if (rows.length === 0) {
      setErrorMsg('Please add at least one Load Case to the combination.');
      return;
    }

    const expr = rows.map((r) => `${r.factor}${r.loadCase}`).join(' + ');
    onSave({ name: trimmedName, expr });
    handleClose();
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
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          width: '540px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          border: '1px solid #707070',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.3)',
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
              width={16}
              height={16}
              style={{ display: 'block', pointerEvents: 'none' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
              Add Load Combination
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333333',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '2px 6px',
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '16px 20px 16px 20px', display: 'flex', flexDirection: 'column' }}>
          {/* Combination Name Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', color: '#000000', width: '130px' }}>
              Combination Name:
            </label>
            <input
              type="text"
              value={comboName}
              onChange={(e) => setComboName(e.target.value)}
              placeholder=""
              style={{
                width: '200px',
                height: '24px',
                padding: '2px 8px',
                fontSize: '12px',
                border: '1px solid #757575',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            />
          </div>

          {/* Load Case & Partial Safety Factor Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#000000' }}>Load Case:</label>
            <select
              value={currentLoadCase}
              onChange={(e) => setCurrentLoadCase(e.target.value)}
              className="osdag-select-field"
              style={{
                width: '78px',
                height: '24px',
                padding: '0 6px',
                fontSize: '12px',
                border: '1px solid #757575',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            >
              {LOAD_CASES.map((lc) => (
                <option key={lc} value={lc}>
                  {lc}
                </option>
              ))}
            </select>

            <label style={{ fontSize: '12px', color: '#000000', marginLeft: '12px' }}>
              Partial Safety Factor:
            </label>
            <input
              type="text"
              value={currentFactor}
              onChange={(e) => setCurrentFactor(e.target.value)}
              style={{
                width: '90px',
                height: '24px',
                padding: '2px 8px',
                fontSize: '12px',
                border: '1px solid #757575',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            />
          </div>

          {/* Table & Right Buttons Row */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            {/* Table Container */}
            <div
              style={{
                flex: 1,
                height: '210px',
                border: '1px solid #c0c0c0',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                overflowY: 'auto',
                boxSizing: 'border-box',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#eaeaea' }}>
                    <th
                      style={{
                        padding: '6px 4px',
                        fontWeight: 600,
                        color: '#333333',
                        fontSize: '11px',
                        borderBottom: '1px solid #c0c0c0',
                        borderRight: '1px solid #c0c0c0',
                        width: '55px',
                        textAlign: 'center',
                      }}
                    >
                      S.No
                    </th>
                    <th
                      style={{
                        padding: '6px 4px',
                        fontWeight: 600,
                        color: '#333333',
                        fontSize: '11px',
                        borderBottom: '1px solid #c0c0c0',
                        borderRight: '1px solid #c0c0c0',
                        width: '140px',
                        textAlign: 'center',
                      }}
                    >
                      Load Case
                    </th>
                    <th
                      style={{
                        padding: '6px 4px',
                        fontWeight: 600,
                        color: '#333333',
                        fontSize: '11px',
                        borderBottom: '1px solid #c0c0c0',
                        textAlign: 'center',
                      }}
                    >
                      Partial Safety Factor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => {
                    const isSelected = selectedRowIndex === idx;
                    return (
                      <tr
                        key={idx}
                        onClick={() => handleRowClick(idx)}
                        style={{
                          backgroundColor: isSelected
                            ? '#dbeafe'
                            : idx % 2 === 1
                            ? '#fcfcfc'
                            : '#ffffff',
                          cursor: 'pointer',
                        }}
                      >
                        <td
                          style={{
                            padding: '5px 4px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e8e8e8',
                            borderRight: '1px solid #e8e8e8',
                            color: '#000000',
                          }}
                        >
                          {row.sNo}
                        </td>
                        <td
                          style={{
                            padding: '5px 4px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e8e8e8',
                            borderRight: '1px solid #e8e8e8',
                            color: '#000000',
                            fontWeight: 500,
                          }}
                        >
                          {row.loadCase}
                        </td>
                        <td
                          style={{
                            padding: '5px 4px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e8e8e8',
                            color: '#000000',
                          }}
                        >
                          {row.factor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Side Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '80px' }}>
              <button
                type="button"
                onClick={handleAdd}
                style={{
                  height: '25px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #757575',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: '#222222',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2f2f2')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleModify}
                style={{
                  height: '25px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #757575',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: '#222222',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2f2f2')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
              >
                Modify
              </button>
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  height: '25px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #757575',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: '#222222',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2f2f2')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                fontSize: '11.5px',
                color: '#d32f2f',
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Bottom Dialog Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                width: '80px',
                height: '26px',
                backgroundColor: '#bfbfbf',
                border: '1px solid #999999',
                borderRadius: '4px',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#adadad')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#bfbfbf')}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{
                width: '80px',
                height: '26px',
                backgroundColor: '#bfbfbf',
                border: '1px solid #999999',
                borderRadius: '4px',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#adadad')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#bfbfbf')}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

