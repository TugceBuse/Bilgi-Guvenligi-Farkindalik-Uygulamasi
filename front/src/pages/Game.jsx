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
import { PhoneProvider } from '../Contexts/PhoneContext.js';
import { TodoProvider } from '../Contexts/TodoContext.js';

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
    <NotificationProvider>
      <Notification /> 
      <UIContextProvider>
        <FileContextProvider>
          <MailContextProvider>
            <VirusProvider>
              <WindowConfigProvider>
                <PhoneProvider>
                  <GameContextProvider>
                    <TodoProvider>
                      <div className="game">
                        <Desktop />
                      </div>
                    </TodoProvider>
                  </GameContextProvider>
                </PhoneProvider>
              </WindowConfigProvider>
            </VirusProvider>
          </MailContextProvider>
        </FileContextProvider>
      </UIContextProvider>
    </NotificationProvider>
  );
};

export default Game;
