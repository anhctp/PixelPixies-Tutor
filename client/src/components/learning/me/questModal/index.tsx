import { useEffect, useState } from "react";
import {
  McqObject,
  QuestLevel,
  TfObject,
} from "@/services/learning/learningHelper";
import { ScoreModal } from "./scoreModal";
import { getQuestByListId } from "@/services/learning/learningApi";
import Mcq from "./mcq";
import Tf from "./tf";

interface Props {
  questId: number;
  setOpenQuestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestModal: React.FC<Props> = (props) => {
  const { questId, setOpenQuestModal } = props;
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const [tf, setTf] = useState<TfObject[]>([]);
  const [mcq, setMcq] = useState<McqObject[]>([]);

  const getQuests = async () => {
    await getQuestByListId(questId)
      .then((value) => {
        setMcq(value.data.mcq);
        setTf(value.data.tf);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    setShowCorrectAnswers(true);
    setOpenScoreModal(true);
  };
  useEffect(() => {
    getQuests();
  }, [questId]);

  return (
    <div className="w-full">
      {mcq.map((item, index) => (
        <div key={index}>
          <Mcq
            id={item.id}
            level={undefined}
            question={item.question}
            answers={[item.opt1, item.opt2, item.opt3, item.opt4]}
            true_answer={item.true_opt}
            showAnswer={showCorrectAnswers}
            setPoint={setPoint}
          />
        </div>
      ))}
      {tf.map((item, index) => (
        <div key={index}>
          <Tf
            id={item.id}
            level={undefined}
            question={item.question}
            true_answer={item.answer}
            showAnswer={showCorrectAnswers}
            setPoint={setPoint}
          />
        </div>
      ))}

      <div className="flex justify-center items-center">
        {showCorrectAnswers ? (
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="text-3xl text-pink-1">
              Score: {point}/{mcq.length + tf.length}{" "}
            </div>
            <button
              onClick={() => setOpenQuestModal(false)}
              className="w-1/2 bg-pink rounded-lg py-2 text-white font-bold"
            >
              Back
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-1/2 bg-pink rounded-lg py-2 text-white font-bold"
          >
            Submit
          </button>
        )}
      </div>
      {openScoreModal && (
        <ScoreModal
          setOpenScoreModal={setOpenScoreModal}
          correct={point}
          total={mcq.length + tf.length}
        />
      )}
    </div>
  );
};
export default QuestModal;
