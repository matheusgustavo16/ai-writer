import { ChevronRight } from "lucide-react"
import Image from "next/image"

const Workflow = () => {
    return (<>
        <div className="w-full max-w-7xl my-36 m-auto">
            <h2 className="text-5xl md:max-w-md font-light">Inclua a IA no seu workflow e seja mais produtivo</h2>
            <div className="flex flex-wrap justify-between items-start mt-10">
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold mr-5">Criação de Copys de Vendas</h3>
                            <ChevronRight />
                        </div>
                        <div className="text-sm text-gray-400 pt-3">
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                            <p>Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.</p>
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold mr-5">Criação de Copys de Vendas</h3>
                            <ChevronRight />
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold mr-5">Criação de Copys de Vendas</h3>
                            <ChevronRight />
                        </div>
                    </div>
                </div>
                <div className="">
                    <Image src={`/assets/example-socialmedia.png`} width={514} height={486} alt="" />
                </div>
            </div>
        </div>
        <div className="bg-[url('/assets/bg-free-test.png')] bg-center w-full py-24">
            <div className="w-full max-w-7xl m-auto flex flex-wrap justify-between items-center">
                <div>
                    <h4 className="text-4xl font-semibold">Teste Grátis</h4>
                    <p className="text-[#138941] font-medium text-xl">Cadastre-se e ganhe 5000 Tokens Grátis.</p>
                </div>
                <div>
                    <div className="bg-white flex justify-between items-center p-1 rounded-md">
                        <input placeholder="seuemail@gmail.com" className="p-2 px-3 outline-none border-none text-sm min-w-[300px]" />
                        <button className="bg-[#26FF7C] rounded-md p-2 px-4 text-xs font-medium hover:bg-[#129c49] hover:text-white transition duration-300 ease-in-out">Testar Grátis</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Workflow