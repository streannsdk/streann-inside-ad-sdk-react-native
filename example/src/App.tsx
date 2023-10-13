import * as React from 'react';

import { Button, Dimensions, PixelRatio, StyleSheet, View } from 'react-native';
import { initializeSdk, InsideAd, type IinsideAdEvent } from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const insideAdRef = React.useRef<{refreshAd:Function}>();

  React.useEffect(() => {
    initializeSdk({apiKey:'559ff7ade4b0d0aff40888dd'})
  }, []);
  
  const adEvents = (event:IinsideAdEvent)=>{
    console.log("adEvents", event.eventName);
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
