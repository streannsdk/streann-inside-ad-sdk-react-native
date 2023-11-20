import * as React from 'react';
import {NativeEventEmitter, requireNativeComponent} from 'react-native';
import { NativeModules, Button, Dimensions, PixelRatio, StyleSheet, View } from 'react-native';
import {
  RNShareComp,
  initializeSdk,
  InsideAd,
  type IinsideAdEvent,
} from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const insideAdRef = React.useRef<{ refreshAd: Function }>();
  const { RNShare, InsideAdSdk, SDKEventEmitter } = NativeModules;
  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(SDKEventEmitter);
    InsideAdSdk.initializeSdk("https://inside-ads.services.c1.streann.com", "559ff7ade4b0d0aff40888dd")
    eventEmitter.addListener("StreannInsideAdSDK Log: Loaded", (event) => {
      console.log("ANOTHER STRING ARRIVED");
    });
    eventEmitter.addListener("No Ads VAST response after one or more Wrappers", (event) => {
      console.log("String ARRIVED");
    });
    // const eventEmitter = new NativeEventEmitter(SDKEventEmitter);
  }, []);

  const adEvents = (event: IinsideAdEvent) => {
    console.log('adEvents', event.eventName);
  };
  const refreshAd = () => {
    if (insideAdRef.current) insideAdRef.current.refreshAd();
  };
  const dimensions = Dimensions.get('window');
  const adHeight = Math.round((dimensions.width * 9) / 16);
  const adWidth = dimensions.width;
  return (
    <View style={styles.container}>
      <InsideAd
        ref={insideAdRef}
        insideAdHeight={PixelRatio.getPixelSizeForLayoutSize(adHeight)}
        insideAdWidth={PixelRatio.getPixelSizeForLayoutSize(adWidth)}
        insideAdEvents={adEvents}
      />
      <Button
        onPress={() => refreshAd()}
        title="request new ad"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});
