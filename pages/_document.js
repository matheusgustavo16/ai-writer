import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Copy Online" key="title"/>
        <meta property="og:description" content="Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente." key="description"/>
        <meta
          property="og:image"
          content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg"
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
