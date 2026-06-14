"use strict";
/*
╔═══════════════════════════════════════════════════════════════════╗
║         🤖 BELAL BOTX666 — index.js v8.0 (2026 ULTIMATE)        ║
║      ✡️ চাঁদের পাহাড় | Master: Belal YT 🪬                      ║
║                                                                   ║
║  ✅ Auto Bootstrap — missing packages auto install               ║
║  ✅ Credits Warning Suppress                                      ║
║  ✅ global.nodemodule Proxy — auto-require any package           ║
║  ✅ global.utils — downloadFile, fastStream, getContent etc      ║
║  ✅ global.GoatBot — noprefix toggle support                     ║
║  ✅ global.getText — multi-language support                      ║
║  ✅ Per-thread PREFIX override                                    ║
║  ✅ noPrefix / noprefix command support                          ║
║  ✅ adminOnly / ndhOnly / adminPaOnly / adminbox modes           ║
║  ✅ commandBanned / userBanned / threadBanned                    ║
║  ✅ NSFW guard per thread                                        ║
║  ✅ Permission System 0/1/2/3                                    ║
║  ✅ String-Similarity command suggest                            ║
║  ✅ onStart + run + onCall — all frameworks                      ║
║  ✅ handleEvent / handleReaction / handleReply                   ║
║  ✅ handleCommandEvent / handleCreateDatabase                    ║
║  ✅ handleSchedule — cron jobs                                   ║
║  ✅ onLoad — command pre-load                                    ║
║  ✅ HotReloader — live command update                            ║
║  ✅ MessageCache — 😡 delete / ⚠️ kick                         ║
║  ✅ Promise.any fastStream — ultra fast media                    ║
║  ✅ Auto-Reconnect on session expire                             ║
║  ✅ Express keep-alive server                                    ║
║  ✅ Crash log saver                                              ║
║  ✅ Auto-Restart timer                                           ║
║  ✅ Anti-duplicate command load                                  ║
║  ✅ Per-command dependency auto-install                          ║
║  ✅ Axios speed optimize — 500MB / keep-alive                    ║
╚═══════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════
// STEP 0: Credits warning suppress (অবশ্যই সবার আগে)
// ═══════════════════════════════════════════════════
const _origWarn  = console.warn.bind(console);
const _origLog   = console.log.bind(console);
const _badPhrases = ["Detect credits", "Stop immediately", "ADMINBOT\nPlease", "credits modules", "has been changed to undefined"];
console.warn = (...a) => { const m = a.join(" "); if (_badPhrases.some(p => m.includes(p))) return; _origWarn(...a); };
console.log  = (...a) => { const m = a.join(" "); if (_badPhrases.some(p => m.includes(p))) return; _origLog(...a); };

// ═══════════════════════════════════════════════════
// STEP 1: Bootstrap — core packages auto install
// ═══════════════════════════════════════════════════
(function bootstrap() {
  const { execSync } = require("child_process");
  const core = [
    "fca-unofficial", "fs-extra", "chalk", "moment-timezone",
    "axios", "express", "sequelize", "better-sqlite3",
    "form-data", "string-similarity", "node-schedule",
    "jimp", "canvas", "fluent-ffmpeg"
  ];
  const miss = core.filter(p => { try { require.resolve(p); return false; } catch { return true; } });
  if (miss.length) {
    console.info("  📦 [ইন্সটল] প্রয়োজনীয় package নেই, ইন্সটল হচ্ছে:", miss.join(", "));
    try { execSync(`npm install ${miss.join(" ")} --legacy-peer-deps --prefer-offline`, { stdio: "inherit", timeout: 300000 }); }
    catch (e) { console.error("  ❌ [ইন্সটল ব্যর্থ]", e.message); }
  }
})();

// ═══════════════════════════════════════════════════
// STEP 2: Core requires
// ═══════════════════════════════════════════════════
const fs      = require("fs-extra");
const path    = require("path");
const chalk   = require("chalk");
const moment  = require("moment-timezone");
const login   = require("fca-unofficial");
const { spawnSync, execSync } = require("child_process");

const ROOT      = process.cwd();
const BOT_START = Date.now();

// ═══════════════════════════════════════════════════
// STEP 3: Banner + Logger
// ═══════════════════════════════════════════════════
const ts = () => moment().tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY");

function printBanner() {
  const b = chalk.bold;
  const W = chalk.white;
  const G = chalk.hex("#00FF88");   // সবুজ
  const C = chalk.hex("#00CFFF");   // নীল
  const Y = chalk.hex("#FFD700");   // সোনালী
  const P = chalk.hex("#FF69B4");   // গোলাপী
  const R = chalk.hex("#FF4444");   // লাল
  const line = chalk.hex("#444444");

  _origLog("");
  _origLog(line("  ╔══════════════════════════════════════════════════════════╗"));
  _origLog(line("  ║") + "                                                          " + line("║"));
  _origLog(line("  ║") + b(Y("    ██████╗ ███████╗██╗      █████╗ ██╗                    ")) + line("║"));
  _origLog(line("  ║") + b(Y("    ██╔══██╗██╔════╝██║     ██╔══██╗██║                    ")) + line("║"));
  _origLog(line("  ║") + b(Y("    ██████╔╝█████╗  ██║     ███████║██║                    ")) + line("║"));
  _origLog(line("  ║") + b(Y("    ██╔══██╗██╔══╝  ██║     ██╔══██║██║                    ")) + line("║"));
  _origLog(line("  ║") + b(Y("    ██████╔╝███████╗███████╗██║  ██║███████╗               ")) + line("║"));
  _origLog(line("  ║") + b(Y("    ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝               ")) + line("║"));
  _origLog(line("  ║") + "                                                          " + line("║"));
  _origLog(line("  ║") + "  " + b(P("  ┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄                        ")) + line("║"));
  _origLog(line("  ║") + "  " + b(C("  🤖 BOTX666 MAX  ")) + W("│") + b(G(" Master: Belal YT       ")) + W("│") + b(Y(" v8.0 ")) + "      " + line("║"));
  _origLog(line("  ║") + "                                                          " + line("║"));
  _origLog(line("  ╠══════════════════════════════════════════════════════════╣"));
  _origLog(line("  ║") + " " + G("  ✅ handleCommand    ") + W("│") + G(" ✅ handleEvent       ") + W("│") + G(" ✅ handleReply  ") + "   " + line("║"));
  _origLog(line("  ║") + " " + G("  ✅ handleReaction   ") + W("│") + G(" ✅ handleSchedule    ") + W("│") + G(" ✅ HotReload    ") + "   " + line("║"));
  _origLog(line("  ║") + " " + G("  ✅ noPrefix         ") + W("│") + G(" ✅ string-similarity ") + W("│") + G(" ✅ fastStream   ") + "   " + line("║"));
  _origLog(line("  ║") + " " + G("  ✅ AutoDB           ") + W("│") + G(" ✅ Permission 0/1/2/3") + W("│") + G(" ✅ NSFW Guard   ") + "   " + line("║"));
  _origLog(line("  ╠══════════════════════════════════════════════════════════╣"));
  _origLog(line("  ║") + b(R("  ⚠️  বট চালু হচ্ছে... দয়া করে অপেক্ষা করুন              ")) + line("║"));
  _origLog(line("  ║") + "  " + C(`  🕐 সময়: ${moment().tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss")}`) + "                           " + line("║"));
  _origLog(line("  ╚══════════════════════════════════════════════════════════╝"));
  _origLog("");
}

const log = {
  info:    m => _origLog(chalk.cyan    (`  ℹ️  [তথ্য]    » ${m}`)),
  success: m => _origLog(chalk.green   (`  ✅ [সফল]     » ${m}`)),
  warn:    m => _origLog(chalk.yellow  (`  ⚠️  [সতর্ক]  » ${m}`)),
  error:   m => _origLog(chalk.red     (`  ❌ [ত্রুটি]  » ${m}`)),
  bot:     m => _origLog(chalk.magenta (`  🤖 [বট]      » ${m}`)),
  cmd:     m => _origLog(chalk.blue    (`  ⚡ [কমান্ড]  » ${m}`)),
  event:   m => _origLog(chalk.gray    (`  📡 [ইভেন্ট]  » ${m}`)),
  hot:     m => _origLog(chalk.bgBlue  (`  🔥 [HOTLOAD] » ${m}`)),
  loader:  m => _origLog(chalk.hex("#FF69B4")(`  📦 [LOADER]  » ${m}`)),
  section: t => {
    _origLog("");
    _origLog(chalk.hex("#444444")(`  ┌─────────────────────────────────────`));
    _origLog(chalk.hex("#FFD700").bold(`  │  ${t}`));
    _origLog(chalk.hex("#444444")(`  └─────────────────────────────────────`));
  },
  done: (cmd, fail) => {
    _origLog("");
    _origLog(chalk.hex("#444444")("  ╔══════════════════════════════════════════╗"));
    _origLog(chalk.green.bold    ("  ║  🚀 বট সম্পূর্ণ চালু হয়েছে!              ║"));
    _origLog(chalk.hex("#444444")("  ╠══════════════════════════════════════════╣"));
    _origLog(chalk.cyan          (`  ║  ⚡ কমান্ড  : ${String(cmd).padEnd(26)}║`));
    _origLog(chalk.red           (`  ║  ❌ ব্যর্থ  : ${String(fail).padEnd(26)}║`));
    _origLog(chalk.yellow        (`  ║  🕐 সময়    : ${moment().tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY").padEnd(26)}║`));
    _origLog(chalk.hex("#444444")("  ╚══════════════════════════════════════════╝"));
    _origLog("");
  },
};
global.log = log;

// ═══════════════════════════════════════════════════
// STEP 4: Global state
// ═══════════════════════════════════════════════════
global.client = {
  commands:        new Map(),
  events:          new Map(),
  cooldowns:       new Map(),
  eventRegistered: [],
  handleReaction:  [],
  handleReply:     [],
  handleSchedule:  [],
  messageCache:    new Map(),
  mainPath:        ROOT,
  startTime:       BOT_START,
  version:         "8.0.0",
};

global.data = {
  threadInfo:      new Map(),
  threadData:      new Map(),
  userName:        new Map(),
  userBanned:      new Map(),
  threadBanned:    new Map(),
  commandBanned:   new Map(),
  threadAllowNSFW: [],
  allUserID:       [],
  allCurrenciesID: [],
  allThreadID:     [],
};

// ── Anti-Spam tracker — একই user বেশি বেশি command দিলে block ──
global.antiSpam = new Map(); // senderID → { count, resetAt }

function checkAntiSpam(senderID) {
  const cfg = global.config?.System?.antiSpam;
  if (!cfg?.enable) return false;
  const ADMINBOT = (global.config?.ADMINBOT || []).map(String);
  if (ADMINBOT.includes(String(senderID))) return false; // admin exempt

  const now   = Date.now();
  const entry = global.antiSpam.get(senderID) || { count: 0, resetAt: now + 60000 };

  if (now > entry.resetAt) {
    entry.count   = 1;
    entry.resetAt = now + (cfg.cooldown || 60000);
  } else {
    entry.count++;
  }
  global.antiSpam.set(senderID, entry);
  return entry.count > (cfg.maxPerMinute || 20);
}
global.checkAntiSpam = checkAntiSpam;

// ═══════════════════════════════════════════════════
// STEP 5: global.nodemodule — যেকোনো package auto-require
// ═══════════════════════════════════════════════════
global.nodemodule = new Proxy({}, {
  get(_, pkg) {
    if (typeof pkg !== "string" || pkg === "then") return undefined;
    try { return require(pkg); }
    catch {
      try {
        log.warn(`Auto-install: ${pkg}`);
        spawnSync("npm", ["install", pkg, "--save", "--legacy-peer-deps"], {
          stdio: "pipe", cwd: ROOT, timeout: 60000,
        });
        return require(pkg);
      } catch { return null; }
    }
  }
});

// ═══════════════════════════════════════════════════
// STEP 6: global.utils — full utility library
// ═══════════════════════════════════════════════════
global.utils = (function buildUtils() {
  const crypto = require("crypto");
  const os     = require("os");

  // fastStream — Promise.any দিয়ে fastest CDN response নেয়
  async function fastStream(links, filename = "file", timeout = 20000) {
    const axios  = require("axios");
    const HEADERS = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      "Accept":     "*/*",
      "Connection": "keep-alive",
    };
    const pick = () => links[Math.floor(Math.random() * links.length)];
    const tries = [pick(), pick(), pick()];
    const streams = tries.map(url =>
      axios({ method: "GET", url, responseType: "stream", headers: HEADERS, timeout, maxRedirects: 5 })
        .then(r => { r.data.path = filename; return r.data; })
    );
    return Promise.any(streams);
  }

  async function downloadFile(url, filePath) {
    if (!url) return;
    const { createWriteStream } = require("fs");
    const axios = require("axios");
    const response = await axios({ method: "GET", responseType: "stream", url,
      timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } });
    const writer = createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }

  async function getContent(url, options = {}) {
    const axios = require("axios");
    return axios({ method: "GET", url, ...options });
  }

  function throwError(command, threadID, messageID) {
    const ts = global.data?.threadData?.get(threadID) || {};
    const prefix = ts.PREFIX ?? global.config?.PREFIX ?? "/";
    return global.client?.api?.sendMessage(
      global.getText?.("utils", "throwError", prefix, command) || `❌ Error. Prefix: ${prefix}`,
      threadID, messageID
    );
  }

  function cleanAnilistHTML(text = "") {
    return text
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/?(i|em)>/gi, "*")
      .replace(/<\/?b>/gi, "**")
      .replace(/~!|!~/g, "||")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"').replace(/&#039;/g, "'")
      .replace(/<[^>]*>/g, "");
  }

  function randomString(length = 8) {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
  }

  const AES = {
    encrypt(key, iv, data) {
      const c = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.from(iv));
      return Buffer.concat([c.update(data), c.final()]).toString("hex");
    },
    decrypt(key, iv, enc) {
      const d = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.from(iv, "binary"));
      return Buffer.concat([d.update(Buffer.from(enc, "hex")), d.final()]).toString();
    },
    makeIv: () => Buffer.from(crypto.randomBytes(16)).toString("hex").slice(0, 16),
  };

  function homeDir() {
    return [os.homedir(), process.platform];
  }

  // formatTime — milliseconds to human readable
  function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ${h % 24}h ${m % 60}m`;
    if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
    if (m > 0) return `${m}m ${s % 60}s`;
    return `${s}s`;
  }

  // formatBytes
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
    return (bytes / 1073741824).toFixed(1) + " GB";
  }

  return {
    fastStream, downloadFile, getContent, throwError,
    cleanAnilistHTML, randomString, AES, homeDir,
    formatTime, formatBytes,
    assets: { font: async () => null, image: async () => null, data: async () => null },
  };
})();

// ═══════════════════════════════════════════════════
// STEP 7: global.GoatBot — noprefix toggle
// ═══════════════════════════════════════════════════
global.GoatBot = {
  config: {
    get isPrefix() { return global.config?.PREFIX !== ""; },
    set isPrefix(val) {
      if (!val) { global.config._defaultPrefix = global.config._defaultPrefix || global.config.PREFIX || "/"; global.config.PREFIX = ""; }
      else { global.config.PREFIX = global.config._defaultPrefix || "/"; }
    },
  },
};

// ═══════════════════════════════════════════════════
// STEP 8: Package auto-install helper
// ═══════════════════════════════════════════════════
function autoInstall(pkg, ver = "") {
  if (!pkg || typeof pkg !== "string") return false;
  const name = ver ? `${pkg}@${ver}` : pkg;
  log.warn(`নতুন package ইন্সটল হচ্ছে: ${name} — অপেক্ষা করুন...`);
  const r = spawnSync("npm", ["install", name, "--save", "--legacy-peer-deps", "--prefer-offline"], {
    stdio: "pipe", cwd: ROOT, timeout: 60000,
  });
  if (r.status === 0) { log.success(`Package ইন্সটল সম্পন্ন: ${name}`); return true; }
  log.error(`Package ইন্সটল ব্যর্থ: ${name} — internet connection চেক করুন`);
  return false;
}
global.requireOrInstall = (pkg, ver = "") => {
  try { return require(pkg); } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") { autoInstall(pkg, ver); try { return require(pkg); } catch { return null; } }
    throw e;
  }
};

// ═══════════════════════════════════════════════════
// STEP 9: Config loader
// ═══════════════════════════════════════════════════
function loadConfig() {
  const p = path.join(ROOT, "config.json");
  if (!fs.existsSync(p)) {
    log.error("config.json ফাইল পাওয়া যায়নি!");
    log.error("সমাধান: root ফোল্ডারে config.json ফাইল আছে কিনা দেখো।");
    process.exit(1);
  }
  try {
    global.config = JSON.parse(fs.readFileSync(p, "utf-8"));
    // Compatibility aliases
    if (!global.config.ADMINBOT && global.config.adminBot)    global.config.ADMINBOT = global.config.adminBot;
    if (!global.config.NDH      && global.config.ndh)         global.config.NDH      = global.config.ndh;
    if (!global.config.commandDisabled) global.config.commandDisabled = global.config.COMMAND_DISABLED || [];
    if (!global.config.eventDisabled)   global.config.eventDisabled   = global.config.EVENT_DISABLED   || [];
    if (!global.config.PREFIX && global.config.PREFIX !== "") global.config.PREFIX = "/";
    global.config._defaultPrefix = global.config.PREFIX || "/";
    // ENV override
    const envMap = { GROQ_KEY:"GROQ", GEMINI_KEY:"GEMINI", VOICERSS_KEY:"VOICERSS", IMGBB_KEY:"IMGBB" };
    for (const [ek, ak] of Object.entries(envMap))
      if (process.env[ek] && global.config.APIKEYS) global.config.APIKEYS[ak] = process.env[ek];
    log.success("config.json লোড সম্পন্ন ✅");
  } catch (e) {
    log.error(`config.json পড়তে সমস্যা হয়েছে!`);
    log.error(`কারণ: ${e.message}`);
    log.error(`সমাধান: config.json ফাইলটা JSON validator দিয়ে চেক করো।`);
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════
// STEP 10: Language loader
// ═══════════════════════════════════════════════════
function loadLanguage() {
  try {
    const lang    = global.config?.language || "en";
    const langDir = path.join(ROOT, "languages");
    const tryPaths = [
      path.join(langDir, `${lang}.lang`),
      path.join(langDir, "en.lang"),
      path.join(ROOT, `${lang}.lang`),
      path.join(ROOT, "en.lang"),
    ];
    const usePath = tryPaths.find(p => fs.existsSync(p));
    global.langData = {};
    if (usePath) {
      for (const line of fs.readFileSync(usePath, "utf-8").split(/\r?\n/)) {
        if (line.startsWith("#") || !line.includes("=")) continue;
        const si  = line.indexOf("=");
        const key = line.slice(0, si).trim();
        const val = line.slice(si + 1).replace(/\\n/g, "\n");
        const [head, ...rest] = key.split(".");
        if (!global.langData[head]) global.langData[head] = {};
        global.langData[head][rest.join(".")] = val;
      }
    }
    global.getText = (mod, key, ...args) => {
      let text = global.langData?.[mod]?.[key] || `[${mod}.${key}]`;
      for (let i = args.length; i > 0; i--)
        text = text.replace(new RegExp(`%${i}`, "g"), args[i - 1]);
      return text;
    };
    log.success(`ভাষা ফাইল লোড সম্পন্ন: ${lang} ✅`);
  } catch { global.getText = (m, k) => `[${m}.${k}]`; log.warn("ভাষা ফাইল পাওয়া যায়নি, default ব্যবহার হবে।"); }
}

// ═══════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// STEP 11: Ultimate Command Loader
// ✅ 1000+ command support  ✅ Auto module alias
// ✅ Auto-install deps      ✅ Hot-patch apiHelper path
// ✅ Alias support          ✅ Error isolation
// ════════════════════════════════════════════════════════════════════

// ── Pre-register apiHelper under ALL possible paths commands might use ──
(function preRegisterApiHelper() {
  try {
    const helperPath     = path.join(ROOT, "utils", "apiHelper");
    const helperResolved = require.resolve(helperPath);
    const helperModule   = require(helperPath);
    global._apiHelper    = helperModule;
    global.apiHelper     = helperModule;

    // Register under every path a command might try
    const fakePaths = [
      path.join(ROOT, "Script", "commands", "..", "..", "utils", "apiHelper"),
      path.join(ROOT, "Script", "utils", "apiHelper"),
      path.join(ROOT, "utils", "apiHelper"),
    ];
    for (const fp of fakePaths) {
      try {
        const r = require.resolve(fp);
        if (!require.cache[r]) require.cache[r] = require.cache[helperResolved];
      } catch {
        // Create fake resolved path
        try { require.cache[fp + ".js"] = require.cache[helperResolved]; } catch {}
      }
    }
    log.success("✅ apiHelper pre-registered — 1000+ command ready");
  } catch(e) { log.warn("apiHelper pre-cache: " + e.message); }
})();

function loadCommands() {
  const dir = path.join(ROOT, "Script", "commands");
  if (!fs.existsSync(dir)) {
    log.warn("Script/commands/ নেই — তৈরি করছি...");
    fs.mkdirSync(dir, { recursive: true });
    return;
  }

  const disabled = new Set(global.config.commandDisabled || []);
  const files    = fs.readdirSync(dir).filter(
    f => f.endsWith(".js")
      && !f.startsWith("_")
      && f !== "index.js"          // index.js skip
      && f !== "apiHelper.js"      // apiHelper skip
      && !disabled.has(f.replace(".js",""))
  );

  // ── apiHelper সব possible path এ register করো ──
  const helperSrc = path.join(ROOT, "utils", "apiHelper");
  try {
    const helperMod = require(helperSrc);
    const helperKey = require.resolve(helperSrc);
    // Script/commands/x.js থেকে ../../utils/apiHelper → ROOT/utils/apiHelper
    const fakeDirs  = [
      path.join(ROOT, "Script", "commands"),
      path.join(ROOT, "Script"),
    ];
    for (const d of fakeDirs) {
      const fake = path.resolve(d, "../../utils/apiHelper");
      if (!require.cache[fake]) require.cache[fake] = require.cache[helperKey];
      if (!require.cache[fake+".js"]) require.cache[fake+".js"] = require.cache[helperKey];
    }
  } catch {}

  let ok = 0, fail = 0, aliases = 0;

  for (const file of files) {
    const fp = path.join(dir, file);
    try {
      // ── apiHelper path fix per-file ──
      try {
        const helperKey = require.resolve(helperSrc);
        const fakeKey   = require.resolve(path.join(path.dirname(fp), "../../utils/apiHelper")).catch ? null :
          (() => { try { return require.resolve(path.join(path.dirname(fp), "../../utils/apiHelper")); } catch { return null; } })();
        if (fakeKey && !require.cache[fakeKey]) require.cache[fakeKey] = require.cache[helperKey];
      } catch {}

      delete require.cache[require.resolve(fp)];
      const cmd = require(fp);

      if (!cmd?.config?.name) { fail++; continue; }
      if (!cmd.run && !cmd.onStart && !cmd.onCall && !cmd.handleEvent && !cmd.onEvent) { fail++; continue; }
      if (global.client.commands.has(cmd.config.name)) continue;

      // ── Auto-install missing packages ──
      if (cmd.config?.dependencies) {
        for (const [pkg] of Object.entries(cmd.config.dependencies)) {
          try { require(pkg); } catch { autoInstall(pkg, ""); }
        }
      }

      // ── Register handleEvent + noPrefix ──
      if ((cmd.handleEvent || cmd.onEvent) && !global.client.eventRegistered.includes(cmd.config.name))
        global.client.eventRegistered.push(cmd.config.name);
      if (cmd.config?.noPrefix === true && !global.client.eventRegistered.includes(cmd.config.name))
        global.client.eventRegistered.push(cmd.config.name);

      // ── Register command + aliases ──
      global.client.commands.set(cmd.config.name, cmd);
      if (Array.isArray(cmd.config.aliases)) {
        for (const alias of cmd.config.aliases) {
          if (!global.client.commands.has(alias)) {
            global.client.commands.set(alias, cmd);
            aliases++;
          }
        }
      }

      // ── onLoad async — no await, isolated ──
      if (typeof cmd.onLoad === "function")
        Promise.resolve().then(() => cmd.onLoad({ api: global._tempApi })).catch(e =>
          log.warn(`[${cmd.config.name}] onLoad: ${e.message}`)
        );

      ok++;
    } catch (e) {
      log.error(`[${file}] লোড ব্যর্থ: ${e.message}`);
      fail++;
    }
  }

  log.success(`কমান্ড → ✅ ${ok} সফল | 🔗 ${aliases} alias | ❌ ${fail} ব্যর্থ`);
  global.client._loadFail = (global.client._loadFail || 0) + fail;
}

// ═══════════════════════════════════════════════════
// STEP 12: Event loader
// Supports: .run() + config.eventType [BELAL], .handleEvent() [GoatBot]
// ═══════════════════════════════════════════════════
function loadEvents() {
  const dir = path.join(ROOT, "Script", "events");
  if (!fs.existsSync(dir)) return;
  const disabled = new Set(global.config.eventDisabled || []);
  const files = fs.readdirSync(dir).filter(
    f => f.endsWith(".js") && !f.startsWith("_") && !disabled.has(f.replace(".js", ""))
  );
  let ok = 0;
  for (const file of files) {
    try {
      delete require.cache[require.resolve(path.join(dir, file))];
      const evt = require(path.join(dir, file));
      if (!evt?.config?.name) continue;
      if (!evt.run && !evt.handleEvent) continue;
      global.client.events.set(evt.config.name, evt);
      ok++;
    } catch (e) { log.error(`[${file}] ইভেন্ট লোড ব্যর্থ: ${e.message}`); }
  }
  log.success(`ইভেন্ট লোড → ✅ ${ok}`);
}

// ═══════════════════════════════════════════════════
// STEP 13: HotReloader — live command update without restart
// ═══════════════════════════════════════════════════
function startHotReloader() {
  const dir = path.join(ROOT, "Script", "commands");
  if (!fs.existsSync(dir)) return;
  let debounce = {};
  fs.watch(dir, { recursive: false }, (evType, filename) => {
    if (!filename?.endsWith(".js") || filename.startsWith("_")) return;
    clearTimeout(debounce[filename]);
    debounce[filename] = setTimeout(() => {
      const fp = path.join(dir, filename);
      if (!fs.existsSync(fp)) {
        // File deleted — unregister
        for (const [name, cmd] of global.client.commands.entries())
          if (cmd._filePath === fp) { global.client.commands.delete(name); log.hot(`Unloaded: ${name}`); }
        return;
      }
      try {
        const check = spawnSync(process.execPath, ["--check", fp], { stdio: "pipe" });
        if (check.status !== 0) { log.error(`[HotLoad] ${filename} এ syntax error আছে — লোড বাতিল করা হয়েছে`); return; }
        delete require.cache[require.resolve(fp)];
        const cmd = require(fp);
        if (!cmd?.config?.name || (!cmd.run && !cmd.onStart && !cmd.onCall)) return;
        if (cmd.config?.dependencies)
          for (const [pkg, ver] of Object.entries(cmd.config.dependencies))
            try { require(pkg); } catch { autoInstall(pkg, ver); }
        if (cmd.handleEvent && !global.client.eventRegistered.includes(cmd.config.name))
          global.client.eventRegistered.push(cmd.config.name);
        cmd._filePath = fp;
        global.client.commands.set(cmd.config.name, cmd);
        log.hot(`[${cmd.config.name}] সফলভাবে আপডেট হয়েছে ✅`);
        try { global.client.api?.sendMessage(`🔥 HotLoad: [${cmd.config.name}] আপডেট হয়েছে`, (global.config.ADMINBOT || [])[0] || ""); } catch {}
      } catch (e) { log.error(`[HotLoad] ${filename} লোড করতে সমস্যা: ${e.message}`); }
    }, 600);
  });
  log.success("HotReloader সক্রিয়।");
}

// ═══════════════════════════════════════════════════
// STEP 14: Database
// ═══════════════════════════════════════════════════
async function connectDatabase() {
  const { sequelize, Sequelize } = require("./includes/database");
  await sequelize.authenticate();
  log.success("ডেটাবেজ সংযোগ সফল ✅");
  const models = require("./includes/database/model")({ Sequelize, sequelize });
  await sequelize.sync({ alter: false });
  log.success("ডেটাবেজ টেবিল প্রস্তুত ✅");
  return models;
}

async function loadDBData(Threads, Users, Currencies) {
  const [allThreads, allUsers, allCurr] = await Promise.all([
    Threads.getAll().catch(() => []),
    Users.getAll(["userID", "name", "banned", "data"]).catch(() => []),
    Currencies.getAll(["userID"]).catch(() => []),
  ]);
  for (const t of allThreads) {
    const tid = String(t.threadID);
    if (!global.data.allThreadID.includes(tid)) global.data.allThreadID.push(tid);
    if (t.threadInfo) global.data.threadInfo.set(tid, t.threadInfo);
    if (t.data)       global.data.threadData.set(tid, t.data);
    if (t.banned?.status || t.data?.banned?.status)
      global.data.threadBanned.set(tid, { reason: t.banned?.reason || t.data?.banned?.reason || "", dateAdded: t.banned?.dateAdded || "" });
    if (t.data?.commandBanned) global.data.commandBanned.set(tid, t.data.commandBanned);
    if (t.data?.allowNSFW)     global.data.threadAllowNSFW.push(tid);
  }
  for (const u of allUsers) {
    const uid = String(u.userID);
    if (!global.data.allUserID.includes(uid)) global.data.allUserID.push(uid);
    if (u.name) global.data.userName.set(uid, u.name);
    if (u.banned?.status || u.data?.banned?.status)
      global.data.userBanned.set(uid, { reason: u.banned?.reason || u.data?.banned?.reason || "", dateAdded: u.banned?.dateAdded || "" });
    if (u.data?.commandBanned) global.data.commandBanned.set(uid, u.data.commandBanned);
  }
  for (const c of allCurr)
    if (!global.data.allCurrenciesID.includes(String(c.userID))) global.data.allCurrenciesID.push(String(c.userID));

  log.success(`ডেটাবেজ লোড সম্পন্ন → ${allThreads.length}টি গ্রুপ | ${allUsers.length}জন ইউজার ✅`);
}

// ═══════════════════════════════════════════════════
// STEP 15: Crash log
// ═══════════════════════════════════════════════════
function saveCrashLog(type, err) {
  try {
    if (!global.config?.System?.saveCrashLogs) return;
    const dir = path.join(ROOT, "logs");
    fs.ensureDirSync(dir);
    fs.writeFileSync(
      path.join(dir, `crash_${Date.now()}.log`),
      `Time: ${moment().tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss")}\nType: ${type}\n${err?.stack || err}\n`
    );
  } catch {}
}

