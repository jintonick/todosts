import React from 'react';
import { useRemoveTodoMutation } from '../store/todoApi';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const [removeTodo] = useRemoveTodoMutation();

  return (
    <li>
      <input type='checkbox' checked={completed} readOnly />
      <span>{title}</span>
      <button onClick={() => removeTodo(id)}>&times;</button>
    </li>
  );
};

export default TodoItem;