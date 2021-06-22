import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onCheckboxToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todoItem) => {
        return (
          <TodoListItem
            todo={todoItem}
            key={todoItem.id}
            onRemove={onRemove}
            onCheckboxToggle={onCheckboxToggle}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TodoList);