// ═══════════════════════════════════════════════════
// STEP 16: Express keep-alive
// ═══════════════════════════════════════════════════
function setupExpress() {
  try {
    const app  = require("express")();
    const PORT = process.env.PORT || 3000;
    app.get("/", (_, res) => res.json({
      name:     "BELAL BOTX666",
      version:  "8.0.0",
      master:   "Belal YT",
      status:   "🟢 চলছে",
      uptime:   global.utils.formatTime(Date.now() - BOT_START),
      commands: global.client.commands.size,
      events:   global.client.events.size,
      time:     moment().tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss"),
    }));
    app.get("/ping", (_, res) => res.send("🏓 BELAL BOTX666 সক্রিয়!"));
    app.get("/stats", (_, res) => res.json({
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      commands: global.client.commands.size,
      cachedMessages: global.client.messageCache.size,
    }));
    app.listen(PORT, () => log.success(`Express server চালু: port ${PORT} ✅`));
  } catch (e) { log.warn(`Express server চালু করা যায়নি: ${e.message}`); }
}

// ═══════════════════════════════════════════════════
// STEP 17: Multi-Account Rotation System
// একটা account ban/logout হলে পরেরটা auto চালু হবে
// ═══════════════════════════════════════════════════
async function startBot(models) {
  const ctrlPath   = path.join(ROOT, "includes", "controllers");
  const Users      = require(path.join(ctrlPath, "users"))({ models, api: null });
  const Threads    = require(path.join(ctrlPath, "threads"))({ models, api: null });
  const Currencies = require(path.join(ctrlPath, "currencies"))({ models });

  // ── Multi-account list load ────────────────────────────────────
  // accounts.json এ একাধিক appstate রাখা যাবে
  // format: [{"name":"Account1","path":"appstate1.json"}, ...]
  let accountList = [];
  const accountsPath = path.join(ROOT, "accounts.json");

  if (fs.existsSync(accountsPath)) {
    try {
      accountList = JSON.parse(fs.readFileSync(accountsPath, "utf-8"));
      log.success(`Multi-account লোড → ${accountList.length}টি account পাওয়া গেছে ✅`);
    } catch {
      log.warn("accounts.json পড়তে সমস্যা — single account mode চালু।");
    }
  }

  // Single account fallback
  if (!accountList.length) {
    accountList = [{
      name: "Main Account",
      path: global.config.APPSTATEPATH || "appstate.json",
    }];
  }

  let currentIndex = 0;

  async function tryLogin(index) {
    const account = accountList[index % accountList.length];
    const apPath  = path.resolve(ROOT, account.path);

    _origLog("");
    _origLog(chalk.hex("#FFD700").bold(`  ╔══════════════════════════════════════════╗`));
    _origLog(chalk.hex("#FFD700").bold(`  ║  🔑 Login চেষ্টা: ${account.name.padEnd(22)}║`));
    _origLog(chalk.hex("#FFD700").bold(`  ║  📁 File: ${account.path.padEnd(30)}║`));
    _origLog(chalk.hex("#FFD700").bold(`  ╚══════════════════════════════════════════╝`));
    _origLog("");

    if (!fs.existsSync(apPath)) {
      log.error(`${account.name}: appstate file পাওয়া যায়নি → ${apPath}`);
      // পরের account try করো
      const next = (index + 1) % accountList.length;
      if (next !== index % accountList.length) {
        log.warn(`পরের account try করা হচ্ছে...`);
        return setTimeout(() => tryLogin(next), 3000);
      }
      log.error("কোনো valid appstate পাওয়া যায়নি! বট বন্ধ হচ্ছে।");
      return process.exit(1);
    }

    let appstate;
    try {
      appstate = JSON.parse(fs.readFileSync(apPath, "utf-8"));
    } catch {
      log.error(`${account.name}: appstate.json পড়তে সমস্যা!`);
      const next = (index + 1) % accountList.length;
      if (next !== index % accountList.length)
        return setTimeout(() => tryLogin(next), 3000);
      return process.exit(1);
    }

    log.info(`Facebook login হচ্ছে: ${account.name}...`);

    login({ appState: appstate, ...global.config.FCAOption }, async (loginErr, api) => {
      if (loginErr) {
        const code = String(loginErr?.error || loginErr?.code || "");
        const msg  = loginErr?.errorSummary || loginErr?.message || JSON.stringify(loginErr);

        log.error(`${account.name} login ব্যর্থ!`);
        log.error(`কারণ: ${msg}`);

        if (code === "1357004" || msg.includes("Not logged in") || msg.includes("checkpoint")) {
          _origLog("");
          _origLog(chalk.red(`  ╔══════════════════════════════════════════╗`));
          _origLog(chalk.red(`  ║  ❌ ${account.name} — Account Block/Expired!  ║`));
          _origLog(chalk.red(`  ╠══════════════════════════════════════════╣`));
          _origLog(chalk.yellow(`  ║  ✅ নতুন appstate দিয়ে accounts.json     ║`));
          _origLog(chalk.yellow(`  ║     আপডেট করো।                          ║`));
          _origLog(chalk.red(`  ╚══════════════════════════════════════════╝`));
          _origLog("");
        }

        // পরের account try করো
        const next = (index + 1) % accountList.length;
        if (accountList.length > 1) {
          log.warn(`⏳ ৫ সেকেন্ড পরে পরের account try করা হবে...`);
          return setTimeout(() => tryLogin(next), 5000);
        }
        return process.exit(1);
      }

      // ── Login সফল ─────────────────────────────────────────────
      try { fs.writeFileSync(apPath, JSON.stringify(api.getAppState(), null, 2)); } catch {}

      api.setOptions(global.config.FCAOption || {});
      global.client.api   = api;
      global.config.botID  = api.getCurrentUserID();
      currentIndex         = index;

      log.success(`✅ Login সফল! Account: ${account.name} | UID: ${global.config.botID}`);

      // Inject api into controllers
      Users.getInfo   = async id  => { try { return (await api.getUserInfo(id))[id]; }  catch { return { name: String(id) }; } };
      Threads.getInfo = async tid => { try { return await api.getThreadInfo(tid); }       catch { return {}; } };

      // ═══════════════════════════════════════════════════
      // AXIOS ULTIMATE ANTI-BLOCK CONFIG
      // ✅ 8-UA rotation  ✅ jitter delay  ✅ per-domain rate limit
      // ✅ auto retry (2s→5s→12s)  ✅ GROQ/Gemini key rotation
      // ═══════════════════════════════════════════════════
      try {
        const axios = require("axios");
        const { getUA, jitter } = require("./utils/apiHelper");

        // ── Axios defaults ──────────────────────────────
        axios.defaults.timeout          = 35000;
        axios.defaults.maxContentLength = 500 * 1024 * 1024;
        axios.defaults.maxBodyLength    = 500 * 1024 * 1024;
        axios.defaults.headers.common["Connection"]      = "keep-alive";
        axios.defaults.headers.common["Cache-Control"]   = "no-cache";
        axios.defaults.headers.common["Accept-Language"] = "en-US,en;q=0.9";
        axios.defaults.headers.common["User-Agent"]      = getUA();

        // ── Request interceptor: UA rotate + small jitter ──
        // ⚠️ Facebook domain এ custom UA বা delay দেওয়া যাবে না
        const FB_DOMAINS = ["facebook.com","fbcdn.net","messenger.com","fb.com","fbsbx.com"];
        axios.interceptors.request.use(async config => {
          config.headers = config.headers || {};
          const url = config.url || "";
          const isFB = FB_DOMAINS.some(d => url.includes(d));
          if (!isFB) {
            config.headers["User-Agent"] = getUA();
            if (process.env.GITHUB_ACTIONS) {
              await new Promise(r => setTimeout(r, 50 + Math.random() * 250));
            }
          }
          return config;
        });

        // ── Response interceptor: smart retry ──────────────
        // ⚠️ Facebook/fmessenger domain এ retry করা যাবে না
        const SKIP_RETRY_DOMAINS = [
          "facebook.com", "fbcdn.net", "messenger.com",
          "fb.com", "fbsbx.com", "fbcdn.com",
        ];
        const shouldSkipRetry = (url = "") =>
          SKIP_RETRY_DOMAINS.some(d => url.includes(d));

        axios.interceptors.response.use(
          res => res,
          async err => {
            const cfg = err.config;
            if (!cfg || cfg.__retryCount >= 3) return Promise.reject(err);
            // Facebook URL হলে retry করবে না
            if (shouldSkipRetry(cfg.url || "")) return Promise.reject(err);
            const status = err.response?.status;
            const retryable = !err.response || status === 429 || status === 502 || status === 503 || status === 504;
            if (retryable) {
              cfg.__retryCount = (cfg.__retryCount || 0) + 1;
              const delays = [2000, 5000, 12000];
              const delay  = delays[cfg.__retryCount - 1] + Math.random() * 1000;
              log.warn(`⚠️ API retry ${cfg.__retryCount}/3 [${status || "network"}] — ${(delay/1000).toFixed(1)}s পরে চেষ্টা...`);
              await new Promise(r => setTimeout(r, delay));
              cfg.headers["User-Agent"] = getUA();
              return axios(cfg);
            }
            return Promise.reject(err);
          }
        );

        // ── Global helpers ──────────────────────────────────
        // safeAxios: error হলে null ফেরত দেয়, crash করে না
        global.safeAxios = async (url, options = {}) => {
          try { return await axios({ url, ...options }); }
          catch (e) {
            if (global.log) log.warn(`safeAxios failed: ${String(url).slice(0, 55)} — ${e.message}`);
            return null;
          }
        };

        // GROQ key rotation — keys.json এর KEY1→KEY2→KEY3→KEY4 চক্রাকারে
        global.getGroqKey = (() => {
          let i = 0;
          return () => {
            try {
              const k = JSON.parse(require("fs").readFileSync(path.join(ROOT, "keys.json"), "utf8"));
              const pool = [k.GROQ_KEY, k.GROQ_KEY2, k.GROQ_KEY3, k.GROQ_KEY4].filter(Boolean);
              return pool.length ? pool[i++ % pool.length] : (global.config?.APIKEYS?.GROQ || "");
            } catch { return process.env.GROQ_KEY || global.config?.APIKEYS?.GROQ || ""; }
          };
        })();

        // Gemini key rotation
        global.getGeminiKey = (() => {
          let i = 0;
          return () => {
            try {
              const k = JSON.parse(require("fs").readFileSync(path.join(ROOT, "keys.json"), "utf8"));
              const pool = [k.GEMINI_KEY, k.GEMINI_KEY2, k.GEMINI_KEY3, k.GEMINI_KEY4].filter(Boolean);
              return pool.length ? pool[i++ % pool.length] : (global.config?.APIKEYS?.GEMINI || "");
            } catch { return process.env.GEMINI_KEY || global.config?.APIKEYS?.GEMINI || ""; }
          };
        })();

        // ── apiHelper global expose (all access methods) ──
        const _helper = require("./utils/apiHelper");
        global.apiHelper     = _helper;
        global._apiHelper    = _helper;
        global.safeGet       = _helper.safeGet;
        global.safePost      = _helper.safePost;
        global.downloadToTmp = _helper.downloadToTmp;
        global.cleanTmp      = _helper.cleanTmp;
        global.getBaseApi    = _helper.getBaseApi;
        global.fetchTikTok   = _helper.fetchTikTok;
        global.uploadFile    = _helper.uploadFile;
        global.getUA         = _helper.getUA;

        // ── Re-register apiHelper under ALL paths (1000+ command support) ──
        const helperKey = require.resolve("./utils/apiHelper");
        const allFakes  = [
          require("path").join(ROOT,"Script","commands","..","..","utils","apiHelper"),
          require("path").join(ROOT,"Script","utils","apiHelper"),
        ];
        for (const f of allFakes) {
          try {
            const fr = require.resolve(f); if (!require.cache[fr]) require.cache[fr] = require.cache[helperKey];
          } catch { require.cache[f] = require.cache[helperKey]; require.cache[f+".js"] = require.cache[helperKey]; }
        }

        log.success("✅ ULTIMATE SYSTEM চালু — UA rotation ✅ retry ✅ key rotation ✅ 1000+ command ready ✅");
      } catch (e) { log.warn("axios config সমস্যা: " + e.message); }

      await loadDBData(Threads, Users, Currencies);
      startHotReloader();
      setupExpress();

      // ── Anti-Spam System ───────────────────────────────────────
      const _spamMap = new Map();
      global.checkAntiSpam = (senderID) => {
        const now  = Date.now();
        const data = _spamMap.get(senderID) || { count: 0, first: now };
        if (now - data.first > 5000) { _spamMap.set(senderID, { count: 1, first: now }); return false; }
        data.count++;
        _spamMap.set(senderID, data);
        if (data.count > 8) { // 5 সেকেন্ডে ৮টার বেশি → spam
          if (data.count === 9) log.warn(`⚠️ Spam detected: ${senderID}`);
          return true;
        }
        return false;
      };
      // spam map প্রতি ৩০ সেকেন্ডে clean
      setInterval(() => {
        const now = Date.now();
        for (const [id, d] of _spamMap) { if (now - d.first > 30000) _spamMap.delete(id); }
      }, 30000);

      // ── Message Queue (concurrent limit) ──────────────────────
      let _activeMessages = 0;
      const MAX_CONCURRENT = 15;
      global.messageQueue = async (fn) => {
        while (_activeMessages >= MAX_CONCURRENT) await new Promise(r => setTimeout(r, 100));
        _activeMessages++;
        try { return await fn(); } finally { _activeMessages--; }
      };

      // Load handlers
      const hCtx = { api, models, Users, Threads, Currencies };
      const handleCommandFn        = require("./includes/handle/handleCommand")(hCtx);
      const handleCommandEventFn   = require("./includes/handle/handleCommandEvent")(hCtx);
      const handleEventFn          = require("./includes/handle/handleEvent")(hCtx);
      const handleReactionFn       = require("./includes/handle/handleReaction")(hCtx);
      const handleReplyFn          = require("./includes/handle/handleReply")(hCtx);
      const handleCreateDatabaseFn = require("./includes/handle/handleCreateDatabase")({ Users, Threads, Currencies });
      const startSchedule          = require("./includes/handle/handleSchedule")(hCtx);
      startSchedule();

      log.bot(`✅ ${global.client.commands.size} কমান্ড | ${global.client.events.size} ইভেন্ট`);
      log.done(global.client.commands.size, global.client._loadFail || 0);

      // Auto-save appstate every 30min
      setInterval(() => {
        try { fs.writeFileSync(apPath, JSON.stringify(api.getAppState(), null, 2)); } catch {}
      }, 30 * 60 * 1000);

      // ── MQTT Listener ──────────────────────────────────────────
      api.listenMqtt(async (err, event) => {
        if (err) {
          const code = String(err?.error || err?.code || "");
          const msg  = String(err?.errorSummary || err?.message || err?.error || "");

          if (msg.includes("sync_sequence_id")) {
            log.warn("sync_sequence_id error — গ্রুপে একটা message পাঠাও তারপর restart করো।");
            return;
          }

          log.error(`Listener ত্রুটি: [${code}] ${msg.slice(0, 100)}`);

          // Account ban/logout হলে পরেরটায় switch করো
          if (
            code === "1357004" ||
            msg.includes("Not logged in") ||
            msg.includes("checkpoint") ||
            msg.includes("banned") ||
            msg.includes("Unauthorized")
          ) {
            log.warn(`⚠️ ${account.name} — Session শেষ বা ban হয়েছে!`);
            if (accountList.length > 1) {
              const next = (currentIndex + 1) % accountList.length;
              log.warn(`🔄 পরের account এ switch হচ্ছে: ${accountList[next].name}`);
              // Admin কে notify করো
              try {
                const admins = global.config?.ADMINBOT || [];
                for (const uid of admins) {
                  api.sendMessage(
                    `⚠️ Account Switch!\n\n` +
                    `❌ ${account.name} — ban/logout হয়েছে\n` +
                    `✅ ${accountList[next].name} — এ switch হচ্ছে\n\n` +
                    `🕐 ${moment().tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY")}`,
                    uid
                  ).catch(() => {});
                }
              } catch {}
              setTimeout(() => tryLogin(next), 5000);
            } else {
              log.error("শুধু একটাই account আছে! নতুন appstate দিন।");
              setTimeout(() => process.exit(1), 3000);
            }
            return;
          }
          return;
        }

        try {
          if (event.type === "message" || event.type === "message_reply") {
            global.client.messageCache.set(event.messageID, {
              senderID: event.senderID,
              threadID: event.threadID,
              body:     event.body?.slice(0, 100),
              time:     Date.now(),
            });
            if (global.client.messageCache.size > 1000) {
              const first = global.client.messageCache.keys().next().value;
              global.client.messageCache.delete(first);
            }
            await handleCreateDatabaseFn({ event }).catch(() => {});
          }

          switch (event.type) {
            case "message":
              await handleCommandFn({ event });
              handleCommandEventFn({ event });
              handleEventFn({ event });
              break;
            case "message_reply":
              await handleCommandFn({ event });
              handleReplyFn({ event });
              handleCommandEventFn({ event });
              handleEventFn({ event });
              break;
            case "message_reaction":
              handleReactionFn({ event });
              break;
            case "message_unsend":
              handleEventFn({ event });
              break;
            default:
              handleEventFn({ event });
          }
        } catch (e) {
          log.error(`মেসেজ process করতে সমস্যা: ${e.message}`);
          saveCrashLog("listener", e);
        }
      });

      // Auto-restart
      const sys = global.config?.System || {};
      if (sys.autoRestart && sys.restartInterval)
        setTimeout(() => { log.warn("⏰ Auto-restart..."); process.exit(0); }, sys.restartInterval * 1000);
    });
  }

  // শুরু করো
  tryLogin(currentIndex);
}

