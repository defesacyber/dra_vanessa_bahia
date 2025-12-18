import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
  
  // Production: JSON logs for log aggregators
  ...(!isDev && {
    formatters: {
      level: (label: string) => ({ level: label }),
      bindings: () => ({}),
    },
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  }),
  
  // Base fields for all logs
  base: {
    service: 'tempera-api',
    version: process.env.npm_package_version || '1.0.0',
  },
});
