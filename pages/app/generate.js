import { useRef, useState } from "react"
import LayoutDash from "../../components/LayoutDash"
import { toast } from "react-hot-toast"
import { useAuth } from "../../context/auth"
import { Bot, Copy } from "lucide-react"

const GeneratePage = () => {

    const inputRef = useRef()
    const { updateBalance, user } = useAuth()
    const [isGenerating, setIsGenerating] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [apiOutput, setApiOutput] = useState('')

    const callGenerateEndpoint = async () => {
      if(!user){
        toast.error(`Sessão expirada, faça login e tente novamente!`, { style: { background: '#222', color: '#fff', fontSize: '.9em' } })
      }else if(user?.balance <= 0){
        toast.error(`Compre créditos e crie suas copys à vontade!`, { style: { background: '#222', color: '#fff', fontSize: '.9em' } })
      }else{
        if(userInput.trim().length === 0){
          toast.error(`Descreva de forma curta e objetiva seu produto e características na caixa de texto...`, { style: { background: '#222', color: '#fff', fontSize: '.9em' } })
          inputRef.current?.focus()
          return 
        }
        setIsGenerating(true);
  
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput: userInput.trim() }),
        })
  
        const data = await response.json()
        const { output, usage } = data
  
        // set apiOutput 
        // desconta os tokens = usage.completion_tokens
        setApiOutput(`${output.text}`)
        setIsGenerating(false)
        
        discountBalance(usage.completion_tokens, output.text, usage.completion_tokens)
        setTimeout(()=>{
          toast.success(`Sua copy foi gerada com sucesso! Somente ${usage.completion_tokens} créditos foram descontados.`, { style: { background: '#222', color: '#fff', fontSize: '.9em' } })
        }, 500)
      }
    }

    const discountBalance = async(tokens_to_discount, result_output, completion_tokens) => {
      const discount_balance = user?.balance-parseInt(tokens_to_discount)
      updateBalance(discount_balance, user?.id, userInput, result_output, completion_tokens)
    }

    const copyToClipboard = () => {
      navigator.clipboard.writeText(apiOutput)
      toast.success(`O texto gerado foi copiado para o seu CTRL+V`, { style: { background: '#222', color: '#fff', fontSize: '.9em' } })
    }

    return (<>
        <LayoutDash>
            <div className="w-full flex flex-col text-left">
                <h2 className="mb-5 font-semibold text-xl">Gerador de Copys</h2>
            </div>
            <div className="w-full flex justify-between items-start gap-4">
                <div className="w-full">
                    <h5 className="font-semibold">
                        Descreva de forma curta e objetiva seu produto e características...
                    </h5>
                    <textarea ref={inputRef} className="w-full my-2 p-3 text-sm border-2 rounded-md focus:border-[#26FF7C] outline-none transition duration-300 ease-in-out" onChange={(e)=> setUserInput(e?.target?.value)} rows={6} placeholder="ex.: O produto x é indicado para uso nos seguintes casos, produzido com os ingredientes x, y e z e para quem deseja tal resultado."></textarea>
                    <strong className="font-medium select-none">{userInput.length||0}/250</strong>
                    <button onClick={callGenerateEndpoint} className="w-full p-2 select-none border-2 rounded-md px-4 text-sm bg-[#26FF7C] hover:border-[#129c49] transition duration-300 ease-in-out">Gerar Copy</button>
                </div>
                <div className="w-full flex flex-col">
                    {apiOutput && <>
                        <div className="border bg-white rounded-md border-[#26FF7C] shadow-lg p-5 m-3 mb-1 text-md text-gray-700">
                            <p>{apiOutput}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400 ml-3 select-none cursor-not-allowed hover:text-gray-600">
                                compartilhar via whatsapp 
                            </div>
                            <button onClick={()=> copyToClipboard()} className="flex justify-center select-none items-center gap-1 m-3 bg-[#26FF7C] hover:bg-[#129c49] hover:text-white rounded-md p-2 px-4 font-medium transition duration-300 ease-in-out">
                                <Copy size={16} /> Copiar
                            </button>
                        </div>
                    </>}
                    {!apiOutput && <>
                        <div className="text-sm h-full px-24 text-gray-500 text-center flex flex-col gap-3 justify-center items-center">
                            <Bot size={72} className="text-gray-400" />
                            <p>Utilize o campo de texto ao lado para descrever da melhor forma o seu produto/serviço.</p>
                            <p>Você poderá acessar o seu histórico futuramente.</p>
                        </div>
                    </>}
                </div>
            </div>
        </LayoutDash>
    </>)
}

export default GeneratePage