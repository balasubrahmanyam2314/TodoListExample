import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';

const CText = props => {
  const {style, ...rest} = props;
  return (
    <Text style={StyleSheet.flatten([styles.textStyle, style])} {...rest}>
      {props.children}
    </Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.font14,
    color: theme.colors.textColor,
  },
};

CText.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CText.defaultProps = {
  style: {},
};

export {CText};
