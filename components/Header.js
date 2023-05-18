import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/auth';
import Modal from './Modal';
import { X } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from './Loader';

const Header = () => {

    const router = useRouter()
    const { isAuthenticated, loading, magicAuth } = useAuth()
    const [modalLogin, setModalLogin] = useState(false)
    const [email, setEmail] = useState('')

    useEffect(()=> {
        if(modalLogin && isAuthenticated){
            setModalLogin(false)
            setEmail('')
            router.push(`/app`)
        }
    }, [isAuthenticated])

    const handleScroll = (e) => {
        e.preventDefault();
        const href = e.currentTarget.href;
        const targetId = href.replace(/.*\#/, "");
        // get the element by id and use scrollIntoView
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
          behavior: "smooth",
        });
    };

    return (<>
        <div className="w-full bg-white py-4">
            <div className="grid md:grid-cols-3 xs:grid-rows-3 md:max-w-7xl m-auto items-center md:justify-between sm:justify-center">
                <div className="flex justify-center sm:justify-start">
                    <Link href={`/`}><Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none" /></Link>
                </div>
                <ul className="text-center justify-center items-center flex md:py-0">
                    <li><Link href="#about" onClick={handleScroll} className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Sobre</Link></li>
                    <li><Link href="#applications" onClick={handleScroll} className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Aplicações</Link></li>
                    <li><Link href="#free-test" onClick={handleScroll} className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Teste Grátis</Link></li>
                    <li><Link href="#plans" onClick={handleScroll} className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Planos</Link></li>
                </ul>
                <div className="flex justify-center md:justify-end gap-3">
                    {!isAuthenticated && loading && <Loader mini />}
                    {!isAuthenticated && !loading && <>
                        <button onClick={()=> setModalLogin(true)} className="p-2 border-2 border-black rounded-md px-4 text-sm hover:bg-[#26FF7C] hover:border-[#129c49] transition duration-300 ease-in-out">
                            {!loading && `Iniciar Sessão`}
                        </button>
                    </>}
                    {isAuthenticated && <Link href="/app" className="p-2 border-2 rounded-md px-4 text-sm bg-[#26FF7C] border-[#129c49] transition duration-300 ease-in-out">Dashboard</Link>}
                </div>
            </div>
        </div>
        
        <Modal visible={modalLogin} onHide={()=> setModalLogin(false)}>
            <div className="w-full flex justify-between items-center">
                <div className="">
                    <Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none" />
                </div>
                <div className="">
                    <button onClick={()=> setModalLogin(false)} className="opacity-50 hover:opacity-100 transition duration-300 ease-in-out"><X /></button>
                </div>
            </div>
            <div className="w-full flex flex-col justify-between items-center mt-10">
                <h3 className="font-semibold text-gray-700 text-lg">Bem-Vindo(a)</h3>
                <p className="text-xs text-gray-500 mb-5 px-12 text-center">Você só precisar informar o seu melhor e-mail, e confirmar o código recebido.</p>
                <input disabled={loading} type="email" name="copyonline_email" onChange={(e)=> setEmail(e?.target?.value)} placeholder="Seu melhor e-mail" className="outline-none mb-2 w-full border-2 p-3 rounded-lg text-md focus:border-green-300 disabled:cursor-not-allowed transition duration-300 ease-in-out" />
                <button disabled={loading} onClick={()=> magicAuth(email)} className="w-full flex justify-center items-center gap-2 p-2 border-2 rounded-lg px-4 text-sm bg-[#26FF7C] hover:border-[#129c49] hover:bg-[#129c49] hover:text-white disabled:cursor-not-allowed transition duration-300 ease-in-out">
                    Entrar
                    {loading && <div role="status">
                        <svg aria-hidden="true" class="w-4 h-4 text-white text-opacity-75 animate-spin dark:text-gray-600 fill-green-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>}
                </button>
            </div>
        </Modal>
    </>) 
}

export default Header