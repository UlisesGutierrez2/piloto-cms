import React from 'react';
// Importamos los componentes originales de Docusaurus
import MDXComponents from '@theme-original/MDXComponents';

// Importamos TUS componentes
import ImageRenderer from '@site/src/components/ImageRenderer';
import VideoPlayer from '@site/src/components/VideoPlayer';

export default {
  // Mantenemos todo lo nativo de Docusaurus
  ...MDXComponents,
  
  // Registramos tus componentes de forma global para que el Markdown los entienda
  ImageRenderer,
  VideoPlayer,
};
