import React from 'react';

export default function BotonCMS({ area, coleccion }) {
  const urlDestino = `/admin/#/collections/${coleccion}/new`;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      padding: '16px 24px',
      margin: '24px 0',
      flexWrap: 'wrap', /* Para que no se rompa en pantallas de celular */
      gap: '16px'
    }}>
      <div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>
          📝 Contribuye a la documentación de {area}
        </h4>
        <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-700)', fontSize: '0.9rem' }}>
          ¿Falta algún procedimiento o lineamiento? Agrégalo directamente desde el editor visual.
        </p>
      </div>
      <a 
        href={urlDestino} 
        className="button button--primary"
        style={{ whiteSpace: 'nowrap' }}
      >
        ➕ Crear Documento
      </a>
    </div>
  );
}
