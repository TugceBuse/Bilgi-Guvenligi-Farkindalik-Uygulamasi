import { useEffect, useRef } from 'react';
import { useFileContext } from '../../Contexts/FileContext';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useWindowConfig } from '../../Contexts/WindowConfigContext';
import { useUIContext } from '../../Contexts/UIContext';
import { showFakeCMD } from '../../utils/fakeCMD';

const binaryMessage = "01000010 01110101 00100000 01100010 01101001 01110010 00100000 01000010 01101001 01101110 01100001 01110010 01111001 00100000 01010100 01100101 01110011 01110100 00100000 01101101 01100101 01110011 01100001 01101010 11000100 10110001 01100100 11000100 10110001 01110010 00001010";

const TaskAppSetupF = () => {
  const { setFiles } = useFileContext();
  const { addVirus } = useVirusContext();
  const { lockMouse, unlockMouse, setOpenWindows, trackGhostMouse } = useUIContext();
  const { setWindowConfig, windowConfig } = useWindowConfig();
  const hasStarted = useRef(false);

  useEffect(() => {
    const handleClick = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      lockMouse();
      const stopGhost = trackGhostMouse(); // 🟢 Hayalet izleme başlasın

      addVirus({
        type: "clown",
        detectable: false,
        sourcefile: "taskappsetupF"
      });

      setTimeout(() => {
        showFakeCMD({
          lines: [
            "copy clown.bat C:\\Windows\\System32",
            "copy clown.bat C:\\Windows\\System32",
            "clown.bat çalıştırılıyor...",
            "..."
          ],
          duration: 500
        });
      }, 2000);

      setTimeout(async () => {
        setOpenWindows([]);
        for (const key of Object.keys(windowConfig)) {
          setWindowConfig(prev => ({
            ...prev,
            [key]: { ...prev[key], available: false }
          }));
          await new Promise(res => setTimeout(res, 250));
        }

        const allBits = binaryMessage.replace(/\s+/g, '');
        const totalFiles = 84;
        const baseChunkSize = Math.floor(allBits.length / totalFiles);
        const extraBits = allBits.length % totalFiles;
        let pointer = 0;

        for (let i = 0; i < totalFiles; i++) {
          const chunkLength = baseChunkSize + (i < extraBits ? 1 : 0);
          const bitChunk = allBits.slice(pointer, pointer + chunkLength);
          const fileName = `clownfile_${i}`;

          setFiles(prev => ({
            ...prev,
            [fileName]: {
              available: true,
              quarantined: false,
              infected: true,
              type: "bin",
              size: "1KB",
              location: "desktop",
              label: bitChunk,
              icon: "/icons/clown.png",
              content: bitChunk
            }
          }));

          pointer += chunkLength;
          await new Promise(res => setTimeout(res, 100));
        }
      }, 3500);

      setTimeout(() => {
        showFakeCMD({
          lines: [
            "taskkill /F /IM explorer.exe",
            "BAŞARI: explorer.exe sonlandırıldı.",
            "del /F /Q C:\\Users\\Onur\\Desktop\\*.*",
            "cipher /w:C:\\"
          ],
          duration: 500
        });
      }, 6500);

      setTimeout(() => {
        showFakeCMD({
          lines: [
            "copy clown.exe C:\\Windows\\System32",
            "reg add ...\\Run /v Clown /t REG_SZ /d clown.exe",
            "shutdown /s /f /t 10"
          ],
          duration: 500
        });
      }, 8000);

      setTimeout(() => {
        stopGhost();     // 🔴 İzi durdur
        unlockMouse();   // 🔓 Fare serbest
      }, 20000);
    };

    window.addEventListener('click', handleClick, { once: true });
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setFiles, addVirus, lockMouse, unlockMouse, setWindowConfig, windowConfig]);

  return null;
};

export default TaskAppSetupF;
