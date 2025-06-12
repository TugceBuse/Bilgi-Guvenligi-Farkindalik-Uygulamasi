import React, { createContext, useContext, useState } from "react";
import { useTimeContext } from "./TimeContext"; 

const NotepadContext = createContext();

export const NotepadProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { gameDate } = useTimeContext(); 

  // Not ekle
  const addNote = (text) => {
    if (!text.trim()) return;
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), date: new Date(gameDate) },
    ]);
  };

  // Not sil
  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Tüm notları sil
  const clearNotes = () => setNotes([]);

  // Not güncelle
    const editNote = (id, newText) => {
    setNotes((prev) =>
        prev.map((note) =>
        note.id === id ? { ...note, text: newText.trim() } : note
        )
    );
    };

  return (
    <NotepadContext.Provider value={{ notes, addNote, removeNote, clearNotes, editNote }}>
      {children}
    </NotepadContext.Provider>
  );
};

export const useNotepad = () => useContext(NotepadContext);
