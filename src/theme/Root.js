// /**
//  * Copyright @ by Code Lyoko Team. All rights reserved.
//  * Author: Thành Nam Nguyễn
//  */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@site/src/components/MuiTheme';
import React, { useEffect, useState } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

// GTM初期化関数（後で呼び出す）
const initializeGTM = (gtmId) => {
  if (!gtmId) {
    console.warn('GTM ID is not defined.');
    return;
  }
  // GTMが既に初期化されていないかチェック（念のため）
  if (window.dataLayer) {
    console.log('GTM already initialized or dataLayer exists.');
    // return; // 必要に応じてコメントアウト解除
  }

  console.log('Initializing GTM...');

  // dataLayerの初期化（標準的なGTMスニペットの一部）
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', gtmId); // ここにGTM IDを設定

  // GTMスクリプトの動的読み込み（標準的なGTMスニペットの一部）
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
};

export default function Root({ children }) {
  const COOKIE_NAME = 'toria.try-try.com';

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const GTM_ID = customFields.googleTagManager;
  const [isGtmInitialized, setIsGtmInitialized] = useState(false);

  useEffect(() => {
    // ページ読み込み時にクッキーの同意状態をチェック
    const consentGiven = getCookieConsentValue(COOKIE_NAME) === 'true';

    if (consentGiven && !isGtmInitialized && !window.gtmInitialized) {
      console.log('Consent already given. Initializing GTM on load.');
      initializeGTM(GTM_ID);
      setIsGtmInitialized(true);
      window.gtmInitialized = true; // グローバル変数で多重初期化を防ぐ
    }
  }, [GTM_ID, isGtmInitialized]); // GTM_IDとisGtmInitializedが変わった時に再評価

  const handleAcceptCookie = () => {
    if (!isGtmInitialized && !window.gtmInitialized) {
      console.log('Consent accepted. Initializing GTM.');
      initializeGTM(GTM_ID);
      setIsGtmInitialized(true);
      window.gtmInitialized = true; // グローバル変数で多重初期化を防ぐ
    } else {
      console.log('Consent accepted, but GTM already initialized.');
    }
  };

  return (
    <>
      <InitColorSchemeScript />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>

      <CookieConsent
        location="bottom"
        buttonText="同意する"
        cookieName={COOKIE_NAME}
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
        enableDeclineButton
        declineButtonText="拒否する"
        onAccept={handleAcceptCookie}
      >
        このウェブサイトでは、ユーザーエクスペリエンス向上のためにクッキーを使用しています。{' '}
        <span style={{ fontSize: '10px' }}>
          詳細については<a href="/privacy-policy">プライバシーポリシー</a>をご覧ください。{' '}
          {/* プライバシーポリシーへのリンク  */}
        </span>
      </CookieConsent>
    </>
  );
}
