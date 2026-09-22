import React, { useEffect, useState } from 'react';
import { useBridgeStore } from '../../store/useBridgeStore';
import { apiClient } from '../../services/api';
import { LocationData } from '../../types/location';
import { X, MapPin, Check, Wind, Activity, Thermometer } from 'lucide-react';

export const ProjectLocationModal: React.FC = () => {
  const { isLocationModalOpen, setLocationModalOpen, setLocation, location } = useBridgeStore();

  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [stations, setStations] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [locationDetails, setLocationDetails] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLocationModalOpen) {
      apiClient.get('/location/states').then((res) => {
        setStates(res.data.states);
        if (res.data.states.length > 0 && !selectedState) {
          setSelectedState(res.data.states[0]);
        }
      });
    }
  }, [isLocationModalOpen]);

  useEffect(() => {
    if (selectedState) {
      apiClient.get(`/location/stations?state=${encodeURIComponent(selectedState)}`).then((res) => {
        setStations(res.data.stations);
        if (res.data.stations.length > 0) {
          setSelectedStation(res.data.stations[0]);
        }
      });
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedStation) {
      setLoading(true);
      apiClient
        .get(`/location/details?state=${encodeURIComponent(selectedState)}&station=${encodeURIComponent(selectedStation)}`)
        .then((res) => {
          setLocationDetails(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedState, selectedStation]);

  if (!isLocationModalOpen) return null;

  const handleApply = () => {
    if (locationDetails) {
      setLocation(locationDetails);
    }
    setLocationModalOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        width: '540px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--accent-osdag)" />
            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Project Location & Weather Details</h3>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                District / Station
              </label>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              >
                {stations.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Environmental Parameters Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', fontWeight: 700, marginBottom: '12px' }}>
              IRC:6 Environmental Constraints
            </h4>

            {locationDetails ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Wind size={20} color="#0284c7" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Basic Wind Speed (V_b)</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {locationDetails.basic_wind_speed} m/s
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={20} color="#dc2626" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Seismic Zone</div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>
                      {locationDetails.seismic_zone}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Thermometer size={20} color="#ea580c" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Max Temperature</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {locationDetails.max_temperature} °C
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Thermometer size={20} color="#0d9488" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Min Temperature</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {locationDetails.min_temperature} °C
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Loading location data...</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 18px',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          <button
            onClick={() => setLocationModalOpen(false)}
            style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontSize: '12px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            style={{
              padding: '6px 18px',
              borderRadius: '4px',
              border: 'none',
              background: 'var(--accent-osdag)',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Check size={14} /> Apply Location
          </button>
        </div>
      </div>
    </div>
  );
};
