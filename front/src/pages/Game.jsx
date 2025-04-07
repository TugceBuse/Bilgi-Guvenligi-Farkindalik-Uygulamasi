import Desktop from "../components/Desktop/Desktop.jsx";
import Notification from "../components/Notifications/Notifications.jsx";
import { useEffect } from 'react';
import { GameContextProvider } from '../Contexts/GameContext.js';
import { FileContextProvider } from '../Contexts/FileContext.js';
import { UIContextProvider } from '../Contexts/UIContext.js';
import { MailContextProvider } from '../Contexts/MailContext.js';
import { VirusProvider } from '../Contexts/VirusContext.js';
import { WindowConfigProvider } from '../Contexts/WindowConfigContext.js';
import { NotificationProvider } from '../Contexts/NotificationContext';

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
        <NotificationProvider>
          <Notification />
          <UIContextProvider>
            <FileContextProvider>
              <MailContextProvider>
                <VirusProvider>
                  <WindowConfigProvider>
                    <Desktop />
                  </WindowConfigProvider>
                </VirusProvider>
              </MailContextProvider>
            </FileContextProvider>
          </UIContextProvider>
        </NotificationProvider>
      </div>
    </GameContextProvider>
  );
};

export default Game;
