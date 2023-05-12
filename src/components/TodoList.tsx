import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import React from 'react';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem defaultTitle={''} key={todo.id} {...todo} />
            ))}
        </ul>
    );
};

export default TodoList;

interface RootState {
    todos: {
        todos: Todo[];
    };
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}