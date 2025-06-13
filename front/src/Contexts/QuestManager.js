import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import { QUEST_LIST } from "../constants/questList";

const QuestManagerContext = createContext();

export function useQuestManager() {
  return useContext(QuestManagerContext);
}

export function QuestManagerProvider({ children }) {
  const [quests, setQuests] = useState(QUEST_LIST);
  const [isTaskAppInstalled, setIsTaskAppInstalled] = useState(false);
  const { addNotification } = useNotificationContext();


  const getActiveQuests = () => quests.filter(q => q.status === "active");

  const completeQuest = (id) => {
    setQuests((prev) => {
      let updated = prev.map(q => {
        if (q.id === id && q.status !== "completed" && q.status !== "failed") {
          console.log(`Görev tamamlandı: ${q.id} - ${q.title}`);
          return { ...q, status: "completed" };
        }
        return q;
      });

      let newlyActivated = [];
      updated = updated.map(q => {
        if (
          q.status === "locked" &&
          q.requires &&
          q.requires.length > 0 &&
          q.requires.every(rid => {
            const st = updated.find(q2 => q2.id === rid)?.status;
            return st === "completed" || st === "failed";
          })
        ) {
          console.log(`Zincirleme görev aktif oldu: ${q.id} - ${q.title}`);
          newlyActivated.push(q);
          return { ...q, status: "active" };
        }
        return q;
      });

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

      console.log("Completed -> Güncel görev listesi:", updated);

      return updated;
    });
  };

  const failQuest = (id) => {
    setQuests((prev) => {
      const quest = prev.find(q => q.id === id);
      if (!quest || quest.status === "completed") {
        // completed görevi faile çevirmeye izin verme
        return prev;
      }

      let updated = prev.map(q => q.id === id ? { ...q, status: "failed" } : q);

      let newlyActivated = [];
      updated = updated.map(q => {
        if (
          q.status === "locked" &&
          q.requires &&
          q.requires.length > 0 &&
          q.requires.every(rid => {
            const st = updated.find(q2 => q2.id === rid)?.status;
            return st === "completed" || st === "failed";
          })
        ) {
          newlyActivated.push(q);
          return { ...q, status: "active" };
        }
        return q;
      });

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

      console.log("failed -> Güncel görev listesi:", updated);

      return updated;
    });
  };

  const resetQuests = () => setQuests(QUEST_LIST);

  const value = {
    quests,
    getActiveQuests,
    completeQuest,
    failQuest,
    resetQuests,
    setQuests,
    isTaskAppInstalled,
    setIsTaskAppInstalled,
  };

  return (
    <QuestManagerContext.Provider value={value}>
      {children}
    </QuestManagerContext.Provider>
  );
}
