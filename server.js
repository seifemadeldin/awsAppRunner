const express = require('express');
const os = require('os');
const app = express();

// AWS App Runner defaults to port 8080, but allows configuration.
// We use the PORT environment variable if available.
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  // Gather some basic server info to display
  const serverInfo = {
    platform: os.platform(),
    release: os.release(),
    host: os.hostname(),
    uptime: os.uptime()
  };

  // Return a nice HTML page using inline CSS/Tailwind for simplicity in a single response
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AWS App Runner Node.js Demo</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-900 text-white flex items-center justify-center min-h-screen font-sans">
        <div class="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700 m-4">
            <div class="bg-indigo-600 p-6 text-center">
                <h1 class="text-3xl font-bold">🚀 It Works!</h1>
                <p class="text-indigo-100 mt-2">AWS App Runner is serving this app.</p>
            </div>
            <div class="p-6 space-y-4">
                <div class="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div class="text-green-400 text-2xl">⚡</div>
                    <div>
                        <p class="text-sm text-slate-400">Status</p>
                        <p class="font-semibold text-green-400">Online & Running</p>
                    </div>
                </div>
                
                <div class="space-y-2 border-t border-slate-700 pt-4">
                    <p class="text-xs uppercase tracking-wider text-slate-500 font-bold">Instance Details</p>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div class="text-slate-400">Port:</div>
                        <div class="text-right font-mono">${PORT}</div>
                        
                        <div class="text-slate-400">Platform:</div>
                        <div class="text-right font-mono">${serverInfo.platform}</div>
                        
                        <div class="text-slate-400">Hostname:</div>
                        <div class="text-right font-mono truncate ml-4">${serverInfo.host}</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-900/50 p-4 text-center text-xs text-slate-500 border-t border-slate-700">
                Node.js ${process.version}
            </div>
        </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Health check endpoint (often useful for AWS load balancers)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
