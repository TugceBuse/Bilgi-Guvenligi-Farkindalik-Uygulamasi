import React, { useState, useEffect, useRef } from 'react';
import { useFileContext } from '../../Contexts/FileContext';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useUIContext } from '../../Contexts/UIContext'; // 🔥 yeni

const binaryMessage = "01000010 01110101 00100000 01100010 01101001 01110010 00100000 01000010 01101001 01101110 01100001 01110010 01111001 00100000 01010100 01100101 01110011 01110100 00100000 01101101 01100101 01110011 01100001 01101010 11000100 10110001 01100100 11000100 10110001 01110010 00001010";

const TaskAppSetupF = () => {
  const { setFiles } = useFileContext();
  const { addVirus } = useVirusContext();
  const { lockMouse, unlockMouse } = useUIContext(); // 🔥 artık context'ten

  const hasStarted = useRef(false);
  const [cmdFlash1, setCmdFlash1] = useState(false);
  const [cmdFlash2, setCmdFlash2] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      lockMouse(); // 🔒 Mouse kilitleniyor

      addVirus({
        type: "clown",
        detectable: false,
        sourcefile: "taskappsetupF"
      });

      // 1. CMD ekranı flash
      setTimeout(() => {
        setCmdFlash1(true);
        setTimeout(() => setCmdFlash1(false), 1000);
      }, 2000 + Math.random() * 1000);

      // 2. Dosyaları sırayla oluştur
      setTimeout(async () => {
        const parts = binaryMessage.split(' ');
        for (let index = 0; index < parts.length; index++) {
          const bit = parts[index];
          const fileName = `bin_${index}_${bit}`;
          setFiles(prev => ({
            ...prev,
            [fileName]: {
              available: true,
              quarantined: false,
              infected: true,
              type: "bin",
              size: "1KB",
              location: "desktop",
              label: bit,
              icon: "/icons/clown.png",
              content: bit
            }
          }));
          await new Promise(resolve => setTimeout(resolve, 250));
        }
      }, 3000);

      // 3. İkinci CMD ekranı flash
      setTimeout(() => {
        setCmdFlash2(true);
        setTimeout(() => setCmdFlash2(false), 1000);
      }, 6000 + Math.random() * 500);

      // 4. Mouse tekrar serbest bırakılır
      setTimeout(() => {
        unlockMouse(); // 🔓 Mouse serbest
      }, 8000);
    };

    window.addEventListener('click', handleClick, { once: true });

    return () => {
      window.removeEventListener('click', handleClick);
      unlockMouse(); // bileşen kapanırken serbest bırak
    };
  }, [setFiles, addVirus, lockMouse, unlockMouse]);

  return (
    <>
      {cmdFlash1 && <CmdPopup />}
      {cmdFlash2 && <CmdPopup />}
    </>
  );
};

const CmdPopup = () => {
  return (
    <div style={{
      position: 'fixed',
      top: `${30 + Math.random() * 40}%`,
      left: `${30 + Math.random() * 30}%`,
      width: '420px',
      height: '180px',
      backgroundColor: '#000000',
      color: '#00FF00',
      fontFamily: 'Consolas, monospace',
      fontSize: '14px',
      padding: '15px 20px',
      border: '2px solid #00FF00',
      boxShadow: '0 0 12px #00FF00',
      zIndex: 9999,
      whiteSpace: 'pre-line',
      animation: 'fadeOutFlash 1s ease-in-out forwards'
    }}>
      C:\Windows\System32\cmd.exe{'\n'}
      <br />
      ping 127.0.0.1{'\n'}
      Yanıt bekleniyor...{'\n'}
      <br />
      format c: /y
    </div>
  );
};

export default TaskAppSetupF;
