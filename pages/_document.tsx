import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='format-detection' content='telephone=no' />

          <meta property='og:site_name' content='サイト名' />
          <meta property='og:title' content='タイトル' />
          <meta property='og:description' content='説明文' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='URL' />
          <meta property='og:image' content='https://shima-usa.net/web-template/icon.svg' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='URL' />
          <meta name='twitter:image' content='https://shima-usa.net/web-template/icon.svg' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;