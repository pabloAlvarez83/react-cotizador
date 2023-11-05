import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CotizadorForm from "./CotizadorForm";
import Cotizacion from "./Cotizacion";
import Historial from "./Historial";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        
        <Routes>
         
          <Route path="/" element={<CotizadorForm />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
