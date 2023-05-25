import React, { useState } from 'react';
import { useAddTodoMutation } from './store/todoApi';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const [addTodo] = useAddTodoMutation();

  const handleAction = (): void => {
    if (text.trim().length) {
      addTodo({
        title: text, 
        completed: false,
        userId: 1
      });
      setText('');
    }
  };

  return (
    <div className='flex justify-center mt-10'>
      <div className=''>
      <NewTodoForm value={text} updateText={setText} handleAction={handleAction} />
      <TodoList />
      </div>
    </div>
  );
};

export default App;