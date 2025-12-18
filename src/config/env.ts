// Environment configuration for frontend
// NOTE: API keys should NEVER be exposed in frontend code
// All API calls go through our backend which holds the secrets

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __importMeta: ImportMeta;

export const env = {
  API_BASE_URL: (import.meta as unknown as ImportMeta).env.VITE_API_BASE_URL || '',
  APP_ENV: (import.meta as unknown as ImportMeta).env.MODE as 'development' | 'production' | 'test',
  IS_DEV: (import.meta as unknown as ImportMeta).env.DEV,
  IS_PROD: (import.meta as unknown as ImportMeta).env.PROD,
};
