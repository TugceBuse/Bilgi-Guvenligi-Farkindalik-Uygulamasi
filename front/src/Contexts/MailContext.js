import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails, createCargoMail, createInvoiceMail, createDiscountMail  } from '../components/Mailbox/Mails';

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [initMail, setInitMail] = useState(initialMails);
  const [inboxMails, setInboxMails] = useState(initialMails.filter(mail => mail.used));//ilk gelen mailleri used(TRUE) yap ki gösterilsin
  const [initsentMails, setInitSentMails] = useState(initialSentMails);
  const [initspamMails, setInitSpamMails] = useState(initialSpamMails);
  const [spamboxMails, setSpamboxMails] = useState(initialSpamMails.filter(mail => mail.used));
  const [notifiedMails, setNotifiedMails] = useState([]); // Bildirim kutusu mailleri
  const [selectedMail, setSelectedMail] = useState(null);

  const addMailToMailbox = (type, id) => {
    if (type === 'inbox') {
      const mailToAdd = initMail.find(mail => mail.id === id);
      if (mailToAdd && !mailToAdd.used) {
        // 1. Önce initMail içinde ilgili mailin used'ını true yapıyoruz
        setInitMail(prevMails =>
          prevMails.map(mail =>
            mail.id === id ? { ...mail, used: true } : mail
          )
        );
  
        // 2. Sonra inboxMails'in en başına ekliyoruz
        setInboxMails(prevMails => [...prevMails ,{ ...mailToAdd, used: true }]);
      }
    } else if (type === 'spam') {
      const spamToAdd = initspamMails.find(mail => mail.id === id);
      if (spamToAdd && !spamToAdd.used) {
        // 1. Önce initspamMails içinde ilgili spam mailin used'ını true yapıyoruz
        setInitSpamMails(prevMails =>
          prevMails.map(mail =>
            mail.id === id ? { ...mail, used: true } : mail
          )
        );
  
        // 2. Sonra spamboxMails'in en başına ekliyoruz
        setSpamboxMails(prevMails => [...prevMails, { ...spamToAdd, used: true }]);
      }
    }
  };
  
  const sendMail = (type, params) => {
    let mailObj = null;
    if (type === "cargo") {
      mailObj = {
        id: Date.now(),
        from: params.from,
        title: params.title,
        precontent: params.precontent,
        readMail: false,
        notified: false,
        used: false,
        content: createCargoMail(params)
      };
    } else if (type === "invoice") {
      mailObj = {
        id: Date.now(),
        from: params.from,
        title: params.title,
        precontent: params.precontent,
        readMail: false,
        notified: false,
        used: false,
        content: createInvoiceMail(params)
      };
    }
    // ...diğer tipler için de ekle
    if (mailObj) {
      setInitMail(prev => [...prev, mailObj]);
      setInboxMails(prev => [...prev, mailObj]);
    }
  };

  return (
    <MailContext.Provider value=
    {{
      initMail, setInitMail,
      inboxMails, setInboxMails,
      initsentMails, setInitSentMails,
      initspamMails, setInitSpamMails,
      spamboxMails, setSpamboxMails,
      selectedMail, setSelectedMail,
      notifiedMails, setNotifiedMails,
      addMailToMailbox,
      sendMail
    }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => {
  return useContext(MailContext);
};