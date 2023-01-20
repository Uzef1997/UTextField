import React from 'react';
import {StyleSheet} from 'react-native';

export const ENTextInputStyle = StyleSheet.create({
  inputContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    // borderBottomColor: 'gray',
    marginStart: 14,
    marginEnd: 14,
    marginBottom: 26,
    marginTop: 6,
    // elevation: 5,
    // backgroundColor: 'transperant',
    // shadowColor: 'black',
    // shadowOpacity: 0.4,
    // shadowOffset: {height: 3, width: 0},
    // shadowRadius: 3,
  },
  inputStyle: {
    height: 55,
    backgroundColor: 'white',
    color: 'red',
    paddingStart: 15,
    paddingEnd: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',

    // overflow: 'hidden',
  },
  rightImageStyle: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 10,
  },
});
