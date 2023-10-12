import * as React from 'react';

import { Button, Dimensions, PixelRatio, StyleSheet, View } from 'react-native';
import { initializeSdk, InsideAd } from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const insideAdRef = React.useRef<{refreshAd:Function}>();

  React.useEffect(() => {
    initializeSdk('appkey')
  }, []);
  
  const adEvents = (event:{eventName:string, payload:string | null})=>{
    console.log("adEvents", event);
  }
  const refreshAd = () => {
    if(insideAdRef.current)
    insideAdRef.current.refreshAd()
  }
  const dimensions = Dimensions.get('window');
  const adHeight = Math.round(dimensions.width * 9 / 16);
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
        onPress={()=> refreshAd()}
        title="request new ad"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
