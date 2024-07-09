import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import CustomView from '../../theme/CustomView.tsx';
import Icons from '../../../assets/icons.tsx';
import {
  Camera as _Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const Camera = React.memo((props: any) => {
  const device = useCameraDevice('back') as CameraDevice;
  const permission = useCameraPermission();
  const [grantedPermission, setGrantedPermission] =
    React.useState<boolean>(false);
  const handleRequestPermission = React.useCallback(async () => {
    const request_permission = await permission.requestPermission();
    setGrantedPermission(request_permission);
  }, [permission]);
  React.useEffect(() => {
    handleRequestPermission();
  }, [permission]);
  return (
    <CustomView style={{backgroundColor: 'black'}}>
      <SafeAreaView>
        <View onTouchEnd={() => props.navigation.goBack()}>
          <Icons.TimesIcon style={{width: 40, height: 40}} mode="dark" />
        </View>
        {grantedPermission && device ? (
          <_Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
        ) : (
          <View style={{marginTop: 50}}>
            <Text style={{color: 'white', fontSize: 25}}>
              Camera device not available on this device
            </Text>
          </View>
        )}
      </SafeAreaView>
    </CustomView>
  );
});

export default Camera;
