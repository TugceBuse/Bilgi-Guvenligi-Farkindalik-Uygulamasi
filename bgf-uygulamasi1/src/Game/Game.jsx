import Desktop from "./Desktop/Desktop.jsx";
import TaskBar from "./TaskBar/TaskBar.jsx";
import Notification from "./Notifications/Notifications.jsx";
import { useState, useEffect } from 'react';
import { GameContextProvider } from './Context';

const Game = () => {

  //Belirli işlem kontrolleri için süre sayımı
  // const [seconds, setSeconds] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(prevSeconds => prevSeconds + 1);
      
  //   }, 1000);
  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
   
  // }, []);
  ////////////////////////////////////

  // useEffect(() => {
  //   if (seconds === 10) {
  //     setShowNotification(true);
  //   }
  // }, [seconds]);

  return (
    <GameContextProvider>
      <div className="game">
        <TaskBar/>
        <Desktop/>
        <Notification />
      </div>
    </GameContextProvider>
  );
};

export default Game;