import React from 'react';
import {StyleSheet} from 'react-native';

export const PlaceholderStyle = StyleSheet.create({
  placeholderContainerStyle: {
    position: 'absolute',
    zIndex: 1,
    paddingStart: 5,
    marginStart: 12,
    paddingEnd: 5,
    backgroundColor: 'white',
  },
  placeholderTextStyle: {
    color: 'red',
  },
});
