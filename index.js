import * as dotenv from "dotenv";
import fastify from "fastify";
import { ChatGPTAPI } from "chatgpt";

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = fastify();

app.post("/ask", async (req, res) => {
  const { text, conversationId, parentMessageId } = req.body;

  // Use conversation_id if provided, otherwise use default conversation
  let result;
  if (conversationId && parentMessageId) {
    result = await api.sendMessage(text, {
      conversationId,
      parentMessageId,
    });
  } else {
    result = await api.sendMessage(text);
  }

  res.send(result);
});

const port = process.env.PORT || 3000;

app.listen({ host: "0.0.0.0", port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`API listening on port ${port}`);
});
