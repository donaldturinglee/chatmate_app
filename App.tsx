import React from 'react';

import {StatusBar, StatusBarStyle, useColorScheme, View} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from './src/components/routes/Home.tsx';
import Settings from './src/components/routes/Settings.tsx';
import Camera from './src/components/routes/Camera.tsx';
import useAppColor from './src/theme/appColor.tsx';
import storage from './shared/storage.ts';
import {APP_COLOR_MODE_KEY} from './assets/constants.ts';
import {useAppDispatch, useAppSelector} from './shared/hooks.ts';
import {setAppColorMode} from './shared/redux-slice.ts';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  const appColor = useAppColor();

  const dispatch = useAppDispatch();
  const systemColorMode = useColorScheme() || 'light';
  const appColorMode = useAppSelector(state => state.main.app_mode);
  const handleSetColorMode = React.useCallback(() => {
    storage
      .load({key: APP_COLOR_MODE_KEY})
      .then((data: any) => {
        dispatch(setAppColorMode(data));
      })
      .catch((err: any) => {
        dispatch(setAppColorMode('system'));
      });
  }, []);
  React.useLayoutEffect(() => {
    handleSetColorMode();
  }, []);
  return (
    <>
      <StatusBar
        barStyle={
          (appColorMode == 'system' ? systemColorMode : appColorMode) == 'light'
            ? 'dark-content'
            : 'light-content'
        }
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
