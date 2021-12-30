import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {nodeType, renderNode} from '../helpers';
import {theme} from '../theme';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

const Header = props => {
  const {
    containerStyle,
    leftIcon,
    leftIconContainerStyle,
    rightIcon,
    rightIconContainerStyle,
    titleStyle,
    title,
    titleProps,
  } = props;
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <View style={{flex: 0.1}}>
        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              leftIconContainerStyle,
            ])}>
            {renderNode(Icon, leftIcon)}
          </View>
        )}
      </View>

      <View
        style={StyleSheet.flatten([
          {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.8,
          },
        ])}>
        <Text
          style={StyleSheet.flatten([styles.title, titleStyle])}
          numberOfLines={1}
          ellipsizeMode="tail"
          {...titleProps}>
          {title || ''}
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              rightIconContainerStyle,
            ])}>
            {renderNode(Icon, rightIcon)}
          </View>
        )}
      </View>
    </View>
  );
};

Header.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  leftIcon: nodeType,
  leftIconContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  rightIcon: nodeType,
  rightIconContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),

  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleProps: PropTypes.object,
};
const styles = {
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    borderBottomStartRadius: 22,
    borderBottomEndRadius: 22,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: theme.colors.grey3,
    overflow: 'hidden',
  },
  title: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.semiBold,
    flexWrap: 'wrap',
    fontSize: theme.fontSize.font18,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
};

export default Header;
