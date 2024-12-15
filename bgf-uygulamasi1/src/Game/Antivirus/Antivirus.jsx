import React, { useState, useRef } from 'react';
import './Antivirus.css';
import { MakeDraggable } from '../Draggable';
import { useUIContext } from '../Contexts/UIContext';



export const useAntivirus = () => {
    const { toggleWindow } = useUIContext();
    

    const openHandler = () => {
        toggleWindow('antivirus');
    };
    
    const closeHandler = () => {
        toggleWindow('antivirus');
    };
    
    return { openHandler, closeHandler };
    }

const Antivirus = ({ closeHandler, style }) => {

    const antivirusRef = useRef(null);
    MakeDraggable(antivirusRef, '.antivirus-header');

    return (
        <div className="antivirus-window" style={style} ref={antivirusRef}>
            <div className="antivirus-header">
                <h2>antivirus</h2>
                <button className="antivirus-close" onClick={closeHandler}>×</button>
            </div>
        </div>
    );

}

export default Antivirus;