import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUNDS: number;
  CORS_ORIGIN: string;
  API_VERSION: string;
}

class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private config: EnvConfig;

  private constructor() {
    this.config = this.validateAndParseEnv();
  }

  public static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }

  private validateAndParseEnv(): EnvConfig {
    const errors: string[] = [];

    // Required environment variables
    const requiredVars = [
      'MONGODB_URI',
      'JWT_SECRET',
    ];

    // Check required variables
    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        errors.push(`Missing required environment variable: ${varName}`);
      }
    });

    // Validate JWT secret strength
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      errors.push('JWT_SECRET must be at least 32 characters long for security');
    }

    // Validate MongoDB URI format
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
      errors.push('MONGODB_URI must be a valid MongoDB connection string');
    }

    // Validate PORT
    const port = parseInt(process.env.PORT || '5000');
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push('PORT must be a valid port number (1-65535)');
    }

    // Validate NODE_ENV
    const validEnvs = ['development', 'production', 'test'];
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (!validEnvs.includes(nodeEnv)) {
      errors.push(`NODE_ENV must be one of: ${validEnvs.join(', ')}`);
    }

    // Validate BCRYPT_SALT_ROUNDS
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    if (isNaN(saltRounds) || saltRounds < 4 || saltRounds > 20) {
      errors.push('BCRYPT_SALT_ROUNDS must be between 4 and 20');
    }

    if (errors.length > 0) {
      console.error('❌ Environment validation failed:');
      errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    console.log('✅ Environment validation passed');

    return {
      PORT: port,
      NODE_ENV: nodeEnv,
      MONGODB_URI: process.env.MONGODB_URI!,
      JWT_SECRET: process.env.JWT_SECRET!,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
      BCRYPT_SALT_ROUNDS: saltRounds,
      CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
      API_VERSION: process.env.API_VERSION || 'v1',
    };
  }

  public getConfig(): EnvConfig {
    return this.config;
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  public printConfig(): void {
    console.log('🔧 Environment Configuration:');
    console.log(`  - Environment: ${this.config.NODE_ENV}`);
    console.log(`  - Port: ${this.config.PORT}`);
    console.log(`  - API Version: ${this.config.API_VERSION}`);
    console.log(`  - Database: ${this.config.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    console.log(`  - JWT Expires: ${this.config.JWT_EXPIRES_IN}`);
    console.log(`  - CORS Origin: ${this.config.CORS_ORIGIN}`);
    console.log(`  - Salt Rounds: ${this.config.BCRYPT_SALT_ROUNDS}`);
  }
}

export default EnvironmentValidator;