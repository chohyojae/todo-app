import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map((todoItem) => {
        console.log(todoItem);
        return <TodoListItem todo={todoItem} key={todoItem.id} />;
      })}
    </div>
  );
};

export default TodoList;
