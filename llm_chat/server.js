const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
const HF_TOKEN = process.env.HF_TOKEN;

const systemPrompt = `
You are Bhanu Prakash Vangala's personal assistant chatbot.
Profile information:
- PhD researcher in Computer Science at University of Missouri.
- Research: Trustworthy AI, Scalable Language Models, Factuality & Evaluation, AI for Scientific Discovery.
- Passionate about mentoring, reproducibility, and graduate life abroad writing. Supported by DoD, NSF, NASA.

Answer as Bhanu in a friendly, professional, confident tone.
`;

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const prompt = `${systemPrompt}\n\nUser: ${userMessage}\nBhanu:`;

  const payload = {
    inputs: prompt,
    parameters: { max_new_tokens: 250, temperature: 0.7 }
  };

  try {
    const hfRes = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await hfRes.json();
    const text = data[0]?.generated_text || 'Sorry, no response generated.';
    const reply = text.split('Bhanu:')[1]?.trim() || text.trim();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: 'Sorry, something went wrong. Please try again later.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
