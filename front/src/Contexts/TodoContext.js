// Context/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
  { id: 'antivirus', text: '🔐 Antivirüs Kur', completed: false, notified: false },
  { id: 'profile-pdf', text: '📄 Oyundaki sanal çalışan profilinize ait kişisel bilgileri içeren PDF dosyasını indirip inceleyin.', completed: false, notified: false },
  { id: 'check-mail', text: '📩 Mail Kutunu Kontrol Et', completed: false, notified: false },
  { id: 'create-password', text: '💾 Güvenli Şifre Oluştur', completed: false, notified: false },
  { id: 'download-safe-file', text: '📁 Güvenilir Dosya İndir', completed: false, notified: false },
]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
