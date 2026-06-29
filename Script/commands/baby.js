"use strict";
/*
╔══════════════════════════════════════════════════════════╗
║  💬 baby.js v9.0 — BELAL BOTX666                         ║
║  ✅ onStart যোগ করা হয়েছে                               ║
║  ✅ getSafeLink ping test বাদ — দ্রুত startup           ║
║  ✅ handleReply infinite loop fix                        ║
╚══════════════════════════════════════════════════════════╝
*/

const axios = require("axios");

// ── apiHelper safe loader ──────────────────────────────────────
const _apiHelper = (() => {
  try { return require("../../utils/apiHelper"); } catch {}
  try { return require("../utils/apiHelper"); } catch {}
  return global._apiHelper || global.apiHelper || {};
})();
const {
  getBaseApi = () => null,
} = _apiHelper;

const FALLBACK_BASES = [
  "https://kaiz-apis.gleeze.com/api",
  "https://www.noobs-api.rf.gd/dipto",
  "https://api-aroniix.koyeb.app",
];

let _cachedLink = null;

// ✅ FIX: ping test বাদ — শুধু URL বানাও, crash করো না
async function getSafeLink() {
  if (_cachedLink) return _cachedLink;
  try {
    const base = await getBaseApi();
    if (base && typeof base === "string" && base.startsWith("http")) {
      _cachedLink = `${base}/baby`;
      return _cachedLink;
    }
  } catch {}
  _cachedLink = `${FALLBACK_BASES[0]}/baby`;
  return _cachedLink;
}

async function safeBabyGet(link, params) {
  try {
    if (!link || !link.startsWith("http")) throw new Error("Invalid link");
    const res = await axios.get(`${link}?${params}`, { timeout: 20000 });
    return res?.data || {};
  } catch (e) {
    return { reply: null, message: null, error: e.message };
  }
}

module.exports.config = {
  name: "baby",
  version: "9.0.0",
  credits: "dipto x BELAL BOTX666",
  cooldowns: 0,
  hasPermssion: 0,
  role: 0,
  description: "AI চ্যাট বট — কখনো crash হবে না",
  commandCategory: "chat",
  category: "chat",
  usePrefix: true,
  usages: `[anyMessage] OR
teach [YourMessage] - [Reply1], [Reply2]...
remove [YourMessage]
list OR list all
edit [YourMessage] - [NewMessage]`,
};

