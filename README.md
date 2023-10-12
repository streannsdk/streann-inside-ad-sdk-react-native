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
// First we call initializeSdk method
initializeSdk('appkey')

// after that we can implement the component

const adEvents = (events:any)=>{
  // here we can recive the events from the ads 
  // like insideAdLoaded or insideAdPlayed or insideAdError
  console.log("adEvents", events);
}
<InsideAd insideAdEvents={adEvents}></InsideAd>

```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
