import React from 'react';
import {Animated, Text} from 'react-native';
import {PlaceholderStyle} from './PlaceholderStyle';

interface PlaceholderProps {
  transformStyle: object;
  placeholderTextStyle?: object;
  placeholderText: string | undefined | number;
}
export const Placeholder = (props: PlaceholderProps): JSX.Element => {
  const {transformStyle, placeholderTextStyle, placeholderText} = props;
  return (
    <Animated.View
      pointerEvents={'none'}
      style={[transformStyle, PlaceholderStyle.placeholderContainerStyle]}>
      <Text
        accessible={false}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[PlaceholderStyle.placeholderTextStyle, placeholderTextStyle]}>
        {placeholderText}
      </Text>
    </Animated.View>
  );
};
