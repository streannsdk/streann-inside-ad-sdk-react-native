# streann-inside-ad-sdk-react-native

react-native lib

## Installation

```sh
npm install streann-inside-ad-sdk-react-native
```

## Usage

```js
import { initializeSdk, InsideAd } from 'streann-inside-ad-sdk-react-native';

// ...
// First we call initializeSdk method before InsideAd component is rendered
  React.useEffect(() => {
    initializeSdk({apiKey:'apiKey'})
  }, []);

// after that we can implement the component
const insideAdRef = React.useRef<{refreshAd:Function}>();

  const adEvents = (event:{eventName:string, payload:string | null})=>{
      // here we can recive the events from the ads 
      // like insideAdLoaded or insideAdPlayed or insideAdError
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
      />
    </View>
  )
// ...
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
