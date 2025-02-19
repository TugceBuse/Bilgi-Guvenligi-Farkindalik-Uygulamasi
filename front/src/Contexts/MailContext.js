import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails } from '../components/Mailbox/Mails';

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [mails, setMails] = useState(initialMails);
  const [sentMails, setSentMails] = useState(initialSentMails);
  const [spamMails, setSpamMails] = useState(initialSpamMails);
  const [selectedMail, setSelectedMail] = useState(null);

  return (
    <MailContext.Provider value={{ mails, setMails, sentMails, setSentMails, spamMails, setSpamMails, selectedMail, setSelectedMail }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => {
  return useContext(MailContext);
};