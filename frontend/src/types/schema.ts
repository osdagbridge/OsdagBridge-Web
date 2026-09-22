export interface UIFieldSchema {
  key: string;
  label: string;
  ui_type: 'number' | 'text' | 'select' | 'button';
  default?: any;
  min?: number;
  max?: number;
  unit?: string;
  container?: string;
  group?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  action?: string;
}

export interface ValidateFieldResponse {
  valid: boolean;
  corrected_value?: any;
  message?: string;
}
