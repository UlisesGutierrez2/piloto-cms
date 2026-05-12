// Configuración cventral para debug/logging
export const DEBUG_CONFIG = {
    // Control general
    enabled: false, // Master switch para todo el logging

    // Modulos especificos
    auth: true,         // logs de autenticacion (useAuthWithLocalStorage)
    msal: true,         // logs de MSAL(Root.tsx, inicialización)
    storage: true,      // logs de localStorage
    sync: true,         // logs de sincronización entre pestañas
    render: true,       // logs de renderizado de componentes
    errors: true,       // logs de errores

    // Configuración avanzada
    showTimestamp: true,        // mostrar timestamp en logs
    showEmojis: true,           // mostrar emojis en logs
    logLevel: 'all' as 'all' | 'warn' | 'error' | 'none'
};

// Tipos para mejor tipado
export type LogModule = keyof Omit<typeof DEBUG_CONFIG, 'enabled' | 'showTimestamp' | 'showEmojis' | 'logLevel'>;
export type LogLevel = 'log' | 'warn' | 'error';