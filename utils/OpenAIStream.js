import { createParser } from "eventsource-parser";
import GPT3Tokenizer from 'gpt3-tokenizer';
import { updateDataFromApi } from "./api";

export async function OpenAIStream(payload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

    let counter = 0;
    let output = '';

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload?.openai),
    });

    const discountBalance = async(output) => {
        if(payload?.openai?.messages[0]?.content && output!==""){
            const payloadBalance = {
                payload: {
                    text: payload?.openai?.messages[0]?.content,
                    tokens: tokenizer.encode(`${payload?.openai?.messages[0]?.content}`).bpe.length
                },
                output: {
                    text: output,
                    tokens: tokenizer.encode(`${output}`).bpe.length
                }
            }
            const totalTokens = (payloadBalance?.payload?.tokens+payloadBalance?.output?.tokens)
            await updateDataFromApi(`discount_tokens`, {
                id_user: payload?.copyai?.id_user,
                tokens: totalTokens,
                prompt: payload?.copyai?.prompt,
                command: payload?.copyai?.command,
                result: output
            })
            //console.log('discountBalance', payloadBalance)
        }
    }

    const stream = new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event) {
                if (event.type === "event") {
                    const data = event.data;
                    //console.log('event.data', event.data)
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta?.content || "";
                        output += text
                        if(!json.choices[0].delta?.content){
                            discountBalance(output)
                        }
                        if (counter < 1 && (text.match(/\n/) || []).length) {
                            // this is a prefix character (i.e., "\n\n"), do nothing
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        // maybe parse error
                        controller.error(e);
                    }
                }
            }
            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of res.body) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}