import React, { createContext, useContext, useEffect, useState } from 'react';

const VirusContext = createContext();

export const VirusProvider = ({ children }) => {
    const [viruses, setViruses] = useState([]);

    const [scanLogs, setScanLogs] = useState([]);
    const [realTimeProtection, setRealTimeProtection] = useState(false);
    const [antivirusUpdated, setAntivirusUpdated] = useState(false);
    const [antivirusUpdating, setAntivirusUpdating] = useState(false);
    const [fullProtection, setFullProtection] = useState(false);
    const [firewallEnabled, setFirewallEnabled] = useState(true);

    //realtime açık ve antivirüs güncel ise tam koruma sağlanır.
    useEffect(() => {
        if(realTimeProtection && antivirusUpdated)
            setFullProtection(true);
        else
            setFullProtection(false);
    }, [ realTimeProtection, antivirusUpdated ]);

    useEffect(() => {
        console.log("Antivirüs güncellendi:", antivirusUpdated);
    }
    , [viruses]);

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
        <VirusContext.Provider value=
        {{ viruses, addVirus, removeVirus,
            scanLogs, setScanLogs, realTimeProtection, setRealTimeProtection,
            antivirusUpdated, setAntivirusUpdated,antivirusUpdating, setAntivirusUpdating,
            fullProtection,
            firewallEnabled, setFirewallEnabled
        }}>

            {children}
        </VirusContext.Provider>
    );
};

export const useVirusContext = () => useContext(VirusContext);
