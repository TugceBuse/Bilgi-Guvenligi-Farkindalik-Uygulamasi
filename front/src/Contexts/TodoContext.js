// Context/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
  { id: 'chatapp-download',
    text: '💬 Ofis içinde hızlı ve güvenli iletişim kurabilmek için kurumsal ChatApp uygulamasını indirip kurun.',
    completed: false,
    notified: false 
  },
  { id: 'novabank-app-download',
    text: '🏦 Şirket tarafından yapılan ödemeleri takip etmek ve dijital kart bakiyenizi görüntülemek için NovaBank uygulamasını indirmeniz gerekmektedir.',
    completed: false,
    notified: false 
  },
  { id: 'pdf-viewer-download',
    text: '📄 Size iletilen önemli sözleşmeleri ve dökümanları açabilmek için PDF Görüntüleyici uygulaması indirin.',
    completed: false,
    notified: false 
  },
  { id: 'kariyer-platform-register',
    text: '🧑‍💼 Kurumun anlaşmalı olduğu dış kaynaklı kariyer platformuna kayıt olmanız gerekiyor. Size uygun pozisyonları görebilmek için temel bilgilerinizi içeren bir hesap oluşturun.',
    completed: false, 
    notified: false 
  },
  { id: 'profile-pdf',
    text: '📄 Oyundaki sanal çalışan profilinize ait kişisel bilgileri içeren PDF dosyasını TaskApp üzerinden size verilen token bilgisiyle "FileVault" sitesi üzerinden indirip inceleyin.',
    completed: false,
    notified: false 
  },
  { id: 'check-mail',
    text: ' 📩 Ofis içi bilgilendirme ve görevlerinizi takip edebilmek için gelen kutunuzu kontrol edin.',
    completed: false,
    notified: false 
  },
  { id: 'download-safe-file',
    text: '📁 Departmandaki raporların çıktısını alabilmek için renkli baskı destekli bir yazıcı satın al. (Banka uygulamandan bakiyene bakmayı unutma, maillerinden ya da sosyal medya üzerinden fırsatları yakalamayı da ihmal etme! Ne kadar ucuz o kadar iyi...',
    completed: false,
    notified: false 
  },
  { id: 'checking-cargo-states',
    text: '🚚 Siparişini verdiğin renkli yazıcının kargo durumunu IT departmanıyla paylaş! (Kargo takibini sana bildirilen mail/sms yoluyla yapabilirsin.) ',
    completed: false,
    notified: false 
  },

]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
