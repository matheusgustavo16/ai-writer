import { ExternalLink, Info } from "lucide-react"
import LayoutDash from "../../components/LayoutDash"
import { useAuth } from "../../context/auth"
import { fetchDataFromApi } from "../../utils/api"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../../components/Loader"
import Drawer from "../../components/Drawer"
import Head from "next/head"

const CopysPage = () => {

    const { loading, user, isAuthenticated } = useAuth()

    const [detailed, setDetailed] = useState({})
    const [seeDetail, setSeeDetail] = useState(false)
    const [loadingCopys, setLoadingCopys] = useState(true)
    const [list, setList] = useState([])

    useEffect(()=>{
        if(!loading && user){
            getCopys()
        }
    }, [loading, user])

    const getCopys = async() => {
        try{
            setLoadingCopys(true)
            const _copys = await fetchDataFromApi(`get_copys/${user?.id}`)
            if(_copys){
                setList(_copys)
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
        <LayoutDash>
            <Head>
                <title>Copys | Copy Online</title>
            </Head>
            <div className="w-full flex flex-col text-left">
                <h2 className="mb-5 font-semibold text-xl">Minhas Copys</h2>
                {loadingCopys && <Loader />}
                <table className="table w-full text-sm">
                    <thead>
                        <tr className="text-xs text-gray-400 uppercase">
                            <th>ID</th>
                            <th>Data</th>
                            <th>Prompt</th>
                            <th>Resultado</th>
                            <th>Custo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {list.map((hist)=> <tr className="hover:bg-gray-200 text-gray-900 transition duration-300 ease-in-out">
                            <td className="py-2">{hist?.id}</td>
                            <td className="py-2">{new Date(hist?.dt_created).toLocaleString('pt-br')}</td>
                            <td className="py-2">{hist?.command.substring(0,50)}...</td>
                            <td className="py-2">{hist?.result.substring(0,45)}...</td>
                            <td className="text-red-600 py-2">-{hist?.discounted}</td>
                            <td className="py-2">
                                <button onClick={()=> {
                                    setDetailed(hist)
                                    setSeeDetail(true)
                                }}><Info size={14} /></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
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

export default CopysPage