import { Eye } from 'lucide-react';
import { useMemo } from 'react';

const FloatingEyes = () => {
  const eyes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 25 + 15; // 15px to 40px
      const duration = Math.random() * 30 + 20; // 20s to 50s
      const delay = Math.random() * -40; // -40s to 0s
      const startX = Math.random() * 100;
      const startY = Math.random() * 20 + 100; // Start below the viewport
      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${startX}vw`,
          top: `${startY}vh`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        },
      };
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {eyes.map(eye => (
        <Eye
          key={eye.id}
          className="absolute text-primary/10 animate-float"
          style={eye.style}
        />
      ))}
    </div>
  );
};

export default FloatingEyes;