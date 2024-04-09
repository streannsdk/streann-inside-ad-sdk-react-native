# streann-inside-ad-sdk-react-native

Streann Inside Ad is an React native library that provides a simple way to integrate ad playback functionality into your react native applications using the Interactive Media Ads (IMA) SDK by Google. With Streann Inside Ad library, you can seamlessly incorporate ads into your projects.

## Features
  - Easily integrate ad playback into your React native.
  - Seamless integration of VAST video ads into your React native.
  - Customizable ad display options.
  - Full compatibility with different video types, including MP4, m3u8, etc.


## Installation

```sh
npm install streann-inside-ad-sdk-react-native
```

## Usage

- after the instalation you can import the library
```js

import { initializeSdk, InsideAd } from 'streann-inside-ad-sdk-react-native';
```

- First we call initializeSdk method before InsideAd component is rendered
```js
// ...
  React.useEffect(() => {
    // The apiKey, apiToken and baseUrl will be provided and they are mandatory.
    // You could also implement the optional parameters: 
    // appDomain, siteUrl, storeUrl, descriptionUrl, userBirthYear and userGender. 
    // Ex:
    initializeSdk({
      apiKey:'apiKey',
      apiToken:'apiToken',
      baseUrl: 'baseUrl',
      appDomain = '',
      descriptionUrl = '',
      siteUrl = '',
      storeUrl = '',
      userBirthYear = 0,
      userGender = '',
    })
  }, []);
 ```
  - here we can receive the events from the ads
 ```js 
  const adEvents = (event:IinsideAdEvent) => {
  }
  // the evets from the ads are 
     interface IinsideAdEvent {
      eventName:
        | 'insideAdReceived' // when ad is Recevied
        | 'insideAdLoaded' // when ad is Loaded
        | 'insideAdPlay'  // when ad starts to play
        | 'insideAdStop'  // when ad is finished
        | 'insideAdSkipped' // when ad is skipped 
        | 'insideAdClicked' // when ad is clicked
        | 'insideAdVolumeChanged' // when Volume of the ad changed with payload message where 1 volume is on and 0 when volume is muted
        | 'insideAdError'; // when ad retruns error the payload message will be provided with details of the error
      payload: string;
    }
```
  - We can define useRef for accessign refreshAd method that is avalable in the InsideAd component
```js
  const insideAdRef = React.useRef<{refreshAd:Function}>();
  // this method can be used programaticly
  // in interval or when ad return error...
  const refreshAd = () => {
    if(insideAdRef.current)
    insideAdRef.current.refreshAd()
  }
```
- Rendering the component
```js
 const dimensions = Dimensions.get('window');
 const adWidth = dimensions.width;
  const adHeight = Math.round(dimensions.width * 9 / 16);
  
  return (
    <View style={styles.container}>

      <InsideAd
        // ref is used to be able to access child component function for refreshing the ad
        ref={insideAdRef} 
        // the insideAdHeight and insideAdWidth can be customized
        // this values are used to determent the size of the ad that will be displayed
        insideAdWidth={adWidth} 
        insideAdHeight={adHeight}
        // here we recive back the ads event
        insideAdEvents={adEvents}
        // enter the screen where you wish to load the ad (ex. Splash or Video Player) (optional parameter, default value: '')
        insideAdScreen=''
        //isAdMuted - choose if you want your ad to be muted or not (optional parameter, default value: false)
        insideAdIsMuted={true}
      />

    </View>
  )
// ...
```
## Sample App
  Check our the Example in github to see insideAd in action.