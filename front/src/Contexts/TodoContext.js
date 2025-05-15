// Context/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
  { id: 'antivirus', text: '🧑‍💼 Kurumun anlaşmalı olduğu dış kaynaklı kariyer platformuna kayıt olmanız gerekiyor. Size uygun pozisyonları görebilmek için temel bilgilerinizi içeren bir hesap oluşturun.', completed: false, notified: false },
  { id: 'profile-pdf', text: '📄 Oyundaki sanal çalışan profilinize ait kişisel bilgileri içeren PDF dosyasını indirip inceleyin.', completed: false, notified: false },
  { id: 'check-mail', text: ' 📩 Ofis içi bilgilendirme ve görevlerinizi takip edebilmek için gelen kutunuzu kontrol edin.', completed: false, notified: false },
  { id: 'create-password', text: '🖥️ Ofiste eksik olan donanımlar için satın alma işlemi sizden istendi. IT destek ekibinin yönlendirdiği çevrim içi mağazadan gerekli ürünü seçip siparişi tamamlayın.', completed: false, notified: false },
  { id: 'download-safe-file', text: '📁 Departman yöneticiniz, işe başlamadan önce gerekli yazılım kurulum dosyasını sizinle paylaştı. İndirin ve çalıştırın', completed: false, notified: false },
]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