// ✅ FIX: onStart যোগ করা হয়েছে (অনেক বট framework এটা দরকার করে)
module.exports.onStart = async function (ctx) {
  return module.exports.run(ctx);
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID } = event;

  try {
    const link  = await getSafeLink();
    const dipto = args.join(" ").toLowerCase().trim();
    const uid   = senderID;

    if (!args[0]) {
      const ran = ["Bolo baby 😊", "hum?", "type !baby hi", "ki bolba bolo"];
      return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], threadID, messageID);
    }

    // ── REMOVE ──
    if (args[0] === "remove") {
      const fina = dipto.replace("remove ", "");
      const data = await safeBabyGet(link, `remove=${encodeURIComponent(fina)}&senderID=${uid}`);
      return api.sendMessage(data.message || "❌ মুছতে পারিনি।", threadID, messageID);
    }

    // ── REMOVE by index ──
    if (args[0] === "rm" && dipto.includes("-")) {
      const [fi, f] = dipto.replace("rm ", "").split(" - ");
      const data = await safeBabyGet(link, `remove=${encodeURIComponent(fi)}&index=${f}`);
      return api.sendMessage(data.message || "❌ মুছতে পারিনি।", threadID, messageID);
    }

    // ── LIST ──
    if (args[0] === "list") {
      if (args[1] === "all") {
        const data = await safeBabyGet(link, "list=all");
        const list = data?.teacher?.teacherList || [];
        if (!list.length) return api.sendMessage("📋 কোনো teach করা message নেই।", threadID, messageID);
        const teachers = await Promise.all(list.map(async (item) => {
          const number = Object.keys(item)[0];
          const value  = item[number];
          let name = "unknown";
          try { name = await Users.getName(number) || "unknown"; } catch {}
          return { name, value };
        }));
        teachers.sort((a, b) => b.value - a.value);
        const output = teachers.map((t, i) => `${i+1}/ ${t.name}: ${t.value}`).join("\n");
        return api.sendMessage(`Total Teach = ${list.length}\n\n👑 List of Teachers:\n${output}`, threadID, messageID);
      }
      const data = await safeBabyGet(link, "list=all");
      const list = data?.teacher?.teacherList || [];
      return api.sendMessage(`Total Teach = ${list.length}`, threadID, messageID);
    }

    // ── MESSAGE ──
    if (args[0] === "msg" || args[0] === "message") {
      const fuk  = dipto.replace(/^(msg|message) /, "");
      const data = await safeBabyGet(link, `list=${encodeURIComponent(fuk)}`);
      return api.sendMessage(`Message: ${fuk} = ${data.data || "পাওয়া যায়নি"}`, threadID, messageID);
    }

    // ── EDIT ──
    if (args[0] === "edit") {
      const [oldMsg, newMsg] = dipto.replace("edit ", "").split(" - ");
      if (!oldMsg || !newMsg)
        return api.sendMessage("❌ Format: edit [message] - [newReply]", threadID, messageID);
      const data = await safeBabyGet(link, `edit=${encodeURIComponent(oldMsg)}&replace=${encodeURIComponent(newMsg)}`);
      return api.sendMessage(`✅ Changed: ${data.message || "সম্পন্ন"}`, threadID, messageID);
    }

    // ── TEACH normal ──
    if (args[0] === "teach" && args[1] !== "amar" && args[1] !== "react") {
      const [comd, command] = dipto.split(" - ");
      const final = (comd || "").replace("teach ", "");
      if (!command || command.length < 2)
        return api.sendMessage("❌ Format: teach [message] - [reply1], [reply2]...", threadID, messageID);
      const data = await safeBabyGet(link, `teach=${encodeURIComponent(final)}&reply=${encodeURIComponent(command)}&senderID=${uid}`);
      let name = "unknown";
      try { name = await Users.getName(data.teacher) || "unknown"; } catch {}
      return api.sendMessage(`✅ Added!\nTeacher: ${name}\nTeachs: ${data.teachs || "?"}`, threadID, messageID);
    }

    // ── TEACH intro ──
    if (args[0] === "teach" && args[1] === "amar") {
      const [comd, command] = dipto.split(" - ");
      const final = (comd || "").replace("teach ", "");
      if (!command || command.length < 2)
        return api.sendMessage("❌ Format: teach amar [message] - [reply]", threadID, messageID);
      const data = await safeBabyGet(link, `teach=${encodeURIComponent(final)}&senderID=${uid}&reply=${encodeURIComponent(command)}&key=intro`);
      return api.sendMessage(`✅ Added: ${data.message || "সম্পন্ন"}`, threadID, messageID);
    }

    // ── TEACH react ──
    if (args[0] === "teach" && args[1] === "react") {
      const [comd, command] = dipto.split(" - ");
      const final = (comd || "").replace("teach react ", "");
      if (!command)
        return api.sendMessage("❌ Format: teach react [message] - [react1], [react2]...", threadID, messageID);
      const data = await safeBabyGet(link, `teach=${encodeURIComponent(final)}&react=${encodeURIComponent(command)}`);
      return api.sendMessage(`✅ Reacts added: ${data.message || "সম্পন্ন"}`, threadID, messageID);
    }

    // ── Special keyword ──
    if (["amar name ki","amr nam ki","amar nam ki","amr name ki"].some(p => dipto.includes(p))) {
      const data = await safeBabyGet(link, `text=amar name ki&senderID=${uid}&key=intro`);
      return api.sendMessage(data.reply || "আমি BELAL BOTX666 🪬", threadID, messageID);
    }

    // ── DEFAULT CHAT ──
    const data  = await safeBabyGet(link, `text=${encodeURIComponent(dipto)}&senderID=${uid}&font=1`);
    const reply = data.reply || "🤔 বুঝতে পারিনি, আবার বলো!";

    // ✅ FIX: handleReply এ শুধু push করো যদি valid reply আসে
    if (data.reply) {
      return api.sendMessage(reply, threadID, (err, info) => {
        if (err || !info) return;
        global.client?.handleReply?.push({
          name: "baby",
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          apiUrl: link,
        });
      }, messageID);
    }

    return api.sendMessage(reply, threadID, messageID);

  } catch (e) {
    console.error("baby.js error:", e.message);
    return api.sendMessage("⚠️ চ্যাট সার্ভিস এই মুহূর্তে ব্যস্ত। আবার চেষ্টা করো!", threadID, messageID);
  }
};

// ── HANDLE REPLY ──
module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (event.type !== "message_reply") return;
    const reply = event.body?.toLowerCase()?.trim();
    // ✅ FIX: empty বা শুধু number reply ignore করো
    if (!reply || !isNaN(reply) || reply.length < 2) return;

    const link = handleReply?.apiUrl || await getSafeLink();
    const data = await safeBabyGet(link, `text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`);
    const text = data.reply || "🤔 বুঝতে পারিনি!";

    // ✅ FIX: reply আসলেই পরের handleReply push করো
    if (data.reply) {
      return api.sendMessage(text, event.threadID, (err, info) => {
        if (err || !info) return;
        global.client?.handleReply?.push({
          name: "baby",
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          apiUrl: link,
        });
      }, event.messageID);
    }

    return api.sendMessage(text, event.threadID, event.messageID);
  } catch (e) {
    console.error("baby.js handleReply error:", e.message);
  }
};

// startup cache warm
setTimeout(() => getSafeLink().catch(() => {}), 1000);
