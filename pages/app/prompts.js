import Head from "next/head"
import LayoutDash from "../../components/LayoutDash"

const PromptsPage = () => {
    return (<>
        <LayoutDash>
            <Head>
                <title>Prompts | Copy Online</title>
            </Head>
            <div className="w-full flex flex-col text-left">
                <h2 className="mb-5 font-semibold text-xl">Meus Prompts</h2>
            </div>
            <div className="w-full text-left grid grid-cols-3">
                {/*<button class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Prompt Test #1</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">prompt de testq euc riei.</p>
                </button>*/}
                <button disabled class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Criar Prompt</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Crie o seu próprio prompt de comandos para alcançar resultados ainda melhores em suas copys e textos diversos.</p>
                </button>
            </div>
        </LayoutDash>
    </>)
}

export default PromptsPage