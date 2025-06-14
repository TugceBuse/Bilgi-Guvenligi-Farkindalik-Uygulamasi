import React, { createContext, useContext, useEffect, useState } from 'react';
import { use } from 'react';

const VirusContext = createContext();

export const VirusProvider = ({ children }) => {
    const [viruses, setViruses] = useState([]);

    const defaultVirusStructure = {
        id: null,
        type: null,
        detectable: false,
        sourcefile: null,
        impact: null,
        severity: "low",
        startTime: null
    };

    const addVirus = (newVirus) => {
        const completeVirus = {
            ...defaultVirusStructure,
            ...newVirus,
            id: newVirus.id || `virus-${Date.now()}`,
            startTime: Date.now()
        };
        const alreadyExists = viruses.some(v => v.id === completeVirus.id);
        if (!alreadyExists) {
            setViruses([...viruses, completeVirus]);
        }
    };

    const removeVirus = (virusID) => {
        setViruses(viruses.filter(v => v.id !== virusID));
    };
    const removeAllViruses = () => setViruses([]);

   
    useEffect(() => {
        console.log("Virüsler güncellendi:", viruses);
    }, [viruses]);
    
    return (
        <VirusContext.Provider value={{
            viruses,
            addVirus,
            removeVirus,
            removeAllViruses
        }}>
            {children}
        </VirusContext.Provider>
    );
};

export const useVirusContext = () => useContext(VirusContext);
