"use client";
import { IChatGPTPayload } from "@/services/learning/learningHelper";
import { useState } from "react";
import * as z from "zod";
const formSchema = z.object({
  question: z
    .string()
    .min(1, { message: "Question cannot be empty." })
    .max(10, { message: "Question cannot exceed 10 characters." }),
  answer: z
    .string()
    .max(50, { message: "Answer cannot exceed 50 characters." }),
  markingCriteria: z
    .string()
    .max(10, { message: "Marking criteria cannot exceed 10 characters." })
    .optional(),
});

const Evaluation = () => {
  const [question, setQuestion] = useState<string>("");
  const [markingCriteria, setMarkingCriteria] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [context, setContext] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleContextChange = (e: any) => {
    setContext(e.target.value);
  };
  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value);
  };
  const handleMarkingCriteriaChange = (e: any) => {
    setMarkingCriteria(e.target.value);
  };
  const onSubmit = () => {
    if ((!file && !context) || (file && context)) {
      setValidationError("Provide either a file or text content, not both.");
      return;
    }
    if (context.length > 300) {
      setValidationError("Answer cannot exceed 300 characters.");
      return;
    }
    if (question.length > 300) {
      setValidationError("Question cannot exceed 300 characters.");
      return;
    }
    if (markingCriteria.length > 300) {
      setValidationError("Marking Criteria cannot exceed 300 characters.");
      return;
    }
    if (question.length <= 0) {
      setValidationError("Question cannot be empty.");
      return;
    }
    setValidationError("");

    promptChatGPT({ prompt: question });
  };
  return (
    <div className="w-screen h-full flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold">Review and Evaluation</h1>
      <div className="text-sm text-gray-500 italic">
        {`Artificial intelligence assists in answering questions and
            evaluating user essays based on the given prompt and user's
            responses using natural language.`}
      </div>
      <div className="w-screen h-full flex flex-col items-center p-10 gap-4">
        <div className="w-full flex flex-col">
          <label htmlFor="question" className="font-light">
            Question:
          </label>
          <textarea
            className="border"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <div className="w-full h-1/2 flex flex-col">
          Answer:
          <div className="w-full h-full flex gap-2 pl-4">
            <div className="w-full flex flex-col">
              <label htmlFor="file">File Input:</label>
              <input type="file" id="file" onChange={handleFileChange} />
            </div>
            <div className="flex h-full items-center">OR</div>
            <div className="w-full flex flex-col">
              <label htmlFor="context" className="font-light">
                Context:
              </label>
              <textarea
                className="border h-full"
                value={context}
                onChange={handleContextChange}
              />
            </div>
          </div>{" "}
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="markingCriteria" className="font-light">
            Marking Criteria:
          </label>
          <textarea
            className="border"
            value={markingCriteria}
            onChange={handleMarkingCriteriaChange}
          />
        </div>
        <button
          className="w-full flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
          onClick={onSubmit}
        >
          {isLoading ? "⏳" : "Marking"}
        </button>
        {validationError && (
          <div className="text-rose-700">{validationError}</div>
        )}
        <div>{response}</div>
      </div>
    </div>
  );
};

export default Evaluation;
