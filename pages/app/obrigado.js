import { Bot, CheckCircle } from "lucide-react"
import LayoutDash from "../../components/LayoutDash"
import Link from "next/link"
import Head from "next/head"

const ObrigadoPage = () => {
    return (<>
        <LayoutDash>
            <Head>
                <title>Obrigado | Copy Online</title>
            </Head>
            <div className="w-full flex flex-col gap-1 justify-center items-center py-24">
                <CheckCircle size={42} color="#26FF7C" />
                <h2 className="text-2xl">Obrigado por estar conosco!</h2>
                <p className="max-w-lg text-sm text-gray-500 mb-10 text-center">
                    Os seus créditos foram adicionados à sua conta.<br/>
                    Você já pode acessar o nosso Gerador de Copys e começar a criar!
                </p>
                <Link href={`/app/generate`} className="p-2 border-2 rounded-md px-4 text-sm flex items-center justify-center gap-2 bg-[#26FF7C] border-[#129c49] hover:bg-green-400  transition duration-300 ease-in-out">
                    <Bot size={14} /> Ir Para o Gerador
                </Link>
                {/*<Link href={`/app/account`} className="text-xs mt-3 text-gray-400">acessar minhas transações</Link>*/}
            </div>
        </LayoutDash>
    </>)
}

export default ObrigadoPage