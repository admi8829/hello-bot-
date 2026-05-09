import React, { useState } from 'react';
import { 
  Bot, 
  Cloud, 
  Github, 
  Code2, 
  ChevronRight, 
  CheckCircle2, 
  Copy, 
  Terminal, 
  ExternalLink,
  MessageSquare,
  Key,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CodeBlock = ({ title, code, language }: { title: string, code: string, language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl mb-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">{title}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-1.5 hover:bg-slate-800 rounded-md transition-colors group relative"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {copied ? 'Copied!' : 'Copy Code'}
          </span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function App() {
  const [activeStep, setActiveStep] = useState(1);

  const workerCode = `export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const payload = await request.json();

      if (payload.message && payload.message.text) {
        const chatId = payload.message.chat.id;
        const text = payload.message.text;

        if (text === '/start') {
          return await sendMessage(chatId, 'Hello! I am your Telegram bot running on Cloudflare Workers. 🚀', env.BOT_TOKEN);
        } else {
          return await sendMessage(chatId, \`You said: \${text}\`, env.BOT_TOKEN);
        }
      }
    }
    return new Response('OK');
  }
};

async function sendMessage(chatId, text, botToken) {
  const url = \`https://api.telegram.org/bot\${botToken}/sendMessage\`;
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
}`;

  const wranglerConfig = `name = "your-bot-name"
main = "worker.js"
compatibility_date = "2024-01-01"

[vars]
BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"`;

  const packageJson = `{
  "name": "tg-bot-cloudflare",
  "version": "1.0.0",
  "main": "worker.js",
  "devDependencies": {
    "wrangler": "^3.0.0"
  },
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  }
}`;

  const steps = [
    { id: 1, title: 'ቦቱን መፍጠር', icon: <Bot className="w-5 h-5" />, desc: 'ከ @BotFather የቦት Token ማግኘት' },
    { id: 2, title: 'ፋይሎችን ማዘጋጀት', icon: <Code2 className="w-5 h-5" />, desc: '3ቱን ፋይሎች ኮፒ ማድረግ' },
    { id: 3, title: 'Cloudflare መጫን', icon: <Cloud className="w-5 h-5" />, desc: 'Wrangler Deploy ማድረግ' },
    { id: 4, title: 'Webhook ማሰር', icon: <Globe className="w-5 h-5" />, desc: 'የቦቱን URL ለቴሌግራም መስጠት' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Telegram Bot <span className="text-blue-500">Cloudflare Edition</span></h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            በCloudflare Workers ላይ የሚስተናገድ እና ሰላምታ የሚሰጥ የቴሌግራም ቦት በነጻ መስራት የሚያስችልህ ቀላል መመሪያ።
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4">
            <nav className="space-y-2 sticky top-8">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left border ${
                    activeStep === step.id 
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'border-transparent hover:bg-slate-900 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${activeStep === step.id ? 'bg-blue-600 text-white' : 'bg-slate-900'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-xs opacity-70">{step.desc}</div>
                  </div>
                  <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeStep === step.id ? 'rotate-90 text-blue-400' : 'opacity-0'}`} />
                </button>
              ))}
              
              <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Github className="w-4 h-4" /> ወደ GitHub መላክ?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  ወደ GitHub ሲልኩ እነዚህን 3 ፋይሎች ብቻ ሰሌክት በማድረግ ይውሰዱ። Cloudflare GitHub Integration ቦቱን በየመሃሉ አፕዴት ለማድረግ ይረዳዎታል።
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> worker.js
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> package.json
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> wrangler.toml
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm shadow-xl"
              >
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Bot className="w-6 h-6 text-blue-400" /> የቴሌግራም ቦት መፈጠሪያ
                    </h2>
                    <div className="bg-blue-600/5 border border-blue-500/20 p-4 rounded-xl text-blue-300 text-sm">
                      <p>መጀመሪያ <a href="https://t.me/BotFather" target="_blank" className="underline font-bold">@BotFather</a> ጋር በመሄድ አዲስ ቦት ይፍጠሩ እና <strong>API Token</strong> ይቀበሉ።</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-400">1</div>
                        <p className="text-slate-300 font-medium">@BotFatherን በቴሌግራም ይፈልጉ።</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-400">2</div>
                        <p className="text-slate-300 font-medium"><code className="bg-slate-900 px-2 py-0.5 rounded text-blue-400">/newbot</code> ብለው ይላኩ።</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-400">3</div>
                        <p className="text-slate-300 font-medium">የቦቱን ስም እና ዩዘር-ኔም (username) ይስጡት።</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Code2 className="w-6 h-6 text-emerald-400" /> የፋይሎች ዝርዝር
                    </h2>
                    <p className="text-slate-400 mb-6">የሚከተሉትን 3 ዋና ፋይሎች ኮፒ በማድረግ በኮምፒውተርዎ ላይ ያስቀምጡ።</p>
                    
                    <CodeBlock title="worker.js" code={workerCode} language="javascript" />
                    <CodeBlock title="wrangler.toml" code={wranglerConfig} language="toml" />
                    <CodeBlock title="package.json" code={packageJson} language="json" />
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-amber-400" /> Cloudflare ላይ መጫን (Deploy)
                    </h2>
                    <div className="space-y-6">
                      <div className="p-6 bg-[#0f172a] rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed">
                        <div className="text-slate-500 mb-2"># Install dependencies</div>
                        <div className="text-amber-400 mb-4">npm install</div>
                        
                        <div className="text-slate-500 mb-2"># Login to Cloudflare</div>
                        <div className="text-amber-400 mb-4">npx wrangler login</div>
                        
                        <div className="text-slate-500 mb-2"># Deploy the worker</div>
                        <div className="text-amber-400">npx wrangler deploy</div>
                      </div>
                      
                      <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl">
                        <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                          <Key className="w-4 h-4" /> Token ማስገባት መርሳት የለብዎትም!
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                          Cloudflare Dashboard ላይ በመግባት በ "Settings &gt; Variables" ውስጥ <strong>BOT_TOKEN</strong> የሚል ቫርያብል በመፍጠር ከ BotFather ያገኙትን ኮድ ያስገቡ።
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Globe className="w-6 h-6 text-cyan-400" /> Webhook ማሰር
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                      ቦቱ ከቴሌግራም መልእክት እንዲደርሰው በCloudflare ያገኙትን URL ለቴሌግራም ሲስተም ማሳወቅ አለብዎት። ይህን ለማድረግ የሚከተለውን URL በብራውዘርዎ ይክፈቱ፡
                    </p>
                    
                    <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 break-all font-mono text-xs text-blue-400 underline decoration-slate-700 underline-offset-4">
                      https://api.telegram.org/bot<span className="text-white">&lt;YOUR_TOKEN&gt;</span>/setWebhook?url=<span className="text-white">&lt;YOUR_WORKER_URL&gt;</span>
                    </div>

                    <div className="flex items-center gap-4 py-4">
                      <div className="flex-1 h-px bg-slate-800"></div>
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Success Check</div>
                      <div className="flex-1 h-px bg-slate-800"></div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl border border-slate-800/50">
                      <div className="flex items-center gap-4 text-slate-200">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-bold">አሁን ቦቱን ይሞክሩ!</p>
                          <p className="text-xs text-slate-500">ወደ ቦትዎ ይሂዱና /start ብለው ይላኩ።</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 px-4 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                        Bot Father <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          Built with Cloudflare Workers & React by <span className="text-slate-400">AI Studio</span>
        </footer>
      </div>
    </div>
  );
}
