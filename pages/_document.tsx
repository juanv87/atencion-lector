/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Head, Html, NextScript, Main } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Open+Sans:wght@300;400;600;800&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500&family=Nunito+Sans:wght@300;400;600&family=Mukta:wght@300;400;500&family=Quicksand:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <body className="bg-white ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
