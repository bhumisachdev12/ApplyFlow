// Server Feature Toggle Utility for ApplyFlow
// ============================================

interface ServerFeatureFlags {
  analytics: boolean;
  swagger: boolean;
  debugLogs: boolean;
}

class ServerFeatureToggle {
  private static instance: ServerFeatureToggle;
  private features: ServerFeatureFlags;

  private constructor() {
    this.features = this.loadFeatures();
  }

  public static getInstance(): ServerFeatureToggle {
    if (!ServerFeatureToggle.instance) {
      ServerFeatureToggle.instance = new ServerFeatureToggle();
    }
    return ServerFeatureToggle.instance;
  }

  private loadFeatures(): ServerFeatureFlags {
    return {
      analytics: process.env.ENABLE_ANALYTICS === 'true',
      swagger: process.env.ENABLE_SWAGGER === 'true',
      debugLogs: process.env.ENABLE_DEBUG_LOGS === 'true',
    };
  }

  // Feature check methods
  public isAnalyticsEnabled(): boolean {
    return this.features.analytics;
  }

  public isSwaggerEnabled(): boolean {
    return this.features.swagger;
  }

  public areDebugLogsEnabled(): boolean {
    return this.features.debugLogs;
  }

  // Get all features status
  public getAllFeatures(): ServerFeatureFlags {
    return { ...this.features };
  }

  // Debug info
  public printFeatures(): void {
    if (this.areDebugLogsEnabled()) {
      console.log('🎛️ Server Feature Toggles Status:');
      console.log(`  Analytics: ${this.features.analytics ? '✅' : '❌'}`);
      console.log(`  Swagger: ${this.features.swagger ? '✅' : '❌'}`);
      console.log(`  Debug Logs: ${this.features.debugLogs ? '✅' : '❌'}`);
    }
  }
}

// Export singleton instance
export const serverFeatureToggle = ServerFeatureToggle.getInstance();

// Export individual feature checks for convenience
export const isAnalyticsEnabled = () => serverFeatureToggle.isAnalyticsEnabled();
export const isSwaggerEnabled = () => serverFeatureToggle.isSwaggerEnabled();
export const areDebugLogsEnabled = () => serverFeatureToggle.areDebugLogsEnabled();