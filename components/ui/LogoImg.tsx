'use client';

import { useState } from 'react';

interface LogoImgProps {
  domain: string;
  name: string;
  size?: number;
  className?: string;
}

export default function LogoImg({ domain, name, size = 28, className = '' }: LogoImgProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-emaavy-accent text-[10px] font-bold text-emaavy-deep ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.32 }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}
