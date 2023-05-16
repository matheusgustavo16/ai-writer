import { useRouter } from "next/router"
import Header from "../../components/Header"
import { useAuth } from "../../context/auth"
import { useEffect } from "react"
import HeaderApp from "../../components/HeaderApp"
import Image from "next/image"
import LayoutDash from "../../components/LayoutDash"

const AppPage = () => {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!isAuthenticated){
            router.push(`/app/login`)
        }
    }, [isAuthenticated])

    return (<>

        {!loading && <LayoutDash>
            <div className="flex items-center justify-center h-24 mb-4 rounded bg-gray-200 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">SEJA PREMIUM</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">carteira</p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">copys</p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">prompts</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">minhas copys</p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">meus prompts</p>
                </div>
            </div>
        </LayoutDash>}

    </>)
}

export default AppPage