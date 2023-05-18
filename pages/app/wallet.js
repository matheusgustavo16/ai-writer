import { Check } from "lucide-react"
import LayoutDash from "../../components/LayoutDash"
import { useRouter } from "next/router"
import { fetchDataFromApi } from "../../utils/api"
import Link from "next/link"

const _planos = [
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
        `CRIE SEUS PRÓPRIOS PROMPTS`,
      ]
    },
]

const WalletPage = ({ planos }) => {
  const router = useRouter()
  return (<>
      <LayoutDash>
          <div className="w-full flex flex-col text-left">
              <h2 className="font-semibold text-xl">Adicionar Créditos</h2>
          </div>
          <ul className="grid md:grid-cols-4 xs:grid-rows-4 gap-4 m-auto text-left items-center md:justify-between sm:justify-between">
              {planos.map((plan, i)=> <>
                  <li className="flex flex-col bg-white shadow-lg w-full border p-5 rounded-md">
                      <span className="uppercase font-semibold mb-12">{plan?.name}</span>
                      <span className="font-semibold text-3xl mb-10 flex items-center gap-1">
                          R$ {parseFloat(plan?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="uppercase text-md text-gray-400 mb-2">pacote {plan?.name}</span>
                      <ul className="mb-5">
                          {plan?.descr.split(',').map((desc)=> <li className="flex gap-1 text-xs text-left items-center">
                              <Check size={16} color="#26FF7C" /> {desc}
                          </li>)}
                      </ul>
                      <Link href={`/app/payment/${plan?.id}`} className="bg-[#26FF7C] flex justify-center items-center hover:bg-[#129c49] hover:text-white rounded-md p-2 font-medium transition duration-300 ease-in-out">Contratar Plano</Link>
                  </li>
              </>)}
          </ul>
      </LayoutDash>
  </>)
}

export async function getStaticProps(context) {
  const planos = await fetchDataFromApi(`get_plans`)
  //console.log('planos', planos)
  
  return {
      props: {
        planos
      }
  }
}


export default WalletPage