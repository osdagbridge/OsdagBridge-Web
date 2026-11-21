/**
 * cad.ts
 *
 * Types shared by the CAD files.
 *   - View: scale and offsets that map metres to pixels.
 *   - Bounds / Pad / CadModel: the drawing's extent in metres, the empty margin around
 *     it in pixels, and an optional minScale below which the pane scrolls.
 *   - HitZone / HoverState: an element's hover area and label, and which element is
 *     currently hovered.
 *   - DrawFn: signature of drawCrossSection and drawPlan. Draws the model and returns
 *     its hit zones.
 */
export interface View { scale: number; ox: number; oy: number }
export interface Bounds { minX: number; maxX: number; minY: number; maxY: number }
export interface Pad { l: number; r: number; t: number; b: number }

export interface CadModel { bounds: Bounds; pad: Pad; minScale?: number }   // minScale = px per metre below which the pane scrolls

export type FormValues = Record<string, unknown>;

// Screen-space area that triggers a hover.
export type HitShape =
  | { kind: "rect"; x: number; y: number; w: number; h: number }
  | { kind: "poly"; pts: [number, number][] };

export interface HitZone {
  id: string;                    // element TYPE: "girder", "deck", "crash_barrier"
  label: string;                 // text shown in the hover label
  shape: HitShape;
  anchor: [number, number];      // screen point where the leader dot sits
  dx: number; dy: number;        // label offset from the anchor, px
}

export interface HoverState { id: string; zone: number }   // zone = index into the zone list

export type DrawFn<M extends CadModel> = (
  ctx: CanvasRenderingContext2D,
  model: M,
  view: View,
  hover: HoverState | null
) => HitZone[];