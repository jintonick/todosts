import React from 'react';
import TodoItem from './TodoItem';
import { useFetchTodosQuery } from '../store/todoApi';

const TodoList: React.FC = () => {
    const { data: todos = [], isFetching } = useFetchTodosQuery();

    if (isFetching) return <div>Loading...</div>;

    return (
        <ul>
            {todos?.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
};

export default TodoList;