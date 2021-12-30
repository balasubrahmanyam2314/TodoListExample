import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {Button, Icon} from 'react-native-elements';
import {theme} from '../../theme';
import {isIOS} from '../../helpers';
import {CInput, CText, Header, RadioButtonList} from '../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const offsetKeyboard = Platform.select({
  ios: 0,
  android: 0,
});

const phoneRegExp = '[6-9][0-9]{9}';

const radioButtonList = [
  {
    title: 'Planned',
    color: '#4D73BE',
  },
  {
    title: 'In-progress',
    color: '#4D73BE',
  },
  {
    title: 'Done',
    color: '#4D73BE',
  },
];

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({min}) => `Person name must be at least ${min} characters`)
    .max(20, ({max}) => `Person name must be at most  ${max} characters`)
    .required('Person name is required'),
  projectName: yup
    .string()
    .min(3, ({min}) => `Project name must be at least ${min} characters`)
    .max(20, ({max}) => `Project name must be atmost  ${max} characters`)
    .required('Project name is required'),

  description: yup
    .string()
    .min(3, ({min}) => `Task Description must be at least ${min} characters`)
    .max(30, ({max}) => `Task Description must be atmost  ${max} characters`)
    .required('Task Description name is required'),

  startDate: yup.date().required('Start Date is Required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be grater than start date')
    .test({
      name: 'same',
      exclusive: false,
      params: {},
      message: 'End date must be grater than start date',
      test: function (value) {
        const startDate = moment(this.parent.startDate).format('YYYY-MM-DD');
        const endDate = moment(value).format('YYYY-MM-DD');
        return !moment(startDate).isSame(moment(endDate));
      },
    }),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .label('Phone Number')
    .required()
    .matches(new RegExp(phoneRegExp), 'Phone number is not valid'),
  checked: yup.string().required('Select one option '),
});

