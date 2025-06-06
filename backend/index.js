const express = require('express');
const cors = require('cors');
const graphService = require('./graphService');
const openaiService = require('./openaiService');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scan', async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }
  try {
    const messages = await graphService.fetchMessages(token);
    const results = await openaiService.processMessages(messages);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
