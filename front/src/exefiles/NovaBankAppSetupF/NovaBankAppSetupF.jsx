import React, { useRef } from 'react';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useFileContext } from '../../Contexts/FileContext';
import NovaBankAppSetup from '../NovaBankAppSetup/NovaBankAppSetup';

const NovaBankAppSetupF = ({ fileName }) => {
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
      onInstallComplete={handleAdwareInstall} // burada adware kurulumu tetiklenir
    />
  );
};

export default NovaBankAppSetupF;
