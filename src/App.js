import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 0; i < 2500; i++) {
    array.push({
      id: i + 1,
      text: `할 일 #${i + 1}`,
      checked: i % 2 !== 0 ? true : false,
    });
  }
  return array;
}

function todoReceiver(todos, action) {
  let ret;
  switch (action.type) {
    case 'INSERT':
      console.log(action.todo);
      ret = todos.concat(action.todo);
      break;
    case 'REMOVE':
      ret = todos.filter((todo) => todo !== action.todo);
      break;
    case 'TOGGLE':
      ret = todos.map((todo) =>
        todo === action.todo ? { ...todo, checked: !todo.checked } : todo,
      );
      break;
    default:
      ret = todos;
      break;
  }
  return ret;
}

const App = () => {
  const [todos, dispatch] = useReducer(
    todoReceiver,
    undefined,
    createBulkTodos,
  );

  const nextId = useRef(todos.length + 1);

  const onInsert = useCallback((text) => {
    const newTodo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo: newTodo });
    nextId.current++;
  }, []);

  const onRemove = useCallback(
    (item) => dispatch({ type: 'REMOVE', todo: item }),
    [],
  );

  const onCheckboxToggle = useCallback((item) => {
    console.log('onCheckboxToggle, id:' + item.id);
    return dispatch({ type: 'TOGGLE', todo: item });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onCheckboxToggle={onCheckboxToggle}
      />
    </TodoTemplate>
  );
};

export default App;
