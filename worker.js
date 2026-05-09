export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const payload = await request.json();

      if (payload.message && payload.message.text) {
        const chatId = payload.message.chat.id;
        const text = payload.message.text;

        if (text === '/start') {
          return await sendMessage(chatId, 'Hello! I am your Telegram bot running on Cloudflare Workers. 🚀', env.BOT_TOKEN);
        } else {
          return await sendMessage(chatId, `You said: ${text}`, env.BOT_TOKEN);
        }
      }
    }
    return new Response('OK');
  }
};

async function sendMessage(chatId, text, botToken) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    })
  });
  return response;
}
