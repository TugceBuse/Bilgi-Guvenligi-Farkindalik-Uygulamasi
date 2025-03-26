import React from 'react';
import './ImageViewer.css'; // (isteğe bağlı stil dosyası)
import { useFileContext } from '../Contexts/FileContext';
import { useRef } from 'react';
import { MakeDraggable } from '../utils/Draggable';


const ImageViewer = ({ file, fileName }) => {
    const { closeFile } = useFileContext();
    const ImageRef = useRef(null);

    MakeDraggable(ImageRef, '.image-viewer-header');

    const handleClose = () => {
        closeFile(fileName);
    };

    return (
        <div className="image-viewer-window" ref={ImageRef} data-filename={fileName}>
            <div className="image-viewer-header">
                <div className="image-viewer-title">
                <img src="/icons/image.png" alt="Image Icon" />
                <span>{file.label || 'Görsel'}</span>
                </div>
                <button className="close-btn" onClick={handleClose}>×</button>
            </div>

            <div className="image-viewer-content">
                <img src={file.content} alt={file.label || 'Görsel'} className="image-viewer-img" />
            </div>
        </div>
    );
};

export default ImageViewer;
