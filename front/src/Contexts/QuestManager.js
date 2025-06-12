import React, { createContext, useContext, useState } from "react";

// Başlangıç quest listesini içeri al
import { QUEST_LIST } from "../constants/questList";

const QuestManagerContext = createContext();

export function useQuestManager() {
  return useContext(QuestManagerContext);
}

export function QuestManagerProvider({ children }) {
  // Quest state (tüm görevlerin anlık durumu)
  const [quests, setQuests] = useState(QUEST_LIST);

  // Şu an aktif görevleri kolayca döndürmek için
  const getActiveQuests = () => quests.filter(q => q.status === "active");

  // Görevi tamamla ve zincirli görevleri aktive et
  const completeQuest = (id) => {
    setQuests((prev) => {
      return prev.map(q => {
        if (q.id === id) {
          // Görevi tamamla
          return { ...q, status: "completed" };
        }
        // Zincirleme görevleri aç
        if (q.requires.includes(id) && q.status === "locked") {
          // Tüm requirements'ları tamamlandıysa aç
          const allReqMet = q.requires.every(rid =>
            prev.find(q2 => q2.id === rid && q2.status === "completed")
          );
          if (allReqMet) return { ...q, status: "active" };
        }
        return q;
      });
    });
  };

  // Görevi başarısız olarak işaretle
  const failQuest = (id) => {
    setQuests((prev) =>
      prev.map(q => q.id === id ? { ...q, status: "failed" } : q)
    );
  };

  // Reset veya tekrar başlatmak için
  const resetQuests = () => setQuests(QUEST_LIST);

  // Dışarıya sağlayacağımız değerler
  const value = {
    quests,
    getActiveQuests,
    completeQuest,
    failQuest,
    resetQuests,
    setQuests
  };

  return (
    <QuestManagerContext.Provider value={value}>
      {children}
    </QuestManagerContext.Provider>
  );
}
