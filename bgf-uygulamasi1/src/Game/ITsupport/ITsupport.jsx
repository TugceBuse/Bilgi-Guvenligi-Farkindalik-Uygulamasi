import React, { useState, useRef } from 'react';
import './ITsupport.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';



export const useITsupport = () => {
    const { toggleWindow, setActiveWindow } = useGameContext();
    

    const openITsupport = () => {
        toggleWindow('itsupport');
    };
    
    const closeITsupport = () => {
        toggleWindow('itsupport');
    };
    
    return { openITsupport, closeITsupport };
    }

const ITsupport = ({ closeITsupport }) => {

    const ITsupportRef = useRef(null);
    MakeDraggable(ITsupportRef, '.itsupport-header');

    return (
        <div className="itsupport-window" ref={ITsupportRef}>
            <div className="itsupport-header">
                <h2>IT Support</h2>
                <button className="itsupport-close" onClick={closeITsupport}>×</button>
            </div>
        </div>
    );

}

export default ITsupport;