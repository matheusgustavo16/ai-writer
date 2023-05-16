import Image from 'next/image';
import { Award, Bot, Check, ChevronRight, ClipboardCheck } from 'lucide-react';

const Hero = () => {
    return (<>
        <div className="w-full text-center flex flex-col justify-center items-center pt-24">
            <h1 className="max-w-md font-bold text-6xl">Crie copys incríveis em segundos</h1>
            <span className="max-w-lg mt-3 text-gray-400">Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</span>
            <div className="mt-10 flex gap-5">
                <button className="bg-[#26FF7C] p-3 px-4 rounded-md flex justify-between items-center gap-3 text-sm group hover:bg-green-400 transition duration-300 ease-in-out">
                    <span className="font-medium">Teste Grátis</span>
                    <span className="w-5 h-5 rounded-full flex justify-center items-center bg-black text-white transition duration-300 ease-in-out"><ChevronRight size={14} /></span>
                </button>
                <button className="opacity-30 hover:opacity-100 transition duration-300 ease-in-out">Planos Premium</button>
            </div>
            <Image src={`/assets/default-dashboard.png`} width={1246/1.5} height={725/1.5} alt='default dashboard' className="mt-24 mb-2" />
            <div className="flex justify-between items-center gap-1 md:gap-14 text-sm mb-24">
                <div className="flex items-center gap-1 font-medium">
                    <Check size={19} color="#26FF7C" /> Não precisa cadastrar cartão
                </div>
                <div className="flex items-center gap-1 font-medium">
                    <Check size={19} color="#26FF7C" /> Teste Grátis
                </div>
                <div className="flex items-center gap-1 font-medium">
                    <Check size={19} color="#26FF7C" /> Cancele quando quiser
                </div>
            </div>
            <div className="bg-white w-full md:max-w-7xl rounded-md border shadow-lg grid md:grid-cols-3 xs:grid-rows-3 gap-10 justify-between items-start p-6 py-8">
                <div className="text-left">
                    <h4 className="flex font-medium"><ClipboardCheck className="mr-3" /> 1. Cadastre-se</h4>
                    <p className="text-sm pl-9 mt-3 text-gray-400">Você faz o seu cadastro grátis, e ganha alguns tokens para testar a plataformas e criar as suas primeiras copys.</p>
                </div>
                <div className="text-left">
                    <h4 className="flex font-medium"><Bot className="mr-3" /> 2. Teste Grátis</h4>
                    <p className="text-sm pl-9 mt-3 text-gray-400">Você faz o seu cadastro grátis, e ganha alguns tokens para testar a plataformas e criar as suas primeiras copys.</p>
                </div>
                <div className="text-left">
                    <h4 className="flex font-medium"><Award className="mr-3" /> 3. Torne-se Premium</h4>
                    <p className="text-sm pl-9 mt-3 text-gray-400">Você faz o seu cadastro grátis, e ganha alguns tokens para testar a plataformas e criar as suas primeiras copys.</p>
                </div>
            </div>
        </div>
    </>)
}

export default Hero