import { TableLearning } from "@/components/table";
import { data, headers } from "@/services/learning/learningHelper";

const MyLearning = () => {
  return (
    <div className="w-screen h-full flex flex-col items-center p-10 gap-4">
      <h1 className="text-3xl font-bold">My learning</h1>
      <TableLearning headers={headers} data={data} rowsPerPage={5} />
    </div>
  );
};
export default MyLearning;
