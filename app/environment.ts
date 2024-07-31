/* eslint-disable @typescript-eslint/naming-convention */
declare module 'bun' {
  interface LogEnv {
    /**
     * This defaults to `info` if not set.
     */
    LOG_LEVEL?: string;

    /**
     * This defaults to `console` if not set.
     * You can add multiple transports by separating them with a comma.
     * For example: `LOG_TRANSPORTS=console,datadog,file`
     */
    LOG_TRANSPORTS?: 'console' | 'datadog' | 'file';

    /**
     * This defaults to `./storage/logs/app.log` if not set.
     */
    LOG_FILE?: string;

    /**
     * This is unused if you don't add `datadog` to `LOG_TRANSPORTS`.
     * If you use `datadog` as a transport, you must set this.
     */
    LOG_DATADOG_API_KEY?: string;
  }

  interface EncryptionEnv {
    JWT_SECRET_ACCESS_KEY: string;
    JWT_PUBLIC_ACCESS_KEY: string;
    JWT_SECRET_REFRESH_KEY: string;
    JWT_PUBLIC_REFRESH_KEY: string;
    ENCRYPTION_SECRET_KEY: string;
    ENCRYPTION_PUBLIC_KEY: string;
  }

  interface DatabaseEnv {
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_USERNAME: string;

    /**
     * This defaults to `3306` if not set.
     */
    DATABASE_PORT?: string;

    /**
     * This defaults to `db` if not set.
     */
    DATABASE_HOST?: string;
  }

  export interface Env extends LogEnv, EncryptionEnv, DatabaseEnv {
    /**
     * This defaults to `development` if not set.
     */
    NODE_ENV?: string;

    PORT: string;
    APP_NAME: string;
    API_URL: string;
    APP_URL: string;
  }
}
