import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          href="/fonts/SourceHanSans-VF.otf.woff2"
          rel="preload"
          as="style"
          type="font/woff2"
        />
      </Head>
      <body className="bg-white dark:bg-gray-900 text-black/95 dark:text-white">
        <Main />
        <NextScript />
        <Script id="theme" strategy="beforeInteractive">
          {`const checkSupportLocalStorage = () => {
          try {
            return (
              typeof window !== "undefined" &&
              "localStorage" in window &&
              window.localStorage !== null
            );
          } catch (e) {
            return false;
          }
        };

        const getLocalStorage = () =>
          checkSupportLocalStorage() ? window.localStorage : null;
          const localStorage = getLocalStorage();

        if (localStorage) {
          if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
          ) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }`}
        </Script>
      </body>
    </Html>
  );
};

export default Document;
