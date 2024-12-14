import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const [files, setFiles] = useState({
        file1: { downloaded: false, infected: true },
        antivirusexe: { downloaded: false, infected: false },
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