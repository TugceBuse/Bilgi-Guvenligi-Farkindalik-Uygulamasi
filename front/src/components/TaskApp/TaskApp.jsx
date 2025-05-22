import React, { useEffect, useState } from 'react';
import './TaskApp.css';
import { useGameContext } from '../../Contexts/GameContext';
import { useTodoContext } from '../../Contexts/TodoContext';

const TaskApp = () => {
  const { isTaskAppInstalled } = useGameContext();
  const { todos } = useTodoContext();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isTaskAppInstalled) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setVisible(true);
        setClosing(false); // tekrar Tab'a basınca hemen açılır
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Tab') {
        setClosing(true);
        setTimeout(() => {
          setVisible(false);
          setClosing(false);
        }, 400);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTaskAppInstalled]);

  if (!isTaskAppInstalled || !visible) return null;

  return (
    <div className={`task-app-container ${closing ? 'closing' : ''}`}>
      <div className="rotated-header">
        {/* Onclick kaldırıldı sadece taba basılı tutmakla açılıyor */}
        <button className="slide-close-button" ></button>
        TaskApp
      </div>

      <div className="task-app-panel-content">
        <div className="task-icon-container">
          <div className="task-icon-wrapper">
            <img src="/icons/task-list.png" alt="Task List Icon" className="task-icon-img" />
            <span className="task-icon-badge">Yeni!</span>
          </div>
        </div>

        <div className="task-app-content">
          {todos.length > 0 ? (
            <ul className="task-list">
              {todos.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  {task.completed && (
                    <img src="/icons/mission-complete.png" alt="Tamamlandı" className="task-status-icon" />
                  )}
                  {task.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">Henüz bir görevin yok!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskApp;
