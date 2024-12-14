import Desktop from "./Desktop/Desktop.jsx";
import TaskBar from "./TaskBar/TaskBar.jsx";
import Notification from "./Notifications/Notifications.jsx";
import { useEffect } from 'react';
import { GameContextProvider } from './Context/GameContext';
import { FileContextProvider } from './Context/FileContext';
import { UIContextProvider } from './Context/UIContext';
import { MailContextProvider } from './Context/MailContext.jsx';

const Game = () => {
  // Sağ tıklamayı engellemek ve sol click tetikleme
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <GameContextProvider>
      <div className="game">
        <Notification />
        <UIContextProvider>
          <FileContextProvider>
            <TaskBar />
            <MailContextProvider>
              <Desktop />
            </MailContextProvider>
          </FileContextProvider>
        </UIContextProvider>
      </div>
    </GameContextProvider>
  );
};

export default Game;