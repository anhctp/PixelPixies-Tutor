def extract_mcq(question_list):
    questions = []

    current_question = {}

    for item in question_list.split("\n"):
        if "Easy question" in item:
            current_question["difficulty"] = "easy"
        elif "Medium question" in item:
            current_question["difficulty"] = "medium"
        elif "Difficult question" in item:
            current_question["difficulty"] = "hard"
        elif ": " in item:
            key, value = item.split(": ", 1)
            if key == "Question":
                current_question["question"] = value
                current_question["options"] = []
                current_question["true_option"] = []
            elif key.startswith("Option"):
                current_question["options"].append(value)
            elif key == "True option":
                current_question["true_option"].append(value)

                # When we have collected all information for the current question, add it to the list
                questions.append(current_question)
                current_question = {}

    return questions


def extract_tfq(question_list):
    question_list = question_list.strip().split("\n")
    questions = {"easy": [], "medium": [], "hard": []}
    current_difficulty = None
    current_question = {}

    for line in question_list:
        if line.startswith("Easy question"):
            current_difficulty = "easy"
            current_question = {}
        elif line.startswith("Medium question"):
            current_difficulty = "medium"
            current_question = {}
        elif line.startswith("Difficult question"):
            current_difficulty = "hard"
            current_question = {}
        elif line.startswith("Statement:"):
            current_question["question"] = line[len("Statement: ") :]
        elif line.startswith("Answer:"):
            current_question["answer"] = line[len("Answer: ") :]
        elif line.startswith("Explanation:"):
            current_question["explanation"] = line[len("Explanation: ") :]
            questions[current_difficulty].append(current_question)
    lists = []
    lists.extend(questions["easy"])
    lists.extend(questions["medium"])
    lists.extend(questions["hard"])
    return lists
