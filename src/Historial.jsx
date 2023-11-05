

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Historial = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    // Leer cotizaciones del localStorage al cargar el componente
    const cotizacionesGuardadas =
      JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    setCotizaciones(cotizacionesGuardadas);
  }, []);

  return (
    <div className="historial">
      <header className="header-historial">
      <h2>Historial de Cotizaciones</h2>
      <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Volver</Link>
        </li>
      </ul>
    </nav>
    </header>
    <main className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Tipo de Propiedad</th>
            <th>Ubicación</th>
            <th>Cantidad de Cobertura</th>
            <th>Cotización Mensual</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion, index) => (
            cotizacion.quote > 0 && (
            <tr key={index}>
              <td>{cotizacion.timestamp }</td>
              <td>{cotizacion.propertyType }</td>
              <td>{cotizacion.location }</td>
              <td>{cotizacion.coverageAmount}</td>
              <td>{cotizacion.quote}</td>
            </tr>
            )
          ))}
        </tbody>
      </table>
      </main>
    </div>
  );
};

export default Historial;
