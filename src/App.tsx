import React from 'react';
import { useRoutes } from "react-router-dom";

import { ByRoute } from './by-route/ByRoute';
import './App.css';

function App() {
  const AppRoutes = () => useRoutes([
    { path: '/', element: <ByRoute /> },
    { path: '/:routeId/:directionId/:placeCode', element: <ByRoute /> }
  ])

  return (
    <div className="app-container">
      <h1>Real Time Departures</h1>
      <AppRoutes />
    </div>
  );
}

export default App;
