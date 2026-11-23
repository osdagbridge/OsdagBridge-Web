/**
 * CadViews.tsx
 *
 * Connects the store to the CAD files. Provides CrossSectionView and PlanView.
 *
 * Data flow:
 *   - Reads constants, inputs and additionalInputs from useBridgeStore.
 *   - Looks up each key name in the backend constants (for example KEY_SPAN gives
 *     "geometry.span") and reads that key from the inputs.
 *   - Passes the values to buildCrossSection() / buildPlan() under short field
 *     names (span, footpath, girders, ...), so the CAD files never see KEY_* strings.
 *
 * Notes:
 *   - If the constants have not loaded, nothing is drawn. The store shows the error,
 *     and no hardcoded fallback keys are used.
 */
import { useMemo } from "react";
import { useBridgeStore } from "../../store/useBridgeStore";
import type { BridgeConstants } from "../../types/schema";
import CadCanvas from "./CadCanvas";
import { buildCrossSection, drawCrossSection } from "../../cad/crossSection";
import { buildPlan, drawPlan } from "../../cad/planView";

type Values = Record<string, unknown>;

// Constant NAME -> key string (backend value).
const keyOf = (c: BridgeConstants, name: string): string | undefined => {
  const v = c[name];
  return typeof v === "string" && v ? v : undefined;
};

// Constant NAME -> number (for the DEFAULT_* values).
const numOf = (c: BridgeConstants, name: string): number | undefined => {
  const v = c[name];
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
};

const read = (v: Values, key?: string): unknown => {
  if (!key) return undefined;
  const x = v[key];
  return x !== undefined && x !== null && x !== "" ? x : undefined;
};

// Reads constants + inputs from the store and renames them to the CAD's short field names.
function useCadInputs(): Values | null {
  const inputs = useBridgeStore((s) => s.inputs) as Values;
  const additional = useBridgeStore((s) => s.additionalInputs) as Values;
  const c = useBridgeStore((s) => s.constants);

  return useMemo(() => {
    if (!c) return null;                       // constants not loaded yet: draw nothing
    const v: Values = { ...additional, ...inputs };
    const get = (name: string) => read(v, keyOf(c, name)); //maps the field to its key
    return {   //the form values
      span: get("KEY_SPAN"),
      carriagewayWidth: get("KEY_CARRIAGEWAY_WIDTH"),
      footpath: get("KEY_FOOTPATH"),
      includeMedian: get("KEY_INCLUDE_MEDIAN"),
      medianWidth: get("KEY_MD_WIDTH"),
      skew: get("KEY_SKEW_ANGLE"),
      girders: get("KEY_TS_NO_OF_GIRDERS"),
      overhang: get("KEY_TS_DECK_OVERHANG"),
      deckThicknessMm: get("KEY_TS_DECK_THICKNESS"),
      footpathWidth: get("KEY_TS_FOOTPATH_WIDTH"),
      footpathThicknessMm: get("KEY_TS_FOOTPATH_THICKNESS"),
      bracingCount: get("KEY_MP_CB_NO_OF_CROSS_BRACINGS"),
      bracingInitialSpacing: numOf(c, "DEFAULT_CROSS_BRACING_SPACING"),
      railingWidth: numOf(c, "DEFAULT_RAILING_WIDTH"),
      defaultGirderSpacing: numOf(c, "DEFAULT_GIRDER_SPACING"),
    };
  }, [inputs, additional, c]); //re-runs whenever any of these values change 
}

export function CrossSectionView() {
  const p = useCadInputs();  //stores the form values: dictionary with key names above
  const model = useMemo(() => (p ? buildCrossSection(p) : null), [p]);  //stores the calculated layout
  if (!model) return null;
  return <CadCanvas model={model} draw={drawCrossSection} />; //renders CadCanvas for cross section view
}

export function PlanView() {
  const p = useCadInputs();
  const model = useMemo(() => (p ? buildPlan(p) : null), [p]);
  if (!model) return null;
  return <CadCanvas model={model} draw={drawPlan} />;
}