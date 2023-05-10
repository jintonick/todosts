import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import { addTodo, fetchTodos } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();

  const handleAction = (): void => {
    if (text.trim().length) {
      dispatch(addTodo({ text }));
      setText('');
    }
  };

  useEffect(() => {
    const fetchTodosAction: AsyncThunkAction<any, void, any> = fetchTodos();
    dispatch(fetchTodosAction as any);
  }, [dispatch]);

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