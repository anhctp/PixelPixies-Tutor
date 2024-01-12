"use client";
import { useState } from "react";
import QuestgenSendText from "../questgen/sendText";
import QuestgenSendFile from "../questgen/sendFile";
import { ChatUI } from "./chatUi";

const Inquiry = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

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

  const uploadDoc = () => {
    if (selectedOption === "text") {
      console.log(text);
      console.log("Form submitted");
    } else {
      console.log(file);
      console.log("Form submitted");
    }
    setStep(step + 1);
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
            <div className="flex gap-2">
              <button
                className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                onClick={prevStep}
              >
                Previous
              </button>
              <button
                className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                onClick={uploadDoc}
              >
                Upload documents
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="h-full">
            <ChatUI />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 px-8">
      <div className="font-bold text-center">
        {`Empower your quest for knowledge on our website where you ask about docs based on your input, creating a tailored learning experience just for you.`}
      </div>
      {renderStepContent()}
    </div>
  );
};
export default Inquiry;
