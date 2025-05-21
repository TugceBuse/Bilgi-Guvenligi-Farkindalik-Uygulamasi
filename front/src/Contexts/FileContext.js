import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUIContext } from './UIContext';
import NovaBankAppSetup from '../exefiles/NovaBankAppSetup/NovaBankAppSetup';

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const { openWindow, closeWindow } = useUIContext();

    // Dosya ve Özellikleri
    const [files, setFiles] = useState({
        benioku: { 
            available: true,
            quarantined: false,
            clickable: true,
            infected: false,
            virusType: null, 
            type: "txt", 
            size: "1KB", 
            location: "downloads", 
            label: "benioku", 
            icon: "/icons/txt.png", 
            content: "/files/benioku.txt"
        },
        rapor_2025: { 
            available: false, 
            clickable: true,
            quarantined: false,
            infected: true,
            detectable: true,
            virusType: "ransomware", 
            type: "docx", 
            size: "2MB", 
            location: "downloads", 
            label: "Rapor_2025", 
            icon: "/icons/docx.png", 
            specialView : "enableContentDocx" 
        },
        antivirussetup: { 
            available: true,
            quarantined: false, 
            clickable: true,
            infected: false,
            type: "exe", 
            size: "35MB", 
            location: "downloads", 
            label: "Antivirus Kurulumu", 
            icon: "/icons/setting.png", 
            exeType: "antivirussetup"
        },
        novabankappsetup: {
            available: false,
            quarantined: false,
            clickable: true,
            infected: false,
            type: "exe",
            size: "18MB",
            location: "downloads",
            label: "Nova Bank Kurulumu",
            icon: "/novaBank/NovaBankAppSetup.png",
            exeType: "novabankappsetup"
        },
        taskappsetup: { 
            available: false,
            quarantined: false,
            clickable: true, 
            infected: false,
            type: "exe", 
            size: "12MB", 
            location: "downloads", 
            label: "TaskApp Kurulumu", 
            icon: "/icons/task-list.png", 
            exeType: "taskappsetup"
        },
        taskappsetupf: { 
            available: false,
            quarantined: false, 
            clickable: true,
            infected: true,
            type: "exe", 
            size: "17MB", 
            location: "downloads", 
            label: "TaskApp Kurulumu", 
            icon: "/icons/task-list.png", 
            exeType: "taskappsetup",
            virusType: "clown",
            detectable: false,
            exeType: "taskappsetupf"
        },
        officeDoc: { 
            available: true,
            quarantined: false, 
            clickable: true,
            infected: false, 
            type: "docx", 
            size: "75KB", 
            location: "documents", 
            label: "İş Dosyası", 
            icon: "/icons/docx.png", 
            content: "/files/word1.docx" 
        },
        photo1: { 
            available: true,
            quarantined: false, 
            clickable: true,
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
            quarantined: false,
            clickable: true, 
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
            quarantined: false, 
            clickable: true,
            infected: false, 
            type: "jpg", 
            size: "1.8MB", 
            location: "pictures", 
            label: "Toplantı Fotoğrafı", 
            icon: "/icons/image.png", 
            content: "/images/meeting.jpg"
        }
    });

    useEffect(() => {
        console.log('Files:', files);
    }
    , [files]);

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
            openWindow(fileName); // 📌 UIContext ile pencere yönetimine entegre et
        }
    };

    // 📌 Dosya kapatma fonksiyonu
    const closeFile = (fileName) => {
        console.log('📌 Dosya kapatılıyor:', fileName);
        setOpenedFiles(openedFiles.filter(file => file !== fileName)); // Açılan dosyalar listesinden çıkar
        closeWindow(fileName); // 📌 UIContext ile Taskbar ve pencereyi kapat
    };

    return (
        <FileContext.Provider value={{ files,setFiles, openedFiles, updateFileStatus, openFile, closeFile }}>
            {children}
        </FileContext.Provider>
    );
};

// 📌 FileContext kullanabilmek için hook
export const useFileContext = () => useContext(FileContext);
