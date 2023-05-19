import { useEffect, useRef, useState } from "react"
import LayoutDash from "../../components/LayoutDash"
import { toast } from "react-hot-toast"
import { useAuth } from "../../context/auth"
import { Bot, Copy } from "lucide-react"
import { Loader } from "../../components/Loader"
import Head from "next/head"
import GPT3Tokenizer from 'gpt3-tokenizer';
import { updateDataFromApi } from "../../utils/api"
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

const GeneratePage = () => {

    const inputRef = useRef()
    const { user, getFreshBalance } = useAuth()
    const [isGenerating, setIsGenerating] = useState(false)

    const [userInput, setUserInput] = useState('')
    const [apiOutput, setApiOutput] = useState('')
    const [usageTokens, setUsageTokens] = useState(0)

    const basePromptPrefix = "Criar uma copy de vendas de 2 a 3 parágrafos, de forma objetiva e descritiva, baseado em-";
    const _tokenizer = apiOutput ? (tokenizer.encode(`${basePromptPrefix}${userInput}`).bpe.length+tokenizer.encode(`${apiOutput}`).bpe.length)*3 : 0;

    const callGenerateEndpoint = async () => {
      if(!user){
        toast.error(`Sessão expirada, faça login e tente novamente!`)
      }else if(user?.balance <= 0){
        toast.error(`Compre créditos e crie suas copys à vontade!`)
      }else{
        if(userInput.trim().length === 0){
          toast.error(`Descreva de forma curta e objetiva seu produto e características na caixa de texto...`)
          inputRef.current?.focus()
          return 
        }

        //setUsageTokens('0')
        setIsGenerating(true)
  
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_user: user?.id, userInput: userInput.trim() }),
        })
  
        const data = await response.json()
        const { output, usage } = data
  
        // set apiOutput 
        // desconta os tokens = usage.completion_tokens
        setApiOutput(`${output.text}`)
        setUsageTokens(parseFloat(usage?.completion_tokens)||0)
        setIsGenerating(false)
        getFreshBalance()
        
        setTimeout(()=>{
          toast.success(`Sua copy foi gerada com sucesso! Somente ${usage.completion_tokens} créditos foram descontados.`)
        }, 500)
      }
    }

    const generateCopy = async(e) => {
      if(!user){
        toast.error(`Sessão expirada, faça login e tente novamente!`)
      }else if(user?.balance <= 0){
        toast.error(`Compre créditos e crie suas copys à vontade!`)
      }else{
        if(userInput.trim().length === 0){
          toast.error(`Descreva de forma curta e objetiva seu produto e características na caixa de texto...`)
          inputRef.current?.focus()
          return 
        }
        e.preventDefault();
        setUsageTokens(0);
        setApiOutput("");
        setIsGenerating(true);
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: user?.id,
            content: `${basePromptPrefix}${userInput}`,
            prompt: basePromptPrefix,
            command: userInput
          }),
        });
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
          return;
        }
    
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setApiOutput((prev) => prev + chunkValue);
        }

        getFreshBalance()
        setUsageTokens(_tokenizer||0)
        setIsGenerating(false);
      }
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(apiOutput)
      toast.success(`O texto gerado foi copiado para o seu CTRL+V`)
    }

    return (<>
        <Head>
          <title>Gerador de Copys | Copy Online</title>
        </Head>
        <LayoutDash>
            <div className="w-full flex flex-col text-left">
                <h2 className="mb-5 font-semibold text-xl">Gerador de Copys</h2>
            </div>
            <div className="w-full flex justify-between items-start gap-4">
                <div className="w-full">
                    <h5 className="font-medium">
                        Descreva de forma curta e objetiva seu produto e características...
                    </h5>
                    <textarea ref={inputRef} className="w-full my-2 p-3 text-sm border-2 rounded-md focus:border-[#26FF7C] outline-none transition duration-300 ease-in-out" onChange={(e)=> setUserInput(e?.target?.value)} rows={6} placeholder="ex.: O produto x é indicado para uso nos seguintes casos, produzido com os ingredientes x, y e z e para quem deseja tal resultado."></textarea>
                    <div className="font-medium flex justify-between items-center select-none text-xs text-gray-500">
                      <span>{userInput.length||0}/250</span>
                      <span>{tokenizer.encode(`${userInput}`) ? (tokenizer.encode(`${basePromptPrefix}`).bpe.length+tokenizer.encode(`${userInput}`).bpe.length) : 0}</span>
                    </div>
                    <button disabled={isGenerating} onClick={generateCopy} className="w-full p-2 flex justify-center items-center gap-3 select-none border-2 rounded-md px-4 text-sm bg-[#26FF7C] hover:border-[#129c49] disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out">
                      {isGenerating && <Loader mini />} {!isGenerating ? `Gerar Copy` : `Gerando Copy... Aguarde...`}
                    </button>
                </div>
                <div className="w-full flex flex-col">
                    {apiOutput && apiOutput
                      .split("2.")
                      .map((generatedCopy) => {
                        return (<>
                          <div className="border bg-white rounded-md border-[#26FF7C] shadow-lg p-5 m-3 mb-1 text-md text-gray-700">
                              <p>{generatedCopy}</p>
                          </div>
                          <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-400 ml-3 select-none cursor-not-allowed hover:text-gray-600">
                                  {usageTokens||0} tokens foram utilizados
                              </div>
                              <button onClick={()=> copyToClipboard()} className="flex justify-center select-none items-center gap-1 m-3 bg-[#26FF7C] hover:bg-[#129c49] hover:text-white rounded-md p-2 px-4 font-medium transition duration-300 ease-in-out">
                                  <Copy size={16} /> Copiar
                              </button>
                          </div>
                        </>);
                    })}
                    {/*apiOutput && !isGenerating && <>
                        <div className="border bg-white rounded-md border-[#26FF7C] shadow-lg p-5 m-3 mb-1 text-md text-gray-700">
                            <p>{apiOutput}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400 ml-3 select-none cursor-not-allowed hover:text-gray-600">
                                {usageTokens} tokens foram utilizados
                            </div>
                            <button onClick={()=> copyToClipboard()} className="flex justify-center select-none items-center gap-1 m-3 bg-[#26FF7C] hover:bg-[#129c49] hover:text-white rounded-md p-2 px-4 font-medium transition duration-300 ease-in-out">
                                <Copy size={16} /> Copiar
                            </button>
                        </div>
                    </>*/}
                    {!apiOutput && !isGenerating && <>
                        <div className="text-sm h-full px-24 text-gray-500 text-center flex flex-col gap-3 justify-center items-center">
                            <Bot size={72} className="text-gray-400" />
                            <p>Utilize o campo de texto ao lado para descrever da melhor forma o seu produto/serviço.</p>
                            <p>Você poderá acessar o seu histórico futuramente.</p>
                        </div>
                    </>}
                    {isGenerating && <>
                        <div className="text-sm h-full px-24 text-gray-500 text-center flex flex-col gap-3 justify-center items-center">
                            <Bot size={72} className="text-gray-400" />
                            <p className="mb-5">iniciando a conversa com o nosso bot...</p>
                            <Loader mini />
                        </div>
                    </>}
                </div>
            </div>
        </LayoutDash>
    </>)
}

export default GeneratePage