"use client";
import { WORDLIMIT } from "@/services/learning/learningHelper";
import React, { ChangeEvent, useState } from "react";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const QuestgenSendText: React.FC<Props> = (props) => {
  const { text, setText } = props;
  const [isExceedingLimit, setIsExceedingLimit] = useState<boolean>(false);
  const [isExceedingLimitCharacter, setIsExceedingLimitCharacter] =
    useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim().split(/\s+/).length <= WORDLIMIT) {
      setIsExceedingLimit(false);
      if (e.target.value.length < WORDLIMIT * 100) setText(e.target.value);
      else setIsExceedingLimitCharacter(true);
    } else {
      setIsExceedingLimit(true);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <textarea
        placeholder="Content of your document."
        value={text}
        onChange={handleChange}
        className="h-1/2 border"
        id="content"
      ></textarea>
      <div
        className={
          isExceedingLimit || isExceedingLimitCharacter
            ? "text-rose-700"
            : "text-[#2885fd]"
        }
      >
        {isExceedingLimitCharacter && !isExceedingLimit && (
          <p>
            Characters limit exceeded! Maximum {WORDLIMIT * 100} characters
            allowed.
          </p>
        )}
        {isExceedingLimit && (
          <p>Word limit exceeded! Maximum {WORDLIMIT} words allowed.</p>
        )}
        {!isExceedingLimit && !isExceedingLimitCharacter && (
          <p>Remaining Words: {WORDLIMIT - text.trim().split(/\s+/).length}</p>
        )}
      </div>
      <label className="text-sm text-gray-500 pb-2" htmlFor="content">
        Supports all major languages.
      </label>
    </div>
  );
};
export default QuestgenSendText;
