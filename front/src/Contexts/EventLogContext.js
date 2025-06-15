import React, { createContext, useContext, useEffect, useState } from "react";
import { useTimeContext } from "./TimeContext";

const EventLogContext = createContext();

export function useEventLog() {
  return useContext(EventLogContext);
}

export function EventLogProvider({ children }) {
  const [eventLogs, setEventLogs] = useState([]);
  const { gameDate } = useTimeContext();

  // Tek log
  const addEventLog = (event) => {
    setEventLogs((prev) => [
      ...prev,
      {
        ...event,
        timestamp: event.timestamp || gameDate.toISOString(),
      }
    ]);
  };

  // Birden fazla log eklemek
  const addEventLogs = (events) => {
    setEventLogs((prev) => [
      ...prev,
      ...events.map(event => ({
        ...event,
        timestamp: event.timestamp || gameDate.toISOString(),
      }))
    ]);
  };

  useEffect(() => {
    console.log("Event logs updated:", eventLogs);
  }
  , [eventLogs]);

  // Tüm event loglarını temizle (oyun başı/sonu için)
  const resetEventLogs = () => setEventLogs([]);

  // (İstersen) Event loglardan filtreleme veya analiz fonksiyonları eklenebilir
  // const getEventsByType = (type) => eventLogs.filter(ev => ev.type === type);

  // Değerleri sağlayan context
  const value = {
    eventLogs,      // Tüm event loglar (gamesession'a göndereceğin dizi)
    addEventLog,    // Tek event ekle
    addEventLogs,   // Çoklu event ekle
    resetEventLogs, // Sıfırla
    setEventLogs,   // Gerekirse doğrudan set et
    // getEventsByType
  };


        //   {
        //   type: "phishing_mail_open",    // veya "secure_wifi_connect", ...
        //   questId: "connect_wifi",       // ilgili görevle bağlantılıysa
        //   logEventType: "wifi",          // quest’in logEventType’ı ile uyumlu
        //   value: -10,                    // puan etkisi
        //   data: { url: "phish.com" },    // opsiyonel ek bilgi
        //   timestamp: "2025-06-14T19:07:55.000Z"
        // }

  return (
    <EventLogContext.Provider value={value}>
      {children}
    </EventLogContext.Provider>
  );
}
