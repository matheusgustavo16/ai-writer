import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req) => {
  const { content, prompt, command, id_user } = await req.json();

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    copyai: {
      id_user,
      prompt,
      command
    },
    openai: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 50,
      stream: true,
      n: 1,
    }
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;