export const resetScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollTo(0, 0);
    }
  };