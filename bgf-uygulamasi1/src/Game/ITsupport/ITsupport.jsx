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
    MakeDraggable(ITsupportRef, '.ITsupport-header');

    return (
        <div className="ITsupport-window" ref={ITsupportRef}>
            <div className="ITsupport-header">
                <h2>IT Support</h2>
                <button className="ITsupport-close" onClick={closeITsupport}>×</button>
            </div>
        </div>
    );

}

export default ITsupport;