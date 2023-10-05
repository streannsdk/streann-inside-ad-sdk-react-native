import { NativeModules, Platform } from 'react-native';
import {requireNativeComponent} from 'react-native';

export const InsideAdViewManager =
  requireNativeComponent('InsideAdViewManager');

const LINKING_ERROR =
  `The package 'react-native-awesome-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
console.log('NativeModules', NativeModules.InsideAdModule)
const InsideAdModule = NativeModules.InsideAdModule
  ? NativeModules.InsideAdModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return InsideAdModule.multiply(a, b);
}

export function initializeSdk(apiKey: string){
  InsideAdModule.initializeSdk(apiKey);
}
