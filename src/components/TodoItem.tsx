import { useDispatch } from 'react-redux';
import {toggleComplete, removeTodo} from '../store/todoSlice';

interface TodoItemProps {
  defaultTitle: string;
  id: number;
  title: string;
  completed: boolean;
}


const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = (): void => {
    dispatch(toggleComplete({ id: id.toString() }));
  };

  const handleRemoveTodo = (): void => {
    dispatch(removeTodo({ id: id.toString() }));
  };

  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={handleToggleComplete}
      />
      <span>{title}</span>
      <span onClick={handleRemoveTodo}>&times;</span>
    </li>
  );
};

export default TodoItem;