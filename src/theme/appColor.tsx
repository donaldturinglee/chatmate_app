import {useAppSelector} from '../../shared/hooks.ts';
import colors from './colors';
import {useColorScheme} from 'react-native';
const useAppColor = () => {
  const color_mode = useColorScheme() || 'light';
  const app_mode = useAppSelector(state => state.main.app_mode);
  return colors[app_mode === 'system' ? color_mode : app_mode];
};

export default useAppColor;
