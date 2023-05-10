import React from "react";

interface INewTodoFormProps {
  value: string
  updateText: (val: string) => void
  handleAction: () => void
}

const NewTodoForm: React.FC<INewTodoFormProps> = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input
        type="text"
        className="border-solid border-black border-5"
        placeholder='new todo'
        value={value}
        onChange={(e) => updateText(e.target.value)}
      />
      <button className="text-sl bg-cyan-400 p-2 rounded-md" onClick={handleAction}>Add todo</button>
    </label>
  );
};

export default NewTodoForm;