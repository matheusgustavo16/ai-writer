import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useAuth } from "../context/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-hot-toast"

const Workflow = () => {

    const router = useRouter()
    const { isAuthenticated, loading, magicAuth } = useAuth()

    const [tab, setTab] = useState('copys')
    const [email, setEmail] = useState('')

    const handleTest = () => {
        if(!isAuthenticated){
            magicAuth(email)
        }else{
            toast.error(`Você já está autenticado!`)
        }
    }

    return (<>
        <div id="applications" className="w-full max-w-7xl my-36 m-auto px-5 md:px-0">
            <h2 className="text-5xl md:max-w-md font-light">Inclua a IA no seu workflow e seja mais produtivo</h2>
            <div className="flex flex-wrap justify-between items-start mt-10">
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center" onClick={()=> setTab('copys')}>
                            <h3 className="font-semibold mr-5">Criação de Copys de Vendas</h3>
                            <ChevronRight />
                        </div>
                        {tab === 'copys' && <div className="text-sm text-gray-400 pt-3">
                            <p>A IA pode ser uma ferramenta poderosa na criação de copys de venda. Com a análise de grandes volumes de dados e o processamento de linguagem natural, a IA pode identificar padrões e tendências nas copys de alto desempenho, fornecendo insights valiosos para aprimorar a eficácia das mensagens de venda. Através da IA, é possível identificar as palavras-chave, os gatilhos emocionais e a estrutura persuasiva mais impactante para envolver e convencer o público-alvo. Além disso, a IA pode gerar sugestões e até mesmo criar copys automáticas, acelerando o processo de criação de conteúdo de vendas. Com a ajuda da IA, os profissionais de marketing podem melhorar a personalização das copys, segmentar melhor o público-alvo e otimizar as estratégias de vendas. Em resumo, a utilização da IA na criação de copys de venda pode impulsionar a eficácia das mensagens, aumentar a taxa de conversão e otimizar os resultados das campanhas de marketing.</p>
                        </div>}
                    </div>
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center" onClick={()=> setTab('redes-sociais')}>
                            <h3 className="font-semibold mr-5">Criação de Copys para Redes Sociais</h3>
                            <ChevronRight />
                        </div>
                        {tab === 'redes-sociais' && <div className="text-sm text-gray-400 pt-3">
                            <p>A utilização da IA pode ser extremamente benéfica na criação de copys de vendas para redes sociais. Através de algoritmos avançados de processamento de linguagem natural, a IA pode analisar grandes quantidades de dados e identificar padrões de sucesso em copys de alta performance. Isso permite que os profissionais de marketing obtenham insights valiosos sobre as palavras-chave, estruturas e gatilhos emocionais que geram engajamento e conversões. Além disso, a IA pode gerar sugestões e até mesmo produzir copys automáticas, agilizando e otimizando o processo de criação de conteúdo para as redes sociais. Com a ajuda da IA, é possível aprimorar a eficácia das copys, aumentar o alcance do público-alvo e impulsionar os resultados das estratégias de vendas nas redes sociais.</p>
                        </div>}
                    </div>
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center" onClick={()=> setTab('videos')}>
                            <h3 className="font-semibold mr-5">Criação de Copys de Vídeos</h3>
                            <ChevronRight />
                        </div>
                        {tab === 'videos' && <div className="text-sm text-gray-400 pt-3">
                            <p>A aplicação da IA na criação de copys para vídeos de venda também pode trazer grandes benefícios. Por meio de algoritmos de análise de conteúdo audiovisual, a IA é capaz de identificar elementos-chave que impulsionam o engajamento e a persuasão em vídeos de venda. Isso inclui a detecção de momentos emocionalmente impactantes, a identificação de palavras-chave relevantes e a análise da linguagem corporal dos apresentadores. Com base nessas análises, a IA pode oferecer insights valiosos para aprimorar a criação de copys persuasivas e aumentar a eficácia dos vídeos de venda. Além disso, a IA também pode automatizar o processo de edição e produção de vídeos, facilitando a criação de conteúdo de qualidade de forma mais rápida e eficiente. Ao usar a IA na criação de copys para vídeos de venda, é possível criar mensagens mais impactantes, envolventes e direcionadas, aumentando assim as chances de sucesso nas estratégias de marketing e vendas.</p>
                        </div>}
                    </div>
                </div>
                <div className="">
                    <Image src={`/assets/example-socialmedia.png`} width={514} height={486} alt="social media example" />
                </div>
            </div>
        </div>
        <div id="free-test" className="w-full group py-24 md:py-32 bg-[#26FF7C]">
            <div className="w-full bg-white bg-opacity-25 group-hover:bg-opacity-40 shadow-md rounded-lg max-w-xl m-auto flex flex-wrap gap-5 md:gap-0 justify-center text-center items-center p-6 py-24 transition duration-300 ease-in-out">
                <div>
                    <h3 className="text-4xl uppercase select-none font-extrabold leading-8 mb-12">Pronto Para o<br/>Próximo Nível ?</h3>
                    <h4 className="text-2xl font-semibold">Cadastre-se e Teste Grátis</h4>
                    <p className="text-gray-500 font-light text-xl">Ganhe 5000 Tokens para Usar.</p>
                </div>
                <div className="mt-6">
                    <div className="bg-white flex justify-between items-center p-1 rounded-md">
                        <input placeholder="Cadastre o seu melhor e-mail" onChange={(e)=> setEmail(e?.target?.value)} className="p-2 px-3 outline-none border-none text-sm md:min-w-[300px]" />
                        <button onClick={()=> handleTest()} className="bg-[#26FF7C] rounded-md p-2 px-4 text-sm font-medium hover:bg-[#129c49] hover:text-white transition duration-300 ease-in-out">Testar Grátis</button>
                    </div>
                </div>
            </div>
        </div>
        {/*<div id="free-test" className="bg-[url('/assets/bg-free-test.png')] hidden bg-center w-full py-24">
            <div className="w-full max-w-7xl m-auto flex flex-wrap  gap-5 md:gap-0 justify-between items-center px-5 md:px-0">
                <div>
                    <h4 className="text-4xl font-semibold">Teste Grátis</h4>
                    <p className="text-[#138941] font-medium text-xl">Cadastre-se e ganhe 5000 Tokens Grátis.</p>
                </div>
                <div>
                    <div className="bg-white flex justify-between items-center p-1 rounded-md">
                        <input placeholder="seuemail@gmail.com" onChange={(e)=> setEmail(e?.target?.value)} className="p-2 px-3 outline-none border-none text-sm md:min-w-[300px]" />
                        <button onClick={()=> handleTest()} className="bg-[#26FF7C] rounded-md p-2 px-4 text-xs font-medium hover:bg-[#129c49] hover:text-white transition duration-300 ease-in-out">Testar Grátis</button>
                    </div>
                </div>
            </div>
        </div>*/}
    </>)
}

export default Workflow