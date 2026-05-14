import React from 'react';
// Importamos los componentes originales de Docusaurus
import MDXComponents from '@theme-original/MDXComponents';

// Importamos TUS componentes
import ImageRenderer from '@site/src/components/ImageRenderer';
import VideoPlayer from '@site/src/components/VideoPlayer';

export default {
  // Mantenemos todo lo nativo de Docusaurus
  ...MDXComponents,
  
  // 1. Esto permite que el Markdown entienda las etiquetas <ImageRenderer /> y <VideoPlayer />
  ImageRenderer,
  VideoPlayer,
  
  // 2. EL ESCUDO: Si alguien arrastra una foto y genera un ![](), esto fuerza a usar tu componente
  img: ImageRenderer,
};
