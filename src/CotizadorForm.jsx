import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CotizadorForm = () => {
  
  const navigate = useNavigate();
  const [options, setOptions] = useState({ properties: [], locations: [] });
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    coverageAmount: "",
  });
  const [quote, setQuote] = useState(null); 

  useEffect(() => {
    if(quote >49 && quote !== null){ 
    const historialCotizaciones =
      JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    localStorage.setItem(
      "historialCotizaciones",
      JSON.stringify([...historialCotizaciones, quote])
    );
    }
  }, [quote]);

  const fetchOptions = async () => {
    try {
      const propertiesResponse = await axios.get(
        "https://653831aaa543859d1bb14d53.mockapi.io/propiedades"
      );
      const locationsResponse = await axios.get(
        "https://653831aaa543859d1bb14d53.mockapi.io/ubicaciones"
      );
      setOptions({
        properties: propertiesResponse.data,
        locations: locationsResponse.data,
      });
    } catch (error) {
      console.error("Error al obtener las opciones:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const calcularCotizacion = () => {
    
    if (formData.propertyType && formData.location && formData.coverageAmount > 49) { 
     
      const tarifaBase = 50;
    const factorTipoPropiedad = formData.propertyType === "Casa" ? 1.2 : 1.1;
    const factorUbicacion = formData.location === "CABA" ? 1.5 : 1.3;
    const cotizacion =
      tarifaBase *
      factorTipoPropiedad *
      factorUbicacion *
      formData.coverageAmount;
    setQuote(cotizacion);
  } else { 
    // Si la cotización no es válida, establece quote en null
    setQuote(null); 
    alert("Por favor, completa todos los campos antes de generar la cotización.");
  }
  };

  const handleGenerateQuote = (event) => {
    event.preventDefault();
    if (
      formData.propertyType &&
      formData.location &&
      formData.coverageAmount >49 && formData.coverageAmount !== null 
    ) {
      calcularCotizacion();
    } else {
      alert(
        "Por favor, completa todos los campos antes de generar la cotización."
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewHistory = (event) => {
    event.preventDefault();
    if (quote >49 && quote !== null) { 
      const nuevaCotizacion = {
        timestamp: new Date().toLocaleString(),
        propertyType: formData.propertyType,
        location: formData.location,
        coverageAmount: formData.coverageAmount,
        quote: quote.toFixed(2),
      };

      // Recuperar cotizaciones existentes del localStorage
      const historialCotizaciones =
        JSON.parse(localStorage.getItem("historialCotizaciones")) || [];

      // Guardar la nueva cotización en el localStorage
      localStorage.setItem(
        "historialCotizaciones",
        JSON.stringify([...historialCotizaciones, nuevaCotizacion])
      );
    } else {
      alert("No se puede guardar una cotización de valor 49 o menor.");
    }

    // Redirigir a la página de historial
    navigate("/historial");
  };


  return (
    <div className="cotizador-form">
      <header>
      <h1>Seguros del Hogar </h1>

      <nav className="navbar">
      <ul>
        <li>
          <Link to="/historial">Ver Historial</Link>
        </li>
      </ul>
    </nav>
    </header>
    <main>
      <h2>Obtener Cotización</h2>
      <div className="form-group">
        <label>Tipo de Propiedad:</label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Selecciona...
          </option>
          {options.properties.map((property) => (
            <option key={property.id} value={property.tipo}>
              {property.tipo}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Ubicación:</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Selecciona...
          </option>
          {options.locations.map((location) => (
            <option key={location.id} value={location.tipo}>
              {location.tipo}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Cantidad de Cobertura:</label>
        <input
          type="number"
          name="coverageAmount"
          placeholder="Valos mínimo 50"
          value={formData.coverageAmount}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleGenerateQuote}>Generar Cotización</button>
      {quote > 0 && (
        <div className="quote">Cotización Mensual: ${quote.toFixed(2)}</div>
      )}

      <button onClick={handleViewHistory}>Ver Historial</button>
      </main>
    </div>
  );
};

export default CotizadorForm;
