import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { addTodosThunk, fetchTodos, TodoReqest } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import { useAppDispatch } from './store/Index';


import './App.css';

const App: React.FC = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAction = (): void => {
    if (text.trim().length) {
      dispatch(addTodosThunk({
        title: text, 
        completed: false,
        userId: 1
      }))
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