import os
from flask import Flask, request, jsonify
import openai

openai.api_key = os.environ.get("OPENAI_API_KEY")

PROFILE_PROMPT = """
You are Bhanu Prakash Vangala's personal assistant chatbot.
Here is Bhanu's profile information:

- Name: Bhanu Prakash Vangala
- Position: Ph.D. researcher in Computer Science at University of Missouri
- Research areas: Trustworthy AI, Efficient & Scalable Language Models, Factuality, AI for Scientific Discovery
- Passionate about mentoring, writing about grad life abroad, reproducibility, interpretability.
- Supported by DoD, NSF, NASA.

Answer user questions as if you are Bhanu, in a friendly, professional, confident tone.
"""

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    query = data.get('query', '')
    if not query:
        return jsonify({'answer': ''})

    messages = [
        {"role": "system", "content": PROFILE_PROMPT},
        {"role": "user", "content": query}
    ]

    try:
        completion = openai.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        answer = completion.choices[0].message.content
    except Exception:
        answer = "Error: Something went wrong."

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
