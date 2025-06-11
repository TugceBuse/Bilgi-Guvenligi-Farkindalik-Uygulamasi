  import Desktop from "../components/Desktop/Desktop.jsx";
  import Notification from "../components/Notifications/Notifications.jsx";
  import { useEffect, useState } from 'react';
  import { GameContextProvider } from '../Contexts/GameContext.js';
  import { FileContextProvider } from '../Contexts/FileContext.js';
  import { UIContextProvider } from '../Contexts/UIContext.js';
  import { MailContextProvider } from '../Contexts/MailContext.js';
  import { VirusProvider } from '../Contexts/VirusContext.js';
  import { SecurityProvider } from '../Contexts/SecurityContext.js'; 
  import { WindowConfigProvider } from '../Contexts/WindowConfigContext.js';
  import { NotificationProvider } from '../Contexts/NotificationContext';
  import { PhoneProvider } from '../Contexts/PhoneContext.js';
  import { TodoProvider } from '../Contexts/TodoContext.js';
  import CargoMailNotifier from '../components/CargoMailNotifier.jsx';
  import { ChatContextProvider } from '../Contexts/ChatContext.js';
  import { TimeProvider } from '../Contexts/TimeContext.js';
  import IntroScreen from '../components/IntroScreen/IntroScreen.jsx';

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
    const [phase, setPhase] = useState("desktop");

    return (
      <TimeProvider>
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
                            <ChatContextProvider>
                              <CargoMailNotifier />
                              <div className="game">
                                {/* {phase === "intro" && <IntroScreen onFinish={() => setPhase("hacked")} />}
                                {(phase === "hacked" || phase === "desktop") && (
                                  <Desktop hacked={phase === "hacked"} onFormat={phase === "hacked" ? () => setPhase("desktop") : undefined} />
                                )}                       */}
                                {phase === "desktop" && <Desktop />}
                              </div>
                            </ChatContextProvider>
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
      </TimeProvider>
    );
  };

  export default Game;
