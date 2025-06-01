import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails } from '../components/Mailbox/Mails';
import { useNotificationContext } from './NotificationContext';
import { useUIContext } from './UIContext';

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [initMail, setInitMail] = useState(initialMails);
  const [inboxMails, setInboxMails] = useState(initialMails.filter(mail => mail.used));
  const [initsentMails, setInitSentMails] = useState(initialSentMails);
  const [initspamMails, setInitSpamMails] = useState(initialSpamMails);
  const [spamboxMails, setSpamboxMails] = useState(initialSpamMails.filter(mail => mail.used));
  const [selectedMail, setSelectedMail] = useState(null);

  const { addNotification, removeNotification } = useNotificationContext();
  const { openWindow } = useUIContext();

  // 📧 Mail okundu işaretle + bildirimden kaldır
  const markMailAsReadAndRemoveNotification = (mailId) => {
    setInboxMails(prev =>
      prev.map(m =>
        m.id === mailId ? { ...m, readMail: true } : m
      )
    );
    removeNotification(mailId);
  };

  // Bildirimli yeni mail ekle (Sadece inbox!)
  const notifyNewMail = (mail) => {
    addNotification({
      id: mail.id, // id = mail.id olmalı!
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
          onClick: () => {
            openWindow('mailbox');
            const inboxMail = inboxMails.find(m => m.id === mail.id);
            setSelectedMail(inboxMail || mail); // fallback ile
            markMailAsReadAndRemoveNotification(mail.id);
          }
        },
        {
          label: "Bildirimden Kaldır",
          onClick: () => removeNotification(mail.id)
        }
      ],
      appData: { mailId: mail.id },
    });
  };

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
        notifyNewMail({ ...mailToAdd, used: true }); // Sadece inbox için!
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
        // Spam için notification yok!
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
      markMailAsReadAndRemoveNotification, // export ettik
    }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => useContext(MailContext);
