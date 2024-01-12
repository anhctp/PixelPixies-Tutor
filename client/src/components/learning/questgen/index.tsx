"use client";
import { useState } from "react";
import QuestgenSendText from "./sendText";
import QuestgenSendFile from "./sendFile";
import {
  QuestLevel,
  QuestType,
  levelQuestion,
  typeQuestion,
} from "@/services/learning/learningHelper";

const Questgen = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTypeQuest, setSelectedTypeQuest] = useState<string>(
    QuestType.MCQ
  );
  const [selectedLevelQuest, setSelectedLevelQuest] = useState<string>(
    QuestLevel.EASY
  );
  const [numQuest, setNumQuest] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const nextStep = () => {
    if (step === 1 && !selectedOption) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setNumQuest(0);
      setError(null);
      return;
    }

    if (!/^\d+$/.test(inputValue)) {
      setError("Please enter a valid number.");
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue >= 25) {
        setError("Number must be less than 25.");
      } else {
        setError(null);
        setNumQuest(+inputValue);
      }
    }
  };
  const submitForm = () => {
    if (!error) {
      if (selectedOption === "text") {
        console.log(text);
        console.log("Form submitted");
      } else {
        console.log(file);
        console.log("Form submitted");
      }
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full flex flex-col items-center gap-4">
            <label className="block text-sm font-medium text-gray-900">
              Select type input:
            </label>
            <div className="flex flex-col">
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="text"
                  checked={selectedOption === "text"}
                  onChange={handleRadioChange}
                />
                <span className="ml-2">Text</span>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="File"
                  checked={selectedOption === "File"}
                  onChange={handleRadioChange}
                />
                <span className="ml-2">File</span>
              </div>
            </div>
            <button
              className=" w-full flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="h-full">
            {selectedOption === "text" ? (
              <QuestgenSendText text={text} setText={setText} />
            ) : (
              <QuestgenSendFile file={file} setFile={setFile} />
            )}
            <div className="w-full flex justify-between pb-8">
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label htmlFor="type">Question Type</label>
                <select
                  name="type"
                  className="border rounded-full border-pink-1 text-pink-1 px-2"
                  onChange={(e) => {
                    setSelectedTypeQuest(e.target.value);
                  }}
                >
                  {typeQuestion.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label htmlFor="level">Question Level</label>
                <select
                  name="level"
                  className="border rounded-full border-pink-1 text-pink-1 px-2"
                  onChange={(e) => {
                    setSelectedLevelQuest(e.target.value);
                  }}
                >
                  {levelQuestion.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label>Question Count</label>
                <input
                  type="text"
                  value={numQuest}
                  onChange={handleInputChange}
                  className={`w-20 rounded-full border border-pink-1 px-2 ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                onClick={prevStep}
              >
                Previous
              </button>
              <button
                className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="font-bold">
        High-Quality Real-Time Streaming Quiz - Generate MCQs, True or False,
        Fill-in-the-blanks, FAQs, etc using AI
      </div>
      {renderStepContent()}
    </div>
  );
};
export default Questgen;
