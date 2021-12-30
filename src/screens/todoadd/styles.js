import {StyleSheet, Platform} from 'react-native';
import {theme} from '../../theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  shadow: {
    backgroundColor: theme.colors.white,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  accountInfo: {
    fontSize: theme.fontSize.font22,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.black,
    marginVertical: 12,
  },
  inputcontainer: {
    paddingHorizontal: 0,
  },
  inputStyle: {
    fontSize: theme.fontSize.font18,
    marginTop: 4,
    marginStart: 12,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 24,
  },
  innerPickerContainerStyle: {
    paddingVertical: 18,
  },
  buttonContainerStyle: {
    width: '100%',
    marginBottom: 32,
    marginTop: 12,
  },
  buttonTitleStyle: {
    textTransform: 'uppercase',
    fontFamily: theme.fontFamily.medium,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: theme.colors.buttonBackground,
    paddingVertical: 14,
  },
  companyStyle: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessageStyle: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: theme.fontSize.font12,
    color: 'red',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  dateStyle: {
    marginBottom: 4,
    fontSize: theme.fontSize.font18,
    color: theme.colors.textColor,
    fontFamily: theme.fontFamily.semiBold,
    marginStart: 12,
    flex: 1,
  },
  taskStyle: {
    marginRight: 12,
    alignSelf: 'flex-start',
    fontSize: theme.fontSize.font18,
    color: theme.colors.textColor,
    fontFamily: theme.fontFamily.semiBold,
  },
});
