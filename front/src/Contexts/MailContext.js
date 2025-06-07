import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails, createCargoMail, createInvoiceMail, createDiscountMail  } from '../components/Mailbox/Mails';
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

  // Mail okundu işaretle + bildirimden kaldır
  const markMailAsReadAndRemoveNotification = (mailId) => {
    setInboxMails(prev =>
      prev.map(m =>
        m.id === mailId ? { ...m, readMail: true } : m
      )
    );
    removeNotification(mailId);
  };

  // Merkezi mail bildirimi oluşturucu
  const createMailNotification = (mailObj) => {
    addNotification({
      id: mailObj.id,
      type: "info",
      appType: "mail",
      title: mailObj.title,
      message: mailObj.precontent,
      icon: "/icons/mail.png",
      isPopup: true,
      isTaskbar: true,
      duration: 7000,
      actions: [
        {
          label: "Oku",
          onClick: () => {
            openWindow('mailbox');
            setSelectedMail(mailObj);
            markMailAsReadAndRemoveNotification(mailObj.id);
          }
        },
        {
          label: "Bildirimden Kaldır",
          onClick: () => removeNotification(mailObj.id)
        }
      ],
      appData: { mailId: mailObj.id },
    });
  };

  // Inbox ve spam’a mail ekleme
  const addMailToMailbox = (type, id) => {
    if (type === 'inbox') {
      const mailToAdd = initMail.find(mail => mail.id === id);
      if (mailToAdd && !mailToAdd.used) {
        const updatedMail = { ...mailToAdd, used: true };
        setInitMail(prevMails =>
          prevMails.map(mail =>
            mail.id === id ? updatedMail : mail
          )
        );
        setInboxMails(prevMails => [...prevMails, updatedMail]);
        createMailNotification(updatedMail); // Burada tek yerden notification!
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
  
  // Dinamik mail gönder
  const sendMail = (type, params) => {
    // Benzersiz mail id oluştur
    const mailId = params.mailId || Date.now();

    let mailObj = null;

    if (type === "cargo") {
      mailObj = {
        id: mailId,
        from: params.from,
        title: params.title,
        precontent: params.precontent,
        readMail: false,
        notified: false,
        used: false,
        content: params.content || createCargoMail({ ...params, mailId }),
      };
    } else if (type === "invoice") {
      mailObj = {
        id: mailId,
        from: params.from,
        title: params.title,
        precontent: params.precontent,
        readMail: false,
        notified: false,
        used: false,
        content: createInvoiceMail({ ...params, mailId }),
      };
    }
    // ...diğer türler için de aynı şekilde ekle

    if (mailObj) {
      setInitMail(prev => [...prev, mailObj]);
      setInboxMails(prev => [...prev, mailObj]);
      createMailNotification(mailObj); // Burada da aynı notification
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
      sendMail,
      markMailAsReadAndRemoveNotification, 
    }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => useContext(MailContext);
