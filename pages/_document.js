import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>ZY|紗与夏</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta httpEquiv="description" content="zyascend的个人博客" className="next-head"/>
          <meta name="Keywords" content="react,nextjs,ssr,前端,vue" className="next-head"/>
          <meta name="Description" content="zyascend的Nextjs Blog" className="next-head"/>
          <meta name="author" content="ZY|zyascend" className="next-head"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
