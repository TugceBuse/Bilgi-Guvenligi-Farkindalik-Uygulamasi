import React, { useState, useRef } from 'react';
import { useVirusContext } from '../Contexts/VirusContext';
import { useFileContext } from '../Contexts/FileContext';
import './EnableContentDocx.css';
import { MakeDraggable } from '../utils/Draggable';


const EnableContentDocx = ({ file, fileName }) => {
    const { addVirus } = useVirusContext();
    const [enabled, setEnabled] = useState(false);
    const { closeFile } = useFileContext();
    const docxRef = useRef(null);

    MakeDraggable(docxRef, '.docx-header');

    const handleEnableClick = () => {
        setEnabled(true);
        if (file.infected && file.virusType) {
            addVirus({ type: file.virusType, detectable: false, sourcefile: fileName}); 
        };
    }

    const handleClose = () => {
        closeFile(fileName);
    };


    return (
        <div className="docx-window" ref={docxRef} data-filename={fileName}>
            <div className="docx-header">
                <span>{file.name || 'Word Belgesi'}</span>
                <div className="docx-header-buttons">
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>
            </div>
            <div className="docx-content">
                <div className="docx-sidebar">
                    <p><strong>Korunan Görünüm</strong> - Bu belge internetten indirildi. Güvenli değilse sisteminize zarar verebilir.</p>
                    {!enabled && (
                        <button className="enable-button" onClick={handleEnableClick}>
                            İçeriği Etkinleştir
                        </button>
                    )}
                </div>
                <div className="docx-main">
                    {enabled ? (
                        <p><b>Belge içeriği etkinleştirildi.</b></p>
                    ) : (
                        <p>Bu belgenin içeriği görüntülenemiyor. Lütfen yukarıdan içeriği etkinleştirin.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnableContentDocx;
