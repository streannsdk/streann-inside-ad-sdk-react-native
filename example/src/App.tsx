import * as React from 'react';

import { Button, Dimensions, PixelRatio, StyleSheet, View } from 'react-native';
import {
  initializeSdk,
  InsideAd,
  type IinsideAdEvent,
} from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const insideAdRef = React.useRef<{ refreshAd: Function }>();

  React.useEffect(() => {
    initializeSdk({
      apiKey: '61290efae4b0304f3eb75567',
      apiToken:
        'babe0a4fcd3f42c1848bcf932e1e95ca833392dad9e9487ab7fb2af20ddffd81',
      baseUrl: 'https://inside-ads.services.c1.streann.com/',
      
    });
  }, []);

  const adEvents = (event: IinsideAdEvent) => {
    console.log('adEvents', event.eventName, event.payload);
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
        insideAdWidth={320}
        insideAdHeight={180}
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
