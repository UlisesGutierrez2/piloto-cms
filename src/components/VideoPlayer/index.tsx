import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
// @ts-ignore
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import {VideoPlayerProps} from './types';
import {normalizeVideoUrl, getPlayerConfig} from './utils/utils';
import Logger from '../../utils/logger';

const Player = ReactPlayer as any;

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

    useEffect(() => {
        setIsClient(true);
    }, []);

    // 1. Limpiamos y evaluamos la URL
    const normalizedUrl = normalizeVideoUrl(url);
    const isExternal = normalizedUrl.startsWith('http');
    const baseUrl = useBaseUrl(normalizedUrl);

    if (!isClient) return null;

    const wrapperStyle = height ? { height } : undefined;

    return (
        <div className={`${styles.playerWrapper} ${height ? styles.fixedHeight : ''} ${className}`} style={wrapperStyle}>
            
            {/* RENDERIZADO CONDICIONAL: 
                Si es YouTube, usamos ReactPlayer. 
                Si es un archivo local, usamos el reproductor nativo invencible de HTML5 */}
            
            {isExternal ? (
                <Player
                    url={normalizedUrl}
                    className={styles.reactPlayer}
                    width="100%"
                    height="100%"
                    controls={controls}
                    playing={autoplay}
                    loop={loop}
                    muted={muted}
                    config={getPlayerConfig(normalizedUrl, autoplay, muted)}
                    onError={(e: any) => Logger.render('Error ReactPlayer:', e, 'error')} 
                />
            ) : (
                <video
                    src={baseUrl}
                    className={styles.reactPlayer}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    controls={controls}
                    autoPlay={autoplay}
                    loop={loop}
                    muted={muted}
                    controlsList="nodownload" // Evita que lo descarguen
                    onError={() => Logger.render('Error reproductor nativo', 'Fallo al cargar video local', 'error')}
                />
            )}
            
        </div>
    );
};

export default VideoPlayer;