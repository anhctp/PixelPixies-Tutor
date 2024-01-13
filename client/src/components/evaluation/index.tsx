"use client";
import {
  fileEvaluation,
  textEvaluation,
} from "@/services/evaluation/evaluationApi";
import { EvaluationResponse } from "@/services/evaluation/evaluationHelper";
import { useState } from "react";

const Evaluation = () => {
  const [question, setQuestion] = useState<string>("");
  const [markingCriteria, setMarkingCriteria] = useState<string>(" ");
  const [file, setFile] = useState<File>();
  const [context, setContext] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const [response, setResponse] = useState<EvaluationResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const markingFile = async () => {
    setIsLoading(true);
    if (file) {
      await fileEvaluation({
        file: file,
        question: question,
        markingCriteria: markingCriteria,
      })
        .then((value) => {
          setResponse(value.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  const markingText = async () => {
    setIsLoading(true);
    if (context) {
      await textEvaluation({
        context: context,
        question: question,
        markingCriteria: markingCriteria,
      })
        .then((value) => {
          setResponse(value.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
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
    setResponse(undefined);
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

    if (context) {
      markingText();
    } else {
      markingFile();
    }
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
        {response && !isLoading && (
          <div className="w-full flex flex-col gap-4 font-xl text-[#3ddabe]">
            <div className="text-pink-1">Score: {response.score}/10</div>
            <div>Comment: {response.comment}</div>
            <div>Advice: {response.advice}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
