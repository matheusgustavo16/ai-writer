import { useRouter } from "next/router"
import Header from "../../components/Header"
import { useAuth } from "../../context/auth"
import { useEffect, useState } from "react"
import HeaderApp from "../../components/HeaderApp"
import Image from "next/image"
import LayoutDash from "../../components/LayoutDash"
import { Bot, Crown, DollarSign, Info, Text } from "lucide-react"
import Head from "next/head"
import { Loader } from "../../components/Loader"
import { toast } from "react-hot-toast"
import { fetchDataFromApi } from "../../utils/api"
import Drawer from "../../components/Drawer"

const AppPage = () => {
    
    const router = useRouter()
    const { loading, user } = useAuth()
    const [detailed, setDetailed] = useState({})
    const [seeDetail, setSeeDetail] = useState(false)
    const [loadingCopys, setLoadingCopys] = useState(false)
    const [listCopys, setListCopys] = useState([])

    useEffect(()=>{
        if(user){
            getCopys()
        }
    }, [user])    

    const getCopys = async() => {
        try{
            setLoadingCopys(true)
            const _copys = await fetchDataFromApi(`get_copys/${user?.id}`)
            if(_copys){
                setListCopys(_copys)
            }
            setLoadingCopys(false)
        }catch(err){
            setLoadingCopys(false)
            console.log('falhafaturar', err)
            toast.error(`Falha ao resgatar as suas copys.`)
        }
        //console.log(new_transaction)
    }

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
                                                {listCopys.length||`0`}
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
                        <h2 className="w-full text-left font-semibold mb-3">Minhas Últimas Copys</h2>
                        {loadingCopys && <Loader />}
                        {listCopys.length<=0 && <div className="text-center text-sm flex flex-col justify-center items-center py-5 gap-2">
                            <Bot size={48} />
                            <p className="text-gray-400 font-medium select-none px-12">Não perca tempo, coloque os seus créditos e comece a usufruir do que a inteligência artificial pode te trazer.</p>
                        </div>}
                        {listCopys.length && <div className="text-left text-sm flex flex-col justify-center items-center py-0 gap-2">
                            <table className="table w-full text-sm">
                                <thead>
                                    <tr className="text-xs text-gray-400 uppercase">
                                        <th className="py-2">Prompt</th>
                                        <th className="py-2">Resultado</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {listCopys.filter((filt, key)=> key<=9).map((hist)=> <tr className="hover:bg-gray-200 text-gray-900 transition duration-300 ease-in-out">
                                        <td className="p-2">{hist?.command.substring(0,50)}...</td>
                                        <td className="p-2">{hist?.result.substring(0,45)}...</td>
                                        <td className="p-2">
                                            <button onClick={()=> {
                                                setDetailed(hist)
                                                setSeeDetail(true)
                                            }}><Info size={14} /></button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>}
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
            <Drawer visible={seeDetail} onHide={()=> {
                setSeeDetail(false)
                setDetailed({})
            }}>
                <h5 className="inline-flex gap-2 items-center mb-5 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <Info size={16} />
                    Detalhes da Copy #{detailed?.id}
                </h5>
                <button onClick={()=> setSeeDetail(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Fechar</span>
                </button>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    {detailed?.prompt !== 'Criar uma copy de vendas de 2 a 3 parágrafos, de forma objetiva e descritiva, baseado em-' && <><strong>Prompt:</strong> {detailed?.prompt}<br/><br/></>}
                    <strong>Descritivo:</strong> {detailed?.command}<br/><br/>
                    <strong>Resultado:</strong> {detailed?.result}<br/><br/>
                    <strong>Tokens:</strong> <span className="font-semibold text-red-600">{detailed?.discounted}</span>
                </p>
                {/*<div className="grid grid-cols-2 gap-4">
                    <a href="#" className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                </div>*/}
            </Drawer>
        </LayoutDash>

    </>)
}

export default AppPage