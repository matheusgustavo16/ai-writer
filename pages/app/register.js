import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Register = () => {
    return (<>
        <Head>
            <title>Cadastro | Copy Online</title>
        </Head>
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm m-auto mt-24 flex flex-col justify-between items-center gap-1">
            <Link href={`/`}><Image src={`/assets/copy-online-logo.svg`} width={423/3} height={40/3} alt={`copy online logo`} className="select-none mt-2 mb-4" /></Link>
            <h1 className="font-semibold mt-5">Criar nova conta</h1>
            <p className="text-center text-xs mb-5 text-gray-600">Caso já tenha uma, <Link href={`/app/login`} className="underline hover:font-bold">clique aqui</Link> e faça login</p>
            <input type="email" placeholder="E-mail" className="w-full border-2 rounded-md p-2 text-sm outline-none focus:border-gray-400 transition duration-300 ease-in-out" />
            <button disabled className="w-full p-2 border-2 rounded-md px-4 text-sm disabled:opacity-25 disabled:cursor-not-allowed bg-[#26FF7C] hover:border-[#129c49] transition duration-300 ease-in-out">Cadastrar</button>
        </div>
    </>)
}

export default Register