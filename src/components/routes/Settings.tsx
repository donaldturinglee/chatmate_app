import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import CustomView from '../../theme/CustomView.tsx';
import useAppColor from '../../theme/appColor.tsx';
import Icons from '../../../assets/icons.tsx';
import {useNavigation} from '@react-navigation/native';
import {ListContainer, ListItem} from '../../../shared/reusables.tsx';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../shared/hooks.ts';
import {setAppColorMode} from '../../../shared/redux-slice.ts';
import storage from '../../../shared/storage.ts';
import {APP_COLOR_MODE_KEY} from '../../../assets/constants.ts';

const Settings = React.memo((props: any) => {
  const appColor = useAppColor();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);
  const colorScheme = useColorScheme() || 'light';
  const dispatch = useAppDispatch();
  const currentAppColor = useAppSelector(state => state.main.app_mode);
  const handleSetColorMode = React.useCallback((mode?: any) => {
    const color_mode = mode ?? colorScheme;
    dispatch(setAppColorMode(color_mode));
    storage.save({key: APP_COLOR_MODE_KEY, data: color_mode});
  }, []);
  React.useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        headerRight(headerProps: any) {
          return (
            <View
              onTouchEnd={() => navigation.goBack()}
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
      },
      [appColor],
    );
  });
  return (
    <CustomView
      style={{backgroundColor: appColor.page_modal_bg, paddingBottom: 60}}>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text
          style={{
            textTransform: 'uppercase',
            color: appColor.text_color,
            padding: 10,
          }}>
          Account
        </Text>
        <ListContainer>
          <ListItem
            icon={<Icons.EmailIcon style={{width: 25, height: 25}} />}
            title="Email"
            label="donaldturinglee@gmail.com"
          />
          <ListItem
            icon={<Icons.PlusSquareIcon style={{width: 25, height: 25}} />}
            title="Subscription"
            label="Free Plan"
          />
          <ListItem
            icon={<Icons.ArrowUpIcon style={{width: 25, height: 25}} />}
            title="Upgrade to ChatGPT Plus"
            label=""
          />
          <ListItem
            icon={<Icons.RestoreIcon style={{width: 25, height: 25}} />}
            title="Restore purchases"
            label=""
          />
          <ListItem
            contentStyle={{
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
            }}
            icon={<Icons.DatabaseIcon style={{width: 25, height: 25}} />}
            title="Data Controls"
            label=""
            hasPage
          />
        </ListContainer>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text
          style={{
            textTransform: 'uppercase',
            color: appColor.text_color,
            padding: 10,
          }}>
          App
        </Text>
        <ListContainer>
          <ListItem
            icon={<Icons.GlobeIcon style={{width: 25, height: 25}} />}
            title="App Language"
            label="English"
          />
          <ListItem
            onPress={() => null}
            contentStyle={{
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
            }}
            icon={<Icons.ColorIcon style={{width: 25, height: 25}} />}
            title="Color Scheme"
            label={
              <Menu
                visible={menuVisible}
                elevation={3}
                contentStyle={{
                  backgroundColor: appColor.main_bg,
                  elevation: 0,
                  shadowColor: 'transparent',
                  borderRadius: 10,
                  width: 200,
                }}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <View onTouchEnd={() => setMenuVisible(true)}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: appColor.text_color,
                        textTransform: 'capitalize',
                      }}>
                      {currentAppColor}
                    </Text>
                  </View>
                }>
                <Menu.Item
                  onPress={() => handleSetColorMode('system')}
                  titleStyle={{
                    fontSize: 18,
                    color:
                      currentAppColor === 'system'
                        ? 'yellowgreen'
                        : appColor.bold_text,
                  }}
                  title="System"
                />
                <Divider />
                <Menu.Item
                  onPress={() => handleSetColorMode('dark')}
                  titleStyle={{
                    fontSize: 18,
                    color:
                      currentAppColor === 'dark'
                        ? 'yellowgreen'
                        : appColor.bold_text,
                  }}
                  title="Dark"
                />
                <Divider />
                <Menu.Item
                  onPress={() => handleSetColorMode('light')}
                  titleStyle={{
                    fontSize: 18,
                    color:
                      currentAppColor === 'light'
                        ? 'yellowgreen'
                        : appColor.bold_text,
                  }}
                  title="Light"
                />
              </Menu>
            }
          />
        </ListContainer>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text
          style={{
            textTransform: 'uppercase',
            color: appColor.text_color,
            padding: 10,
          }}>
          Speech
        </Text>
        <ListContainer>
          <ListItem
            contentStyle={{
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
            }}
            icon={<Icons.GlobeIcon style={{width: 25, height: 25}} />}
            title="Main Language"
            label="Auto-Detech"
          />
        </ListContainer>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text
          style={{
            textTransform: 'uppercase',
            color: appColor.text_color,
            padding: 10,
          }}>
          About
        </Text>
        <ListContainer>
          <ListItem
            icon={<Icons.HelpIcon style={{width: 25, height: 25}} />}
            title="Help Center"
            label=""
          />
          <ListItem
            icon={<Icons.PadlockIcon style={{width: 25, height: 25}} />}
            title="Privacy Policy"
            label=""
          />
          <ListItem
            contentStyle={{
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
            }}
            icon={<Icons.CircleIcon style={{width: 25, height: 25}} />}
            title="Chatmate"
            label=""
          />
        </ListContainer>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <ListContainer>
          <ListItem
            contentStyle={{
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
            }}
            icon={<Icons.LogoutIcon style={{width: 25, height: 25}} />}
            title="Sign out"
            label=""
          />
        </ListContainer>
      </View>
    </CustomView>
  );
});

export default Settings;
