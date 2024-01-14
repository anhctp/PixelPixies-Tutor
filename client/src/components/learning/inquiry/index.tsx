"use client";
import { useState } from "react";
import QuestgenSendText from "../questgen/sendText";
import QuestgenSendFile from "../questgen/sendFile";
import { ChatUI } from "./chatUi";
import {
  chatConversation,
  createChatWithFile,
  createChatWithText,
} from "@/services/learning/learningApi";

const Inquiry = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [idConversation, setIdConversation] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleUploadText = async () => {
    if (text) {
      setIsLoading(true);
      await createChatWithText(text)
        .then((value) => {
          setIdConversation(value.data.id);
          setIsLoading(false);
          setStep(step + 1);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  const handleUploadFile = async () => {
    if (file) {
      setIsLoading(true);
      await createChatWithFile(file)
        .then((value) => {
          setIdConversation(value.data.id);
          setIsLoading(false);
          setStep(step + 1);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const uploadDoc = () => {
    if (selectedOption === "text") {
      handleUploadText();
    } else {
      handleUploadFile;
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
          <div className="w-full h-full">
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
              {isLoading ? (
                <div className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold">
                  {"⏳"}
                </div>
              ) : (
                <button
                  className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                  onClick={uploadDoc}
                >
                  Upload documents
                </button>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="h-full">
            <ChatUI id={idConversation} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col  items-center gap-8 px-8">
      <h1 className="text-3xl font-bold">Documentation inquiry</h1>
      <div className="text-sm text-gray-500 italic">
        {`Empower your quest for knowledge on our website where you ask about docs based on your input, creating a tailored learning experience just for you.`}
      </div>
      {renderStepContent()}
    </div>
  );
};
export default Inquiry;
