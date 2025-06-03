import Desktop from "../components/Desktop/Desktop.jsx";
import Notification from "../components/Notifications/Notifications.jsx";
import { useEffect } from 'react';
import { GameContextProvider } from '../Contexts/GameContext.js';
import { FileContextProvider } from '../Contexts/FileContext.js';
import { UIContextProvider } from '../Contexts/UIContext.js';
import { MailContextProvider } from '../Contexts/MailContext.js';
import { VirusProvider } from '../Contexts/VirusContext.js';
import { SecurityProvider } from '../Contexts/SecurityContext.js'; // EKLEDİN!
import { WindowConfigProvider } from '../Contexts/WindowConfigContext.js';
import { NotificationProvider } from '../Contexts/NotificationContext';
import { PhoneProvider } from '../Contexts/PhoneContext.js';
import { TodoProvider } from '../Contexts/TodoContext.js';
import CargoMailNotifier from '../components/CargoMailNotifier.jsx'; // EKLEDİN!

const Game = () => {
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
    <UIContextProvider>
      <NotificationProvider>
        <Notification /> 
          <SecurityProvider>
            <VirusProvider>
              <FileContextProvider>
                <WindowConfigProvider>
                  <MailContextProvider>
                    <PhoneProvider>
                      <GameContextProvider>
                        <TodoProvider>
                          <CargoMailNotifier />
                          <div className="game">
                            <Desktop />
                          </div>
                        </TodoProvider>
                      </GameContextProvider>
                    </PhoneProvider>
                  </MailContextProvider>
                </WindowConfigProvider> 
              </FileContextProvider>
            </VirusProvider>
          </SecurityProvider>
      </NotificationProvider>
    </UIContextProvider>
  );
};

export default Game;
