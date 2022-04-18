import React from 'react';
import {  Image,  TouchableOpacity as NativeButton} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ImageButton = ({
  uri,
  source,
  style,
  imageStyle,
  onPress,
  disabled,
  activeOpacity,
  gestureBtn = false,
}) => {
  if (gestureBtn) {
    <TouchableOpacity
      disabled={disabled}
      style={style}
      onPress={onPress}
      activeOpacity={activeOpacity || 0.5}>
      <Image style={imageStyle} source={source ? source : {uri}} />
    </TouchableOpacity>;
  }
  return (
    <NativeButton
      disabled={disabled}
      style={style}
      onPress={onPress}
      activeOpacity={activeOpacity || 0.5}>
      <Image style={imageStyle} source={source ? source : {uri}} />
    </NativeButton>
  );
};

export default ImageButton;
