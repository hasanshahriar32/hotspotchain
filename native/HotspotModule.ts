import { NativeModules } from 'react-native';

export interface HotspotModuleType {
  enableHotspot(ssid: string, password: string): Promise<boolean>;
  disableHotspot(): Promise<boolean>;
  getHotspotStatus(): Promise<'ENABLED' | 'DISABLED' | 'UNKNOWN'>;
}

const { HotspotModule } = NativeModules;

export default HotspotModule as HotspotModuleType;
