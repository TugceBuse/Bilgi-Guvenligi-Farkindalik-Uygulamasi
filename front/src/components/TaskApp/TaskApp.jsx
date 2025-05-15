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
    }, 400);
  };

  if (!isTaskAppInstalled || !visible) return null;

  return (
    <div className={`task-app-container ${closing ? 'closing' : ''}`}>
      <div className="rotated-header">
        <button className="slide-close-button" onClick={handleClose}></button>
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
