import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomView from '../../theme/CustomView.tsx';
import Icons from '../../../assets/icons.tsx';
import useAppColor from '../../theme/appColor.tsx';
import {MessageBox} from '../../../shared/reusables.tsx';
import {useAppDispatch, useAppSelector} from '../../../shared/hooks.ts';
import {updateMessages} from '../../../shared/redux-slice.ts';
import {TMessage} from '../../../shared/types.ts';
import {make_request} from '../../../assets/constants.ts';

const Chat = React.memo((props: any) => {
  const appColor = useAppColor();
  const [mainIconsHidden, setMainIconsHidden] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>('');
  const [showExpandBtn, setShowExpandBtn] = React.useState<boolean>(false);
  const conversation = useAppSelector(state => state.main.messages);
  const dispatch = useAppDispatch();
  const handleSubmitPrompt = React.useCallback(() => {
    if (prompt.length === 0) {
      return;
    }
    const message: TMessage = {
      content: prompt,
      sender: 'user',
    };
    dispatch(updateMessages(message));
    handlePrompt(prompt);
    setPrompt('');
  }, [prompt]);

  const handlePrompt = React.useCallback(async (prompt: string) => {
    const response = await make_request(prompt);
    if (response == undefined) {
      console.log('An error occured, please try again');
    }
    const message: TMessage = {
      content: response,
      sender: 'system',
    };
    dispatch(updateMessages(message));
  }, []);

  const handleInputLayout = React.useCallback((event: any) => {
    const {height} = event.nativeEvent.layout;
    if (height > 75) {
      setShowExpandBtn(true);
    } else {
      setShowExpandBtn(false);
    }
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: appColor.main_bg}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          paddingTop: 10,
        }}>
        {conversation.length > 0 ? (
          <View style={{flex: 1, flexShrink: 0}}>
            <CustomView style={{paddingHorizontal: 20}}>
              {conversation.map(message => (
                <MessageBox message={message.content} sender={message.sender} />
              ))}
            </CustomView>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 50,
                padding: 10,
                backgroundColor: appColor.bold_text,
              }}>
              <Icons.OpenAIIcon mode="dark" style={{width: 30, height: 30}} />
            </View>
          </View>
        )}

        {/*text input container*/}
        <View style={styles.text_box_container}>
          <View
            style={{
              flexDirection: 'row',
              flexShrink: 1,
              marginRight: 20,
              alignItems: 'center',
            }}>
            {mainIconsHidden ? (
              <View
                style={{
                  width: 35,
                  height: 35,
                  marginBottom: 2,
                  backgroundColor: appColor.line_color,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icons.PlusIcon style={{width: 25, height: 25}} />
              </View>
            ) : (
              <>
                <Icons.CameraIcon
                  onPress={() => props.navigation.navigate('Camera')}
                  style={{width: 35, height: 35}}
                />
                <Icons.ImageIcon
                  style={{width: 25, height: 25, marginLeft: 10}}
                />
                <Icons.FolderIcon
                  style={{width: 25, height: 25, marginLeft: 15}}
                />
              </>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexShrink: 0,
              position: 'relative',
              justifyContent: 'flex-end',
            }}>
            <TextInput
              multiline
              style={[
                styles.text_input,
                {
                  borderWidth: 1,
                  borderColor: appColor.line_color,
                  color: appColor.inverseWhiteBlack,
                },
              ]}
              placeholder="Message"
              defaultValue={prompt}
              placeholderTextColor={appColor.line_color}
              onLayout={handleInputLayout}
              onChangeText={text => {
                setPrompt(text);
                if (text.length > 0) {
                  setMainIconsHidden(true);
                } else {
                  setMainIconsHidden(false);
                }
              }}
            />
            {!mainIconsHidden && (
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  opacity: 0.6,
                  bottom: 10,
                }}>
                <Icons.MicIcon style={{width: 25, height: 25}} />
              </View>
            )}
          </View>
          <View
            style={{
              flexShrink: 1,
              marginLeft: 20,
              marginBottom: 8,
            }}>
            {mainIconsHidden ? (
              <Icons.ArrowUpIcon
                onPress={handleSubmitPrompt}
                style={{width: 25, height: 25}}
              />
            ) : (
              <Icons.HeadsetIcon style={{width: 25, height: 25}} />
            )}
          </View>
          {showExpandBtn && (
            <Icons.ExpandIcon
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                top: 0,
                right: 20,
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  text_input: {
    minHeight: 40,
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 14,
    fontSize: 20,
    maxHeight: 220,
  },
  text_box_container: {
    width: '100%',
    flexShrink: 0,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
});

export default Chat;
