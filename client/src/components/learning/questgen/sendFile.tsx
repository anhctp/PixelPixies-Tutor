"use client";
import { ChangeEvent } from "react";
interface Props {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const QuestgenSendFile: React.FC<Props> = (props) => {
  const { file, setFile } = props;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile!);
  };
  return (
    <>
      <div className="col-span-10 p-8 text-pink">
        <label className="block mb-2 text-sm font-medium" htmlFor="file_input">
          Upload file
        </label>
        <input
          className="block w-full text-white text-sm cursor-pointer bg-pink focus:outline-none"
          id="file_input"
          type="file"
          onChange={handleFileUpload}
        />
        <p className="mt-1 text-sm text-gray-500" id="file_input_help">
          .txt, .pdf
        </p>
        <label className="text-gray-500">Supports all major languages.</label>
      </div>
    </>
  );
};
export default QuestgenSendFile;
