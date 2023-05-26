import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta property="og:title" content="Copy Online" key="title"/>
        <meta property="og:description" content="Utilizando o poder da Inteligência Artificial, você pode gerar copys e conteúdos de alta qualidade de forma rápida e eficiente, teste grátis já." key="description"/>
        <meta
          property="og:image"
          content="https://i.imgur.com/EdhKBo9.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
