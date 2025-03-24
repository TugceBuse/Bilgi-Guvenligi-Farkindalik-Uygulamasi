import React, { useEffect } from 'react';
import { useVirusContext } from '../Contexts/VirusContext';
// import PdfViewer from './viewers/PdfViewer';
// import ImageViewer from './viewers/ImageViewer';
// import DocxViewer from './viewers/DocxViewer';
import ExeOpener from './ExeOpener';
import ImageViewer from './ImageViewer';

const FileOpener = ({ file, fileName, updateAvailableStatus /* WindowConfig available */ }) => {
    const { addVirus } = useVirusContext();

    useEffect(() => {
        if (file.infected) {
            addVirus(file.virusType); // Dosya açılınca virüs bulaşıyor
        }
    }, [file, addVirus]);

    if (!file) return <p>Dosya bulunamadı.</p>;

    switch (file.type) {
        case 'pdf':
            // return <PdfViewer file={file} />;
        case 'docx':
        case 'txt':
            // return <DocxViewer file={file} />;
        case 'jpg':
        case 'png':
        case 'gif':
            return <ImageViewer file={file} fileName={fileName} />;
        case 'exe':
            return <ExeOpener file={file} fileName={fileName} updateAvailableStatus={updateAvailableStatus} />;
        default:
            return <p>Bu dosya türü desteklenmiyor.</p>;
    }
};

export default FileOpener;
