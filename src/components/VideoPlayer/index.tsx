import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
// @ts-ignore
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import {VideoPlayerProps} from './types';
import {normalizeVideoUrl} from './utils/utils';
import Logger from '../../utils/logger';

const Player = ReactPlayer as any

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    url,
    height,
    className = '',
    controls = true,
    autoplay = false,
    loop = false,
    muted = false
}) => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // 1. Limpiamos la URL
    const normalizedUrl = normalizeVideoUrl(url);
    const isExternal = normalizedUrl.startsWith('http');
    
    // 2. Ruta segura
    const baseUrl = useBaseUrl(normalizedUrl);

    if (!isClient) return null;

    // 3. EL TRUCO DEFINITIVO: Si es local, le pasamos un array estructurado. 
    // Esto obliga a React Player a crear la etiqueta <source src="..." type="video/mp4" />
    const playerUrl = isExternal 
        ? normalizedUrl 
        : [{ src: baseUrl, type: 'video/mp4' }];

    const config = {
        youtube: { playerVars: { showinfo: 0, controls: 1 } },
        file: {
            attributes: { controlsList: 'nodownload' }
        }
    };

    const wrapperStyle = height ? { height } : undefined;

    return (
        <div className={`${styles.playerWrapper} ${height ? styles.fixedHeight : ''} ${className}`} style={wrapperStyle}>
            {!isReady && <div className={styles.loadingMessage}>Cargando video...</div>}

            <Player
                url={playerUrl}
                className={styles.reactPlayer}
                width="100%"
                height="100%"
                controls={controls}
                playing={autoplay}
                loop={loop}
                muted={muted}
                config={config}
                onReady={() => setIsReady(true)}
                onError={(e: any) => Logger.render('Error al cargar video:', e, 'error')} 
            />
        </div>
    );
};

export default VideoPlayer;