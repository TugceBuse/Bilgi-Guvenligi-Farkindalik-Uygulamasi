import React, { useRef } from 'react';
import { useVirusContext } from '../../Contexts/VirusContext';
import NovaBankAppSetup from '../NovaBankAppSetup/NovaBankAppSetup';

const NovaBankAppSetupF = ({ fileName, onAntivirusCheck }) => {
  const { addVirus } = useVirusContext();
  const virusAdded = useRef(false);

  // Kurulum tamamlanınca (step 4), adware bulaştır!
  const handleAdwareInstall = () => {
    if (virusAdded.current) return;
    addVirus({
      id: `novabank-adware`,
      type: 'adware',
      sourcefile: fileName,
      detectable: false,
      impact: 'popupSpam',
      severity: 'low',
      startTime: Date.now(),
    });
    virusAdded.current = true;
  };

  return (
    <NovaBankAppSetup
      fileName={fileName}
      onInstallComplete={handleAdwareInstall}
      onAntivirusCheck={onAntivirusCheck} // <-- burada prop geçiriliyor
    />
  );
};

export default NovaBankAppSetupF;
