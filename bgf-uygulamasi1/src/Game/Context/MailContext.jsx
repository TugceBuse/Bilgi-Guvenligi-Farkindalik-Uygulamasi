import React, { createContext, useContext, useState } from 'react';
import { mails as initialMails, sentMails as initialSentMails, spamMails as initialSpamMails } from '../Mailbox/Mails';

const MailContext = createContext();

export const MailContextProvider = ({ children }) => {
  const [mails, setMails] = useState(initialMails);
  const [sentMails, setSentMails] = useState(initialSentMails);
  const [spamMails, setSpamMails] = useState(initialSpamMails);

  return (
    <MailContext.Provider value={{ mails, setMails, sentMails, setSentMails, spamMails, setSpamMails }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => {
  return useContext(MailContext);
};