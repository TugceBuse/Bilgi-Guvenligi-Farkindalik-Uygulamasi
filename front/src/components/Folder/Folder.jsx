import React, { useState, useRef } from 'react';
import './Folder.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useFileContext } from '../../Contexts/FileContext';
import { useUIContext } from '../../Contexts/UIContext';

export const useFolder = () => {
    const { toggleWindow } = useUIContext();
    
    const openHandler = () => {
        toggleWindow('folder');
    };
    
    const closeHandler = () => {
        toggleWindow('folder');
    };
    
    return { openHandler, closeHandler };
};

const Folder = ({ closeHandler, style }) => {
    const { toggleWindow } = useUIContext();
    const FolderRef = useRef(null);
    MakeDraggable(FolderRef, '.folder-header');

    const { files, openFile } = useFileContext();

    // Folder içerisindeki view'ler
    const VIEW_TYPES = {
        DEFAULT: 'default',
        DOWNLOAD: 'download',
        // ... Diğer view'ler
    };
    const [currentView, setCurrentView] = useState(VIEW_TYPES.DEFAULT);
    
    return (
        <div className="folder-window" style={style} ref={FolderRef} data-window="folder">

            <div className="folder-header">
                <div style={{display:"flex", flexDirection:"row", justifyItems:"center", alignItems:"center"}}>
                    <div className='folder-header-left'>
                        <img src="/icons/folder-home.png" alt="House Icon" />
                        <h2>Giriş</h2>
                        <button className="folder-left-close" onClick={closeHandler}>×</button>
                    </div>
                    <span style={{fontSize:22, marginLeft:10, color:"#e4e4e4", opacity:0.9}}>+</span>
                </div>
                <button className="folder-close" onClick={closeHandler}>×</button>
            </div>

            <div className="folder-content-top"> 
                <img style={{opacity:0.9}} src="/ekran-alintisi.png" alt="Bar" />
            </div>

            <div className="folder-content">
                {/* SOL PANEL */}
                <div className="folder-content-left">
                    <div className="folder-content-left-inside" onClick={() => setCurrentView(VIEW_TYPES.DEFAULT)} style={{ cursor:'pointer'}}>
                        <img src="/icons/folder-home.png" alt="House Icon"/>
                        <h2>Giriş</h2>
                    </div>

                    <div className="folder-content-left-inside">
                        <img src="/icons/gallery.png" alt="Gallery Icon" />
                        <h2>Galeri</h2>
                    </div>

                    <span className="folder-content-leftLine"></span>

                    <div className="folder-content-left-inside">
                        <img src="/icons/desktop.png" alt="Desktop Icon" />
                        <h2>Masaüstü</h2>
                    </div>

                    <div className="folder-content-left-inside" onClick={() => setCurrentView(VIEW_TYPES.DOWNLOAD)} style={{ cursor:'pointer' }}>
                        <img src="/icons/download.png" alt="Download Icon" />
                        <h2>İndirilenler</h2>
                    </div>

                    <div className="folder-content-left-inside">
                        <img src="/icons/docs.png" alt="Document Icon" />
                        <h2>Belgeler</h2>
                    </div>

                        <div className="folder-content-left-inside">
                            <img src="/icons/picture.png" alt="Pic Icon" />
                            <h2>Resimler</h2>
                        </div>

                        <div className="folder-content-left-inside">
                            <img src="/icons/music-player.png" alt="MusicPlayer Icon" />
                            <h2>Müzikler</h2>
                        </div>

                        <div className="folder-content-left-inside">
                            <img src="/icons/video.png" alt="Video Icon" />
                            <h2>Videolar</h2>
                        </div>

                        <span className="folder-content-leftLine"></span>

                        <div className="folder-content-left-inside">
                            <img src="/icons/computer.png" alt="Computer Icon" />
                            <h2>Bu Bilgisayar</h2>
                        </div>

                        <div className="folder-content-left-inside">
                            <img src="/icons/network.png" alt="Network Icon" />
                            <h2>Ağ</h2>
                        </div>
                    </div>

                    {/* SAĞ İÇERİK */}
                    <div className="folder-content-right">
                        {currentView === VIEW_TYPES.DEFAULT && (
                        <div style={{display:"flex", flexDirection:"row", margin:30, gap:10, fontSize:12, width:180}}> 
                            <img style={{width:24, height:24}} src="/icons/down-arrow.png" alt="Arrow Icon" />
                            <h2>Hızlı Erişim</h2>
                        </div> 
                    )}
                    
                    {currentView === VIEW_TYPES.DEFAULT && (
                        <div className="folder-content-right-inside" onClick={() => setCurrentView(VIEW_TYPES.DOWNLOAD)}>
                            <div className='Icons'>
                                <img 
                                src="/icons/inbox (1).png" alt="Inbox Icon" />
                                <span>İndirilenler</span>
                            </div>

                                <div className='Icons'>
                                    <img src="/icons/publishing.png" alt="Desktop Icon" />
                                    <span>Masaüstü</span>
                                </div>

                                <div className='Icons'>
                                    <img src="/icons/folder2.png" alt="Folder Icon" /> 
                                    <span>Proje</span>
                                </div>

                                <div className='Icons'>
                                    <img src="/icons/folder2.png" alt="Folder Icon" /> 
                                    <span>Kişisel</span>
                                </div>

                                <div className='Icons'>
                                    <img src="/icons/folder2.png" alt="Folder Icon" /> 
                                    <span>Önemli</span>
                                </div>
                                
                            </div>
                        )}

                    {/* 📂 İNDİRİLENLER KLASÖRÜ */}
                    {currentView === VIEW_TYPES.DOWNLOAD && (
                        <div className="folder-content-right-inside">
                            {Object.keys(files).map(fileName => {
                                const file = files[fileName];
                                if (file.available && file.location === "downloads") {
                                    return (
                                        <div key={fileName} className='Icons' onClick={() => openFile(fileName)}>
                                            <img src={file.icon} alt={`${file.label} Icon`} />
                                            <span>{file.label}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )}              
                </div>
            </div>
        </div>
    );
};

export default Folder;
