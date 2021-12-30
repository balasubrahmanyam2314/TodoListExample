import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Icon} from 'react-native-elements';
import {theme} from '../../theme';
import {Header} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';

class TodoList extends Component {
  constructor(props) {
    super(props);
    const elementButton = index => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          size={24}
          name="edit"
          type="feather"
          color={theme.colors.black}
          onPress={() => this.clickOnEdit(index)}
          style={{marginEnd: 12}}
        />
        <Icon
          size={24}
          name="delete"
          type="material"
          color={theme.colors.black}
          onPress={() => this.clickOnDelete(index)}
        />
      </View>
    );
    const list = this.props.todoList;
    const newTableData =
      list && list.length > 0
        ? list?.map((item, index) => {
            const tabledata = [
              (index + 1).toString(),
              item?.name,
              item?.projectName,
              item?.description,
              item?.checked,
              item?.startDate,
              item?.endDate,
              elementButton(index),
            ];
            return tabledata;
          })
        : [];

    this.state = {
      tableHead: [
        'S.No',
        'Name',
        'Project',
        'Task',
        'Status',
        'Start Date',
        'End Date',
        'Edit/Delete',
      ],
      widthArr: [40, 100, 100, 100, 100, 100, 100, 100],
      tableData: newTableData,
    };
  }

  clickOnEdit = index => {
    this.props.editTodoOnIndex && this.props.editTodoOnIndex(index);
  };
  clickOnDelete = index => {
    const {tableData} = this.state;
    const newTabledata1 = tableData.slice(0, index);
    const newTabledata2 = tableData.slice(index + 1);
    this.setState({
      tableData: [...newTabledata1, ...newTabledata2],
    });

    this.props.updateList && this.props.updateList(index);
  };

  onClickAddTodo = () => {
    const {clickOnAdd} = this.props;
    clickOnAdd && clickOnAdd();
  };

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to close App?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
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
    const state = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme.colors.primary}
          translucent={false}
          hidden={false}
          animated
        />
        <Header
          title="Todo List"
          containerStyle={{marginBottom: 12}}
          rightIcon={
            <Icon
              size={24}
              name="plus-circle"
              type="feather"
              color={theme.colors.black}
              onPress={this.onClickAddTodo}
            />
          }
        />
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {state.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#F7F6E7'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100', flexWrap: 'wrap'},
  dataWrapper: {marginTop: -1},
  row: {minHeight: 40, backgroundColor: '#E7E6E1'},
});

export default TodoList;
