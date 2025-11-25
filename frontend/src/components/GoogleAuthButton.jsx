import React, { useEffect, useRef } from 'react';

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    const existing = document.getElementById('google-oauth');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-oauth';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

const GoogleAuthButton = ({ onCredential }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        await loadGoogleScript();
        if (cancelled || !window.google || !buttonRef.current) return;

        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        if (!clientId) {
          console.warn('Missing REACT_APP_GOOGLE_CLIENT_ID; Google button disabled.');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential && onCredential) {
              onCredential(response.credential);
            }
          }
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          shape: 'pill',
          theme: 'outline',
          text: 'continue_with',
          size: 'large',
          width: 320
        });
      } catch (err) {
        console.error('Failed to init Google Identity', err);
      }
    };

    initialize();
    return () => {
      cancelled = true;
    };
  }, [onCredential]);

  return <div ref={buttonRef} />;
};

export default GoogleAuthButton;
