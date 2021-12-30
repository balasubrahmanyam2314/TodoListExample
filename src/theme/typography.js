import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';

export const typography = fontFamily => {
  const oldTextRender = Text.render;
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: StyleSheet.flatten([
        styles.defaultText(fontFamily),
        origin.props.style,
      ]),
    });
  };
  const oldTextInputRender = TextInput.render;

  TextInput.render = function (...args) {
    const originTextInput = oldTextInputRender.call(this, ...args);
    return React.cloneElement(originTextInput, {
      style: StyleSheet.flatten([
        styles.defaultText(fontFamily),
        originTextInput.props.style,
      ]),
    });
  };
};

const styles = {
  defaultText: customFont => ({
    fontFamily: customFont,
  }),
};
