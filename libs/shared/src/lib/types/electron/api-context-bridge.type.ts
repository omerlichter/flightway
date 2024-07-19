export interface ApiContextBridge {
  getAppVersion: () => Promise<string>;
  platform: string;
}
