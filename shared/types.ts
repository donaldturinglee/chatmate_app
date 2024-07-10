import {GestureResponderEvent, ViewStyle} from 'react-native';

export interface IMainState {
  app_mode: TColorMode;
  messages: Array<TMessage>;
  active_drawer: string;
}

export type TColorMode = 'light' | 'dark' | 'system';
export type TMessageSender = 'user' | 'system';
export type TMessage = {
  content: string;
  sender: TMessageSender;
};
export interface IListItemProp {
  icon: any;
  title: string;
  label: any;
  style?: ViewStyle;
  hasPage?: boolean;
  contentStyle?: ViewStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
