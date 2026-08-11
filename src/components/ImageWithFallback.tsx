import React, { useState, useEffect } from 'react';
import defaultBundledImg from '../assets/images/alula_hegra_tomb_1786293300477.jpg';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

// Clean SVG Data URI as absolute last resort (Desert Palm Silhouette) so browser NEVER shows [?]
const SVG_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%233B2A22"/><stop offset="50%" stop-color="%234F6F52"/><stop offset="100%" stop-color="%23241D18"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><g fill="%23D6AD72" opacity="0.85"><path d="M400 220 Q370 170 320 180 Q370 200 390 230 Q330 210 300 240 Q360 240 385 250 Q310 270 310 310 Q360 280 390 260 Q340 320 360 360 Q385 310 400 280 Q415 310 440 360 Q460 320 410 260 Q440 280 490 310 Q490 270 415 250 Q440 240 500 240 Q470 210 410 230 Q430 200 480 180 Q430 170 400 220 Z"/><rect x="393" y="270" width="14" height="150" rx="7" fill="%23C58B5C"/></g><text x="400" y="470" fill="%23FAF8F3" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">المعالم التراثية السعودية</text></svg>`;

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || defaultBundledImg);
  const [stage, setStage] = useState<number>(0);

  // Sync state whenever src prop changes
  useEffect(() => {
    setImgSrc(src || fallbackSrc || defaultBundledImg);
    setStage(0);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (stage === 0) {
      setStage(1);
      if (fallbackSrc && fallbackSrc !== imgSrc) {
        setImgSrc(fallbackSrc);
      } else if (imgSrc !== defaultBundledImg) {
        setImgSrc(defaultBundledImg);
      } else {
        setImgSrc(SVG_FALLBACK);
      }
    } else if (stage === 1) {
      setStage(2);
      if (imgSrc !== defaultBundledImg) {
        setImgSrc(defaultBundledImg);
      } else {
        setImgSrc(SVG_FALLBACK);
      }
    } else if (stage === 2) {
      setStage(3);
      setImgSrc(SVG_FALLBACK);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};

