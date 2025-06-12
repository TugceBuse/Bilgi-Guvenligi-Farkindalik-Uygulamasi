import { createRoot } from 'react-dom/client';
import React from 'react';

let cmdContainer = null;
let cmdRoot = null;

export const showFakeCMD = ({
  title = 'C:\\Windows\\System32\\cmd.exe',
  lines = [],
  duration = 1000,
  width = 420,
  height = 180
}) => {
  // Eğer önceki container varsa temizle
  if (cmdContainer) {
    cmdContainer.remove();
    cmdContainer = null;
    cmdRoot = null;
  }

  cmdContainer = document.createElement('div');
  document.body.appendChild(cmdContainer);
  cmdRoot = createRoot(cmdContainer);

  const top = `${30 + Math.random() * 40}%`;
  const left = `${30 + Math.random() * 30}%`;

  const CMD = (
    <div style={{
      position: 'fixed',
      top,
      left,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: '#000',
      color: '#00FF00',
      fontFamily: 'Consolas, monospace',
      fontSize: '14px',
      padding: '15px 20px',
      border: '2px solid #00FF00',
      boxShadow: '0 0 12px #00FF00',
      zIndex: 9999,
      whiteSpace: 'pre-line',
      animation: 'fadeOutFlash 1s ease-in-out forwards'
    }}>
      {title}
      {'\n\n'}
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );

  cmdRoot.render(CMD);

  setTimeout(() => {
    if (cmdContainer) {
      cmdRoot.unmount();
      cmdContainer.remove();
      cmdContainer = null;
      cmdRoot = null;
    }
  }, duration);
};
