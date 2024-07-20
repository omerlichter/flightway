export interface ApiContextBridge {
  getAppVersion: () => Promise<string>;
  getAppPlatform: () => Promise<string>;
}
