/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AppTextInput} from './src/AppTextInput/AppTextInput';

function App(): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <SafeAreaView>
      <AppTextInput
        // onPress={() => {
        //     console.log("asdf")
        // }}
        // ref={ref}
        placeholderText={'object.title'}
        inputValue={value}
        onChangeText={text => {
          setValue(text);
        }}
        returnKeyType="done"
      />
    </SafeAreaView>
  );
}

export default App;
