import React from "react";

const Cotizacion = ({ quote }) => {
  return (
    <div className="cotizacion">
      {quote ? <p>Cotización Mensual: ${quote}</p> : <p>Por favor, genera una cotización.</p>}
    </div>
  );
};

export default Cotizacion;
