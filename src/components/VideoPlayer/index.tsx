import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import styles from './styles.module.css';
import {VideoPlayerProps} from './types';
import {normalizeVideoUrl, getPlayerConfig} from './utils/utils';
import Logger from '../../utils/logger';

const Player = ReactPlayer as any
/**
 * Componente para reproducir videos con soporte para recursos locales y plataformas externas
 * 
 * @example,ple
 * ```jsx
 * // Video local
 * < VideoPlayer url="/videos/tutorial.mp4" />
 * 
 * // Video de Youtube
 * < VideoPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
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
    // Estado para controlar si el video está listo
    const [isReady, setIsReady] = useState<boolean>(false);

    // Normalizar la URL del video
    const normalizedUrl = normalizeVideoUrl(url);

    // Obtener configuración especifica del player
    const config = getPlayerConfig(normalizedUrl, autoplay, muted);

    // Estilo para altura fija (si se especifica)
    const wrapperStyle = height ? { height } : undefined;

    return (
        <div
            className={`${styles.playerWrapper} ${height ? styles.fixedHeight : ''} ${className}`}
            style={wrapperStyle}
            >
                {!isReady && <div className={styles.loadingMessage}>Cargando video...</div>}

                <Player
                url={normalizedUrl}
                className={styles.reactPlayer}
                width="100%"
                height="100%"
                controls={controls}
                playing={autoplay}
                loop={loop}
                muted={muted}
                config={config as any}
                onReady={() => setIsReady(true)}
                onError={(e) => Logger.render('Error al cargar video:', e, 'error')} 
                />
        </div>
    );
};

export default VideoPlayer;