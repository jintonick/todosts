import { useDispatch } from 'react-redux';
import { toggleComplete, removeTodosThunk } from '../store/todoSlice';
import React from 'react';
import { Dispatch } from 'redux';

interface TodoItemProps {
  defaultTitle: string;
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const handleToggleComplete = (): void => {
    dispatch<any>(toggleComplete({id}));
  };

  const handleRemoveTodo = (): void => {
    dispatch<any>(removeTodosThunk(id));
  };

  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={handleToggleComplete}
      />
      <span>{title}</span>
      <button onClick={handleRemoveTodo}>&times;</button>
    </li>
  );
};

export default TodoItem;