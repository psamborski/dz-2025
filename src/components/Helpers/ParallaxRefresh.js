import { useEffect } from 'react';
import { useParallaxController } from 'react-scroll-parallax';

export default function ParallaxUpdater() {
  const parallaxController = useParallaxController();

  useEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [parallaxController]);

  return null;
}