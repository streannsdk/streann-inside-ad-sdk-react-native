import * as React from 'react';
import { API_TOKEN, API_KEY, BASE_URL } from '@env'
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import {
  initializeSdk,
  InsideAd,
  type IinsideAdEvent,
} from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const insideAdRef = React.useRef<{ refreshAd: Function }>();

  React.useEffect(() => {
    initializeSdk({
      apiKey: API_KEY,
      apiToken: API_TOKEN,
      baseUrl: BASE_URL,
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
        insideAdWidth={adWidth}
        insideAdHeight={adHeight}
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
