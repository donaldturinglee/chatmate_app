import React from 'react';

import {StatusBar, useColorScheme, View} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from './src/components/routes/Home.tsx';
import Settings from './src/components/routes/Settings.tsx';
import Camera from './src/components/routes/Camera.tsx';
import useAppColor from './src/theme/appColor.tsx';
import Icons from './assets/icons.tsx';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const appColor = useAppColor();
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="Settings"
          options={{
            presentation: 'modal',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: appColor.page_modal_bg,
            },
            headerShadowVisible: false,
            headerRight(props) {
              return (
                <View
                  style={{
                    backgroundColor: appColor.line_color,
                    marginRight: 25,
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  <Icons.TimesIcon style={{width: 25, height: 25}} />
                </View>
              );
            },
          }}
          component={Settings}
        />
        <Stack.Screen
          name="Camera"
          options={{
            presentation: 'card',
            cardStyle: {height: '50%'},
            headerShown: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
          component={Camera}
        />
      </Stack.Navigator>
    </>
  );
}

export default App;
