import React from 'react';
import {TextInput, View} from 'react-native';
import useAppColor from '../../theme/appColor.tsx';
import {TMessage} from '../../../shared/types.ts';
import {
  updateMessages,
  updatePromptInput,
} from '../../../shared/redux-slice.ts';
import {useAppDispatch, useAppSelector} from '../../../shared/hooks.ts';
import {make_request} from '../../../assets/constants.ts';
import Icons from '../../../assets/icons.tsx';

const Input = React.memo((props: any) => {
  const appColor = useAppColor();
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(state => state.main.prompt_input);
  React.useLayoutEffect(() => {}, []);
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
    dispatch(updatePromptInput(''));
  }, [prompt]);

  const handlePrompt = React.useCallback(async (prompt: string) => {
    props.navigation.goBack();
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

  return (
    <View
      style={{
        backgroundColor: appColor.page_modal_bg,
        flex: 1,
        position: 'relative',
      }}>
      <TextInput
        defaultValue={prompt}
        verticalAlign="top"
        multiline
        onChangeText={text => dispatch(updatePromptInput(text))}
        style={{
          height: '100%',
          padding: 20,
          color: appColor.bold_text,
          fontSize: 20,
        }}
        placeholder=""
      />
      <View style={{position: 'absolute', bottom: 30, right: 30}}>
        <Icons.ArrowUpIcon
          onPress={handleSubmitPrompt}
          style={{width: 25, height: 25}}
        />
      </View>
    </View>
  );
});

export default Input;
