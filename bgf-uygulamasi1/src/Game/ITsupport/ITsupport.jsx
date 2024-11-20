import React, { useState, useRef } from 'react';
import './ITsupport.css';
import { MakeDraggable } from '../Draggable';


export const useITsupport = () => {
    const [isITsupportOpen, setIsITsupportOpen] = useState(false);

    

    const openITsupport = () => {
        setIsITsupportOpen(true);
    };
    
    const closeITsupport = () => {
        setIsITsupportOpen(false);
    };
    
    return { isITsupportOpen, openITsupport, closeITsupport };
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