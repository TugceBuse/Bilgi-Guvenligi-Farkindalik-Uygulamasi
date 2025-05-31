import React, { useState, useRef } from 'react';
import { useVirusContext } from '../Contexts/VirusContext';
import { useFileContext } from '../Contexts/FileContext';
import './EnableContentDocx.css';
import { MakeDraggable } from '../utils/Draggable';
import { useNotification } from '../Contexts/NotificationContext';
import { useSecurityContext } from '../Contexts/SecurityContext';


const EnableContentDocx = ({ file, fileName }) => {
    const { fullProtection  } = useSecurityContext();
    const { addVirus } = useVirusContext();
    const [enabled, setEnabled] = useState(false);
    const { closeFile } = useFileContext();
    const docxRef = useRef(null);
    const { addNotification } = useNotification();
    const { updateFileStatus } = useFileContext();

    MakeDraggable(docxRef, '.docx-header');

    const handleEnableClick = () => {
        setEnabled(true);
        if (file.infected && file.virusType) {
            if( fullProtection ) {
                updateFileStatus(fileName, { quarantined: true, available: false });
                addNotification({
                    title: 'Şüpheli Dosya!',
                    message: `"${fileName}.${file.type}" dosyasında ${file.virusType} tespit edildi ve karantinaya alındı.`,
                    icon: '/icons/caution.png',
                    type: 'danger',
                    duration: 7000
                });
                return;
            }
            addVirus({
                id: "docx-ransomware",
                type: file.virusType,
                sourcefile: fileName,
                impact: "encrypt",
                severity: "high",
                detectable: true,
                startTime: Date.now()
              });
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
                        <p>Bu belgenin içeriği görüntülenemiyor. Görebilmek için Lütfen içeriği etkinleştirin.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnableContentDocx;
