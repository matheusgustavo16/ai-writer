import { Bot, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

const ProcessandoPage = () => {
    return (<>
        <Head>
            <title>Em Processamento | Copy Online</title>
        </Head>
        <div className="w-full flex flex-col gap-1 justify-center items-center py-24">
            <Clock size={42} color="#26FF7C" />
            <h2 className="text-2xl">Pedido em Processamento!</h2>
            <p className="max-w-lg text-sm text-gray-500 mb-10 text-center">
                O seu pagamento já foi iniciado e está sendo processado<br/>
                tudo acontecerá automaticamente, você só precisa logar na sua conta e aguardar...
            </p>
            <Link href={`/app`} className="p-2 border-2 rounded-md px-4 text-sm flex items-center justify-center gap-2 bg-[#26FF7C] border-[#129c49] hover:bg-green-400  transition duration-300 ease-in-out">
                <Bot size={14} /> Ir Para a Plataforma
            </Link>
            {/*<Link href={`/app/account`} className="text-xs mt-3 text-gray-400">acessar minhas transações</Link>*/}
        </div>
    </>)
}

export default ProcessandoPage