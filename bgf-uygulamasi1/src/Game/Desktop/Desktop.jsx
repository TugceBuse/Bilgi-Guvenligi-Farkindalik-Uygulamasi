import React from 'react';
import './Desktop.css';
import { useState,useEffect } from 'react';
import Mailbox, { useMailbox } from '../Mailbox/Mailbox';
import Todolist, { useTodoList } from '../Todolist/Todolist';

const Desktop = () => {
  //Mailbox fonksiyonlarını kullanabilmek için import ettik
  const { isMailboxOpen, openMailbox, closeMailbox } = useMailbox();
  const {isTodoListOpen, openTodoList, closeTodoList} = useTodoList();
  //recycleBin penceresini açmak için state tanımladık
  const [openWindow, setOpenWindow] = useState(null);
  const handleIconClick = (windowName) => {
    setOpenWindow(windowName);
  }
  //////////////////////////////////////////////

  // //Mail kutusu açma işlemleri
  // const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  

  // const openMailbox = () => {
  //   setIsMailboxOpen(true);
  // };

  // const closeMailbox = () => {
  //   setIsMailboxOpen(false);
  // };
  // //////////////////////////////////////////////

  // Sağ tıklamayı engellemek ve sol click tetikleme
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //     // Sağ tıklama yapıldığında sol tıklama olayını tetikleyin
  //     event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //   };

  //   document.addEventListener('contextmenu', handleContextMenu);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);


  
  
  return (

    <div className="desktop">

      {/* Masaüstü Arka Planı */}
        <div className="desktop-icons">
          {/* Masaüstü simgeleri */}
          <div className="icon" onClick={openTodoList}>
            <img src="/icons/to-do-list.png" alt="Todolist Icon" />
            <span>To Do List</span>
          </div>

          <div className="icon" onClick={openMailbox}>
            <img src="/icons/mail.png" alt="Mail Icon" />
            <span>Mail</span>
          </div>

          <div className="icon" onClick={() => handleIconClick('recycleBin')}>
            <img src="/icons/recycle-bin.png" alt="Recycle Bin Icon" />
            <span>Recycle Bin</span>
          </div>
        </div>

        
        {openWindow === 'recycleBin' && (
        <div className="window">
          <h2>Recycle Bin</h2>
          <button onClick={() => setOpenWindow(null)}>Close</button>

          <div className="window-content">
            {/* Geri dönüşüm kutusu içeriği */}
            <p>Here is the content of the Recycle Bin.</p>
          </div>    
        </div>
      )}

      {/* Mailbox penceresi */}
      {isMailboxOpen && <Mailbox closeMailbox={closeMailbox} />}

      {/* To Do List penceresi */}
      {isTodoListOpen && <Todolist closeTodoList={closeTodoList}/>}

    </div>);
};

export default Desktop;
