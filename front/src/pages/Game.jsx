import Desktop from "../components/Desktop/Desktop.jsx";
import Notification from "../components/Notifications/Notifications.jsx";
import { useEffect } from 'react';
import { GameContextProvider } from '../Contexts/GameContext.jsx';
import { FileContextProvider } from '../Contexts/FileContext.jsx';
import { UIContextProvider } from '../Contexts/UIContext.jsx';
import { MailContextProvider } from '../Contexts/MailContext.jsx';

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