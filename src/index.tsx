import { NativeModules, Platform } from 'react-native';
import {requireNativeComponent} from 'react-native';

export const InsideAdViewManager =
  requireNativeComponent('InsideAdViewManager');

const LINKING_ERROR =
  `The package 'InsideAdModule' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
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

export function initializeSdk(apiKey: string){
  InsideAdModule.initializeSdk(apiKey);
}
export interface IinsideAdEvent{
  event: string;
}