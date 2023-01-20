/* eslint-disable react-native/no-inline-styles */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Animated,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  I18nManager,
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  ViewProps,
  Pressable,
  Text,
  LayoutChangeEvent,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useState, useRef, forwardRef, useEffect} from 'react';
import {ENTextInputStyle} from './ENTextInputStyle';
import {Placeholder} from './Placeholder';

interface InputFiledProps extends TextInputProps {
  onPress?: () => void;
  containerStyle?: object;
  leftImage?: ImageSourcePropType;
  leftImageStyle?: object;
  inputValue?: any;
  placeholderStyle?: object;
  placeholderText?: any;
  inputStyle?: object;
  selectionColor?: any;
  editable?: boolean | undefined;
  onFocusInput?: (arg: any) => void;
  //   onBlurInput?: () => void;
  rightComponent?: any;
  rightImage?: ImageSourcePropType;
  isClearable?: boolean;
  onPressClear?: () => void;
  clearIcon?: ImageSourcePropType;
  animationDuration?: number;
  children?: JSX.Element | JSX.Element[];
}

export const AppTextInput = forwardRef<TextInput, InputFiledProps>(
  (props, ref) => {
    const {
      onPress,
      containerStyle,
      leftImage,
      leftImageStyle,
      inputValue,
      placeholderStyle,
      placeholderText,
      inputStyle,
      selectionColor,
      editable,
      onFocusInput,
      //onBlurInput,
      rightComponent,
      rightImage,
      isClearable,
      onPressClear,
      clearIcon,
      children,
      animationDuration,
    } = props;
    const [isFocused, setFocus] = useState(false);
    const [hasText, haveText] = useState(inputValue ? true : false);
    const [viewXPos, setXPos] = useState(-1);
    const [viewHeight, setHeight] = useState(-1);
    const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [rightComponentWidth, setRightComponentWidth] = useState<
      Number | undefined
    >(undefined);

    const transformStyle = {
      transform: [
        {
          translateY: fadeAnim,
        },
      ],
    };

    const startAnimation = (init: boolean) => {
      Animated.timing(fadeAnim, {
        toValue: init ? viewXPos - viewHeight / 2 : 0,
        duration: animationDuration || 300,
        useNativeDriver: true,
      }).start(() => {
        fadeAnim.setValue(init ? viewXPos - viewHeight / 2 : 0);
        if (!init) {
          haveText(inputValue !== '' && inputValue !== undefined);
          setFocus(false);
        }
      });
    };

    if (hasText) {
      startAnimation(true);
    }

    const textInputOnLayout = (event: LayoutChangeEvent) => {
      var {x, height} = event.nativeEvent.layout;
      setXPos(x);
      setHeight(height);
    };

    const textInputOnFocus = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      if (editable === true || editable === undefined) {
        setFocus(true);
        startAnimation(true);
        if (onFocusInput !== undefined) {
          onFocusInput(e);
        }
      }
    };
    const textInputOnBlur = () => {
      if (onFocusInput !== undefined) {
        onFocusInput(null);
      }
      if (inputValue === '' || inputValue === undefined) {
        startAnimation(false);
      }
    };

    // const Placeholder = () => {
    //   return (
    //     <Animated.View
    //       pointerEvents={'none'}
    //       style={[transformStyle, ENTextInputStyle.placeholderContainerStyle]}>
    //       <Text
    //         accessible={false}
    //         numberOfLines={1}
    //         ellipsizeMode="tail"
    //         style={[ENTextInputStyle.placeholder, placeholderStyle]}>
    //         {placeholderText}
    //       </Text>
    //     </Animated.View>
    //   );
    // };
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[ENTextInputStyle.inputContainerStyle, containerStyle]}>
        {leftImage !== undefined && (
          <Image
            accessible={false}
            source={leftImage}
            resizeMode="contain"
            style={[
              {
                position: 'absolute',
                zIndex: 1,
                height: 15,
                width: 15,
                bottom: 10,
              },
              leftImageStyle,
            ]}
          />
        )}
        <Placeholder
          transformStyle={transformStyle}
          placeholderText={placeholderText}
        />
        <TextInput
          pointerEvents={onPress !== undefined ? 'none' : 'auto'}
          numberOfLines={1}
          autoCorrect={false}
          value={inputValue === undefined ? '' : inputValue}
          style={[ENTextInputStyle.inputStyle, inputStyle]}
          ref={ref}
          selectionColor={selectionColor ? selectionColor : 'red'}
          onLayout={textInputOnLayout}
          onFocus={textInputOnFocus}
          onBlur={textInputOnBlur}
          {...props}
        />
        {isClearable && hasText && (isFocused || Platform.OS === 'web') ? (
          <TouchableOpacity
            accessible={false}
            onPress={onPressClear}
            style={{position: 'absolute', right: 1, bottom: 4}}>
            <Image
              // accessible={false}
              source={clearIcon!}
              style={{
                height: 18,
                width: 18,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {rightComponent !== undefined && (
          <View
            onLayout={({nativeEvent}) => {
              const {x, y, width, height} = nativeEvent.layout;
              setRightComponentWidth(width + 20);
            }}
            style={{
              position: 'absolute',
              right: 10,
            }}>
            {children}
          </View>
        )}
        {rightImage !== undefined && (
          <Image
            resizeMode="contain"
            source={rightImage}
            style={ENTextInputStyle.rightImageStyle}
          />
        )}
      </TouchableOpacity>
    );
  },
);
