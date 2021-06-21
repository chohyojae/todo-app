import React, { useState, useRef, useCallback } from 'react';
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

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(() => todos.length + 1);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };

      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (item) => {
      const newTodos = todos.filter((todo) => todo.id !== item.id);
      console.log(newTodos);
      setTodos(newTodos);
    },
    [todos],
  );

  const onCheckboxToggle = useCallback(
    (item) => {
      const newTodos = todos.map((todo) => {
        return todo.id === item.id ? { ...todo, checked: !todo.checked } : todo;
      });
      setTodos(newTodos);
    },
    [todos],
  );

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
