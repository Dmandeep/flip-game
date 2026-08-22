import { useEffect, useState } from 'react';

/**
 * Preloads all character images in the background so there's no lag
 * when a card flips for the first time.
 */
export const useImagePreloader = (images: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = images.length;

    images.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++; // still count it to not block
        if (loadedCount === total) setLoaded(true);
      };
      img.src = src;
    });
  }, [images]);

  return loaded;
};
