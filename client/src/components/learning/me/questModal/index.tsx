import { useState } from "react";

const QuestModal = () => {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const correctAnswers = {
    q1: "paris",
    q2: "false",
    q3: "tokyo",
  };

  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setShowCorrectAnswers(true);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Question 1 (Multiple Choice)
          </h2>
          <label className="block">
            What is the capital of France?
            <div className="mt-2">
              <input
                type="radio"
                name="q1"
                value="paris"
                checked={answers.q1 === "paris"}
                onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
              />
              <span className="ml-2">Paris</span>
            </div>
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Question 2 (True/False)
          </h2>
          <label className="block">
            The Earth is flat.
            <div className="mt-2">
              <input
                type="radio"
                name="q2"
                value="true"
                checked={answers.q2 === "true"}
                onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
              />
              <span className="ml-2">True</span>
            </div>
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Question 3 (Fill in the Blank)
          </h2>
          <label className="block">
            The capital of Japan is
            <input
              type="text"
              name="q3"
              value={answers.q3}
              onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}
              className="border border-gray-300 px-2 py-1 mt-2"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {showCorrectAnswers && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Correct Answers</h2>
          <p>1. What is the capital of France? - Paris</p>
          <p>2. The Earth is flat. - False</p>
          <p>3. The capital of Japan is - Tokyo</p>
        </div>
      )}
    </div>
  );
};
export default QuestModal;
