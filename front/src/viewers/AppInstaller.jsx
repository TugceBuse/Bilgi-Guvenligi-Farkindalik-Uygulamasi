import React, { useState } from "react";
import { useSecurityContext } from "../Contexts/SecurityContext";
import { useVirusContext } from "../Contexts/VirusContext";
import { useFileContext } from "../Contexts/FileContext";
import { useNotificationContext } from "../Contexts/NotificationContext"; // GÜNCEL HOOK!
import NovaBankAppSetup from "../exefiles/NovaBankAppSetup/NovaBankAppSetup";
import TaskAppSetupF from "../exefiles/TaskAppSetupF/TaskAppSetupF";
import NovaBankAppSetupF from "../exefiles/NovaBankAppSetupF/NovaBankAppSetupF";
import TaskAppSetup from "../exefiles/TaskAppSetup/TaskAppSetup";

const setupComponents = {
  novabankappsetup: NovaBankAppSetup,
  novabankappsetupf: NovaBankAppSetupF,
  taskappsetup: TaskAppSetup,
  taskappsetupf: TaskAppSetupF,
  // diğer setuplar...
};

const AppInstaller = ({ fileName, setupType, onInstallComplete, ...props }) => {
  const { files, updateFileStatus, closeFile } = useFileContext();
  const { viruses, removeVirus } = useVirusContext();
  const { fullProtection, scanLogs, setScanLogs } = useSecurityContext();
  const { addNotification } = useNotificationContext(); // GÜNCEL HOOK!

  const [blocked, setBlocked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  // Merkezi virüs check fonksiyonu (setup’ta kurulum sırasında çağrılır)
  const handleAntivirusCheck = ({ customVirusType }) => {
    // fullProtection kontrolü burada
    if (!fullProtection){
        return Promise.resolve("allowed");
    }

    const file = files[fileName];
    const isDetectableInfected =
      file && file.infected && file.detectable && !file.quarantined;
    const relatedVirus = viruses.find(
      (v) =>
        v.detectable &&
        v.sourcefile &&
        v.sourcefile.toLowerCase() === fileName.toLowerCase()
    );

    if (isDetectableInfected || relatedVirus) {
      return new Promise((resolve) => {
        addNotification({
          type: "danger",          // RENK VE İKON (danger=Kırmızı, error=Kırmızı, warning=Turuncu, info=Mavi)
          appType: "system",       // BİLDİRİMİN KAYNAĞI (kategori)
          title: "Antivirüs Uyarısı",
          message: `Şüpheli dosya tespit edildi: ${fileName} (${relatedVirus ? relatedVirus.type : (file?.virusType || customVirusType || "Bilinmeyen tür")})`,
          icon: "/icons/danger.png",
          isPopup: true,
          isTaskbar: false,
          actions: [
            {
              label: "Karantinaya Al ve Durdur",
              onClick: () => {
                updateFileStatus(fileName, { quarantined: true, available: false });
                if (relatedVirus) removeVirus(relatedVirus.id);
                setScanLogs([
                  ...scanLogs,
                  {
                    date: new Date().toLocaleString("tr-TR"),
                    files: [
                      {
                        fileName,
                        virusType: relatedVirus ? relatedVirus.type : (file?.virusType || customVirusType || "unknown"),
                      },
                    ],
                  },
                ]);
                setBlocked(true);
                setAllowed(false);
                if (onInstallComplete) onInstallComplete(false);
                closeFile(fileName);
                resolve("blocked");
              },
            },
            {
              label: "Yine de Devam Et",
              onClick: () => {
                setAllowed(true);
                setBlocked(false);
                resolve("allowed");
              },
            },
          ],
        });
      });
    }
 else {
      return Promise.resolve("allowed");
    }
  };

  // Bloklandıysa child setup hiç render etme
  if (blocked && !allowed) return <div>Kurulum engellendi.</div>;

  // Setup bileşenini render et, antivirüs check fonksiyonunu prop olarak ilet
  const SetupComponent = setupComponents[setupType];
  if (!SetupComponent)
    return <div>Kurulum tipi tanımlı değil: {setupType}</div>;

  return (
    <SetupComponent
      fileName={fileName}
      onInstallComplete={onInstallComplete}
      onAntivirusCheck={handleAntivirusCheck}
      {...props}
    />
  );
};

export default AppInstaller;
