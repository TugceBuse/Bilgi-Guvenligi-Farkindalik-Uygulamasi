import React, { useEffect } from 'react';
import { useVirusContext } from '../Contexts/VirusContext';
// import PdfViewer from './viewers/PdfViewer';
// import ImageViewer from './viewers/ImageViewer';
// import DocxViewer from './viewers/DocxViewer';
import ExeOpener from './ExeOpener';
import ImageViewer from './ImageViewer';
import EnableContentDocx from './EnableContentDocx';
import DocxViewer from './DocxViewer';

const FileOpener = ({ file, fileName, updateAvailableStatus /* WindowConfig available */ }) => {
    const { addVirus } = useVirusContext();

    if (!file) return <p>Dosya bulunamadı.</p>;

    switch (file.type) {
        case 'pdf':
            // return <PdfViewer file={file} />;
        case 'docx':
        case 'txt':
            if (file.specialView === 'enableContentDocx') {
                return <EnableContentDocx file={file} fileName={fileName}/>; // özel sahte görünüm
            }
            return <DocxViewer file={file} fileName={fileName}/>;
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
