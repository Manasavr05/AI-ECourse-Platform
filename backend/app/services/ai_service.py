import json
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_course(text):

    prompt = f"""
You are an expert online course creator.

Convert the following PDF into a complete e-learning course.

Return ONLY valid JSON.

The JSON format MUST be:

{{
    "title": "",

    "objectives": [
        "",
        "",
        ""
    ],

    "modules": [
        {{
            "title": "",
            "summary": "",
            "content": "",
            "key_points": [
                "",
                "",
                ""
            ]
        }}
    ],

    "quiz": [
        {{
            "question": "",
            "options": [
                "",
                "",
                "",
                ""
            ],
            "correct_answer": "",
            "explanation": ""
        }}
    ]
}}

Instructions:

1. Create 5-8 learning modules.

2. Every module must include:

- title
- summary (2-3 lines)
- content (300-500 words)
- key_points (3-6 points)

3. Create exactly 5 MCQ questions.

For every question:

- Provide exactly 4 options.
- Only ONE option should be correct.
- The correct answer must exactly match one option.
- Provide a short explanation.

4. Rewrite the PDF into an easy-to-understand online course.

5. Include examples wherever appropriate.

PDF:

{text[:6000]}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)