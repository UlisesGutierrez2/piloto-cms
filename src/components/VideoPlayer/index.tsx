import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
// @ts-ignore: Docusaurus inyecta este módulo dinámicamente en compilación
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import {VideoPlayerProps} from './types';
import {normalizeVideoUrl, getPlayerConfig} from './utils/utils';
import Logger from '../../utils/logger';

const Player = ReactPlayer as any

/**
 * Componente para reproducir videos con soporte para recursos locales y plataformas externas
 * * @example
 * ```jsx
 * // Video local
 * < VideoPlayer url="/videos/tutorial.mp4" />
 * * // Video de Youtube
 * < VideoPlayer url="[https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" />
 * ```
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
    url,
    height,
    className = '',
    controls = true,
    autoplay = false,
    loop = false,
    muted = false
}) => {
    // Estados para controlar que el video solo cargue en el navegador (no en el server)
    const [isClient, setIsClient] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);

    // Truco anti-SSR
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Normalizar la URL
    const normalizedUrl = normalizeVideoUrl(url);

    // Usar la magia de Docusaurus para rutas locales
    const isExternal = normalizedUrl.startsWith('http');
    const finalUrl = isExternal ? normalizedUrl : useBaseUrl(normalizedUrl);

    // Obtener configuración especifica del player (usando finalUrl)
    const config = getPlayerConfig(finalUrl, autoplay, muted);

    // Estilo para altura fija (si se especifica)
    const wrapperStyle = height ? { height } : undefined;

    // Si aún no estamos en el navegador del usuario, devolvemos null
    if (!isClient) return null;

    return (
        <div
            className={`${styles.playerWrapper} ${height ? styles.fixedHeight : ''} ${className}`}
            style={wrapperStyle}
            >
                {!isReady && <div className={styles.loadingMessage}>Cargando video...</div>}

                <Player
                url={finalUrl}
                className={styles.reactPlayer}
                width="100%"
                height="100%"
                controls={controls}
                playing={autoplay}
                loop={loop}
                muted={muted}
                config={config as any}
                onReady={() => setIsReady(true)}
                onError={(e: any) => Logger.render('Error al cargar video:', e, 'error')} 
                />
        </div>
    );
};

export default VideoPlayer;