import { DEBUG_CONFIG, LogModule, LogLevel } from '../config/debug'

class Logger {
    /**
     * Sanitiza datos sensibles antes del logging
     * @param data - Datos a sanitizar
     * @returns Datos con información sensible ofuscada
     */
    private static sanitizeData(data: any): any {
        if (typeof data === 'string') {
            // Detectar tokens JWT (empieza con eyJ), access tokens, refresh tokems, etc.
            return data.replace(
                /(bearer\s+|token[:\s=]|refresh_token[:\s=])(eyJ[A-Za-z0-9_-]+\.?[A-Za-z0-9_-]*|[a-f0-9-]{8,}|[A-Za-z0-9+/=]{32,})/gi,
                '$1[TOKEN_SANITIZED]'    
            );
        }

        if (typeof data === 'object' && data !== null) {
            const sensitiveKeys = [
                'access_token', 'accesstoken', 'refresh_token', 'refreshtoken',
                'token', 'password', 'secret', 'key', 'authorization',
                'credential', 'credentials', 'bearer', 'client_secret',
                'id_token', 'idtoken'
            ];

            const cleaned: Record<string, any> = Array.isArray(data) ? [...data] : { ...data };

            for (const key in cleaned) {
                const keyLower = key.toLowerCase();
                // Verificar si la key contiene términos sensibles
                if(sensitiveKeys.some(sk => keyLower.includes(sk))) {
                    cleaned[key] = ['SANITIZED'];
                }
                // Tambien verifica el valor si es string y parece un token JWT
                else if (typeof cleaned[key] === 'string' && cleaned[key].startsWith('eyJ')) {
                    cleaned[key] = '[JWT_TOKEN_SANITIZED]';
                }
                // Recursión para objetos anidados
                else if (typeof cleaned[key] === 'object' && cleaned[key] !== null) {
                    cleaned[key] = this.sanitizeData(cleaned[key])
                }
                // Sanitizar strings que no son keys pero contienen tokens
                else if (typeof cleaned[key] === 'string') {
                    cleaned[key] = this.sanitizeData(cleaned[key]);
                }
            }
                return cleaned;
        }

            return data;
}

/**
 * Log principal con control del módulo
 */
static log(module: LogModule, message: string, data?: any, level: LogLevel = 'log') {
    // Verificicar si logging está habilitado globalmente
    if (!DEBUG_CONFIG.enabled) return;

    // Verificar si el módulo específico está habilitado
    if(!DEBUG_CONFIG[module]) return;

    // Verificar el nivel de log
    if (DEBUG_CONFIG.logLevel === 'none') return;
    if (DEBUG_CONFIG.logLevel === 'error' && level !== 'error') return;
    if(DEBUG_CONFIG.logLevel == 'warn' && !['warn', 'error'].includes(level)) return;

    // Construir el mensaje
    const timestamp = DEBUG_CONFIG.showTimestamp ? `[$(new Date().toLocaleTimeString()}] ` : '';
    const emoji = DEBUG_CONFIG.showEmojis ? this.getEmoji(module, level) : '';
    const moduleTag = `[${module}]`;
    const finalMessage = `${timestamp}${emoji} ${moduleTag} ${message}`;

    // Sanitizar data antes de loggear
    const sanitizeData = this.sanitizeData(data);

    // Enviar al console apropiado
    switch(level) {
        case 'error':
            console.error(finalMessage,sanitizeData);
            break;
        case 'warn':
            console.warn(finalMessage, sanitizeData);
            break;
        default:
            // Evitar console.log, usar console.warn para info
            console.warn(finalMessage, sanitizeData); 
        }
    }

    /**
     * Métodos de conveniencia para cada módulo
     */
    static auth(message: string, data?: any, level: LogLevel = 'log') {
        this.log('auth', message, data, level)
    }

    static msal(message: string, data?: any, level: LogLevel = 'log') {
        this.log('msal', message, data, level)
    }

    static storage(message: string, data?: any, level: LogLevel = 'log') {
        this.log('storage', message, data, level);
    }

    static sync(message: string, data?: any, level: LogLevel = 'log') {
        this.log('sync', message, data, level);
    }

    static render(message: string, data?: any, level: LogLevel = 'error') {
        this.log('render', message, data, level)
    }

    static errors(message: string, data?: any, level: LogLevel = 'error') {
        this.log('errors', message, data, level);
    }

    /**
     * Obtener emoji apropiado para el módulo y nivel
     */
    private static getEmoji(module: LogModule, level: LogLevel): string {
        if(level === 'error') return '❌';
        if(level === 'warn') return '⚠️';

        const emojiMap: Record<LogModule, string> = {
            auth: '🔐',
            msal: '🏗️',
            storage: '💾',
            sync: '🔄',
            render: '🎨',
            errors: '❌'
        }; 

        return emojiMap[module] || '📝';
    }

    /**
     * Métodos para el control dinámico
     */
    static enable(module?: LogModule) {
        if(module) {
            DEBUG_CONFIG[module] = true;
        } else {
            DEBUG_CONFIG.enabled = true;
        }
    }

    static disable(module?: LogModule) {
        if(module) {
            DEBUG_CONFIG[module] = false;
        } else {
            DEBUG_CONFIG.enabled = false;
        }
    }

    static getConfig() {
        return { ...DEBUG_CONFIG };
    }
}

export default Logger;