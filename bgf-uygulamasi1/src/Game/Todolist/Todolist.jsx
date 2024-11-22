import "./Todolist.css";
import React, { useState , useEffect, useRef} from "react";
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';
  

export const useTodoList = () => {
    const { toggleWindow, setActiveWindow } = useGameContext();

    const openTodoList = () => {
        toggleWindow('todolist');
    };
    
    const closeTodoList = () => {
        toggleWindow('todolist');
    };
    
    return { openTodoList, closeTodoList };
    }


    

const Todolist = ({closeTodoList, todos, setTodos}) => {

  const todolistRef = useRef(null);

  MakeDraggable(todolistRef, '.Todolist-header');

        //Todolist değişikliklerini kaydetmeyi saglıyor
    const handleCheckboxChange = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

  return (
    <div className="Todolist-window" ref={todolistRef}>
        
        <div className="Todolist-header">
            <h2>To-Do List</h2>
            <button className="Todolist-close" onClick={closeTodoList}>×</button>
        </div>
        <div className="Todolist-content">
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