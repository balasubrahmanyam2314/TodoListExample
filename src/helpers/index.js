import {Platform, Dimensions} from 'react-native';
import renderNode from './renderNode';
import normalizeText from './normalizeText';
import nodeType from './nodeType';

const Screen = Dimensions.get('window');
const ScreenWidth = Screen.width;
const ScreenHeight = Screen.height;
const isIOS = Platform.OS === 'ios';

const conditionalStyle = (condition, style) => (condition ? style : {});

export const patchWebProps = ({
  updateTheme,
  replaceTheme,
  onClear,
  ...rest
}) => {
  return rest;
};

export {
  renderNode,
  normalizeText,
  nodeType,
  ScreenWidth,
  ScreenHeight,
  isIOS,
  conditionalStyle,
};
