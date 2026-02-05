// Feature Toggle Utility for ApplyFlow
// ====================================

interface FeatureFlags {
  analytics: boolean;
  darkMode: boolean;
  notifications: boolean;
  dragDrop: boolean;
  debug: boolean;
}

class FeatureToggle {
  private static instance: FeatureToggle;
  private features: FeatureFlags;

  private constructor() {
    this.features = this.loadFeatures();
  }

  public static getInstance(): FeatureToggle {
    if (!FeatureToggle.instance) {
      FeatureToggle.instance = new FeatureToggle();
    }
    return FeatureToggle.instance;
  }

  private loadFeatures(): FeatureFlags {
    return {
      analytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
      darkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
      notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
      dragDrop: import.meta.env.VITE_ENABLE_DRAG_DROP !== 'false',
      debug: import.meta.env.VITE_DEBUG === 'true',
    };
  }

  // Feature check methods
  public isAnalyticsEnabled(): boolean {
    return this.features.analytics;
  }

  public isDarkModeEnabled(): boolean {
    return this.features.darkMode;
  }

  public areNotificationsEnabled(): boolean {
    return this.features.notifications;
  }

  public isDragDropEnabled(): boolean {
    return this.features.dragDrop;
  }

  public isDebugEnabled(): boolean {
    return this.features.debug;
  }

  // Runtime toggle methods (for development)
  public toggleAnalytics(): void {
    this.features.analytics = !this.features.analytics;
    this.logToggle('Analytics', this.features.analytics);
  }

  public toggleDarkMode(): void {
    this.features.darkMode = !this.features.darkMode;
    this.logToggle('Dark Mode', this.features.darkMode);
  }

  public toggleNotifications(): void {
    this.features.notifications = !this.features.notifications;
    this.logToggle('Notifications', this.features.notifications);
  }

  public toggleDragDrop(): void {
    this.features.dragDrop = !this.features.dragDrop;
    this.logToggle('Drag & Drop', this.features.dragDrop);
  }

  private logToggle(feature: string, enabled: boolean): void {
    if (this.isDebugEnabled()) {
      console.log(`🔧 Feature Toggle: ${feature} ${enabled ? 'enabled' : 'disabled'}`);
    }
  }

  // Get all features status
  public getAllFeatures(): FeatureFlags {
    return { ...this.features };
  }

  // Debug info
  public printFeatures(): void {
    if (this.isDebugEnabled()) {
      console.log('🎛️ Feature Toggles Status:');
      console.log(`  Analytics: ${this.features.analytics ? '✅' : '❌'}`);
      console.log(`  Dark Mode: ${this.features.darkMode ? '✅' : '❌'}`);
      console.log(`  Notifications: ${this.features.notifications ? '✅' : '❌'}`);
      console.log(`  Drag & Drop: ${this.features.dragDrop ? '✅' : '❌'}`);
      console.log(`  Debug Mode: ${this.features.debug ? '✅' : '❌'}`);
    }
  }
}

// Export singleton instance
export const featureToggle = FeatureToggle.getInstance();

// Export individual feature checks for convenience
export const isAnalyticsEnabled = () => featureToggle.isAnalyticsEnabled();
export const isDarkModeEnabled = () => featureToggle.isDarkModeEnabled();
export const areNotificationsEnabled = () => featureToggle.areNotificationsEnabled();
export const isDragDropEnabled = () => featureToggle.isDragDropEnabled();
export const isDebugEnabled = () => featureToggle.isDebugEnabled();

// Development helper - expose to window in dev mode
if (import.meta.env.VITE_DEBUG === 'true') {
  (window as any).featureToggle = featureToggle;
}