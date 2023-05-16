import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/auth';

const HeaderApp = () => {
    const { isAuthenticated, user } = useAuth()
    return (<>
        <div className="w-full bg-white py-4">
            <div className="grid md:grid-cols-2 xs:grid-rows-2 md:max-w-7xl m-auto items-center md:justify-between sm:justify-center">
                <div className="flex justify-center sm:justify-start">
                    <Link href={`#`}><Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none" /></Link>
                </div>
                {isAuthenticated && <div className="flex justify-center md:justify-end gap-3">
                    <Link href="/app" className="p-2 border-2 rounded-md px-4 text-sm bg-[#26FF7C] border-[#129c49] transition duration-300 ease-in-out">Dashboard</Link>
                </div>}
            </div>
        </div>
    </>) 
}

export default HeaderApp