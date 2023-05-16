import './styles.css'
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from '../context/auth';
import NextNProgress from 'nextjs-progressbar';

function App({Component, pageProps}) {
  return (<>
    <AuthProvider>
      <NextNProgress color="#26FF7C" />
      <Component {...pageProps} />
    </AuthProvider>
  </>)
}

export default App;
