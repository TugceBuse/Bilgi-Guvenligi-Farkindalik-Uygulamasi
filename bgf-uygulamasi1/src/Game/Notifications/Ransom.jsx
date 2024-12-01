import React from 'react';
import './Ransom.css';

const Ransom = () => {
  return (
    <div className="ransomware-container">
      <h1 className="ransomware-title">Your Computer is Locked!</h1>
      <div className="ransomware-icon">
        <img src="/icons/ransomlocked.png" alt="Lock Icon" />
      </div>
      <p className="ransomware-text">
        Your important files are encrypted! Many of your documents, photos, videos, databases, and other files are no
        longer accessible because they have been encrypted. Maybe you are busy looking for a way to recover your files,
        but do not waste your time. Nobody can recover your files without our decryption service.
      </p>
      <p className="ransomware-subtitle">Can I Recover My Files?</p>
      <p className="ransomware-text">
        Sure. We guarantee that you can recover all your files safely and easily. But you have not so much time. You
        have only 3 days to submit the payment. After that, the price will be doubled. If you don't pay in 7 days, you
        won't be able to recover your files forever.
      </p>
      <p className="ransomware-subtitle">How Do I Pay?</p>
      <p className="ransomware-text">
        Payment is accepted in Bitcoin only. Please send the correct amount to the address below:
      </p>
      <div className="ransomware-payment">
      <img src="/icons/bitcoin.png" alt="Bitcoin Logo" className="bitcoin-logo" />
        <p>Send 0.5 Bitcoin to:</p>
        <p className="ransomware-wallet">C94x5fg6730kb3X4qx4xd0x</p>
      </div>
      <div className="ransomware-footer">
        <p>
          Once the payment is checked, you can start decrypting your files by getting the Decryption Code.
        </p>
        
      </div>
    </div>
  );
};

export default Ransom;
