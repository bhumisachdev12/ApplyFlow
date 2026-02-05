interface ClientEnvConfig {
  API_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  DEBUG: boolean;
  NODE_ENV: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_NOTIFICATIONS: boolean;
  ENABLE_DARK_MODE: boolean;
  ENABLE_DRAG_DROP: boolean;
}

class ClientEnvironmentValidator {
  private static instance: ClientEnvironmentValidator;
  private config: ClientEnvConfig;

  private constructor() {
    this.config = this.validateAndParseEnv();
  }

  public static getInstance(): ClientEnvironmentValidator {
    if (!ClientEnvironmentValidator.instance) {
      ClientEnvironmentValidator.instance = new ClientEnvironmentValidator();
    }
    return ClientEnvironmentValidator.instance;
  }

  private validateAndParseEnv(): ClientEnvConfig {
    const errors: string[] = [];

    // Validate API URL
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      errors.push('Missing required environment variable: VITE_API_URL');
    } else if (!apiUrl.startsWith('http')) {
      errors.push('VITE_API_URL must be a valid HTTP/HTTPS URL');
    }

    // Validate API timeout
    const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');
    if (isNaN(apiTimeout) || apiTimeout < 1000 || apiTimeout > 120000) {
      errors.push('VITE_API_TIMEOUT must be between 1000 and 120000 milliseconds');
    }

    if (errors.length > 0) {
      console.error('❌ Client environment validation failed:');
      errors.forEach(error => console.error(`  - ${error}`));
      throw new Error('Environment validation failed');
    }

    console.log('✅ Client environment validation passed');

    return {
      API_URL: apiUrl,
      API_TIMEOUT: apiTimeout,
      APP_NAME: import.meta.env.VITE_APP_NAME || 'ApplyFlow',
      APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
      DEBUG: import.meta.env.VITE_DEBUG === 'true',
      NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
      ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
      ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
      ENABLE_DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
      ENABLE_DRAG_DROP: import.meta.env.VITE_ENABLE_DRAG_DROP !== 'false',
    };
  }

  public getConfig(): ClientEnvConfig {
    return this.config;
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isDebugEnabled(): boolean {
    return this.config.DEBUG;
  }

  public printConfig(): void {
    if (this.isDevelopment()) {
      console.log('🔧 Client Environment Configuration:');
      console.log(`  - Environment: ${this.config.NODE_ENV}`);
      console.log(`  - App Name: ${this.config.APP_NAME}`);
      console.log(`  - App Version: ${this.config.APP_VERSION}`);
      console.log(`  - API URL: ${this.config.API_URL}`);
      console.log(`  - API Timeout: ${this.config.API_TIMEOUT}ms`);
      console.log(`  - Debug Mode: ${this.config.DEBUG}`);
      console.log(`  - Analytics: ${this.config.ENABLE_ANALYTICS}`);
      console.log(`  - Notifications: ${this.config.ENABLE_NOTIFICATIONS}`);
      console.log(`  - Dark Mode: ${this.config.ENABLE_DARK_MODE}`);
      console.log(`  - Drag & Drop: ${this.config.ENABLE_DRAG_DROP}`);
    }
  }
}

export default ClientEnvironmentValidator;