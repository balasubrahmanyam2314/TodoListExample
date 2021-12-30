import React, {useState} from 'react';

import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ToDoAdd from './src/screens/todoadd';
import TodoList from './src/screens/todolist';

const App = () => {
  const [showList, setShowList] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [editTodoIndex, setEditTodoIndex] = useState(-1);

  const addTodoIconClicked = () => {
    setShowList(false);
    setEditTodoIndex(-1);
  };

  const addTodoDataTList = data => {
    if (editTodoIndex === -1) {
      setTodoList(prevState => [...prevState, data]);
    } else {
      setTodoList(list => [
        ...list.slice(0, editTodoIndex),
        data,
        ...list.slice(editTodoIndex + 1),
      ]);
    }

    setShowList(true);
  };

  const addtodoBackIconClick = () => {
    setShowList(true);
  };

  const updateTodoList = index => {
    const newTodoList1 = todoList.slice(0, index);
    const newTodoList2 = todoList.slice(index + 1);
    setTodoList([...newTodoList1, ...newTodoList2]);
  };

  const editTodoOnIndex = index => {
    setEditTodoIndex(index);
    setShowList(false);
  };
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {showList ? (
          <TodoList
            todoList={todoList}
            clickOnAdd={addTodoIconClicked}
            updateList={updateTodoList}
            editTodoOnIndex={editTodoOnIndex}
          />
        ) : (
          <ToDoAdd
            sendTodoData={addTodoDataTList}
            onBack={addtodoBackIconClick}
            todoData={todoList[editTodoIndex]}
          />
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
