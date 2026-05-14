import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
// @ts-ignore: Docusaurus inyecta este módulo dinámicamente en compilación
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import {VideoPlayerProps} from './types';
import {normalizeVideoUrl, getPlayerConfig} from './utils/utils';
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

    // 1. Normalizamos lo que escupe el CMS
    const normalizedUrl = normalizeVideoUrl(url);
    const isExternal = normalizedUrl.startsWith('http');

    // 2. REGLA DE ORO: Llamamos a los Hooks siempre arriba, NUNCA después de un return
    const baseUrl = useBaseUrl(normalizedUrl);

    // 3. Armamos la URL de forma segura. Validamos si 'window' existe para que el servidor no falle.
    const finalUrl = isExternal 
        ? normalizedUrl 
        : (typeof window !== 'undefined' ? `${window.location.origin}${baseUrl}` : baseUrl);

    const config = getPlayerConfig(finalUrl, autoplay, muted);
    const wrapperStyle = height ? { height } : undefined;

    // 4. AHORA SÍ, si estamos en el servidor, detenemos el renderizado
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
                config={config}
                onReady={() => setIsReady(true)}
                onError={(e: any) => Logger.render('Error al cargar video:', e, 'error')} 
            />
        </div>
    );
};

export default VideoPlayer;