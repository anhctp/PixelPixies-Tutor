"use client";
import { TableLearning } from "@/components/table";
import { getListQuest } from "@/services/learning/learningApi";
import { headers } from "@/services/learning/learningHelper";
import { useEffect, useState } from "react";

const MyLearning = () => {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    await getListQuest()
      .then((value) => setData(value.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen h-full flex flex-col items-center p-10 gap-4">
      <h1 className="text-3xl font-bold">My learning</h1>
      <TableLearning headers={headers} data={data} rowsPerPage={5} />
    </div>
  );
};
export default MyLearning;
