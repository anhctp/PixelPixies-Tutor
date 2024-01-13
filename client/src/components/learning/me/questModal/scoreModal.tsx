import React from "react";

interface Props {
  correct: number;
  total: number;
  setOpenScoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScoreModal: React.FC<Props> = (props) => {
  const { correct, total, setOpenScoreModal } = props;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray">
              <h3 className="text-3xl font-medium">Score</h3>
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setOpenScoreModal(false)}
              >
                ×
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col gap-3 text-xl">
              <div className="font-medium">
                {correct}/{total}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
