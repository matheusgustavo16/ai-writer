import Head from 'next/head'
import { Toaster } from 'react-hot-toast';

import Header from '../components/Header'
import Hero from '../components/Hero'
import Workflow from '../components/Workflow'
import Plans from '../components/Plans'
import Footer from '../components/Footer'
import { fetchDataFromApi } from '../utils/api';

const Home = ({ planos }) => {
  return (
    <div className="root">
      <Head>
        <title>Copy Online - Crie copys incríveis em segundos - Braip</title>
        <meta name="description" content="Afilie-se já e venda um software que Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente. Cadastre-se agora e teste grátis com 2000 Tokens iniciais." />
        <meta name="keywords" content="copys, criar, texto, criação, gpt, tokens, braip, afiliados" />
      </Head>
      <Header />
      <Hero />
      <Workflow />
      <Plans plans={planos} />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export async function getStaticProps(context) {
  const planos = await fetchDataFromApi(`get_plans`)
  //console.log('planos', planos)
  
  return {
      props: {
        planos
      }
  }
}

export default Home;
