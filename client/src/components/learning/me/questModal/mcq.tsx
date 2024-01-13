import { QuestLevel, QuestType } from "@/services/learning/learningHelper";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  level: string | undefined;
  question: string;
  answers: string[];
  true_answer: string;
  showAnswer: boolean;
  setPoint: React.Dispatch<React.SetStateAction<number>> | undefined;
}

const Mcq: React.FC<Props> = (props) => {
  const { id, level, question, answers, true_answer, showAnswer, setPoint } =
    props;
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
        {answers.map((value, index) => (
          <div key={index} className="inline-flex items-center">
            <input
              type="radio"
              name={"answer" + id}
              value={value}
              checked={answerSelected === value}
              onChange={(e) => setAnswerSelected(e.target.value)}
            />
            <span
              className={`ml-2 ${
                showAnswer &&
                (value === true_answer
                  ? "text-[#3ddabe]"
                  : value === answerSelected && "text-red-500")
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mcq;
