import React from 'react';
import AntivirusSetup from '../exefiles/AntivirusSetup/AntivirusSetup';
import TaskAppSetup from '../exefiles/TaskAppSetup/TaskAppSetup';


// EXE bileşenlerini tanımlayalım
const exeComponents = {
    "antivirussetup": AntivirusSetup,
    "taskappsetup": TaskAppSetup,
    // Yeni EXE bileşenleri buraya eklenebilir
};

const ExeViewer = ({ file, fileName }) => {
    const ExeComponent = exeComponents[file.exeType];

    if (!ExeComponent) {
        return (
            <div className="window exe-window">
                <h2>{file.label}</h2>
                <p>Bu EXE dosyası çalıştırılamaz.</p>
            </div>
        );
    }

    return <ExeComponent file={file} fileName={fileName} />;
};

export default ExeViewer;
