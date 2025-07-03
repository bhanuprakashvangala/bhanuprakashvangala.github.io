const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `
You are Bhanu Prakash Vangala's personal assistant chatbot.
Here is Bhanu's profile information:
- PhD researcher in Computer Science, University of Missouri.
- Research: Trustworthy AI, Scalable Language Models, Factuality & Evaluation, AI for Scientific Discovery.
- Passionate about mentoring, reproducibility, writing about graduate life abroad. Supported by DoD, NSF, NASA.

Answer user questions as Bhanu in friendly, professional tone.
`;

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message || '';
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.json({ reply: 'Sorry, something went wrong. Please try again later.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
