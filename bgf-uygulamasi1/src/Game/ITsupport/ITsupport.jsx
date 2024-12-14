import React, { useState, useRef } from 'react';
import './ITsupport.css';
import { MakeDraggable } from '../Draggable';
import { useUIContext } from '../Context/UIContext';



export const useITsupport = () => {
    const { toggleWindow } = useUIContext();
    

    const openITsupport = () => {
        toggleWindow('itsupport');
    };
    
    const closeITsupport = () => {
        toggleWindow('itsupport');
    };
    
    return { openITsupport, closeITsupport };
    }

const ITsupport = ({ closeHandler, style }) => {

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

export default ITsupport;