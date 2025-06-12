import { useEffect } from 'react';

export const MakeDraggable = (elementRef, handleSelector, headerHeight = 48) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Soldan: pencerenin yarısı dışarı çıkabilir
        const minX = -elemWidth / 2;
        // Sağdan: pencerenin yarısı dışarı çıkabilir
        const maxX = windowWidth - elemWidth / 2;

        // Yukarıdan: tamamen dışarı çıkmasın, headerHeight kadar içeride kalsın
        const minY = 0;
        // Alttan: pencerenin yarısı dışarı çıkabilir
        const maxY = windowHeight - elemHeight / 2;

        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;

        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handle = element.querySelector(handleSelector);
    if (handle) {
      handle.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (handle) {
        handle.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [elementRef, handleSelector, headerHeight]);
};
