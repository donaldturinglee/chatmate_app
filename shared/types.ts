export interface IMainState {
  app_mode: 'light' | 'dark';
  messages: Array<TMessage>;
}

export type TColorMode = 'light' | 'dark';
export type TMessageSender = 'user' | 'system';
export type TMessage = {
  content: string;
  sender: TMessageSender;
};
