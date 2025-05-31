import React, { createContext, useContext, useState } from 'react';

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

    return (
        <VirusContext.Provider value={{
            viruses,
            addVirus,
            removeVirus
        }}>
            {children}
        </VirusContext.Provider>
    );
};

export const useVirusContext = () => useContext(VirusContext);
