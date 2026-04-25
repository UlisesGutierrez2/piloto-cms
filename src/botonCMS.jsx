import React from 'react';

export default function BotonCMS({ area, coleccion }) {
  // Construye la URL exacta hacia la colección de Decap CMS
  const urlDestino = `/admin/#/collections/${coleccion}/entries/new`;

  return (
    <div className="alert alert--info" style={{ padding: '24px', borderRadius: '8px', marginTop: '30px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>💡 ¿Falta algún procedimiento en {area}?</h3>
      <p style={{ margin: '0 0 20px 0' }}>
        La documentación es responsabilidad de todos. Si notaste que falta una guía, puedes agregarla sin tocar código. Todo cambio generará un Pull Request automático.
      </p>
      <a 
        href={urlDestino} 
        className="button button--primary button--lg"
        style={{ backgroundColor: '#58a6ff', color: '#0d1117', border: 'none', fontWeight: 'bold' }}
      >
        ➕ Crear Guía para {area}
      </a>
    </div>
  );
}
