import { Telegraf } from 'telegraf';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const bot = new Telegraf(env.BOT_TOKEN);

    // Basic /start command
    bot.start((ctx) => ctx.reply('Hello! I am your Telegram bot powered by Telegraf on Cloudflare Workers. 🚀'));

    // Echo handler
    bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

    try {
      const body = await request.json();
      await bot.handleUpdate(body);
      return new Response('OK');
    } catch (err) {
      console.error(err);
      return new Response('Error', { status: 500 });
    }
  }
};
