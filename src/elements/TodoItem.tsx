import React from "react";

interface TodoItemProps {
  id: number;
  text: string;
  onCheck: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const deleteTodo = () => {
    props.onCheck(props.id);
  };
  return (
    // <div className="todo" onClick={deleteTodo}>
    //   <input type="checkbox" />
    //   <label>{props.text}</label>
    // </div>
    <div className="flex items-center mb-4" onClick={deleteTodo}>
      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{props.text}</label>
    </div>
  );
};

export default TodoItem;