import React, { createContext, useContext, useEffect, useState } from 'react';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
    // Antivirüs
    const [realTimeProtection, setRealTimeProtection] = useState(false);
    const [antivirusUpdated, setAntivirusUpdated] = useState(false);
    const [antivirusUpdating, setAntivirusUpdating] = useState(false);
    const [scanLogs, setScanLogs] = useState([]);
    // Tam koruma: realtime ve güncel birlikteyse aktif olsun
    const [fullProtection, setFullProtection] = useState(false);
    // Sistem güvenliği
    const [domainNetworkEnabled, setDomainNetworkEnabled] = useState(true);
    const [privateNetworkEnabled, setPrivateNetworkEnabled] = useState(true);
    const [publicNetworkEnabled, setPublicNetworkEnabled] = useState(true);

    useEffect(() => {
        if (realTimeProtection && antivirusUpdated)
            setFullProtection(true);
        else
            setFullProtection(false);
    }, [realTimeProtection, antivirusUpdated]);

    return (
        <SecurityContext.Provider value={{
            // Antivirüs
            realTimeProtection, setRealTimeProtection,
            antivirusUpdated, setAntivirusUpdated,
            fullProtection,
            antivirusUpdating, setAntivirusUpdating,
            scanLogs, setScanLogs,
            // Sistem güvenlik ayarları
            domainNetworkEnabled, setDomainNetworkEnabled,
            privateNetworkEnabled, setPrivateNetworkEnabled,
            publicNetworkEnabled, setPublicNetworkEnabled,
        }}>
            {children}
        </SecurityContext.Provider>
    );
};

export const useSecurityContext = () => useContext(SecurityContext);
