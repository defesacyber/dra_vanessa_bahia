// Environment configuration for frontend
// NOTE: API keys should NEVER be exposed in frontend code
// All API calls go through our backend which holds the secrets
export const env = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
    APP_ENV: import.meta.env.MODE,
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
};
