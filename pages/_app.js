import './styles.css'
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from '../context/auth';
import NextNProgress from 'nextjs-progressbar';
import * as gtag from '../lib/gtag'
import Analytics from '../components/Analytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function App({Component, pageProps}) {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (<>
    <AuthProvider>
      <NextNProgress color="#26FF7C" />
      <Component {...pageProps} />
      <Analytics />
    </AuthProvider>
  </>)
}

export default App;
