import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/auth';

const Header = () => {
    const { isAuthenticated } = useAuth()
    return (<>
        <div className="w-full bg-white py-4">
            <div className="grid md:grid-cols-3 xs:grid-rows-3 md:max-w-7xl m-auto items-center md:justify-between sm:justify-center">
                <div className="flex justify-center sm:justify-start">
                    <Link href={`#`}><Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none" /></Link>
                </div>
                <ul className="text-center justify-center items-center flex md:py-0">
                    <li><Link href="#" className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Sobre</Link></li>
                    <li><Link href="#" className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Como Funciona</Link></li>
                    <li><Link href="#" className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Planos</Link></li>
                    <li><Link href="#" className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Contato</Link></li>
                </ul>
                <div className="flex justify-center md:justify-end gap-3">
                    {!isAuthenticated && <>
                        <Link href="/app/register" className="text-black no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 rounded-xs text-sm transition duration-300 ease-in-out">cadastre-se</Link>
                        <Link href="/app/login" className="p-2 border-2 border-black rounded-md px-4 text-sm hover:bg-[#26FF7C] hover:border-[#129c49] transition duration-300 ease-in-out">Login</Link>
                    </>}
                    {isAuthenticated && <Link href="/app" className="p-2 border-2 rounded-md px-4 text-sm bg-[#26FF7C] border-[#129c49] transition duration-300 ease-in-out">Dashboard</Link>}
                </div>
            </div>
        </div>
    </>) 
}

export default Header