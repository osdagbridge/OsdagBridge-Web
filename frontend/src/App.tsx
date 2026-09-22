import React from 'react';
import { Header } from './components/layout/Header';
import { InputDock } from './components/docks/InputDock';
import { ViewportContainer } from './components/viewports/ViewportContainer';
import { OutputDock } from './components/docks/OutputDock';
import { ProjectLocationModal } from './components/dialogs/ProjectLocationModal';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <InputDock />
        <ViewportContainer />
        <OutputDock />
      </div>
      <ProjectLocationModal />
    </div>
  );
}
