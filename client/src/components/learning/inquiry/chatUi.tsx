import { IChatGPTPayload, Message } from "@/services/learning/learningHelper";
import React, { FormEvent, useEffect, useState } from "react";

export const ChatUI = () => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const promptChatGPT = async (payload: IChatGPTPayload) => {
    setIsLoading(true);
    setResponse("let me think...");
    const response: Response = await fetch(
      "http://127.0.0.1:8000/api/openai/gpt",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let completeResponse = "";

    while (true) {
      const { value, done: doneReading } = await reader.read();
      if (doneReading) break;

      const chunkValue = decoder.decode(value);
      completeResponse += chunkValue;

      setResponse(completeResponse);
    }

    setIsLoading(false);
  };

  const addMessage = (content: string, sender: "user" | "bot") => {
    const newMessages = [
      ...messages,
      { id: messages?.length + 1, content, sender },
    ];
    setMessages(newMessages);
    setNewMessage("");
  };
  const handleUserMessage = () => {
    if (newMessage.trim() !== "") {
      if (isLoading) return;
      promptChatGPT({ prompt: newMessage });
      addMessage(newMessage, "user");
    }
  };
  useEffect(() => {
    if (!isLoading) {
      console.log(response);
      addMessage(response, "bot");
    }
  }, [isLoading]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-2 ${
              message.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex">
          <input
            type="message"
            className="flex-1 p-2 mr-2 border rounded"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
            onClick={handleUserMessage}
          >
            {isLoading ? "⏳" : "🚀"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
