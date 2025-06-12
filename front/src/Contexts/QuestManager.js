import React, { createContext, useContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import { QUEST_LIST } from "../constants/questList";

const QuestManagerContext = createContext();

export function useQuestManager() {
  return useContext(QuestManagerContext);
}

export function QuestManagerProvider({ children }) {
  const [quests, setQuests] = useState(QUEST_LIST);
  const [isTaskAppInstalled, setIsTaskAppInstalled] = useState(false); // Task uygulaması kurulu mu?
  const { addNotification } = useNotificationContext();

  // Aktif görevleri döndür
  const getActiveQuests = () => quests.filter(q => q.status === "active");

  // Görev tamamlama ve zincir görevleri aktive etme + BİLDİRİM
  const completeQuest = (id) => {
    setQuests((prev) => {
      let updated = prev.map(q => {
        if (q.id === id && q.status !== "completed" && q.status !== "failed") {
          console.log(`Görev tamamlandı: ${q.id} - ${q.title}`);
          return { ...q, status: "completed" };
        }
        return q;
      });

      // Yeni aktif olan görevleri tutmak için
      let newlyActivated = [];
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
          newlyActivated.push(q);
          return { ...q, status: "active" };
        }
        return q;
      });

      // BİLDİRİM: Sadece taskapp kuruluysa ve yeni görev açıldıysa
      if (isTaskAppInstalled && newlyActivated.length > 0) {
        newlyActivated.forEach(q =>
          addNotification({
            appType: "taskapp",
            title: "Yeni Görev Açıldı",
            message: q.title,
            isPopup: true,
            isTaskbar: false,
            duration: 3200
          })
        );
      }

      // Debug için güncel görev listesini göster
      console.log("Güncel görev listesi:", updated);

      return updated;
    });
  };

  const failQuest = (id) => {
    setQuests((prev) =>
      prev.map(q => q.id === id ? { ...q, status: "failed" } : q)
    );
  };

  const resetQuests = () => setQuests(QUEST_LIST);

  // Value'ya isTaskAppInstalled ve setter da ekliyoruz!
  const value = {
    quests,
    getActiveQuests,
    completeQuest,
    failQuest,
    resetQuests,
    setQuests,
    isTaskAppInstalled,
    setIsTaskAppInstalled, // TaskApp kurulunca erişebilsin
  };

  return (
    <QuestManagerContext.Provider value={value}>
      {children}
    </QuestManagerContext.Provider>
  );
}
