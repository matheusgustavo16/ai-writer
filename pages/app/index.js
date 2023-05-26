import { useRouter } from "next/router"
import Header from "../../components/Header"
import { useAuth } from "../../context/auth"
import { useEffect } from "react"
import HeaderApp from "../../components/HeaderApp"
import Image from "next/image"
import LayoutDash from "../../components/LayoutDash"
import { Bot, Crown, DollarSign, Text } from "lucide-react"
import Head from "next/head"
import { Loader } from "../../components/Loader"

const AppPage = () => {
    const { isAuthenticated, user, loading } = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!isAuthenticated){
            router.push(`/`)
        }
    }, [isAuthenticated])

    return (<>
        <Head>
            <title>Dashboard | Copy Online</title>
        </Head>
        <LayoutDash>
            {loading && <Loader />}
            {!loading && <>
                <div className="flex items-center justify-between select-none shadow-md py-2 mb-4 rounded-lg text-white bg-gradient-to-l from-purple-600 to-purple-700">
                    <div className="pl-6">
                        <h3 className="flex justify-start items-center gap-2 font-medium text-2xl">
                            <Crown size={24} className="text-[#26FF7C]" /> Seja Premium
                        </h3>
                        <p className="text-sm mt-1">E tenha acesso à funcionalidades que podem mudar a forma como você trabalha.</p>
                    </div>
                    {/*<div>
                        <button>Contratar!</button>
                    </div>*/}
                    <div className="pr-6">
                        <Image src={`/assets/copy-bot.png`} width={100} height={100} alt={`copy bot`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-100">
                        <div className="relative flex flex-col break-words">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans font-semibold leading-normal text-sm">Meus Tokens</p>
                                            <h5 className="mb-0 font-bold">
                                                {user?.balance||0}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                        <div className="w-12 h-12 flex justify-center text-white items-center text-center rounded-lg bg-gradient-to-tl from-purple-800 to-purple-500 shadow-soft-2xl">
                                            <DollarSign />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-24 rounded bg-gray-100">
                        <div className="relative flex flex-col break-words">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans font-semibold leading-normal text-sm">Copys Criadas</p>
                                            <h5 className="mb-0 font-bold">
                                                {`0`}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                        <div className="w-12 h-12 flex justify-center text-white items-center text-center rounded-lg bg-gradient-to-tl from-purple-800 to-purple-500 shadow-soft-2xl">
                                            <Bot />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center rounded bg-gray-100 p-4">
                        <h2 className="w-full text-left font-semibold">Minhas Copys</h2>
                        <div className="text-center text-sm flex flex-col justify-center items-center py-5 gap-2">
                            <Bot size={48} />
                            <p className="text-gray-400 font-medium select-none px-12">Não perca tempo, coloque os seus créditos e comece a usufruir do que a inteligência artificial pode te trazer.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start rounded bg-gray-100 p-4">
                        <h2 className="w-full text-left font-semibold">Meus Prompts</h2>
                        <div className="text-center text-sm flex flex-col justify-center items-center py-5 gap-2">
                            <Bot size={48} />
                            <p className="text-gray-400 font-medium select-none px-12">Com os prompts personalizados, você poderá melhorar ainda mais sua experiência e conversação com o bot.</p>
                        </div>
                    </div>
                </div>
            </>}
        </LayoutDash>

    </>)
}

export default AppPage