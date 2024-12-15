import React, { useState, useRef } from 'react';
import './Antivirus.css';
import { MakeDraggable } from '../Draggable';
import { useUIContext } from '../Contexts/UIContext';



export const useAntivirus = () => {
    const { toggleWindow } = useUIContext();
    

    const openHandler = () => {
        toggleWindow('itsupport');
    };
    
    const closeHandler = () => {
        toggleWindow('itsupport');
    };
    
    return { openHandler, closeHandler };
    }

const Antivirus = ({ closeHandler, style }) => {

    const ITsupportRef = useRef(null);
    MakeDraggable(ITsupportRef, '.itsupport-header');

    return (
        <div className="itsupport-window" style={style} ref={ITsupportRef}>
            <div className="itsupport-header">
                <h2>IT Support</h2>
                <button className="itsupport-close" onClick={closeHandler}>×</button>
            </div>
        </div>
    );

}

export default Antivirus;