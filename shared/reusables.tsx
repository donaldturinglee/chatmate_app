import {Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Icons from '../assets/icons.tsx';
import useAppColor from '../src/theme/appColor.tsx';
import {TMessageSender} from './types.ts';
import Markdown from 'react-native-markdown-display';

export const MessageBox = React.memo(
  (props: {message: string; sender: TMessageSender; style?: ViewStyle}) => {
    const appColor = useAppColor();
    return (
      <View
        key={Math.floor(Math.random() * 999999999).toString()}
        style={[
          {
            width: '100%',
            flexDirection: 'row',
            marginBottom: 20,
            justifyContent: props.sender === 'user' ? 'flex-end' : 'flex-start',
          },
          props.style,
        ]}>
        {props.sender !== 'user' && (
          <View
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: appColor.line_color,
              borderWidth: 1,
            }}>
            <Icons.OpenAIIcon style={{width: 25, height: 25}} />
          </View>
        )}

        <View
          style={{
            backgroundColor:
              props.sender == 'user' ? appColor.highlight_bg : 'transparent',
            padding: 10,
            borderRadius: 10,
            maxWidth: props.sender == 'user' ? '70%' : '80%',
          }}>
          <Markdown
            style={{
              body: {fontSize: 16},
              code_block: {
                backgroundColor: appColor.highlight_bg,
                borderWidth: 0,
              },
            }}>
            {props.message}
          </Markdown>
        </View>
      </View>
    );
  },
);
