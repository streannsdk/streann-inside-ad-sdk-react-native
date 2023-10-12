import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { initializeSdk, InsideAd } from 'streann-inside-ad-sdk-react-native';

export default function App() {
  React.useEffect(() => {
    initializeSdk('appkey')
  }, []);
  const adEvents = (events:any)=>{
    console.log("adEvents", events);
  }
  // https://github.com/gre/gl-react/blob/master/packages/gl-react-native/src/index.js
  return (
    <View style={styles.container}>
      <InsideAd insideAdEvents={adEvents}></InsideAd>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
});
