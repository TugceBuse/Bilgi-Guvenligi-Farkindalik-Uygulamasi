import React, { useEffect, useState } from 'react';
import './TaskApp.css';
import { useGameContext } from '../../Contexts/GameContext';

const TaskApp = () => {
  const { isTaskAppInstalled } = useGameContext();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const tasks = [
    { title: '🔐 Antivirüs Kur', completed: false },
    { title: '🌐 İnternete Bağlan', completed: false },
    { title: '📩 Mail Kutunu Kontrol Et', completed: false },
    { title: '💾 Güvenli Şifre Oluştur', completed: false },
    { title: '📁 Güvenilir Dosya İndir', completed: false },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && isTaskAppInstalled) {
        e.preventDefault();
        setVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTaskAppInstalled]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 300);
  };

  if (!isTaskAppInstalled || !visible) return null;

  return (
    <div className={`task-app-container ${closing ? 'closing' : ''}`}>
        <div className="task-app-header">
            <h2>TaskApp</h2>
            <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <span className="task-icon-span"><img src="/icons/task-list.png" alt="Task List Icon" className="task-icon" /></span>
        
        <div className="task-app-content">
        {tasks.length > 0 ? (
            <ul className="task-list">
            {tasks.map((task, idx) => (
                <li key={idx} className={`task-item ${task.completed ? 'completed' : ''}`}>
                {task.title}
                </li>
            ))}
            </ul>
        ) : (
            <p className="no-tasks">Henüz bir görevin yok!</p>
        )}
        </div>
    </div>
  );
};

export default TaskApp;
