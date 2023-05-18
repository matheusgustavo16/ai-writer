import Image from "next/image"
import Link from "next/link"
import { useAuth } from "../../context/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Toaster, toast } from "react-hot-toast"
import Head from "next/head"
import { Loader } from "../../components/Loader"

const LoginPage = () => {

    const router = useRouter()
    const { isAuthenticated, magicAuth, user, login, loading, setLoading } = useAuth()

    const [formLogin, setFormLogin] = useState({
        email: '',
        senha: ''
    })

    const handleLogin = async() => {
        magicAuth(formLogin?.email)
        setFormLogin({
            ...formLogin,
            email: '',
            senha: ''
        })
    }

    const handleLoginBckp = async() => {
        setLoading(true)
        const resp_login = await login(formLogin?.email, formLogin?.senha)
        if(!resp_login){
            toast.error('⚠️ Email e/ou Senha Incorretos.')
            setLoading(false)
        }else{
            setFormLogin({
                ...formLogin,
                email: '',
                senha: ''
            })
        }
    }

    useEffect(()=>{
        if(isAuthenticated){
            router.push(`/app`)
        }
    }, [isAuthenticated])
    
    return (<>
        <Head>
            <title>Autenticando | Copy Online</title>
        </Head>
        <Loader />
        {/*!loading && <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm m-auto mt-24 flex flex-col justify-between items-center gap-1">
            <Link href={`/`}><Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none mt-2 mb-4" /></Link>
            <h1 className="font-semibold mt-5">Já tenha uma conta</h1>
            <p className="text-center text-xs mb-5 text-gray-600">Caso ainda não tenha, <Link href={`/app/register`} className="underline hover:font-bold">clique aqui</Link> e cadastre-se</p>
            <input disabled={loading} type="email" name="email" onChange={(e)=> setFormLogin({ ...formLogin, email: e?.target?.value })} placeholder="E-mail" className="w-full disabled:opacity-25 border-2 rounded-md p-2 text-sm outline-none focus:border-gray-400 transition duration-300 ease-in-out" />
            <button disabled={loading} onClick={()=> handleLogin()} className="w-full flex justify-center items-center gap-2 p-2 border-2 rounded-md px-4 text-sm bg-[#26FF7C] hover:border-[#129c49] disabled:cursor-not-allowed transition duration-300 ease-in-out">
                Entrar
                {loading && <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-white text-opacity-75 animate-spin dark:text-gray-600 fill-green-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>}
            </button>
        </div>*/}
        <Toaster position="top-right" />
    </>)
}

export default LoginPage