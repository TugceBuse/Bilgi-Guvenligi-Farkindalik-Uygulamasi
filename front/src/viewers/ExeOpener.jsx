import React from 'react';
import AntivirusSetup from '../exefiles/AntivirusSetup/AntivirusSetup';
import TaskAppSetup from '../exefiles/TaskAppSetup/TaskAppSetup';
import TaskAppSetupF from '../exefiles/TaskAppSetupF/TaskAppSetupF';
import NovaBankAppSetup from '../exefiles/NovaBankAppSetup/NovaBankAppSetup';
import NovaBankAppSetupF from '../exefiles/NovaBankAppSetupF/NovaBankAppSetupF';
import AppInstaller from './AppInstaller';

// EXE bileşenlerini tanımlayalım
const exeComponents = {
    "antivirussetup": AntivirusSetup,
    "taskappsetup": TaskAppSetup,
    "taskappsetupf": TaskAppSetupF,
    "novabankappsetup": NovaBankAppSetup,
    "novabankappsetupf": NovaBankAppSetupF,
    // Yeni EXE bileşenleri buraya eklenebilir
};

const ExeViewer = ({ file, fileName, ...props }) => {
    // exeType key'i küçük harfe çevrilmiş şekilde alınmalı
    const exeTypeKey = file.exeType?.toLowerCase();

    if (!exeTypeKey || !exeComponents[exeTypeKey]) {
        return (
            <div className="window exe-window">
                <h2>{file.label}</h2>
                <p>Bu EXE dosyası çalıştırılamaz.</p>
            </div>
        );
    }

    // AppInstaller ile render ediyoruz
    return (
        <AppInstaller
            fileName={fileName}
            setupType={exeTypeKey}  // ör: "taskappsetupf"
            {...props}              // Diğer prop'ları da aktar
        />
    );
};

export default ExeViewer;
