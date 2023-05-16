import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (<>
        <div className="bg-[#252525] text-white bg-center w-full py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col gap-10 text-center justify-between items-center">
                <div>
                    <ul className="text-center gap-5 justify-center items-center flex md:py-0">
                        <li><Link href="#" className="text-white no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Sobre</Link></li>
                        <li><Link href="#" className="text-white no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Como Funciona</Link></li>
                        <li><Link href="#" className="text-white no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Planos</Link></li>
                        <li><Link href="#" className="text-white no-underline hover:border-b-2 hover:border-[#26FF7C] p-2 px-3 rounded-xs text-sm transition duration-300 ease-in-out">Contato</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="flex justify-between items-center p-1 rounded-md text-gray-400">
                        <p>Todos os Direitos Reservados - CopyOnline.com.br<br/>Uma solução West Side Co.{/*<br/>CNPJ 00.00000.00-00/00*/}</p>
                    </div>
                </div>
                <Image src={`/assets/copy-online-logo-footer.svg`} width={423/2} height={40/2} alt={`copy online logo`} className="select-none" />
            </div>
        </div>
    </>)
}

export default Footer