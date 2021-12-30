import {colors} from 'react-native-elements';
import AppFontFamily from './fonts';
import {normalizeText} from '../helpers';

const Colors = {
  ...colors,

  inputText: '#D8D8D8',
  primaryText: '#02204B',
  secondary: '#0080FF',
  secondaryText: '#0080FF',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#909AAF',
  primary: '#FF9600',
  primaryDark: '#232F3E',
  primaryLight: '#FF8A65',
  accent: '#4A90A4',
  background: 'white',
  card: '#F5F5F5',
  text: '#212121',
  border: '#c7c7cc',
  check_circle: '#58be3f',
  textColor: '#402B6C',
  greenColor: '#36971E',
  image_background: '#FFDca8',
  buttonBackground: '#EA2d2D',
  transparent: 'transparent',
  borderColor: '#DDE0E6',
  placeHolderColor: '#797979',
  searchBorderColor: '#707070',
  dashboardItemBackground: '#F2F4F9',
  borderGray: '#DDE0E6',
  darkGrey: '#939598',
};

const fontFamily = {
  regular: AppFontFamily.regular,
  medium: AppFontFamily.medium,
  bold: AppFontFamily.bold,
  semiBold: AppFontFamily.semiBold,
  light: AppFontFamily.light,
  thin: AppFontFamily.thin,
  black: AppFontFamily.black,
  hairline: AppFontFamily.hairline,
};

const fontSize = {
  font09: normalizeText(9),
  font10: normalizeText(10),
  font11: normalizeText(11),
  font12: normalizeText(12),
  font14: normalizeText(14),
  font16: normalizeText(16),
  font18: normalizeText(18),
  font20: normalizeText(20),
  font22: normalizeText(22),
  font24: normalizeText(24),
  font26: normalizeText(26),
  font28: normalizeText(28),
  font30: normalizeText(30),
};

const theme = {
  colors: {
    ...Colors,
  },
  Button: {
    buttonStyle: {
      borderRadius: 10,
      backgroundColor: colors.primary,
      paddingVertical: 14,
    },
    titleStyle: {
      color: colors.white,
      fontFamily: fontFamily.medium,
    },
  },
  Input: {
    labelStyle: {
      textTransform: 'uppercase',
      fontFamily: fontFamily.regular,
      color: Colors.textColor,
      fontSize: fontSize.font18,
      fontWeight: '400',
    },
    inputStyle: {
      fontSize: fontSize.font18,
      textAlign: 'left',
      color: Colors.textColor,
      alignSelf: 'flex-start',
    },
  },
  fontFamily: {
    ...fontFamily,
  },
  fontSize: {
    ...fontSize,
  },
};
export {theme};
