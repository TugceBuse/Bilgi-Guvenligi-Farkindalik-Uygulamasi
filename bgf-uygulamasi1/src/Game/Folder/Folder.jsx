import React, { useState, useRef } from 'react';
import './Folder.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';



export const useFolder = () => {
    const { 
        toggleWindow, setActiveWindow,
     } = useGameContext();
    

    const openFolder = () => {
        toggleWindow('folder');
    };
    
    const closeFolder = () => {
        toggleWindow('folder');
    };
    
    return { openFolder, closeFolder };
    }

const Folder = ({ closeFolder, style }) => {

    const FolderRef = useRef(null);
    MakeDraggable(FolderRef, '.folder-header');
    const [showRightInside, setShowRightInside] = useState(true);
    const [showDownloadsContent, setShowDownloadsContent] = useState(false);
    const { 
        file1,
        antivirusexe,
     } = useGameContext();


        const handleDownloadsClick = () => {
            setShowRightInside(false);
            setShowDownloadsContent(true);
        };

        return (
            <div className="folder-window" style={style} ref={FolderRef}>

                <div className="folder-header">
                
                    <div style={{display:"flex", flexDirection:"row", justifyItems:"center", alignItems:"center"}}>
                        <div className='folder-header-left'>
                            <img src="/icons/folder-home.png" alt="House Icon" />
                            <h2>Giriş</h2>
                            <button className="folder-left-close" onClick={closeFolder}>×</button>
                        </div>

                        <span style={{fontSize:22, marginLeft:10, color:"#e4e4e4", opacity:0.9}}>+</span>

                    </div>

                    <button className="folder-close" onClick={closeFolder}>×</button>
                </div>

             
                <div className="folder-content-top"> 
                   <img style={{opacity:0.9}} src="/ekran-alintisi.png" alt="Bar" />
                </div>

                <div className="folder-content">

                    <div className="folder-content-left">

                        <div className="folder-content-left-inside">
                            <img src="/icons/folder-home.png" alt="House Icon" />
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

                        <div className="folder-content-left-inside">
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

                  
                    <div className="folder-content-right">
                        {showRightInside && (
                        <div style={{display:"flex", flexDirection:"row", margin:30, gap:10, fontSize:12, width:180}}> 
                            <img style={{width:24, height:24}} src="/icons/down-arrow.png" alt="Arrow Icon" />
                            <h2>Hızlı Erişim</h2>
                        </div> 
                        )}
                        
                        {showRightInside && (
                            <div className="folder-content-right-inside">
                                <div className='Icons'>
                                    <img onClick={handleDownloadsClick}
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

                        {showDownloadsContent && (
                            <div className="folder-content-right-inside">
                            {/* İndirilenler klasörünün içeriği burada */}
                                
                                {true && (
                                    <div className='Icons'>
                                        <img src="/icons/antivirus.png" alt="Antivirus Icon" />
                                        <span>SetupAntivirus.exe</span>
                                    </div>
                                )}

                                {true && (
                                    <div className='Icons' >
                                        <img src="/icons/file.png" alt="File Icon" />
                                        <span>file1.pdf</span>
                                    </div>
                                )}
                                {true && (
                                    <div className='Icons' >
                                        <img src="/icons/file.png" alt="File Icon" />
                                        <span>file1.pdf</span>
                                    </div>
                                )}
                            </div>
                        )}              
                    </div>
                </div>
            </div>
    );

}

export default Folder;