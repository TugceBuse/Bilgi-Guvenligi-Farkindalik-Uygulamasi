import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const [files, setFiles] = useState({
        file1: { available: true, infected: true, type: "pdf", size: "2MB", location: "downloads" },
        antivirusexe: { available: true, infected: false, type: "exe", size: "20MB", location: "downloads" },
        officeDoc: { available: false, infected: false, type: "docx", size: "1MB", location: "documents" },
        photo: { available: false, infected: false, type: "jpg", size: "5MB", location: "pictures" },
    });

    const updateFileStatus = (fileName, updates) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [fileName]: {
                ...prevFiles[fileName],
                ...updates,
            },
        }));
    };

    return (
        <FileContext.Provider value={{ files, updateFileStatus }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => useContext(FileContext);