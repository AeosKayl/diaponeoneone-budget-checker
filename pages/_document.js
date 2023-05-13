import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* for the modal that I wouldve liked to use but lacked the time */}
        <div id="backdrop-root"></div>
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
