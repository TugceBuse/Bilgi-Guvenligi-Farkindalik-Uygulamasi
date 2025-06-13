import React, { createContext, useContext, useEffect, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails, createCargoMail, createInvoiceMail, createDiscountMail  } from '../components/Mailbox/Mails';
import { useNotificationContext } from './NotificationContext';
import { useUIContext } from './UIContext';
import { useTimeContext } from './TimeContext';
import { useSecurityContext } from './SecurityContext';

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [initMail, setInitMail] = useState(initialMails);
  const [inboxMails, setInboxMails] = useState(initialMails.filter(mail => mail.used));
  const [initsentMails, setInitSentMails] = useState(initialSentMails);
  const [initspamMails, setInitSpamMails] = useState(initialSpamMails);
  const [spamboxMails, setSpamboxMails] = useState(initialSpamMails.filter(mail => mail.used));
  const [selectedMail, setSelectedMail] = useState(null);
  const [pendingMails, setPendingMails] = useState([]); // Wifi yokken biriken mailler

  const { isWificonnected } = useSecurityContext();
  const { gameDate } = useTimeContext();
  const { addNotification, removeNotification } = useNotificationContext();
  const { openWindow } = useUIContext();

  const addMailToMailbox = (type, id, sendTime = gameDate) => {
    console.log(`Adding mail to ${type}:`, id, sendTime);
    setPendingMails(prev => [...prev, { type, id, sendTime }]);
  };

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
  useEffect(() => {
    if (isWificonnected && pendingMails.length > 0) {
      pendingMails.forEach(mail => {
        // Her mail stack'ten mailbox'a işlenir
        if (mail.type === 'inbox') {
          const mailToAdd = initMail.find(m => m.id === mail.id);
          if (mailToAdd && !mailToAdd.used) {
            const updatedMail = { 
              ...mailToAdd, 
              used: true, 
              sendTime: mail.sendTime || mailToAdd.sendTime || gameDate
            };
            console.log("USEEFFECT: Adding mail to inbox:", updatedMail);
            setInitMail(prevMails =>
              prevMails.map(m =>
                m.id === mail.id ? updatedMail : m
              )
            );
            setInboxMails(prevMails => [...prevMails, updatedMail]);
            createMailNotification(updatedMail);
          }
        } else if (mail.type === 'spam') {
          const spamToAdd = initspamMails.find(m => m.id === mail.id);
          if (spamToAdd && !spamToAdd.used) {
            const updatedSpam = { 
              ...spamToAdd, 
              used: true, 
              sendTime: mail.sendTime || spamToAdd.sendTime || gameDate
            };
            setInitSpamMails(prevMails =>
              prevMails.map(m =>
                m.id === mail.id ? updatedSpam : m
              )
            );
            setSpamboxMails(prevMails => [...prevMails, updatedSpam]);
            // Spam için notification çıkarılmıyor.
          }
        }
      });
      setPendingMails([]); // Stack boşaltılır
    }
  }, [isWificonnected, pendingMails, initMail, initspamMails, gameDate]);
  
  // Dinamik mail gönder
  // Dinamik mail gönderimi (stack mantığı ile kullanılmalı)
  const sendMail = (type, params) => {
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
        sendTime: params.sendTime || gameDate,
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
        sendTime: params.sendTime || gameDate,
        content: createInvoiceMail({ ...params, mailId }),
      };
    }
    // ...diğer türler aynı şekilde eklenebilir

    if (mailObj) {
      setInitMail(prev => [...prev, mailObj]);
      addMailToMailbox('inbox', mailObj.id);
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
