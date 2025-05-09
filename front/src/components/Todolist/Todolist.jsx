import "./Todolist.css";
import React, { useRef } from "react";
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from "../../Contexts/UIContext";
import { useTodoContext } from '../../Contexts/TodoContext';

  export const useTodoList = () => {
    const { toggleWindow } = useUIContext();

    const openHandler = () => {
        toggleWindow('todolist');
    };
    
    const closeHandler = () => {
        toggleWindow('todolist');
    };
    
    return { openHandler, closeHandler };
  }


const Todolist = ({closeHandler, style}) => {

  const { todos, setTodos } = useTodoContext();
  const todolistRef = useRef(null);

  MakeDraggable(todolistRef, '.todolist-header');

        //Todolist değişikliklerini kaydetmeyi saglıyor
        const handleCheckboxChange = (index) => {
          const newTodos = [...todos];
          newTodos[index].completed = !newTodos[index].completed;
          setTodos(newTodos);
        };

  return (
    <div className="todolist-window" style={style} ref={todolistRef} data-window="todolist">
        
        <div className="todolist-header">
            <h2>To-Do List</h2>
            <button className="todolist-close" onClick={closeHandler}>×</button>
        </div>
        <div className="todolist-content">
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
        </div>

    </div>
  );
}

export default Todolist;