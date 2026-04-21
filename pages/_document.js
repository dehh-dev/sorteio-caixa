// pages/_document.js
//
// suppressHydrationWarning no <body> resolve erros de hydration causados por:
// - Extensões do browser (LastPass, Grammarly, Google Translate, etc.)
// - Diferenças de locale entre Node.js e o browser
// - Qualquer modificação de DOM feita antes da hidratação do React

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Fontes carregadas aqui para evitar hydration mismatch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
