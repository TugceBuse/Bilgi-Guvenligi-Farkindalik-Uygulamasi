import React, { createContext, useContext, useState } from 'react';

const VirusContext = createContext();

export const VirusProvider = ({ children }) => {
    const [viruses, setViruses] = useState([]);


    // Virüs ekleme fonksiyonu
    //     🚩KULLANIMI🚩
    // addVirus({ type: "ransomware", detectable: true, sourcefile: "file1" });
    // addVirus({ type: "keylogger", detectable: false, sourcefile: null });

    //   {
    //   type: "ransomware",
    //   detectable: true
    //   sourcefile: "file1"
    //   }

    // const detectableViruses = viruses.filter(v => v.detectable);

    const addVirus = (newVirus) => {
        if (!viruses.some(v => v.type === newVirus.type)) {
            setViruses([...viruses, newVirus]);
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
