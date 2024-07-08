import React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Chat from '../pages/Chat.tsx';
import Icons from '../../../assets/icons.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
import {
  Animated,
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import ScrollView = Animated.ScrollView;
import Explore from '../pages/Explore.tsx';
import useAppColor from '../../theme/appColor.tsx';
import {useAppDispatch, useAppSelector} from '../../../shared/hooks.ts';
import {clearMessages} from '../../../shared/redux-slice.ts';

const Drawer = createDrawerNavigator();
const Home = React.memo((props: any) => {
  const appColor = useAppColor();
  const conversation = useAppSelector(state => state.main.messages);
  const dispatch = useAppDispatch();
  return (
    <Drawer.Navigator
      drawerContent={drawerProps => {
        return (
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={[
                  styles.search_box,
                  {
                    backgroundColor: appColor.search_box,
                    color: appColor.text_color,
                  },
                ]}
                placeholder={'Search'}
              />
              <View style={{position: 'absolute', left: 20, opacity: 0.5}}>
                <Icons.SearchIcon style={{width: 20, height: 20}} />
              </View>
            </View>
            <ScrollView style={{flex: 1}}>
              <DrawerItem
                focused={true}
                activeTintColor={appColor.bold_text}
                activeBackgroundColor={appColor.highlight_bg}
                icon={() => (
                  <View>
                    <Icons.OpenAIIcon />
                  </View>
                )}
                label={'Chat'}
                onPress={() => drawerProps.navigation.navigate('Chat')}
              />
              <DrawerItem
                activeTintColor={appColor.bold_text}
                activeBackgroundColor={appColor.highlight_bg}
                icon={() => (
                  <View>
                    <Icons.MenuCircleIcon />
                  </View>
                )}
                label={'Explore'}
                onPress={() => drawerProps.navigation.navigate('Explore')}
              />
            </ScrollView>
            <View
              onTouchEnd={() => props.navigation.navigate('Settings')}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'orange',
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: '600', fontSize: 20}}>
                    P
                  </Text>
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={{fontWeight: '600', fontSize: 16}}>
                    Paulos Ab
                  </Text>
                </View>
              </View>

              <View style={{opacity: 0.5}}>
                <Icons.DotsIcon style={{width: 25, height: 25}} />
              </View>
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          width: '80%',
          backgroundColor: appColor.main_bg,
        },
        headerShadowVisible: false,
        headerLeft: headerProps => (
          <TouchableOpacity onPress={() => DrawerActions.openDrawer()}>
            <Icons.MenuIcon
              {...headerProps}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen
        name="Chat"
        options={{
          headerTitle(props) {
            return (
              <View>
                <View
                  style={{
                    backgroundColor: 'rgba(44, 5, 92, .2)',
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    borderRadius: 12,
                  }}>
                  <Text style={{color: '#2c055c', fontSize: 20}}>Get Plus</Text>
                </View>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  marginRight: 20,
                  opacity: conversation.length === 0 ? 0.4 : 1,
                }}>
                <Icons.EditPenIcon
                  onPress={() => dispatch(clearMessages())}
                  style={{width: 22, height: 22}}
                />
              </View>
            );
          },
        }}
        component={Chat}
      />
      <Drawer.Screen name="Explore" component={Explore} />
    </Drawer.Navigator>
  );
});

const styles = StyleSheet.create({
  search_box: {
    width: '90%',
    borderRadius: 9,
    height: 40,
    padding: 10,
    fontSize: 15,
    paddingLeft: 35,
  },
});

export default Home;
