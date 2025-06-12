// Contexts/TimeContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  // Oyun başlangıç tarihi: her zaman bugünün 09:00'u
  const [gameStart] = useState(() => {
    const now = new Date();
    now.setHours(9, 0, 0, 0); // saat: 09:00:00
    return new Date(now);
  });

  // Geçen oyun saniyesi
  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(seconds);

  // Saniye güncellemesi
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  // Anlık oyun zamanı Date objesi olarak (her saniye güncellenir)
  const [gameDate, setGameDate] = useState(new Date(gameStart.getTime()));
  useEffect(() => {
    setGameDate(new Date(gameStart.getTime() + seconds * 1000));
  }, [seconds, gameStart]);

  // Göreceli tarih fonksiyonu (opsiyonel, eski fonksiyondan aynen alınabilir)
  const getRelativeDate = ({ days = 0, months = 0, hours = 0, minutes = 0 }) => {
    const newDate = new Date(gameStart.getTime());
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  return (
    <TimeContext.Provider value={{
      seconds,
      secondsRef,
      gameStart,
      gameDate,
      getRelativeDate
    }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => useContext(TimeContext);
