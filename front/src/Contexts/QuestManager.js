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
      // 1. Adım: Önce ilgili görevi completed yap
      let updated = prev.map(q => {
        if (q.id === id && q.status !== "completed" && q.status !== "failed") {
          console.log(`Görev tamamlandı: ${q.id} - ${q.title}`);
          return { ...q, status: "completed" };
        }
        return q;
      });

      // 2. Adım: Zincir görevleri güncel listeye göre aç
      updated = updated.map(q => {
        if (
          q.status === "locked" &&
          q.requires &&
          q.requires.length > 0 &&
          q.requires.every(rid =>
            updated.find(q2 => q2.id === rid && q2.status === "completed")
          )
        ) {
          console.log(`Zincirleme görev aktif oldu: ${q.id} - ${q.title}`);
          return { ...q, status: "active" };
        }
        return q;
      });

      // Debug için güncel görev listesini göster
      console.log("Güncel görev listesi:", updated);

      return updated;
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