// ═══════════════════════════════════════════════════
// STEP 18: Entry point
// ═══════════════════════════════════════════════════
async function main() {
  // Ensure folders
  for (const d of [
    "Script/commands", "Script/events",
    "Script/commands/cache",
    "Script/events/cache/joinGif",
    "Script/events/leaveGif",
    "includes/database/models",
    "includes/handle",
    "includes/controllers",
    "languages", "logs", "utils", "assets", "backup",
  ]) fs.ensureDirSync(path.join(ROOT, d));

  // Ensure adminbox data.json
  const dataJsonPath = path.join(ROOT, "Script/commands/cache/data.json");
  if (!fs.existsSync(dataJsonPath))
    fs.writeFileSync(dataJsonPath, JSON.stringify({ adminbox: {} }, null, 2));

  // ── Ultimate Error Handlers — bot কখনো crash হবে না ──────────
  const IGNORE_ERRORS = [
    "ECONNRESET","ECONNREFUSED","ETIMEDOUT","ENOTFOUND",
    "socket hang up","network","connect EREFUSED",
    "read ECONNRESET","write ECONNRESET","EPIPE",
    "Cannot read properties of undefined",
    "Cannot read property",
    "of null","of undefined",
  ];
  const shouldIgnore = msg => IGNORE_ERRORS.some(e => String(msg).includes(e));

  process.on("unhandledRejection", (reason) => {
    const msg = String(reason?.message || reason || "");
    if (shouldIgnore(msg)) return; // network error — ignore
    log.warn(`⚠️ Unhandled Rejection: ${msg.slice(0, 150)}`);
    saveCrashLog("rejection", reason);
    // bot বন্ধ করা যাবে না — শুধু log
  });

  process.on("uncaughtException", (e) => {
    const msg = String(e?.message || e || "");
    if (shouldIgnore(msg)) return;
    log.warn(`⚠️ UncaughtException: ${msg.slice(0, 150)}`);
    saveCrashLog("exception", e);
    // Critical error হলেও চেষ্টা করো চালু রাখতে
    if (msg.includes("FATAL") || msg.includes("out of memory")) {
      log.error("💀 Fatal error — restarting in 3s...");
      setTimeout(() => process.exit(1), 3000);
    }
  });

  // Memory monitor — 3.5GB এর বেশি হলে warn
  setInterval(() => {
    const mb = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    if (mb > 3500) {
      log.warn(`⚠️ Memory high: ${mb}MB — cleaning up...`);
      // tmp folder clean
      try {
        const tmpDir = require("path").join(ROOT, "tmp");
        require("fs-extra").emptyDirSync(tmpDir);
      } catch {}
      // Force GC if available
      if (global.gc) global.gc();
    }
  }, 5 * 60 * 1000); // 5 মিনিটে একবার

  // tmp folder auto-clean every 30 min
  setInterval(() => {
    try {
      const tmpDir  = require("path").join(ROOT, "tmp");
      const files   = require("fs").readdirSync(tmpDir);
      const now     = Date.now();
      let cleaned   = 0;
      for (const f of files) {
        const fp   = require("path").join(tmpDir, f);
        const stat = require("fs").statSync(fp);
        if (now - stat.mtimeMs > 10 * 60 * 1000) { // 10 মিনিটের পুরনো
          require("fs").unlinkSync(fp);
          cleaned++;
        }
      }
      if (cleaned) log.info(`🧹 tmp cleanup: ${cleaned} files removed`);
    } catch {}
  }, 30 * 60 * 1000);

  printBanner();

  log.section("⚙️  কনফিগ ও ভাষা লোড হচ্ছে...");
  loadConfig();
  loadLanguage();

  log.section("📦 কমান্ড ও ইভেন্ট লোড হচ্ছে...");
  loadCommands();
  loadEvents();

  log.section("🗄️  ডেটাবেজ সংযোগ হচ্ছে...");
  let models;
  try { models = await connectDatabase(); }
  catch (e) {
    log.error(`ডেটাবেজ সংযোগ ব্যর্থ হয়েছে!`);
    log.error(`কারণ: ${e.message}`);
    log.error(`সমাধান: includes/database/ ফোল্ডার ঠিক আছে কিনা দেখো।`);
    process.exit(1);
  }

  log.section("🔐 Facebook লগইন হচ্ছে...");
  await startBot(models);
}

main().catch(e => {
  log.error(`বট চালু হতে পারেনি!`);
  log.error(`কারণ: ${e.message}`);
  log.error(`logs/ ফোল্ডারে crash log দেখো।`);
  process.exit(1);
});
