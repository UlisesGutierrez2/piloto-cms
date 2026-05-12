/**
 * Normaliza la ruta del video manejando tanto rutas con 'static/' como rutas directas
 * Si es una URL externa (http/https), la devuelve sin cambios
 * Si es una ruta local, maneja prefijos y asegura que comience con '/'
 * 
 * @param url - UURL del video a normalizar
 * @returns URL normalizada
 */
export const normalizeVideoUrl = (url: string): string => {
    // 1. Si es una URL externa, devolverla sin cambios
    if (url.startsWith('https://')) {
        return url;
    }

    let videoPath = url;

    // 2. Si empieza con 'static/', remover ese prefijo
    if (videoPath.startsWith('static/')) {
        videoPath = videoPath.replace('static/', '');
    }

    // 3. Si no tiene el prefijo videos/, añadirlo (pero mantener si ya tiene videos sin la barra inicial)
    if(!videoPath.includes('videos/') && !videoPath.startsWith('videos/')) {
        videoPath = `videos/${videoPath}`;
    }

    // 4. Asegurar que comience con '/'
    return videoPath.startsWith('/') ? videoPath : `/${videoPath}`;
};

/**
 * Determina si la URL es un video de Youtube
 * 
 * @param url = URL a verificar
 * @returns Booleano indicando si es un video de Youtube
 */
export const isYoutubeVideo = (url: string): boolean => {
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.hostname === 'www.youtube.com' ||
            parsedUrl.hostname === 'youtu.be'
        );
    } catch  {
        return false;
    }
};

/**
 * Configura los parámetros adicionales para reproductores especificos
 * 
 * @param url = URL del video
 * @param autoplay - Su debe reproducirse automáticamente
 * @param muted - Si debe estar silenciado
 * @returns Objeto con configuración adicional 
 */
export const getPlayerConfig = (url: string, autoplay: boolean, muted: boolean) => {
    // Configuración base
    const config = {
        youtube: {
            playerVars: {
                modestbranding: 1,
                rel: 0,
            } as Record<string, number>,
        },
    };

    // Si es Youtube y autoplay está habilitado, agregamos parámetros adicionales
    if (isYoutubeVideo(url) && autoplay) {
        config.youtube.playerVars = {
            ...config.youtube.playerVars,
            autoplay: 1,
            mute: muted ? 1 : 0,
        };
    }

    return config;
};
