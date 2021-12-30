import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import PropTypes from 'prop-types';
import {theme} from '../theme';

const RadioButtonList = props => {
  const {style, list, onPress, selected, ...attributes} = props;

  const [selectedPosition, setSelectedPosition] = React.useState(
    selected >= list.length ? -1 : selected,
  );

  const onRadioClicked = React.useCallback(
    (item, index) => {
      setSelectedPosition(index);
      onPress && onPress(item, index);
    },
    [onPress],
  );

  return (
    <View style={[styles.viewContainer, style]}>
      {list.map((item, index) => (
        <CheckBox
          key={index}
          title={item.title}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={item.color}
          checked={index === selectedPosition}
          onIconPress={() => onRadioClicked(item, index)}
          containerStyle={styles.checkBoxContainer}
          textStyle={[
            styles.textStyle,
            index === selectedPosition ? {color: 'black'} : {color: 'gray'},
          ]}
          {...attributes}
        />
      ))}
    </View>
  );
};

RadioButtonList.propTypes = {
  style: PropTypes.object,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.number,
};

RadioButtonList.defaultProps = {
  selected: -1,
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    margin: 0,
    marginLeft: 0,
    marginEnd: 20,
    padding: 0,
  },
  textStyle: {
    marginStart: 2,
    marginEnd: 2,
    fontSize: theme.fontSize.font18,
    color: theme.colors.textColor,
    fontFamily: theme.fontFamily.semiBold,
  },
  viewContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
});

export default RadioButtonList;
