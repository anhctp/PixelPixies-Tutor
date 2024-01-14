import {
  chatConversation,
  getChatConversationById,
} from "@/services/learning/learningApi";
import { IChatGPTPayload, Message } from "@/services/learning/learningHelper";
import React, { FormEvent, useEffect, useState } from "react";
interface Props {
  id: number | undefined;
}

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const ChatUI: React.FC<Props> = (props) => {
  const { id } = props;
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const handleGetChat = async () => {
    setIsLoading(true);
    if (id) {
      const payload = {
        conversation_id: id,
        user_input: newMessage,
      };
      const response: Response = await fetch(
        "http://127.0.0.1:8000/conversation/chat",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    }
  };
  const handleUserMessage = () => {
    if (newMessage.trim() !== "") {
      if (isLoading) return;
      handleGetChat();
      setNewMessage("");
    }
  };
  const getMessage = async () => {
    if (id)
      await getChatConversationById(id)
        .then((value) => setMessages(value.data))
        .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!isLoading) {
      getMessage();
    }
  }, [isLoading]);
  useEffect(() => {
    getMessage();
  }, []);
  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full flex-1 overflow-y-auto p-4">
        {messages.map(
          (message, index) =>
            index > 1 && (
              <div
                key={index}
                className={`w-full mb-4 p-2 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
            )
        )}
        {isLoading && (
          <div className={`w-full mb-4 p-2 bg-gray-200`}>{response}</div>
        )}
      </div>
      <div className="w-full p-4 border-t border-gray-300">
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
