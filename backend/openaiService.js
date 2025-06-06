const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function processMessages(messages) {
  const results = [];
  for (const msg of messages) {
    const prompt = `Extract action items, important info, and deadlines from the message.`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `${prompt}\n${msg.body.content}` }]
    });
    const text = completion.data.choices[0].message.content;
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { info: text };
    }
    results.push({ ...data, from: msg.from?.user?.displayName, timestamp: msg.createdDateTime });
  }
  return results;
}

module.exports = { processMessages };
