import React, { useState, useRef } from 'react';
import './Folder.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';



export const useFolder = () => {
    const { toggleWindow, setActiveWindow } = useGameContext();
    

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

    return (
        <div className="folder-window" style={style} ref={FolderRef}>
            <div className="folder-header">

                <div style={{display:"flex", flexDirection:"row", justifyItems:"center", alignItems:"center"}}>
                    <div className='folder-header-left'>
                    <img src="/icons/home.png" alt="House Icon" />
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
                </div>




                <div>
                <div>
                        <img style={{width:24, height:24}} src="/icons/down-arrow.png" alt="Arrow Icon" />
                        </div>
                </div>
            </div>
        </div>
    );

}

export default Folder;