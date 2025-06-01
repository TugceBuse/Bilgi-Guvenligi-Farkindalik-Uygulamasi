import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails } from '../components/Mailbox/Mails';
import { useNotificationContext } from './NotificationContext';
import { useUIContext } from './UIContext'; // EKLENDİ

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [initMail, setInitMail] = useState(initialMails);
  const [inboxMails, setInboxMails] = useState(initialMails.filter(mail => mail.used));
  const [initsentMails, setInitSentMails] = useState(initialSentMails);
  const [initspamMails, setInitSpamMails] = useState(initialSpamMails);
  const [spamboxMails, setSpamboxMails] = useState(initialSpamMails.filter(mail => mail.used));
  const [selectedMail, setSelectedMail] = useState(null);

  const { addNotification, markAsRead, removeNotification } = useNotificationContext();
  const { openWindow } = useUIContext(); // EKLENDİ

  // 📬 Yeni mail geldiğinde notification oluştur (CALLBACK YÖNTEMİ)
  const notifyNewMail = (mail) => {
    addNotification({
      id : mail.id,
      type: "info",
      appType: "mail",
      title: mail.title,
      message: mail.precontent,
      icon: "/icons/mail.png",
      isPopup: true,
      isTaskbar: true,
      duration: 7000,
      actions: [
        {
          label: "Oku",
          // CALLBACK: openWindow ve setSelectedMail birlikte tetikleniyor
          onClick: () => {
            openWindow('mailbox');
            setSelectedMail(mail);
            markAsRead && markAsRead(mail.id); // Bildirimi okunduya işaretle (güvenlik için kontrol)
          }
        },
        {
          label: "Bildirimden Kaldır",
          onClick: () => removeNotification(mail.id)
        }
      ],
      appData: { mailId: mail.id }
    });
  };

  // Mail ekleme fonksiyonunu güncelle (yeni gelen maile notification düşsün)
  const addMailToMailbox = (type, id) => {
    if (type === 'inbox') {
      const mailToAdd = initMail.find(mail => mail.id === id);
      if (mailToAdd && !mailToAdd.used) {
        setInitMail(prevMails =>
          prevMails.map(mail =>
            mail.id === id ? { ...mail, used: true } : mail
          )
        );
        setInboxMails(prevMails => [...prevMails, { ...mailToAdd, used: true }]);
        notifyNewMail({ ...mailToAdd, used: true }); // AÇIKLAMALI
      }
    } else if (type === 'spam') {
      const spamToAdd = initspamMails.find(mail => mail.id === id);
      if (spamToAdd && !spamToAdd.used) {
        setInitSpamMails(prevMails =>
          prevMails.map(mail =>
            mail.id === id ? { ...mail, used: true } : mail
          )
        );
        setSpamboxMails(prevMails => [...prevMails, { ...spamToAdd, used: true }]);
        // İsterseniz spam için de notification ekleyebilirsiniz.
      }
    }
  };

  return (
    <MailContext.Provider value={{
      initMail, setInitMail,
      inboxMails, setInboxMails,
      initsentMails, setInitSentMails,
      initspamMails, setInitSpamMails,
      spamboxMails, setSpamboxMails,
      selectedMail, setSelectedMail,
      addMailToMailbox,
    }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => {
  return useContext(MailContext);
};
