import Desktop from "./Desktop/Desktop.jsx";
import TaskBar from "./TaskBar/TaskBar.jsx";
import Notification from "./Notifications/Notifications.jsx";
import { useEffect } from 'react';
import { GameContextProvider } from './Contexts/GameContext';
import { FileContextProvider } from './Contexts/FileContext';
import { UIContextProvider } from './Contexts/UIContext';
import { MailContextProvider } from './Contexts/MailContext.jsx';

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