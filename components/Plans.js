import { Check, ChevronRight } from "lucide-react"
import Image from "next/image"


const planos = [
    {
      id: 1,
      name: `Starter`,
      tokens: 2000,
      amount: 9.9,
      desc: [
        `2000 Tokens`,
        `Aproximadamente 10 textos de copy`,
        `Pode recarregar quantas vezes quiser`,
        `Histórigo geral`,
      ]
    },{
      id: 2,
      name: `Medium`,
      tokens: 3000,
      amount: 18.9,
      desc: [
        `3000 Tokens`,
        `Aproximadamente 15 textos de copy`,
        `Pode recarregar quantas vezes quiser`,
        `Histórigo geral`,
      ]
    },{
      id: 3,
      name: `Monster`,
      tokens: 4000,
      amount: 49.9,
      desc: [
        `4000 Tokens`,
        `Aproximadamente 20 textos de copy`,
        `Pode recarregar quantas vezes quiser`,
        `Histórigo geral`,
      ]
    },{
      id: 4,
      name: `Alien`,
      tokens: 20000,
      amount: 299.9,
      desc: [
        `20000 Tokens`,
        `Aproximadamente 100 textos de copy`,
        `Pode recarregar quantas vezes quiser`,
        `Histórigo Geral`,
        `Aprimoramento de Copy`,
        `Gerar Mockup de Produto com IA (breve)`,
      ]
    },
]

const Plans = () => {
    return (<>
        <div className="w-full max-w-7xl my-24 m-auto text-center">
            <h1 className="w-full text-center text-5xl font-bold">Torne-se Premium</h1>
            <div className="max-w-lg text-gray-500 m-auto mt-2">
                Com menos de 10 reais por mês você consegue gerar aproximadamente 10 copys exclusivas e únicas.
            </div>
            <ul className="grid md:grid-cols-4 xs:grid-rows-4 gap-4 m-auto text-left items-center md:justify-between sm:justify-between mt-12">
                {planos.map((plan, i)=> <>
                    <li className="flex flex-col bg-white shadow-lg w-full border p-5 rounded-md">
                        <span className="uppercase font-semibold mb-12">{plan?.name}</span>
                        <span className="font-semibold text-3xl mb-10 flex items-center gap-1">
                            R$ {parseFloat(plan?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                            <small className="text-sm text-gray-500 font-semibold">/mês</small>
                        </span>
                        <span className="uppercase text-md text-gray-400 mb-2">pacote {plan?.name}</span>
                        <ul className="mb-5">
                            {plan?.desc.map((desc)=> <li className="flex gap-1 text-xs text-left items-center">
                                <Check size={16} color="#26FF7C" /> {desc}
                            </li>)}
                        </ul>
                        <button className="bg-[#26FF7C] hover:bg-[#129c49] hover:text-white rounded-md p-2 font-medium transition duration-300 ease-in-out">Contratar Plano</button>
                    </li>
                </>)}
            </ul>
        </div>
    </>)
}

export default Plans