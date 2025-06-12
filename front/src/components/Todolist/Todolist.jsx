import styles from "./Todolist.module.css";
import React, { useRef, useState } from "react";
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from "../../Contexts/UIContext";
import { useNotepad } from "../../Contexts/NotepadContext";

  export const useTodoList = () => {
    const { openWindow, closeWindow } = useUIContext();

    const openHandler = () => {
        openWindow('todolist');
    };
    
    const closeHandler = () => {
        closeWindow('todolist');
    };
    
    return { openHandler, closeHandler };
  }


const Todolist = ({closeHandler, style}) => {

  const { notes, addNote, removeNote, clearNotes, editNote } = useNotepad();
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const notepadRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  MakeDraggable(notepadRef, `.${styles.notepadHeader}`);

  // Enter tuşuyla ekleme
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    addNote(text);
    setText("");
    inputRef.current?.focus();
  };

  const startEdit = (id, oldText) => {
    setEditingId(id);
    setEditValue(oldText);
  };

  const handleEditSave = (id) => {
    if (editValue.trim()) {
      editNote(id, editValue);
    }
    setEditingId(null);
    setEditValue("");
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave(id);
    }
    if (e.key === "Escape") {
      setEditingId(null);
      setEditValue("");
    }
  };

  return (
    <div className={styles.notepadWindow} style={style} ref={notepadRef} data-window="notepad">
      <div className={styles.notepadHeader}>
        <h2>📝 Not Defteri</h2>
        <div>
          <button className={styles.clearBtn} onClick={clearNotes}>
           <p>Tüm Notları Sil 🗑</p>
          </button>
          <button className={styles.closeBtn} onClick={closeHandler} title="Kapat">
            ×
          </button>
        </div>
      </div>
      <div className={styles.notepadContent}>
        <ul className={styles.noteList}>
          {notes.length === 0 && <li className={styles.empty}>Henüz hiç notunuz yok.</li>}
          {notes.map((note) => (
            <li key={note.id} className={styles.noteItem}>
              <div
                className={styles.noteMain}
                onDoubleClick={() => startEdit(note.id, note.text)}
                tabIndex={0}
              >
                {editingId === note.id ? (
                  <input
                    className={styles.editInput}
                    value={editValue}
                    autoFocus
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => handleEditKeyDown(e, note.id)}
                    onBlur={() => handleEditSave(note.id)}
                    maxLength={1000}
                  />
                ) : (
                  <>
                    <span className={styles.noteText}>{note.text}</span>
                    {new Date(note.date).toLocaleString("tr-TR", {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    })}
                  </>
                )}
              </div>
              <button className={styles.removeBtn} onClick={() => removeNote(note.id)} title="Sil">
                ❌
              </button>
            </li>
          ))}
        </ul>
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Yeni notunuzu yazın ve Enter'a basın..."
          className={styles.textarea}
          rows={2}
          maxLength={1000}
        />
        <button
          className={styles.addBtn}
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          ➕ Ekle
        </button>
      </div>
    </div>
  );
}

export default Todolist;