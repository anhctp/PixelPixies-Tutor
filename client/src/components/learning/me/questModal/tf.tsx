import { QuestLevel } from "@/services/learning/learningHelper";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  level: QuestLevel | undefined;
  question: string;
  true_answer: string;
  showAnswer: boolean;
  setPoint: React.Dispatch<React.SetStateAction<number>> | undefined;
}

const Tf: React.FC<Props> = (props) => {
  const { id, level, question, true_answer, showAnswer, setPoint } = props;
  const [answerSelected, setAnswerSelected] = useState<string>();
  useEffect(() => {
    if (showAnswer && answerSelected === true_answer && setPoint) {
      setPoint((prev) => {
        return prev + 1;
      });
    }
  }, [showAnswer]);
  return (
    <div className="w-full flex flex-col items-start p-8 border-t gap-4">
      {level && (
        <div
          className={`font-semibold text-base ${
            level === QuestLevel.EASY && " text-[#2885fd]"
          }  ${level === QuestLevel.MEDIUM && " text-[#ffe03d]"}  ${
            level === QuestLevel.HARD && "text-pink-1"
          }`}
        >
          {level}
        </div>
      )}
      <div className="font-semibold text-3xl">{question}</div>
      <div className="flex flex-col text-xl pl-8">
        <div className="inline-flex items-center">
          <input
            type="radio"
            name={"answer" + id}
            value={"True"}
            checked={answerSelected === "True"}
            onChange={(e) => setAnswerSelected(e.target.value)}
          />
          <span
            className={`ml-2 ${
              showAnswer &&
              ("True" === true_answer
                ? "text-[#3ddabe]"
                : "True" === answerSelected && "text-red-500")
            }`}
          >
            True
          </span>
        </div>
        <div className="inline-flex items-center">
          <input
            type="radio"
            name={"answer" + id}
            value={"False"}
            checked={answerSelected === "False"}
            onChange={(e) => setAnswerSelected(e.target.value)}
          />
          <span
            className={`ml-2 ${
              showAnswer &&
              ("False" === true_answer
                ? "text-[#3ddabe]"
                : "False" === answerSelected && "text-red-500")
            }`}
          >
            False
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tf;
