import re
def extract_roadmap(input_text):
    steps = []

    current_step = {}

    for item in input_text.split("\n"):
        if item.startswith("Step"):
            if current_step:
                steps.append(current_step)
                current_step = {}
            current_step["step_number"] = int(re.search(r'\d+', item).group())
        elif ":" in item:
            key, value = item.split(":", 1)
            current_step[key.strip().lower()] = value.strip()

    if current_step:
        steps.append(current_step)

    return steps

# def extract_roadmap(input_text):
#     steps = []

#     current_step = {}

#     for item in input_text.split("\n"):
#         if "Step" in item:
#             if current_step:
#                 steps.append(current_step)
#                 current_step = {}
#             current_step["step"] = int(re.search(r'\d+', item).group())
#         elif "Resource name" or "resource name" in item:
#             key, value = item.split(": ", 1)
#             current_step["resource_name"] = value.strip()
#         elif "Resource link" or "resource link" in item:
#             key, value = item.split(": ", 1)
#             current_step["resource_link"] = value.strip()
#         elif "Task" or "task" in item:
#             key, value = item.split(": ", 1)
#             current_step["task"] = value.strip()
#         elif "Time" or "time" in item:
#             key, value = item.split(": ", 1)
#             current_step["time"] = value.strip()

#     if current_step:
#         steps.append(current_step)

#     return steps

