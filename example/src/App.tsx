import * as React from 'react';

import { StyleSheet, View, Text, UIManager, findNodeHandle, PixelRatio } from 'react-native';
import { multiply, initializeSdk, InsideAdViewManager } from 'react-native-awesome-module';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const ref = React.useRef(null);
  React.useEffect(() => {
    initializeSdk('')
    multiply(3, 7).then(setResult);
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
    console.log("HEEY MSG creating fragment" );
  }, []);
  const reciveMsg = ({nativeEvent})=>{
    console.log("HEEY MSG", nativeEvent);
    
  }
  // https://github.com/gre/gl-react/blob/master/packages/gl-react-native/src/index.js
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <InsideAdViewManager  
      onGLProgress={event => reciveMsg(event)}
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
const createFragment = viewId =>
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
