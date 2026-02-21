import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

const histories = {}

export  function getSessionHistory(sessionId = Math.random().toString(36).substring(2, 15)) {
  if (!histories[sessionId]) {
    histories[sessionId] = new InMemoryChatMessageHistory();
  }
  return histories[sessionId];
}