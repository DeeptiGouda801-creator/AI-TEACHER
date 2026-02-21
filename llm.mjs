import { config } from "dotenv";
config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getSessionHistory } from "./memory.mjs";

const llm = new ChatOpenAI({
    temperature: 0.9,
    modelName: "gpt-4o-mini",
    openAIApiKey: process.env.OPENAI_API_KEY
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a coding teacher . Answer only coding  related questions. Explain concepts line by line clearly."],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"]
]);



const chain = prompt.pipe(llm).pipe(new StringOutputParser());

export const chatChain = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: getSessionHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history"

})