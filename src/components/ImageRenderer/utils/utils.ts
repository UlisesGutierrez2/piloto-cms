import { ZoomPanState } from '../types';

/** 
 * Normaliza una ruta de imagen manejando tanto rutas 'static/' como rutas directas
 * @param src La ruta de la imagen a normalizar
 * @return La ruta de imagen normalizada
 */
export const normalizePath = (path: string): string => {
    // 1. Si la URL ya es completa, usarla directamente
    if (path.startsWith('https://')) {
        return path;
    }

    // 2. Si la ruta comienza con 'static/', eliminar ese prefijo
    if (path.startsWith('static/')) {
        path = path.replace('static/', '');
    }

        // 3. Asegurar que comience con './' para que sea relativa al directorio actual
        return path.startsWith('/') ? path : `/${path}`;
};


/**
 * Formatea el valor de ancho máximo para aplicarlo como estilo CSS
 * 
 * @param maxWidth - Ancho máximo como número o string
 * @returns Valor formateado para CSS
 *  */
export const formatMaxWidth = (maxWidth?: string | number): string | undefined => {
    if (maxWidth === undefined) {
        return undefined;    
    }
    
    return typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
};

/**
 * Calcula la nueva eescala dentro de los limites permitidos
 * 
 * @param currentScale - Escala actual
 * @param delta - Cambio en la escala
 * @param minZoom - Zoom minimo permitido
 * @param maxZoom - Zoom máximo permitido
 * @returns Nueva escala calculada
 */
export const calculateNewScale = (
    currentScale: number,
    delta: number,
    minZoom: number,
    maxZoom: number
    ): number => {
        const newScale = currentScale + delta;
        return Math.min(Math.max(newScale, minZoom), maxZoom);
    };

/**
 * Calcula la transformación CSS para zoom y pan
 * 
 * @param state - Estado actual de zoom y pan
 * @returns String de transformación CSS
 */
export const getTransformStyle = (state: ZoomPanState): string => {
    return `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
};

/**
 * Formatea el valor de zoom para mostrar como porcentaje
 * 
 * @param scale - Valor de escala
 * @returns Porcentaje formateado
 */
export const formatZoomPercentage = (scale: number) : string => {
    return `${Math.round(scale * 100)}%`;
};