import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUIContext } from './UIContext';
import NovaBankAppSetup from '../exefiles/NovaBankAppSetup/NovaBankAppSetup';

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const { openWindow, closeWindow } = useUIContext();

    // Standart dosya şeması
const defaultFileSchema = {
    available: true,
    quarantined: false,
    clickable: true,
    infected: false,
    detectable: false,
    virusType: null,
    type: "txt",
    size: "1KB",
    location: "downloads",
    label: "",
    icon: "/icons/txt.png",
    content: null,
    exeType: null,
    specialView: null,
    extra: {}
};

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
        officedoc: { 
            available: true,
            quarantined: false, 
            clickable: true,
            infected: false, 
            type: "docx", 
            size: "75KB", 
            location: "personal", 
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
            location: "personal", 
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
        },
        kisiselkullanicibilgileri: {
            available: true,
            quarantined: false,
            clickable: true,
            infected: false,
            virusType: null,
            type: "pdf",
            size: "740KB",
            location: "docs", // istersen farklı klasör adı da verebilirsin
            label: "Kişisel Kullanıcı Bilgileri.pdf",
            icon: "/icons/pdf.png",
            content: "/files/Kişisel_Kullanıcı_Bilgileri.txt"
        },
        issozlesmesi: {
            available: true,
            quarantined: false,
            clickable: true,
            infected: false,
            virusType: null,
            type: "pdf",
            size: "1.2MB",
            location: "docs",
            label: "İş Sözleşmesi.pdf",
            icon: "/icons/pdf.png",
            content: "/files/İş_Sözleşmesi.txt"
        },
        gizlilikpolitikasi: {
            available: true,
            quarantined: false,
            clickable: true,
            infected: false,
            virusType: null,
            type: "pdf",
            size: "860KB",
            location: "docs",
            label: "Gizlilik Politikası.pdf",
            icon: "/icons/pdf.png",
            content: "/files/Gizlilik_Politikası.txt"
        },
        personelelkitabi: {
            available: true,
            quarantined: false,
            clickable: true,
            infected: false,
            virusType: null,
            type: "pdf",
            size: "2.1MB",
            location: "docs",
            label: "Personel El Kitabı.pdf",
            icon: "/icons/pdf.png",
            content: "/files/Personel_El_Kitabı.txt"
        }
    });

    const addFile = (fileName, fileData) => {
        setFiles(prevFiles => ({
            ...prevFiles,
            [fileName]: {
                ...defaultFileSchema,
                ...fileData
            }
        }));
    };

    const deleteFile = (fileName) => {
        setFiles(prevFiles => {
            const newFiles = { ...prevFiles };
            delete newFiles[fileName];
            return newFiles;
        });
        setOpenedFiles(prev => prev.filter(f => f !== fileName));
    };

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
    const openFile = (fileName, theme) => {
        if (files[fileName] && !openedFiles.includes(fileName)) {
            setOpenedFiles([...openedFiles, fileName]); // Açılan dosyalar listesine ekle
            openWindow(fileName, { theme }); // 📌 UIContext ile pencere yönetimine entegre et
        }
    };

    // 📌 Dosya kapatma fonksiyonu
    const closeFile = (fileName) => {
        console.log('📌 Dosya kapatılıyor:', fileName);
        setOpenedFiles(openedFiles.filter(file => file !== fileName)); // Açılan dosyalar listesinden çıkar
        closeWindow(fileName); // 📌 UIContext ile Taskbar ve pencereyi kapat
    };

    return (
        <FileContext.Provider value={{ files, setFiles, openedFiles, updateFileStatus, openFile, closeFile, addFile, deleteFile }}>
            {children}
        </FileContext.Provider>
    );
};

// 📌 FileContext kullanabilmek için hook
export const useFileContext = () => useContext(FileContext);
