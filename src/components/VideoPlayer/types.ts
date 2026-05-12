/**
 * Props para el componente VideoPlayer.
 */
export interface VideoPlayerProps {
    /**
     * URL del video a reproducir
     * Puede ser una ruta loxal o una URL externa (Youtube, Vimeo, etc.)
     */
    url: string;

    /**
     * Altura personalizada para el contenedor del reproductor (opcional)
     * @default "360px"
     */
    height?: string;

    /**
     * Clases CSS adicionales para el contenedor (opcional)
    */
    className?: string;

    /**
     * Determina si se muestran los controles de reproducción
     * @default true
     */
    controls?: boolean;

    /**
     * Determina si el video debe reproducirse en bucle
     * @default false
     */
    autoplay?: boolean;
     
    /**
     * Determina si el video debe reproducirse en bucle
     * @default false
     */
    loop?: boolean;

    /**
     * Determina si el video debe silenciarse
     * @default false
     */
    muted?: boolean;
}