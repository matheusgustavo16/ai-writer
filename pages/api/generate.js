import { Configuration, OpenAIApi } from "openai";
import { updateDataFromApi } from "../../utils/api";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Criar uma copy de vendas de 2 a 3 parágrafos, de forma objetiva e descritiva, baseado em-";
export default async function (req, res) {
  /*res.status(200).json({ 
    output: {
      text: `${basePromptPrefix}-Resultadoo da copy gerada pelo aiii-${req.body.userInput}`
    },
    usage: {
      prompt_tokens: 0, completion_tokens: 198, total_tokens: 0
    }
  })*/
  /* DO THE REQ ON THE OPENAI-API */
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 350,
  }, {
    timeout: 120000
  })
  .catch((Err)=> {
    res.status(500).json({ error: Err })
  })
  //console.log('baseCompletionaaa', baseCompletion.data)
  const basePromptOutput = baseCompletion.data.choices.pop()
  // desconta os tokens
  if(baseCompletion.data.usage?.completion_tokens){
    await updateDataFromApi(`discount_tokens`, {
      id_user: req.body?.id_user,
      tokens: baseCompletion.data.usage?.completion_tokens,
      prompt: basePromptPrefix,
      command: req.body.userInput,
      result: basePromptOutput?.text
    })
  }
  res.status(200).json({ output: basePromptOutput, usage: baseCompletion.data.usage, discount: discount })
}
