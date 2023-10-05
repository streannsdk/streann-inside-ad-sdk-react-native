import * as React from 'react';

import { StyleSheet, View, UIManager, findNodeHandle, PixelRatio } from 'react-native';
import { initializeSdk, InsideAdViewManager } from 'streann-inside-ad-sdk-react-native';

export default function App() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    initializeSdk('')
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
    console.log("HEEY MSG creating fragment" );
  }, []);
  const reciveMsg = ({nativeEvent}:any)=>{
    console.log("HEEY MSG", nativeEvent);
    
  }
  // https://github.com/gre/gl-react/blob/master/packages/gl-react-native/src/index.js
  return (
    <View style={styles.container}>

      <InsideAdViewManager  
      adEvents={(event:any) => reciveMsg(event)}
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
    />
    </View>
  );
}
const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.InsideAdViewManager.Commands.create.toString(),
    [viewId],
  );
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
