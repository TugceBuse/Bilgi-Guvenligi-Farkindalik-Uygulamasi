// Context/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { text: 'Yeni kurduğumuz ağ aktif olmalı', completed: false },
    { text: 'test 2', completed: false },
    { text: 'tst 3', completed: false },
  ]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
