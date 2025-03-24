import React from 'react';
import AntivirusSetup from '../exefiles/AntivirusSetup/AntivirusSetup';


// EXE bileşenlerini tanımlayalım
const exeComponents = {
    "antivirussetup": AntivirusSetup,
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
