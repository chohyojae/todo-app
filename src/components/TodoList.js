import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove }) => {
  return (
    <div className="TodoList">
      {todos.map((todoItem) => {
        return (
          <TodoListItem todo={todoItem} key={todoItem.id} onRemove={onRemove} />
        );
      })}
    </div>
  );
};

export default TodoList;
