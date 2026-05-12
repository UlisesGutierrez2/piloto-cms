import React, { useState, useRef, useCallback, useEffect} from "react";
import { useColorMode  } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import { ImageRendererProps, ZoomPanState } from "./types";
import {
    normalizePath,
    formatMaxWidth,
    calculateNewScale,
    getTransformStyle,
    formatZoomPercentage
} from './utils/utils';

/**
 * Componente para modo oscuro.
 * pie de imagen, estilos responsivos y funcionalidades de pantalla completa con zoom y pan
 */
const ImageRenderer: React.FC<ImageRendererProps> = ({
    src,
    alt = "image",
    maxWidth,
    className = "",
    caption,
    darkSrc,
    enableFullScreen = false,
    initialZoom = 1,
    minZoom = 0.5,
    maxZoom = 3
}) => {
    // Estados para el modal y zoom/pan
    const [isModalOpeen, setIsModalOpen] = useState(false);
    const [zoomPanState, setZoomPanState] = useState<ZoomPanState>({
        scale: initialZoom,
        x: 0,
        y: 0
    });
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    
    // Referencias
    const modalImageRef = useRef<HTMLImageElement>(null);

    // Obtener el modo de color actual
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    // Determinar que imagen mostrar según el modo 
    const imageSrc = isDarkMode && darkSrc ? normalizePath(darkSrc) : normalizePath(src);

    // Formatear el ancho máximo para Css
    const formattedMaxWidth = formatMaxWidth(maxWidth);

    // Abrir el modal
    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setZoomPanState({ scale: initialZoom, x: 0, y: 0 });
    }, [initialZoom]);

    // Cerrar el modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setZoomPanState({ scale: initialZoom, x: 0, y: 0 });
        setIsDragging(false);
    }, [initialZoom]);

    // Resetear zoom
    const resetZoom = useCallback(() => {
        setZoomPanState({ scale: 1, x: 0, y: 0 });
    }, []);

    // Manejar inicio de arrastre
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - zoomPanState.x,
            y: e.clientY - zoomPanState.y,
        });
    }, [zoomPanState]);

    // Manejar movimiento de arrastre
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;

            setZoomPanState((prev) => ({
                ...prev,
                x: newX,
                y: newY,
            }));
        }
    }, [isDragging, dragStart]);

    // Manejar fin de arrastre
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Manejar arrastre global (cuando sale del elemento)
    const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;

            setZoomPanState((prev) => ({
                ...prev,
                x: newX,
                y: newY,
            }));
        }
    }, [isDragging, dragStart]);

    const handleGlobalMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Manejar wheel para zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        const newScale = calculateNewScale(zoomPanState.scale, delta, minZoom, maxZoom);
        
        // Calcular zoom centrado en la posición del moude
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const scaleFactor = newScale / zoomPanState.scale;
        const newX = zoomPanState.x - mouseX * (scaleFactor - 1);
        const newY = zoomPanState.y - mouseY * (scaleFactor - 1);

        setZoomPanState({
            scale: newScale,
            x: newX,
            y: newY,
        });
    }, [zoomPanState, minZoom, maxZoom]);

    // Manejar teclas
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isModalOpeen) return; 
        
        switch (e.key) {
            case "Enter":
                closeModal();
                break;
            case "0":
                resetZoom();
                break;
            }
        }, [isModalOpeen, closeModal, resetZoom]);

        // Efecto para manejar eventos del teclado y mouse
        useEffect(() => {
            if (isModalOpeen) {
                document.addEventListener("keydown", handleKeyDown);
                document.addEventListener("mousemove", handleGlobalMouseMove);
                document.addEventListener("mouseup", handleGlobalMouseUp);
                document.body.style.overflow = "hidden";

                return () => {
                    document.addEventListener("keydown", handleKeyDown);
                    document.addEventListener("mousemove", handleGlobalMouseMove);
                    document.addEventListener("mouseup", handleGlobalMouseUp);
                    document.body.style.overflow = "auto";
                };
            };
        }, [isModalOpeen, handleKeyDown, handleGlobalMouseMove, handleGlobalMouseUp]);

        // Manejar carga de imagen para obtener dimensiones
        const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.currentTarget;
            setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };

        return (
            <>
                <figure className={`${styles.imageWrapper} ${className}`}>
                    <div
                        className={styles.imageContainer}
                        style={formattedMaxWidth ? {maxWidth: formattedMaxWidth} : undefined}
                    >
                        <img
                            src={imageSrc}
                            alt={alt}
                            className={styles.image}
                            loading="lazy"
                        />
                        {enableFullScreen && (
                            <button
                                className={styles.fullScreenButton}
                                onClick={openModal}
                                aria-label="Ver en pantalla completa"
                                title="Ver en pantalla completa"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    {caption && (
                        <figcaption className={styles.caption}>
                            {caption}
                        </figcaption>
                    )}
                </figure>

                {/* Modal de pantalla completa */}
                {isModalOpeen && (
                    <div
                     className={`${styles.modal} ${isDragging ? styles.dragging : ''}`}
                     onWheel={handleWheel}
                    >
                        <div 
                            className={`${styles.modalContent} ${isDragging ? styles.dragging : ''}`}
                        >
                        
                            <img
                                ref={modalImageRef}
                                src={imageSrc}
                                alt={alt}
                                className={styles.modalImage}
                                style={{ transform: getTransformStyle(zoomPanState) }}
                                onLoad={handleImageLoad}
                                draggable={false}
                            />
                        </div>

                        {/* Controles del modal */}
                        <div className={styles.modalControls}>
                            <button
                                className={styles.modalButton}
                                onClick={resetZoom}
                                aria-label="Resetear zoom"
                                title="Ajuistar a pantalla (0)"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 5.83L15.17 911.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 151-1.41 1.41L12 2114.59-4.59-4.59-4.59L15.17 15 12 18.17z"/>
                              </svg>
                            </button>

                            <button
                                className={styles.modalButton}
                                onClick={closeModal}
                                aria-label="Cerrar"
                                title="Cerrar (Esc)"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                    </div>

                    {/* Informaciión de zoom e instrucciones */}
                    <div className={styles.zoomInfo}>
                        <div>{formatZoomPercentage(zoomPanState.scale)}</div>
                        <div className={styles.instructions}>
                            Rueda: Zoom • Arrastrar: Mover • 0: Ajustar a pantalla • Esc: Cerrar 

                        </div>
                    </div>
                </div>
                )}
            </>
        );
    };
    
export default ImageRenderer;
