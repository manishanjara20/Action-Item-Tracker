const fetch = require('node-fetch');

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';

async function fetchMessages(token) {
  const headers = { Authorization: `Bearer ${token}` };
  const messages = [];
  try {
    const chatsRes = await fetch(`${GRAPH_BASE}/me/chats`, { headers });
    if (!chatsRes.ok) throw new Error('Graph error');
    const chats = await chatsRes.json();
    for (const chat of chats.value) {
      const chatMsgRes = await fetch(`${GRAPH_BASE}/chats/${chat.id}/messages`, { headers });
      if (chatMsgRes.ok) {
        const chatMsgs = await chatMsgRes.json();
        chatMsgs.value.forEach(m => messages.push({ ...m, source: 'chat', chatId: chat.id }));
      }
    }
    const teamsRes = await fetch(`${GRAPH_BASE}/me/joinedTeams`, { headers });
    if (teamsRes.ok) {
      const teams = await teamsRes.json();
      for (const team of teams.value) {
        const channelsRes = await fetch(`${GRAPH_BASE}/teams/${team.id}/channels`, { headers });
        if (channelsRes.ok) {
          const channels = await channelsRes.json();
          for (const channel of channels.value) {
            const msgsRes = await fetch(`${GRAPH_BASE}/teams/${team.id}/channels/${channel.id}/messages`, { headers });
            if (msgsRes.ok) {
              const msgs = await msgsRes.json();
              msgs.value.forEach(m => messages.push({ ...m, source: 'channel', teamId: team.id, channelId: channel.id }));
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
  return messages;
}

module.exports = { fetchMessages };
