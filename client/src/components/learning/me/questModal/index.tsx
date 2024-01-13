import { useState } from "react";
import Mcq from "./mcq";
import { QuestLevel } from "@/services/learning/learningHelper";
import { ScoreModal } from "./scoreModal";
import Tf from "./tf";

interface Props {
  setOpenQuestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestModal: React.FC<Props> = (props) => {
  const { setOpenQuestModal } = props;
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [point, setPoint] = useState<number>(0);

  const handleSubmit = () => {
    setShowCorrectAnswers(true);
    setOpenScoreModal(true);
  };

  return (
    <div className="w-full">
      <Mcq
        id={1}
        level={QuestLevel.EASY}
        question="quest"
        answers={["ans1", "ans2", "ans3", "ans4"]}
        true_answer="ans1"
        showAnswer={showCorrectAnswers}
        setPoint={setPoint}
      />
      <Mcq
        id={2}
        level={QuestLevel.MEDIUM}
        question="quest"
        answers={["ans1", "ans2", "ans3", "ans4"]}
        true_answer="ans1"
        showAnswer={showCorrectAnswers}
        setPoint={setPoint}
      />
      <Tf
        id={3}
        level={QuestLevel.HARD}
        question="questme"
        true_answer="True"
        showAnswer={showCorrectAnswers}
        setPoint={setPoint}
      />
      <Tf
        id={4}
        level={QuestLevel.HARD}
        question="quest"
        true_answer="True"
        showAnswer={showCorrectAnswers}
        setPoint={setPoint}
      />
      <div className="flex justify-center items-center">
        {showCorrectAnswers ? (
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="text-3xl text-pink-1">
              Score: {point}/{2}{" "}
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
          total={2}
        />
      )}
    </div>
  );
};
export default QuestModal;
