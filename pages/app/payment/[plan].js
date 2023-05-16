import Image from "next/image"
import LayoutDash from "../../../components/LayoutDash"
import Head from "next/head"

const PaymentPage = () => {
    return (<>
        <Head>
            <title>Adicionar Créditos | Pagamento</title>
        </Head>
        <LayoutDash>
            <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 ">
                <div class="px-4 pt-8">
                    <p class="text-xl font-medium">Plano Alien</p>
                    <p class="text-gray-400">20.000 Tokens</p>
                    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                            <div class="flex w-full flex-col px-4 py-4">
                                <span class="font-semibold">Plano Alien</span>
                                <span class="float-right text-gray-400">20.000 Tokens</span>
                                <p class="text-lg font-bold">R$ 299,90</p>
                            </div>
                        </div>
                    </div>
                    <Image src={`/assets/logo-pix.png`} width={80} height={40} alt="logo pix" className="m-auto mt-3 grayscale" />
                </div>
                <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p class="text-xl font-medium">Dados de Faturamento</p>
                    <p class="text-gray-400">Complete o seu pedido enviando os dados de cobrança.</p>
                    <div class="">
                    <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
                    <div class="relative">
                        <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500" placeholder="seuemail@email.com" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        </div>
                    </div>
                    <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">CPF</label>
                    <div class="relative">
                        <input type="text" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500" placeholder="000.000.000-00" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                            </svg>
                        </div>
                    </div>

                    <div class="mt-6 border-t border-b py-2">
                        <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Subtotal</p>
                        <p class="font-semibold text-gray-900">R$299,90</p>
                        </div>
                        <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Desconto</p>
                        <p class="font-semibold text-gray-900">R$0.00</p>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Total</p>
                        <p class="text-2xl font-semibold text-gray-900">R$ 299,90</p>
                    </div>
                    </div>
                    <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Pagar Fatura</button>
                </div>
            </div>
        </LayoutDash>
    </>)
}

export default PaymentPage