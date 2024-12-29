import { useEffect } from 'react';

export const MakeDraggable = (elementRef, handleSelector) => {
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
          element.style.left = `${e.clientX - offsetX}px`;
          element.style.top = `${e.clientY - offsetY}px`;
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
    }, [elementRef, handleSelector]);
  };