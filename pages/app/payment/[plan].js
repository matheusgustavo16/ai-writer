import Image from "next/image"
import LayoutDash from "../../../components/LayoutDash"
import Head from "next/head"
import { fetchDataFromApi, updateDataFromApi } from "../../../utils/api"
import { useAuth } from "../../../context/auth"
import { useEffect, useState } from "react"
import Modal from "../../../components/Modal"
import { Copy, X } from "lucide-react"
import { Loader } from "../../../components/Loader"
import axios from 'axios'
import QRCode from "react-qr-code"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"

import Lottie from "react-lottie";
import animationData from "../../../animations/gopay-succesfull-payment.json";


const mercadoPago = axios.create({
    baseURL: "https://api.mercadopago.com"
})

mercadoPago.interceptors.request.use(async config => {
    const token = `APP_USR-1058676353811580-022215-eb9126afb5028e3916701443d38391e6-1315873054`
    config.headers.Authorization = `Bearer ${token}`
    return config
});

const PaymentPage = ({ plan: plan_data }) => {

    const router = useRouter()
    const { isAuthenticated, user, getFreshBalance } = useAuth()

    const [validCpf, setValidCpf] = useState(false)
    const [modalPix, setModalPix] = useState(false)
    const [document, setDocument] = useState('')

    useEffect(()=>{
        if(!isAuthenticated){
            router.push(`/`)
        }
    }, [isAuthenticated])
    
    const handlePayment = async() => {
        setModalPix(true)
    }

    const formatDocument = (doc) => {
        const cpf = doc.replace(/[^\d]/g, "")
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }

    const validarCPF = (cpf) => {
        if (typeof cpf !== "string") return false
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" 
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(9, 10)) ) return false
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false
        return true        
    }

    useEffect(()=>{
        if(document!==''){
            if(validarCPF(document)){
                setValidCpf(true)
            }else{
                setValidCpf(false)
            }
        }else{
            setValidCpf(false)
        }
    }, [document])

    /* PIX MERCADO PAGO */

    const [loading, setLoading] = useState(true)
    const [idPix, setIdPix] = useState(null)
    const [codigoPix, setCodigoPix] = useState(null)
    const [statusPix, setStatusPix] = useState(false)
    const [phrase, setPhrase] = useState(0)

    const phrases = [
        'conectando com a instituição de pagamento...',
        'recuperando dados do qr code...',
        'retornando qr code para pagamento...'
    ]

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
        if(modalPix){
            if(!codigoPix){
                generatePix()
                const inter = setInterval(()=>{
                    setPhrase(phrase+1)
                }, 2000)
                phrase>=2 && clearInterval(inter)
            }
        }else{
            setPhrase(0)
        }
    }, [modalPix, codigoPix, phrase])

    useEffect(()=>{
        if(codigoPix && idPix){
          if(!statusPix){
            let i=0
            setInterval(() => {
              i++;
              checkPixStatus(idPix)
              //checkFakePixStatus()
            }, 10000)
          }else{
            // pix approved
            // registra a fatura
            // fatureTransaction()
            setTimeout(()=> {
                // ARRUMA UM JEITO DE ATUALIZAR MAIS BONITINHOOOO
                getFreshBalance()
                setIdPix(null)
                setCodigoPix(null)
                setModalPix(false)
                router.push(`/app/obrigado`)
            }, 3000)
          }
        }
    }, [codigoPix,idPix,statusPix])

    const fatureTransaction = async(statusTransaction) => {
        try{
            const new_transaction = await updateDataFromApi(`new_transaction`, {
                id_user: user?.id,
                plan: plan_data?.id,
                amount: plan_data?.amount,
                idPix: idPix||`0ds4d8sa1c24c156c8978d9sa0`,
                statusPix: statusTransaction&&`PAID`||`UNPAID`,
                document: document||`000.000.000-00`
            })
            if(new_transaction){
                setStatusPix(true)
            }
        }catch(err){
            console.log('falhafaturar', err)
            toast.error(`Falha ao faturar o seu pedido, qualquer duvida, entre em contato com o suporte.`)
        }
        //console.log(new_transaction)
    }

    const checkPixStatus = async(id_transaction) => {
        if(codigoPix && idPix){
            mercadoPago
            .get(`v1/payments/${id_transaction}`)
            .then(response => {
                console.log('checkPixStatus_', response)
                if (response.data.status === "approved") {
                    setStatusPix(true)
                    fatureTransaction(response.data.status)
                }
            })
        }
    }

    const generatePix = async() => {
        setLoading(true)
        await sleep(3000)
        if(plan_data){
            mercadoPago.post("v1/payments", {
                "transaction_amount": plan_data && plan_data?.amount,
                "description": `CopyOnline | Plano ${plan_data?.name} | ${plan_data?.tokens}`,
                "payment_method_id": "pix",
                "payer": {
                "email": user?.email,
                "first_name": user?.name.split(' ')[0],
                "last_name": user?.name.split(' ')[1],
                "identification": {
                    "type": "CPF",
                    "number": ""
                }
                },
                "notification_url": "https://api.copyonline.com.br/callback_pix"
            }).then(response => {
                console.log('mercadoopago_pedido', response)
                setCodigoPix(response.data.point_of_interaction.transaction_data.qr_code)
                setIdPix(response.data.id)
                setLoading(false)
            }).catch(err => {
                console.log('mercadoopago_errorrr', err)
            })
        }
    }

    const copyToClipboard = () => {
      navigator.clipboard.writeText(codigoPix)
      toast.success(`O texto gerado foi copiado para o seu CTRL+V`)
    }
    
    return (<>
        <Head>
            <title>Adicionar Créditos | Pagamento</title>
        </Head>
        <LayoutDash>
            {!user && <Loader />}
            {plan_data?.id===4 && user && <div className="bg-orange-100 mx-24 border-l-4 text-sm border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-semibold">Atenção!</p>
                <p>O plano selecionado está em modo beta, disponível apenas para alguns usuários.</p>
                <p>Entre em contato caso queira fazer parte do nosso time de testes.</p>
            </div>}
            {user && <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 ">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Adquirir Créditos</p>
                    <p className="text-gray-400">Confirme o seu plano e finalize o pagamento.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <div className="flex w-full flex-col px-4 py-4"> 
                                <span className="font-semibold">Plano {plan_data?.name}</span>
                                <span className="float-right text-gray-400">{plan_data?.tokens} Tokens</span>
                                <p className="text-lg font-bold">R$ {parseFloat(plan_data?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    </div>
                    <Image src={`/assets/logo-pix.png`} width={80} height={40} alt="logo pix" className="m-auto mt-3 grayscale" />
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Dados de Faturamento</p>
                    <p className="text-gray-400">Complete o seu pedido enviando os dados de cobrança.</p>
                    <div className="">
                        <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <div className="relative">
                            <input disabled type="text" id="email" name="email" value={user?.email||''} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="seuemail@email.com" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            </div>
                        </div>
                        <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">CPF</label>
                        <div className="relative">
                            <input type="text" name="document" maxLength={14} value={document} onChange={(e)=> setDocument(formatDocument(e?.target?.value))}
                                className={`w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 ${validCpf ? `focus:border-green-500 focus:ring-green-500 border-green-500` : `focus:border-red-500 focus:ring-red-500`} transition duration-300 ease-in-out`} placeholder="000.000.000-00" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6 border-t py-3">
                            <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="font-semibold text-gray-900">R$ {parseFloat(plan_data?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Desconto</p>
                            <p className="font-semibold text-gray-900">R$0.00</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">R$ {parseFloat(plan_data?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                    <button disabled={!validCpf||plan_data?.id===4} onClick={()=> handlePayment()} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">Pagar Fatura</button>
                </div>
            </div>}
            <Modal visible={modalPix} onHide={()=> setModalPix(false)} lock={true}>
                <div className="w-full flex justify-between items-center">
                    <div className="">
                        <Image src={`/assets/copy-online-logo.svg`} width={423/4} height={40/4} alt={`copy online logo`} className="select-none" />
                    </div>
                    <div className="">
                        <button onClick={()=> setModalPix(false)} className="opacity-50 hover:opacity-100 transition duration-300 ease-in-out"><X /></button>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between items-center mt-7">
                    {loading && <div className="mb-5 text-center flex flex-col gap-4 select-none justify-center items-center">
                        <Loader mini />
                        <small className="text-xs text-gray-600">{phrases[phrase]}</small>
                    </div>}
                    {codigoPix && !statusPix && !loading && <div className="flex flex-col justify-center items-center">
                        <div className="bg-gray-100 rounded-md p-4 mb-4"><QRCode size={250} value={codigoPix} /></div>
                        <div className="flex justify-between items-center">
                            <input disabled className="w-full pr-3 text-xs text-gray-400" readOnly value={codigoPix} />
                            <button onClick={()=> copyToClipboard()} className="flex justify-center items-center gap-1 hover:bg-green-400 p-1 px-3 text-xs rounded-md"><Copy size={13} /> Copiar</button>
                        </div>
                    </div>}
                    {codigoPix && statusPix && !loading && <div className="flex flex-col justify-center items-center">
                        <div className="-ml-1">
                            <Lottie options={{
                                loop: false,
                                autoplay: true,
                                animationData: animationData,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }} speed={.95} isClickToPauseDisabled height={200} width={200} />
                        </div>
                    </div>}
                </div>
            </Modal>
        </LayoutDash>
    </>)
}

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(context) {
    const plan = await fetchDataFromApi(`get_plan/${context.params.plan}`)
    //console.log('planos', plan)

    if (!plan?.id) {
        return {
            redirect: {
              destination: '/app/wallet',
              permanent: false,
            },
        } 
    }

    return {
        props: {
            plan
        }
    }
}

export default PaymentPage