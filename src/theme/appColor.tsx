import {useAppSelector} from '../../shared/hooks.ts';
import colors from './colors';
const useAppColor = () => {
  // const color_mode = useColorScheme() || 'light'
  const app_mode = useAppSelector(state => state.main.app_mode);
  return colors[app_mode];
};

export default useAppColor;
