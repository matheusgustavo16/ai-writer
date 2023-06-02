import { Bot, Coins, LogOut, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { Toaster } from "react-hot-toast"
import { Loader } from "./Loader"

const LayoutDash = ({ children }) => {

    const router = useRouter()
    const { loading, user, magicLogout } = useAuth()

    const [open, setOpen] = useState(false)
    const [openUser, setOpenUser] = useState(false)

    return (<>
        
        {openUser && <div onClick={()=> setOpenUser(!openUser)} className="fixed z-40 bg-black w-full h-screen opacity-50 transition-transform">&nbsp;</div>}
        <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${!openUser && `translate-x-full`} bg-white w-80 dark:bg-gray-800 pt-20`}>
            
            <div class="p-3">
                <div class="flex items-center justify-between mb-2">
                    <Image width={10} height={10} class="w-10 h-10 rounded-full" src="/assets/no-photo.png" alt={user?.nome} />
                    <div>
                        <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none">Editar Perfil</button>
                    </div>
                </div>
                <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                    {user?.nome}
                </p>
                <p class="mb-3 text-sm font-normal text-gray-400 select-none">
                    {user?.email}
                </p>
                <ul class="flex text-sm mt-5">
                    <li class="mr-2">
                        <a href="#" class="hover:underline">
                            <span class="font-semibold text-gray-900 dark:text-white mr-1">0</span>
                            <span>Copys</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">
                            <span class="font-semibold text-gray-900 dark:text-white mr-1">0</span>
                            <span>Prompts</span>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
        
        <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={()=> setOpen(!open)} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/app" className="flex ml-2 md:mr-24">
                            <Image src="/assets/copy-online-logo.svg" width={140} height={45} className="h-8 mr-3 block dark:hidden" alt="Copy Online Logo" />
                            <Image src="/assets/copy-online-logo-white.svg" width={140} height={45} className="h-8 mr-3 hidden dark:block" alt="Copy Online Logo" />
                        </a>
                    </div>
                    <div className="flex items-center">
                        {!loading && <div className="flex items-center ml-3">
                            <div className="flex gap-3 items-center">
                                <Link href={`/app/wallet`} className="flex items-center group gap-1 font-bold text-green-500 hover:bg-[#26FF7C] hover:text-black transition duration-300 ease-in-out p-1 px-2 rounded-md">
                                    <Wallet size={16} className="text-black dark:text-white group-hover:dark:text-black transition duration-300 ease-in-out" />
                                    {parseFloat(user?.balance)||`...`}
                                </Link>
                                <button onClick={()=> setOpenUser(!openUser)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <span className="sr-only">Open user menu</span>
                                    <Image className="w-8 h-8 rounded-full" width={8} height={8} src="/assets/no-photo.png" alt="user photo" />
                                </button>
                            </div>
                        </div>}
                        {loading && <Loader mini />}
                    </div>
                </div>
            </div>
        </nav>

        {open && <div onClick={()=> setOpen(!open)} className="fixed z-30 bg-black w-full h-screen opacity-50">&nbsp;</div>}
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform ${!open && `-translate-x-full`} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            {!loading && <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/app/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/generate" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Bot className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Gerador</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/prompts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Prompts</span>
                            <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-green-800 bg-green-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/copys" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Copys</span>
                            {/*<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{user?.historico?.length}{user?.historico?.length>=10&&`+`}</span>*/}
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/wallet" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Wallet className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Créditos</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={()=> {
                            magicLogout()
                        }} className="flex items-center w-full text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <LogOut className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Deslogar</span>
                        </button>
                    </li>
                </ul>
            </div>}
            {loading && <Loader />}
        </aside>

        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-300 mt-14">
                {!loading && children}
                {loading && <Loader />}
            </div>
        </div>

        <Toaster position="top-right" />
    </>)
}

export default LayoutDash