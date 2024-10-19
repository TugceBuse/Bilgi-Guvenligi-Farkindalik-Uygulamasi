import "./taskbar.css";

const TaskBar = () => {
  return (

    // Görev çubuğu bileşeni
    <div className="taskbar">
    {/* Başlat Menüsü */}
    <div className="start-menu">
      <img src="https://img.icons8.com/fluency/48/000000/windows-10.png" alt="Start Button" />
    </div>
    
    <div className="taskbar-icons">
      <img src="https://img.icons8.com/fluency/48/000000/chrome.png" alt="Chrome Icon" />
      <img src="https://img.icons8.com/fluency/48/000000/folder-invoices.png" alt="File Explorer Icon" />
    </div>

    {/* Saat */}
    <div className="taskbar-clock">
      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  </div>
  );


}

export default TaskBar;
