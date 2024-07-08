import React from 'react';
import {Animated, ViewStyle} from 'react-native';
import ScrollView = Animated.ScrollView;
import useAppColor from './appColor.tsx';

const CustomView = React.memo((props: {style?: ViewStyle; children: any}) => {
  const appColor = useAppColor();
  return (
    <ScrollView
      style={[{flex: 1, backgroundColor: appColor.main_bg}, props.style]}
      contentContainerStyle={{justifyContent: 'center'}}>
      {props.children}
    </ScrollView>
  );
});

export default CustomView;
