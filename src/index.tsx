import React, { forwardRef, useImperativeHandle } from 'react';
import { findNodeHandle } from 'react-native';
import { UIManager } from 'react-native';
import { NativeModules, Platform } from 'react-native';
import { requireNativeComponent } from 'react-native';

export const InsideAdViewManager: any = requireNativeComponent(
  'InsideAdViewManager'
);

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
interface IinitializeSdkData {
  apiKey: string;
  appDomain?: string;
  siteUrl?: string;
  storeUrl?: string;
  descriptionUrl?: string;
  userBirthYear?: number;
  userGender?: string;
}
export function initializeSdk({
  apiKey,
  appDomain = '',
  descriptionUrl = '',
  siteUrl = '',
  storeUrl = '',
  userBirthYear = 0,
  userGender = '',
}: IinitializeSdkData) {
  InsideAdModule.initializeSdk(
    apiKey,
    appDomain,
    descriptionUrl,
    siteUrl,
    storeUrl,
    userBirthYear,
    userGender
  );
}
export interface IinsideAdEvent {
  eventName:
    | 'insideAdReceived'
    | 'insideAdLoaded'
    | 'insideAdPlay'
    | 'insideAdStop'
    | 'insideAdError';
  payload: string;
}

interface insideAdProps {
  insideAdEvents: Function;
  insideAdWidth: number;
  insideAdHeight: number;
}

export const InsideAd = forwardRef(
  (
    { insideAdEvents, insideAdWidth, insideAdHeight }: insideAdProps,
    parRef
  ) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId);
    }, []);

    useImperativeHandle(parRef, () => ({
      refreshAd() {
        const viewId = findNodeHandle(ref.current);
        createFragment(viewId);
      },
    }));

    const adEvents = ({ nativeEvent }: any) => {
      const event = nativeEvent.event.split(/:(.*)/s);
      const eventName: string = event[0];
      const payload: string = event[1];
      insideAdEvents({ eventName: eventName, payload: payload });
    };

    const createFragment = (viewId: number | null) =>
      UIManager.dispatchViewManagerCommand(
        viewId,
        // we are calling the 'create' command
        //@ts-ignore
        UIManager.InsideAdViewManager.Commands.create.toString(),
        [viewId]
      );

    return (
      <InsideAdViewManager
        adEvents={(event: any) => adEvents(event)}
        style={{
          // converts dpi to px, provide desired height
          height: insideAdHeight,
          // converts dpi to px, provide desired width
          width: insideAdWidth,
        }}
        ref={ref}
      />
    );
  }
);
