import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {theme} from '../theme';

class CInputComponent extends React.Component {
  clearText = () => {
    this.inputRef.setNativeProps({text: ''});
  };

  setText = text => {
    this.inputRef.setNativeProps({text: text});
  };

  render() {
    const {
      disabled,
      label,
      labelStyle,
      noOfLines,
      onChangeText,
      styleContainer,
      inputContainerStyle,
      inputStyle,
      disableInputStyle,
      defaultText,
      editable,
      ...attributes
    } = this.props;

    return (
      <Input
        {...attributes}
        ref={component => (this.inputRef = component)}
        defaultValue={defaultText}
        label={label}
        labelProps={{
          numberOfLines: 1,
        }}
        labelStyle={StyleSheet.flatten([styles.labelStyle, labelStyle])}
        disabled={disabled}
        editable={editable}
        inputStyle={StyleSheet.flatten([styles.inputStyle, inputStyle])}
        inputContainerStyle={StyleSheet.flatten([
          styles.inputContainerStyle,
          inputContainerStyle,
        ])}
        numberOfLines={noOfLines}
        underlineColorAndroid="transparent"
        containerStyle={StyleSheet.flatten([
          styles.containerStyle,
          styleContainer,
        ])}
        onChangeText={onChangeText}
      />
    );
  }
}

CInputComponent.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  noOfLines: PropTypes.number,
  styleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  defaultText: PropTypes.string,
  editable: PropTypes.bool,
};

CInputComponent.defaultProps = {
  disabled: false,
  noOfLines: 1,
  onChangeText: () => null,
  defaultText: null,
  editable: true,
  placeholderTextColor: theme.colors.placeHolderColor,
  styleContainer: {},
  labelStyle: {},
  inputStyle: {},
};

const styles = {
  labelStyle: {
    textTransform: 'uppercase',
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.textColor,
    fontSize: theme.fontSize.font18,
    fontWeight: '400',
  },
  inputStyle: {
    fontSize: theme.fontSize.font20,
    textAlign: 'left',
    color: theme.colors.textColor,
    alignSelf: 'flex-start',
    fontFamily: theme.fontFamily.semiBold,
    textAlignVertical: 'top',
  },
  inputContainerStyle: {
    borderRadius: 6,
    borderColor: '#DDE0E6',
    borderWidth: 1,
    paddingStart: 12,
    paddingVertical: 6,
  },
  disableStyle: {
    backgroundColor: 'lightskyblue',
  },
  containerStyle: {
    padding: 0,
  },
};

export default CInputComponent;
