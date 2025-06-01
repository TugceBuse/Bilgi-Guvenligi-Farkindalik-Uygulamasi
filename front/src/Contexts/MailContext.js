// MailContext.js
import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails } from '../components/Mailbox/Mails';
import { useNotificationContext } from './NotificationContext'; // ⭐ EKLENDİ

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [initMail, setInitMail] = useState(initialMails);
  const [inboxMails, setInboxMails] = useState(initialMails.filter(mail => mail.used));
  const [initsentMails, setInitSentMails] = useState(initialSentMails);
  const [initspamMails, setInitSpamMails] = useState(initialSpamMails);
  const [spamboxMails, setSpamboxMails] = useState(initialSpamMails.filter(mail => mail.used));
  const [selectedMail, setSelectedMail] = useState(null);

  const { addNotification, markAsRead, removeNotification } = useNotificationContext(); // ⭐ YENİ SİSTEM

  // 📬 Yeni mail geldiğinde notification oluştur
  const notifyNewMail = (mail) => {
    addNotification({
      id : mail.id,         // Benzersiz ID
      type: "info",              // Renk (isteğe göre warning, success vs. olabilir)
      appType: "mail",           // Kategori
      title: mail.title,
      message: mail.precontent,
      icon: "/icons/mail.png",
      isPopup: true,
      isTaskbar: true,
      duration: 7000,
      actions: [
        {
          label: "Oku",
          onClick: () => {
            setSelectedMail(mail);
            markAsRead(mail.id); // notification'ı okundu olarak işaretle
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

  // Mail ekleme fonksiyonunu güncelle (ör: yeni gelen maile notification düşsün)
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
        // ⭐ Yeni mail notification'ı burada
        notifyNewMail({ ...mailToAdd, used: true });
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
        // ⭐ İsterseniz spam için de notification ekleyebilirsiniz.
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
