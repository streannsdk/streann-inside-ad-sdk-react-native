import React, { forwardRef, useImperativeHandle } from 'react';
import { PixelRatio, findNodeHandle } from 'react-native';
import { Dimensions } from 'react-native';
import { UIManager } from 'react-native';
import { NativeModules, Platform } from 'react-native';
import {requireNativeComponent} from 'react-native';

export const InsideAdViewManager:any =
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

export const InsideAd = forwardRef(({insideAdEvents, insideAdWidth, insideAdHeight} : any, parRef) =>{

  const ref = React.useRef(null);
  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  useImperativeHandle(parRef, () => ({
    refreshAd(){
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId)
    }
  }));

  const adEvents = ({nativeEvent}:any)=>{ 
    const event = nativeEvent.event.split(/:(.*)/s)
    const eventName = event[0]
    insideAdEvents({eventName:eventName,payload:event[1]})
  }
  const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    //@ts-ignore
    UIManager.InsideAdViewManager.Commands.create.toString(),
    [viewId],
  );

  return(
    <InsideAdViewManager  
    adEvents={(event:any) => adEvents(event)}
    style={{       
      // converts dpi to px, provide desired height
      height: insideAdHeight,
      // converts dpi to px, provide desired width
      width: insideAdWidth,
    }}
    ref={ref}
  />
  )
})

