import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUIContext } from './UIContext';

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const { toggleWindow } = useUIContext();

    // 📌 Dosyalar burada tanımlanıyor
    const [files, setFiles] = useState({
        file1: { 
            available: false, 
            infected: true,
            virusType: "ransomware", 
            type: "pdf", 
            size: "2MB", 
            location: "downloads", 
            label: "Gizli Belge", 
            icon: "/icons/pdf.png", 
            content: "/files/document1.pdf" 
        },
        antivirussetup: { 
            available: true, 
            infected: false, 
            type: "exe", 
            size: "20MB", 
            location: "downloads", 
            label: "Antivirus Kurulumu", 
            icon: "/icons/setting.png", 
            exeType: "antivirussetup"
        },
        officeDoc: { 
            available: true, 
            infected: false, 
            type: "docx", 
            size: "1MB", 
            location: "documents", 
            label: "İş Dosyası", 
            icon: "/icons/docx.png", 
            content: "/files/word1.docx" 
        },
        photo1: { 
            available: true, 
            infected: false, 
            type: "jpg", 
            size: "363KB", 
            location: "downloads", 
            label: "Ofis Fotoğrafı", 
            icon: "/icons/image.png", 
            content: "/images/office.jpg"
        },
        photo12: { 
            available: true, 
            infected: false, 
            type: "jpg", 
            size: "363KB", 
            location: "downloads", 
            label: "Ofis Fotoğrafı2", 
            icon: "/icons/image.png", 
            content: "/images/office.jpg"
        },
        photo2: { 
            available: true, 
            infected: false, 
            type: "jpg", 
            size: "3MB", 
            location: "pictures", 
            label: "Toplantı Fotoğrafı", 
            icon: "/icons/image.png", 
            content: "/images/meeting.jpg"
        }
    });

    // 📌 Açılan dosyaları takip eden state
    const [openedFiles, setOpenedFiles] = useState([]);

    // 📌 Dosya durumunu güncelleme fonksiyonu
    const updateFileStatus = (fileName, updates) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [fileName]: {
                ...prevFiles[fileName],
                ...updates,
            },
        }));
    };

    useEffect(() => {
        console.log('openedFiles:', openedFiles);
    }, [openedFiles]);

    // 📌 Dosya açma fonksiyonu
    const openFile = (fileName) => {
        if (files[fileName] && !openedFiles.includes(fileName)) {
            setOpenedFiles([...openedFiles, fileName]); // Açılan dosyalar listesine ekle
            toggleWindow(fileName); // 📌 UIContext ile pencere yönetimine entegre et
        }
    };

    // 📌 Dosya kapatma fonksiyonu
    const closeFile = (fileName) => {
        setOpenedFiles(openedFiles.filter(file => file !== fileName)); // Açılan dosyalar listesinden çıkar
        toggleWindow(fileName); // 📌 UIContext ile Taskbar ve pencereyi kapat
    };

    return (
        <FileContext.Provider value={{ files, openedFiles, updateFileStatus, openFile, closeFile }}>
            {children}
        </FileContext.Provider>
    );
};

// 📌 FileContext kullanabilmek için hook
export const useFileContext = () => useContext(FileContext);
