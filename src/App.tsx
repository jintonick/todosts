import { useState } from "react";
import "./App.css";
import TodoItem from "./elements/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./redux/TodoSlice";
import React, { FormEvent } from "react";
import { RootState } from "./redux/store";

function App() {
  const [input, setInput] = useState<string>("");

  const count = useSelector((state: RootState) => state.todo.count);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(input));
  };

  const handleTodoDone = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="flex-coll">
        <h1 className="font-medium">TODO List</h1>
        <form onSubmit={handleAddTodo}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Add todosss</label>
          <div className="relative">
              <input type="text" id="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add todo" required onInput={(e) => setInput(e.currentTarget.value)}/>
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
          </div>
      </form>
        <div className="pt-8">
          {count > 0 &&
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                id={todo.id}
                onCheck={handleTodoDone}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
