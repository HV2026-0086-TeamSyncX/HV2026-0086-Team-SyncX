'use client';

import { useEffect } from 'react';

export default function ImpeccableLiveClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if live.js is already present
    if (document.querySelector('script[src*="8400/live.js"]')) return;

    const script = document.createElement('script');
    script.src = 'http://localhost:8400/live.js';
    script.async = true;
    script.onload = () => {
      console.log('✨ Impeccable Live UI loaded');
    };
    script.onerror = () => {
      console.warn('Impeccable Live helper not responding on port 8400');
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
