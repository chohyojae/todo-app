import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 0; i < 2500; i++) {
    array.push({
      id: i + 1,
      text: `할 일 #${i}`,
      checked: i % 2 !== 0 ? true : false,
    });
  }
  return array;
}

function todoReceiver(todos, action) {
  let ret;
  switch (action.type) {
    case 'INSERT':
      ret = todos.concat(action.todo);
      break;
    case 'REMOVE':
      ret = todos.filter((todo) => todo.id !== action.id);
      break;
    case 'TOGGLE':
      ret = todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
      break;
    default:
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

  const nextId = useRef(() => todos.length + 1);

  const onInsert = useCallback((text) => {
    const newTodo = {
      id: nextId.current++,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', newTodo });
  }, []);

  const onRemove = useCallback((item) => dispatch(item), []);

  const onCheckboxToggle = useCallback((item) => {
    const newTodos = (todos) =>
      todos.map((todo) => {
        return todo.id === item.id ? { ...todo, checked: !todo.checked } : todo;
      });
    dispatch({ type: 'TOGGLE', newTodos });
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
