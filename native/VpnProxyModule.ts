import { NativeModules } from 'react-native';

export interface VpnProxyModuleType {
  startVpnProxy(): Promise<boolean>;
  stopVpnProxy(): Promise<boolean>;
  getUsageStats(): Promise<{ sent: number; received: number }>;
}

const { VpnProxyModule } = NativeModules;

export default VpnProxyModule as VpnProxyModuleType;
