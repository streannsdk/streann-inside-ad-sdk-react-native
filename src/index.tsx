import React from 'react';
import { PixelRatio, findNodeHandle } from 'react-native';
import { Dimensions } from 'react-native';
import { UIManager } from 'react-native';
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

export const InsideAd = ({insideAdEvents}) =>{
  const ref = React.useRef(null);
  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);
  const adEvents = ({nativeEvent}:any)=>{
    console.log("adEvents", nativeEvent);
    insideAdEvents(nativeEvent)
  }
  const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.InsideAdViewManager.Commands.create.toString(),
    [viewId],
  );
  const dimensions = Dimensions.get('window');
  const adHeight = Math.round(dimensions.width * 9 / 16);
  const adWidth = dimensions.width;
  return(
    <InsideAdViewManager  
    adEvents={(event:any) => adEvents(event)}
    style={{       
      // converts dpi to px, provide desired height
      height: PixelRatio.getPixelSizeForLayoutSize(adHeight),
        // converts dpi to px, provide desired width
     width: PixelRatio.getPixelSizeForLayoutSize(adWidth),}}
    ref={ref}
  />
  )
}

