import React from 'react';
// Importamos los componentes por defecto de Docusaurus
import MDXComponents from '@theme-original/MDXComponents';
// Importamos tu componente personalizado
import ImageRenderer from '@site/src/components/ImageRenderer';

export default {
  ...MDXComponents,
  // Le decimos que reemplace la etiqueta de imagen estándar por la tuya
  img: ImageRenderer,
};