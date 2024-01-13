tfq_template = (
    """Create different true or false statements and their answers and their explanations with {easy_num} easy questions, {med_num} medium questions, {hard_num} difficult questions to help users learn about the document.
    All the statements need to be different.
    Translate all statements, answers and explantions into {language}.
    Please give the response strictly follow below format and don't add or change any character/word.
    Don't translate keywork 'Easy question', 'Statement', 'Answer', 'Explanantion'
    Desired format:
    Easy question: 
    Statement: ELECTRA is trained using a generator network to predict the original identities of corrupted tokens.
    Answer: False
    Explanation: The document states that ELECTRA trains a discriminative model that predicts whether each token in the corrupted input was replaced by a generator sample or not, not the original identities of the tokens.
    (all the easy question)
    ...
    Medium question:
    (all the medium question)
    ...
    Difficult question:
    (all the difficult question)
    ...
    ###
    """
)
mcq_template = (
    """You are a helpful assistant that create multiple choice questions and their answers with {easy_num} easy questions, {med_num} medium questions, {hard_num} difficult questions about the document.
    Translate all questions, options and true option into {language}.
    Please give the response strictly follow below format and don't add or change character/word.
    Don't translate keywork 'Easy question', 'Medium question', 'Difficult question', 'Question', 'Option', 'True option'
    ###
    Desired format:
    Easy question:
    Question: Who directed the Disney film Cinderella in 2015?
    Option: Branagh Kenneth
    Option: Walt Disney
    Option: Charles Perrault
    Option: Chris Weitz
    True option: Branagh Kenneth
    (all the easy question)
    ...
    Medium question:
    Question: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    True option: -||-
    (all the medium question)
    ...
    Difficult question:
    Question: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    True option: -||-
    (all the difficult question)
    ...
    ###
    """
)
fill_in_blank_template = (
    """Create fill in the blank questions and their answers with {easy_num} easy questions, {med_num} medium questions, {hard_num} difficult questions about the document.
    Please give the response strictly follow below format and don't add or change character/word.
    Translate all Question, Option and True option into {language}.
    Don't translate keywork 'Easy question', 'Question', 'Option', 'True option'
    All the question are fill in the blank questions
    ###
    Desired format:
    Easy question: 
    Question: OOPs stands for Object Oriented __________ C++. (question with blank)
    Option: Programming 
    Option: Polymorphism 
    Option: Inheritance
    Option: Abstraction
    True option: Programming
    (all the easy question)
    ...
    Medium question:
    Question: -||- (question with blank)
    Option: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    True option: -||-
    (all the medium fill in the blank questions)
    ...
    Difficult question:
    Question: -||- (question with blank)
    Option: -||-
    Option: -||-
    Option: -||-
    Option: -||-
    True option: -||-
    (all the difficult fill in the blank questions)
    ...
    ###
    """
)