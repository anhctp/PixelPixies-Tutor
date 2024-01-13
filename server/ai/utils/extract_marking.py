import json


def extract_marking(marking_res):
# Split the input string into lines
    lines = marking_res.split('\n')

    # Extract score, comment, and advice
    score = float(lines[0].split(': ')[-1])
    comment = lines[1].split(': ')[-1]
    advice = lines[2].split(': ')[-1]

    # Create a dictionary
    result_dict = {
        "score": score,
        "comment": comment,
        "advice": advice
    }

    # Convert the dictionary to JSON
    # result_json = json.dumps(result_dict, indent=2)
    return result_dict