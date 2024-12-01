import Desktop from "./Desktop/Desktop.jsx";
import TaskBar from "./TaskBar/TaskBar.jsx";
import Notification from "./Notifications/Notifications.jsx";
import { useState, useEffect } from 'react';
import { GameContextProvider } from './Context';
import { useGameContext } from './Context';
import RansomScreen from './Notifications/Ransom.jsx';

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
      {/* {<RansomScreen/>} */}
        <TaskBar/>
        <Desktop/>
        <Notification/>
      </div>
    </GameContextProvider>
  );
};

export default Game;