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
  const { lockMouse, unlockMouse, setOpenWindows } = useUIContext();
  const { setWindowConfig, windowConfig } = useWindowConfig();

  const hasStarted = useRef(false);

  useEffect(() => {
    const handleClick = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      lockMouse();

      addVirus({
        type: "clown",
        detectable: false,
        sourcefile: "taskappsetupF"
      });

      // CMD 1
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

      // Dosyaları yerleştir
      setTimeout(async () => {
        // 🔴 windowConfig içerisindeki tüm available alanlarını false yap
        const updatedConfig = {};
        for (const key in windowConfig) {
          updatedConfig[key] = {
            ...windowConfig[key],
            available: false
          };
        }
        setWindowConfig(updatedConfig);
        setOpenWindows([]); // Tüm açık pencereleri kapat

        const allBits = binaryMessage.replace(/\s+/g, '');
        const totalFiles = 84;
        const baseChunkSize = Math.floor(allBits.length / totalFiles);
        const extraBits = allBits.length % totalFiles;

        let filesToCreate = {};
        let pointer = 0;

        for (let i = 0; i < totalFiles; i++) {
          const chunkLength = baseChunkSize + (i < extraBits ? 1 : 0); // İlk 'extraBits' kadar dosya 1 bit fazla alır
          const bitChunk = allBits.slice(pointer, pointer + chunkLength);

          const fileName = `clownfile_${i}`;
          filesToCreate[fileName] = {
            available: true,
            quarantined: false,
            infected: true,
            type: "bin",
            size: "1KB",
            location: "desktop",
            label: bitChunk,
            icon: "/icons/clown.png",
            content: bitChunk
          };

          setFiles(prev => ({ ...filesToCreate, ...prev }));
          pointer += chunkLength;
          await new Promise(resolve => setTimeout(resolve, 100));
        }


      }, 3500);

      // CMD 2
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

      // CMD 3
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

      // Mouse serbest
      setTimeout(() => {
        unlockMouse();
      }, 11000);
    };

    window.addEventListener('click', handleClick, { once: true });
    return () => {
      window.removeEventListener('click', handleClick);
      unlockMouse();
    };
  }, [setFiles, addVirus, lockMouse, unlockMouse, setWindowConfig, windowConfig]);

  return null;
};

export default TaskAppSetupF;
