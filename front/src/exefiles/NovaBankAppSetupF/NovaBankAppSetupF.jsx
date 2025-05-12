import React, { useEffect } from 'react';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useFileContext } from '../../Contexts/FileContext';

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

    // Kendi penceresini kapat
    closeFile(fileName);
  }, [addVirus, closeFile, fileName]);

  return null; // Hiçbir pencere göstermiyoruz
};

export default NovaBankAppSetupF;
