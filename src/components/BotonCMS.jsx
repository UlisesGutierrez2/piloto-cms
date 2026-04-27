import React from 'react';

export default function BotonCMS({ area, coleccion }) {
  // Genera la URL dinámica para crear un nuevo archivo en la colección correcta
  const urlDestino = `/admin/#/collections/${coleccion}/new`;

  return (
    <div className="alert alert--secondary" style={{ 
      padding: '24px', 
      borderRadius: '8px', 
      marginTop: '2rem', 
      border: '1px solid var(--ifm-color-emphasis-300)',
      backgroundColor: 'var(--ifm-background-surface-color)'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>📝 ¿Falta documentación en {area}?</h3>
      <p style={{ margin: '0 0 15px 0' }}>
        Ayuda a mantener nuestro catálogo actualizado. Puedes agregar una nueva guía o lineamiento directamente desde el editor visual, sin tocar código.
      </p>
      <a href={urlDestino} className="button button--primary button--lg" style={{ fontWeight: 'bold' }}>
        ➕ Crear Guía para {area}
      </a>
    </div>
  );
}
