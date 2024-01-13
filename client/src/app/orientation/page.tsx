"use client";
import Roadmap from "@/components/roadmap";
import {
  example,
  roadmapItems,
} from "@/services/orientation/orientationHelper";
import { useState } from "react";

export default function Home() {
  const [subject, setSubject] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<roadmapItems[]>([]);
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setSubject("");
      setError("Field cannot be empty.");
      return;
    }
    setError("");
    setSubject(inputValue);
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setTime("");
      setError("Field cannot be empty.");
      return;
    }
    if (!/^\d+$/.test(inputValue)) {
      setError("Please enter a valid number.");
      return;
    }
    setError("");
    setTime(inputValue);
  };
  const handleSearch = () => {
    if (time === "" || subject === "") {
      setError("Field cannot be empty.");
      return;
    }
    setData(example);
    console.log("submitted!");
  };
  return (
    <div className="w-screen h-full flex flex-col items-center p-10">
      <h1 className="text-pink text-3xl font-bold">Roadmap</h1>
      <div className="w-full flex justify-between pb-8">
        <div className="flex text-[#2885fd]">
          <label className="w-full">I want to learn:</label>
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            className={`w-full rounded-full border border-[#2885fd] px-2 ${
              error ? "border-red-500" : ""
            }`}
          />
        </div>{" "}
        <div className="flex text-[#2885fd]">
          <label className="w-full">In time:</label>
          <input
            type="text"
            value={time}
            onChange={handleTimeChange}
            className={`w-full rounded-full border border-[#2885fd] px-2 ${
              error ? "border-red-500" : ""
            }`}
          />
          {" months"}
        </div>{" "}
      </div>
      <button
        className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
        onClick={handleSearch}
      >
        Submit
      </button>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {data.length !== 0 && <Roadmap data={data} />}
    </div>
  );
}
