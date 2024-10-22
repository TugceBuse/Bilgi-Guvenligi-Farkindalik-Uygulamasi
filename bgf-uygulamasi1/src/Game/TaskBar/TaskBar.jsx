import "./taskbar.css";
import React, { useState, useEffect } from 'react';

const TaskBar = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (


    // Görev çubuğu bileşeni
  <div className="taskbar">

    {/* Başlat Menüsü */}
    <div className="start-menu">
      <img src="/icons/windows-10.png" alt="Start Button" />
    </div>
    
    <div className="taskbar-icons">
      <img src="https://img.icons8.com/fluency/48/000000/chrome.png" alt="Chrome Icon" />
      <img src="/icons/folder-invoices.png" alt="File Explorer Icon" />
    </div>
      
      {/* Görev Çubuğu Sağ Tarafı */}
    <div className="taskbar-right">

      <div className="taskbar-antivirus">
          <img src="/icons/antivirus.png" alt="Antivirus Icon" />
      </div>

      <div className="taskbar-status">
            {/* Saat */}
          <div className="taskbar-clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          {/* Bildirimler */}
          <div className="taskbar-notifications">
            <img src="/icons/notification_blck.png"
            alt="Notification Icon" />
          </div>

      </div>

    </div>
  </div>
  );
  }

export default TaskBar;
