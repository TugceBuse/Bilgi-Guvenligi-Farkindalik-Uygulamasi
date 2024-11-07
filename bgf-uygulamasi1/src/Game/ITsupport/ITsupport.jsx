import React, { useState } from 'react';
import './ITsupport.css';

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


    return (
        <div className="ITsupport-window">
            <div className="ITsupport-header">
                <h2>IT Support</h2>
                <button className="ITsupport-close" onClick={closeITsupport}>×</button>
            </div>
        </div>
    );

}

export default ITsupport;