class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.formikRef = React.createRef();
    const {todoData} = this.props;
    const {startDate = '', endDate = '', checked = ''} = todoData || {};
    this.selected = radioButtonList.findIndex(item => item.title === checked);
    let newStartDate = '';
    let newEndDate = '';
    if (startDate) {
      const isStringDateValid = moment(
        startDate,
        ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'],
        true,
      ).isValid();

      newStartDate =
        isStringDateValid &&
        moment(startDate, ['DD/MM/YYYY', 'DD-MM-YYYY']).toDate();
    }
    if (endDate) {
      const isStringDateValid = moment(
        endDate,
        ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'],
        true,
      ).isValid();

      newEndDate =
        isStringDateValid &&
        moment(endDate, ['DD/MM/YYYY', 'DD-MM-YYYY']).toDate();
    }
    this.state = {
      startDate: newStartDate,
      endDate: newEndDate,
      open: false,
      isStartDateClicked: true,
    };
  }

  updateTodo = async values => {
    this.formikRef?.current?.setSubmitting(false);
    const startDate = moment(values?.startDate).format('DD/MM/YYYY').toString();
    const endDate = moment(values?.endDate).format('DD/MM/YYYY').toString();
    console.log(values);
    const {sendTodoData} = this.props;
    sendTodoData && sendTodoData({...values, startDate, endDate});
  };

  clickOnBack = () => {
    const {onBack} = this.props;
    onBack && onBack();
  };

  onConfirmDateSelection = date => {
    if (this.state.isStartDateClicked) {
      this.formikRef?.current?.setFieldValue('startDate', date);
      this.setState({
        startDate: date,
        open: false,
      });
    } else {
      this.formikRef?.current?.setFieldValue('endDate', date);
      this.setState({
        endDate: date,
        open: false,
      });
    }
  };

  onRadioButtonSelected = (item, index) => {
    this.selected = index;
    this.formikRef?.current?.setFieldTouched('checked', true);
    this.formikRef?.current?.setFieldValue('checked', item?.title);
  };

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.clickOnBack()},
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {startDate, endDate} = this.state;
    const {todoData} = this.props;
    const {name, email, phoneNumber, projectName, description, checked} =
      todoData || {};

    return (
      <View style={styles.screen} forceInset={{top: 'always'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme.colors.primary}
          translucent={false}
          hidden={false}
          animated
        />
        <SafeAreaView style={styles.screen}>
          <Header
            title="Add Todo"
            leftIcon={
              <Icon
                size={24}
                name="chevron-left"
                type="font-awesome"
                color={theme.colors.black}
                onPress={this.backAction}
              />
            }
          />

          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            keyboardVerticalOffset={offsetKeyboard}
            style={styles.screen}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}>
              <Formik
                innerRef={this.formikRef}
                initialValues={{
                  name: name || '',
                  email: email || '',
                  phoneNumber: phoneNumber || '',
                  projectName: projectName || '',
                  description: description || '',
                  startDate: startDate,
                  endDate: endDate,
                  checked: checked || '',
                }}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(true);

                  this.updateTodo(values);
                }}
                validationSchema={validationSchema}>
                {formikProps => (
                  <React.Fragment>
                    <CInput
                      styleContainer={styles.inputcontainer}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.shadow}
                      placeholder={'Enter Person Name (3-20 Chars only)'}
                      autoCapitalize="none"
                      maxLength={20}
                      defaultText={formikProps.values.name}
                      errorMessage={
                        formikProps.touched.name && formikProps.errors.name
                      }
                      onChangeText={formikProps.handleChange('name')}
                      onBlur={formikProps.handleBlur('name')}
                    />
                    <CInput
                      styleContainer={styles.inputcontainer}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.shadow}
                      autoCapitalize="none"
                      defaultText={formikProps.values.email}
                      keyboardType="email-address"
                      placeholder={'Enter A Valid  E-mail ID'}
                      errorMessage={
                        formikProps.touched.email && formikProps.errors.email
                      }
                      onBlur={formikProps.handleBlur('email')}
                      onChangeText={formikProps.handleChange('email')}
                    />

                    <CInput
                      styleContainer={styles.inputcontainer}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.shadow}
                      maxLength={10}
                      defaultText={formikProps.values.phoneNumber}
                      keyboardType="phone-pad"
                      placeholder={'Enter A Valid Mobile Number'}
                      errorMessage={
                        formikProps.touched.phoneNumber &&
                        formikProps.errors.phoneNumber
                      }
                      onBlur={formikProps.handleBlur('phoneNumber')}
                      onChangeText={formikProps.handleChange('phoneNumber')}
                    />

                    <CInput
                      styleContainer={styles.inputcontainer}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.shadow}
                      placeholder={
                        'Enter Project Name (3-20 Chars and Numbers Only)'
                      }
                      autoCapitalize="none"
                      maxLength={20}
                      defaultText={formikProps.values.projectName}
                      errorMessage={
                        formikProps.touched.projectName &&
                        formikProps.errors.projectName
                      }
                      onChangeText={formikProps.handleChange('projectName')}
                      onBlur={formikProps.handleBlur('projectName')}
                    />
                    <CInput
                      styleContainer={styles.inputcontainer}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.shadow}
                      maxLength={30}
                      placeholder={
                        'Enter Task description (3-30 Chars/Num/Spl Char Only)'
                      }
                      autoCapitalize="none"
                      defaultText={formikProps.values.description}
                      errorMessage={
                        formikProps.touched.description &&
                        formikProps.errors.description
                      }
                      onChangeText={formikProps.handleChange('description')}
                      onBlur={formikProps.handleBlur('description')}
                    />
                    <TouchableOpacity
                      style={[styles.companyStyle, styles.shadow]}
                      onPress={() => {
                        formikProps.setFieldTouched('startDate', true);
                        this.setState({open: true, isStartDateClicked: true});
                      }}>
                      <CText
                        style={[
                          styles.dateStyle,
                          startDate
                            ? {color: theme.colors.textColor}
                            : {color: theme.colors.placeHolderColor},
                        ]}>
                        {!formikProps.values?.startDate
                          ? 'Start Date dd/mm/yy'
                          : moment(formikProps.values?.startDate)
                              .format('DD/MM/YYYY')
                              .toString()}
                      </CText>
                    </TouchableOpacity>
                    {formikProps.errors.startDate &&
                      formikProps.touched.startDate && (
                        <CText style={[styles.errorMessageStyle]}>
                          {formikProps.errors.startDate}
                        </CText>
                      )}

                    <TouchableOpacity
                      style={[
                        styles.companyStyle,
                        styles.shadow,
                        {marginTop: 12},
                      ]}
                      onPress={() => {
                        formikProps.setFieldTouched('endDate', true);
                        this.setState({open: true, isStartDateClicked: false});
                      }}>
                      <CText
                        style={[
                          styles.dateStyle,
                          endDate
                            ? {color: theme.colors.textColor}
                            : {color: theme.colors.placeHolderColor},
                        ]}>
                        {!formikProps.values?.endDate
                          ? 'End Date dd/mm/yy'
                          : moment(formikProps.values?.endDate)
                              .format('DD/MM/YYYY')
                              .toString()}
                      </CText>
                    </TouchableOpacity>
                    {formikProps.errors.endDate &&
                      formikProps.touched.endDate && (
                        <CText style={[styles.errorMessageStyle]}>
                          {formikProps.errors.endDate}
                        </CText>
                      )}
                    <CText style={styles.taskStyle}>Task Status</CText>

                    <RadioButtonList
                      list={radioButtonList}
                      onPress={this.onRadioButtonSelected}
                      selected={this.selected}
                    />

                    {formikProps.errors.checked &&
                      formikProps.touched.checked && (
                        <CText style={[styles.errorMessageStyle]}>
                          {formikProps.errors.checked}
                        </CText>
                      )}

                    <Button
                      title="Save"
                      containerStyle={styles.buttonContainerStyle}
                      titleStyle={styles.buttonTitleStyle}
                      buttonStyle={styles.buttonStyle}
                      onPress={formikProps.handleSubmit}
                      loading={formikProps.isSubmitting}
                      disabled={formikProps.isSubmitting}
                    />
                  </React.Fragment>
                )}
              </Formik>
            </ScrollView>
            {this.state.open && (
              <DatePicker
                modal
                open={this.state.open}
                date={
                  this.state.isStartDateClicked
                    ? this.state.startDate || new Date()
                    : this.state.endDate || new Date()
                }
                mode="date"
                minimumDate={new Date()}
                onConfirm={date => this.onConfirmDateSelection(date)}
                onCancel={() => this.setState({open: false})}
                androidVariant="nativeAndroid"
              />
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

export default TodoAdd;
