import { useState } from 'react';

export default function LazyImage({ src, alt, className, width, height, placeholder = true }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {placeholder && !loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8FF2E]/5 to-[#22D3EE]/5 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        width={width}
        height={height}
      />
    </div>
  );
}
