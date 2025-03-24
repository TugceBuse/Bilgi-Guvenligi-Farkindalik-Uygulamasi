import React, { createContext, useContext, useState } from 'react';

const VirusContext = createContext();

export const VirusProvider = ({ children }) => {
    const [viruses, setViruses] = useState([]);

    // ✅ Virüs ekleme fonksiyonu
    const addVirus = (virusType) => {
        if (!viruses.includes(virusType)) {
            setViruses([...viruses, virusType]);
        }
    };

    // ✅ Virüs kaldırma fonksiyonu (Antivirüs ile temizleme)
    const removeVirus = (virusType) => {
        setViruses(viruses.filter(v => v !== virusType));
    };

    return (
        <VirusContext.Provider value={{ viruses, addVirus, removeVirus }}>
            {children}
        </VirusContext.Provider>
    );
};

export const useVirusContext = () => useContext(VirusContext);
