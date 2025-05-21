import React, { useEffect } from 'react';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useFileContext } from '../../Contexts/FileContext';
import  NovaBankAppSetup  from '../NovaBankAppSetup/NovaBankAppSetup';

const NovaBankAppSetupF = ({ fileName }) => {
  const { addVirus } = useVirusContext();
  const { closeFile } = useFileContext();

  useEffect(() => {
    console.log('NovaBankAppSetupF çalıştı');
    // Virüsü sisteme ekle
    addVirus({
        id: `novabank-adware}`,
        type: 'adware',
        sourcefile: fileName,
        detectable: false,
        impact: 'popupSpam',
        severity: 'low',
        startTime: Date.now(),
    });
  }, [addVirus, closeFile, fileName]);

  return <NovaBankAppSetup fileName = {fileName}/>;
};

export default NovaBankAppSetupF;
