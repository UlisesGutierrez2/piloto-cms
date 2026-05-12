/**
 * Props para el componente ImageRenderer.
 */
export interface ImageRendererProps {
    /**
     * Ruta de la imagen a renderizar.
     * Puede ser una ruta relatica o absoluta.
     */
    src: string;

    /**
     * Texto altenativo para la imagen
     * Importante para accesibilidad
     * @default 'image'
     */
    alt?: string;

    /**
     * Ancho máximo de la imagen (opcional)
     * Puede ser un valor numerico (px) o string CSS
     */
    maxWidth?: string | number;

    /**
     * Clases CSS adicionales para el contenedor de la imagen.
     */
    className?: string;

    /**
     * Texto para mostrar como pie de imagen (opcional)
     */
    caption?: string;

    /**
     * Versión de la imagen para modo oscuro (opcional).
     * Si se proporciona, se usará esta imagen en lugar de la imagen en modo oscuro.
     */
    darkSrc?: string;

    /**
     * Habilita el botón de pantalla completa con funcionalidades de zoom y pan.}
     * @default false
     */
    enableFullScreen?: boolean;

    /**
     * Zoom inicial en el modal de pantalla completa
     * @default 1
     */
    initialZoom?: number;

    /**
     * Zoom minimo permitido.
     * @default 1
    */
    minZoom?: number;

    /**
     * Zoom máximo permitido.
     * @default 0.5
     */
    maxZoom?: number;
}

/**
 * Estado para el zoom y pan 
 */
export interface ZoomPanState {
    scale: number;
    x: number;
    y: number;
}