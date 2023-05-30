import Script from 'next/script'

const JivoChat = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`//code.jivosite.com/widget/hDXvwca9CR`}
      async
    />
  </>
)

export default JivoChat