

export interface BaseConfig {
    env: string;
    apiUrl: string;
    appUrl: string;
    appName: string;
}

const initializeBaseConfig = (): BaseConfig => {
    const { NODE_ENV, API_URL, APP_URL, APP_NAME } = Bun.env;

    if (!NODE_ENV || !API_URL || !APP_URL || !APP_NAME) {
        throw new Error('Missing environment variables');
    }

    const config: BaseConfig = {
        env: NODE_ENV,
        apiUrl: API_URL,
        appUrl: APP_URL,
        appName: APP_NAME,
    };

    return config;
};

export const baseConfig = initializeBaseConfig();
