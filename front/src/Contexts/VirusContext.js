import React, { createContext, useContext, useEffect, useState } from 'react';

const VirusContext = createContext();

export const VirusProvider = ({ children }) => {
    const [viruses, setViruses] = useState([]);

    const [scanLogs, setScanLogs] = useState([]);
    const [realTimeProtection, setRealTimeProtection] = useState(false); // Antivirüs aktif mi değil mi
    const [isantivirusUpToDate, setIsAntivirusUpToDate] = useState(false); // Antivirüs güncel mi değil mi


    // Virüs ekleme fonksiyonu
    //     🚩KULLANIMI🚩
    // addVirus({ type: "ransomware", detectable: true, sourcefile: "file1" });
    // addVirus({ type: "keylogger", detectable: false, sourcefile: null });
    // addVirus({
    //     type: 'ransomware',
    //     detectable: true,
    //     sourcefile: 'invoice.pdf'
    // });
    //   {
    //   type: "ransomware",
    //   detectable: true
    //   sourcefile: "file1"
    //   }
    // const detectableViruses = viruses.filter(v => v.detectable);

    useEffect(() => {
        console.log("Virüsler güncellendi:", viruses);
    }, [viruses]);

    const defaultVirusStructure = {
        type: null,           // Virüs türü: 'ransomware', 'keylogger' vb.
        detectable: false,    // Antivirüs tarafından algılanabilir mi
        sourcefile: null      // Kaynak dosya
    };

    const addVirus = (newVirus) => {
        const completeVirus = {
            ...defaultVirusStructure,
            ...newVirus
        };

        const alreadyExists = viruses.some(v => v.type === completeVirus.type);
        if (!alreadyExists) {
            setViruses([...viruses, completeVirus]);
        }
    };

    const removeVirus = (virusType) => {
        setViruses(viruses.filter(v => v.type !== virusType));
    };

    return (
        <VirusContext.Provider value=
        {{ viruses, addVirus, removeVirus,
         scanLogs, setScanLogs, realTimeProtection, setRealTimeProtection,
          isantivirusUpToDate, setIsAntivirusUpToDate }}>
            {children}
        </VirusContext.Provider>
    );
};

export const useVirusContext = () => useContext(VirusContext);
