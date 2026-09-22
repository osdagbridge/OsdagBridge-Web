import { create } from 'zustand';
import { UIFieldSchema } from '../types/schema';
import { LocationData } from '../types/location';
import { apiClient } from '../services/api';

interface BridgeState {
  // Input fields state (key -> value)
  inputs: Record<string, any>;
  schema: UIFieldSchema[];
  schemaLoading: boolean;
  validationErrors: Record<string, string>;

  // Project Location (Lead Garvit)
  location: LocationData | null;
  isLocationModalOpen: boolean;

  // Viewport Tab
  activeViewportTab: 'plan' | 'cross_section' | '3d';

  // Actions
  setInputs: (inputs: Record<string, any>) => void;
  updateField: (key: string, value: any) => void;
  setValidationError: (key: string, message: string | null) => void;
  fetchSchema: () => Promise<void>;
  validateFieldLive: (key: string, value: any) => Promise<void>;
  setLocation: (loc: LocationData) => void;
  setLocationModalOpen: (open: boolean) => void;
  setActiveViewportTab: (tab: 'plan' | 'cross_section' | '3d') => void;
}

export const useBridgeStore = create<BridgeState>((set, get) => ({
  inputs: {
    Span: 30.0,
    Carriageway_Width: 7.5,
    Include_Median: "No",
    Skew_Angle: 0.0,
    No_Of_Girders: 4,
    Girder_Steel_Material: "E 250 (Fe 410 W) A",
    Deck_Concrete_Material: "M 35",
  },
  schema: [],
  schemaLoading: false,
  validationErrors: {},

  location: null,
  isLocationModalOpen: false,
  activeViewportTab: 'plan',

  setInputs: (inputs) => set({ inputs }),

  updateField: (key, value) => {
    set((state) => ({
      inputs: { ...state.inputs, [key]: value },
    }));
  },

  setValidationError: (key, message) => {
    set((state) => {
      const errs = { ...state.validationErrors };
      if (message) {
        errs[key] = message;
      } else {
        delete errs[key];
      }
      return { validationErrors: errs };
    });
  },

  fetchSchema: async () => {
    set({ schemaLoading: true });
    try {
      const res = await apiClient.get<UIFieldSchema[]>('/schema/basic');
      const schemaData = res.data;
      // Preload defaults
      const initialInputs: Record<string, any> = { ...get().inputs };
      schemaData.forEach((f) => {
        if (f.default !== undefined && initialInputs[f.key] === undefined) {
          initialInputs[f.key] = f.default;
        }
      });
      set({ schema: schemaData, inputs: initialInputs, schemaLoading: false });
    } catch (err) {
      console.error('Failed to load schema', err);
      set({ schemaLoading: false });
    }
  },

  validateFieldLive: async (key, value) => {
    try {
      const { inputs } = get();
      const res = await apiClient.post('/validate/field', {
        key,
        value,
        all_inputs: { ...inputs, [key]: value },
      });
      if (!res.data.valid) {
        get().setValidationError(key, res.data.message || 'Invalid value');
      } else {
        get().setValidationError(key, null);
      }
    } catch (err) {
      console.error('Validation request failed', err);
    }
  },

  setLocation: (loc) => {
    set((state) => ({
      location: loc,
      inputs: {
        ...state.inputs,
        Project_Location: `${loc.station}, ${loc.state}`,
        Basic_Wind_Speed: loc.basic_wind_speed,
        Seismic_Zone: loc.seismic_zone,
      },
    }));
  },

  setLocationModalOpen: (open) => set({ isLocationModalOpen: open }),
  setActiveViewportTab: (activeViewportTab) => set({ activeViewportTab }),
}));
