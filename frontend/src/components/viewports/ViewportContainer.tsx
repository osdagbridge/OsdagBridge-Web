/**
 * ViewportContainer.tsx
 *
 * Stacks the cross-section and plan panes in the centre area, each filling half of
 * the available height.
 */
import React from "react";
import { CrossSectionView, PlanView } from "./CadViews";

export const ViewportContainer: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#ffffff" }}>
    <div style={{ position: "relative", flex: 1, minHeight: 0 }}><CrossSectionView /></div>
    <div style={{ position: "relative", flex: 1, minHeight: 0, borderTop: "1px solid var(--border-color)" }}><PlanView /></div>
  </div>
);