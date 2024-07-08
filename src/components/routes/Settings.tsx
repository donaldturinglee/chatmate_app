import React from 'react';
import {Text} from 'react-native';
import CustomView from '../../theme/CustomView.tsx';
import appColor from '../../theme/appColor.tsx';
const Settings = React.memo((props: any) => {
  return (
    <CustomView style={{backgroundColor: appColor().page_modal_bg}}>
      <Text>Hello this is settings</Text>
    </CustomView>
  );
});

export default Settings;
