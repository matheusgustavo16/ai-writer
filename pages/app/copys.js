import { ExternalLink, Info } from "lucide-react"
import LayoutDash from "../../components/LayoutDash"
import { useAuth } from "../../context/auth"

const CopysPage = () => {

    const { user } = useAuth()

    return (<>
        <LayoutDash>
            <div className="w-full flex flex-col text-left">
                <h2 className="mb-5 font-semibold text-xl">Minhas Copys</h2>
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
                        {user?.historico?.map((hist)=> <tr className="hover:bg-gray-200 text-gray-900 transition duration-300 ease-in-out">
                            <td className="py-2">{hist?.id}</td>
                            <td className="py-2">{new Date(hist?.dt_created).toLocaleString('pt-br')}</td>
                            <td className="py-2">{hist?.prompt.substring(0,50)}...</td>
                            <td className="py-2">{hist?.result.substring(0,45)}...</td>
                            <td className="text-red-600 py-2">-{hist?.discounted}</td>
                            <td className="py-2">
                                <button><Info size={14} /></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </LayoutDash>
    </>)
}

export default CopysPage