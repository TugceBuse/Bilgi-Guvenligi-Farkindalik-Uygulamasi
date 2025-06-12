import React, { useEffect, useState } from 'react';
import './TaskApp.css';
import { useGameContext } from '../../Contexts/GameContext';
// import { useTodoContext } from '../../Contexts/TodoContext'; // Artık gerek yok
import { useQuestManager } from '../../Contexts/QuestManager';

const TaskApp = () => {
  const { isTaskAppInstalled } = useGameContext();
  const { quests } = useQuestManager(); // Questleri contextten çekiyoruz
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isTaskAppInstalled) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setVisible(true);
        setClosing(false);
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

  // Görevleri status'e göre grupla ve göster
  return (
    <div className={`task-app-container ${closing ? 'closing' : ''}`}>
      <div className="rotated-header">
        <button className="slide-close-button"></button>
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
          {quests && quests.length > 0 ? (
            <ul className="task-list">
              {quests.map((quest) => (
                <li
                  key={quest.id}
                  className={
                    `task-item 
                    ${quest.status === 'completed' ? 'completed' : ''}
                    ${quest.status === 'failed' ? 'failed' : ''}
                    ${quest.status === 'active' ? 'active' : ''}
                    ${quest.status === 'locked' ? 'locked' : ''}
                    `
                  }
                  title={quest.description}
                >
                  {quest.status === 'completed' && (
                    <img src="/icons/mission-complete.png" alt="Tamamlandı" className="task-status-icon" />
                  )}
                  {quest.status === 'failed' && (
                    <img src="/icons/mission-failed.png" alt="Başarısız" className="task-status-icon" />
                  )}
                  {quest.status === 'active' && (
                    <span className="task-status-dot"></span>
                  )}
                  {quest.status === 'locked' && (
                    <span className="task-status-dot locked"></span>
                  )}
                  <span>{quest.title}</span>
                  {/* Ekstra: durum etiketi */}
                  <span className="task-status-label">
                    {quest.status === 'completed' && 'Tamamlandı'}
                    {quest.status === 'failed' && 'Başarısız'}
                    {quest.status === 'active' && 'Aktif'}
                    {quest.status === 'locked' && 'Kilitli'}
                  </span>
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
