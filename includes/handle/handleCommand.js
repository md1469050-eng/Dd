"use strict";
/*
╔═══════════════════════════════════════════════════════════════════╗
║     🤖 BELAL BOTX666 — handleCommand.js v8.1 (noprefix fix)     ║
╚═══════════════════════════════════════════════════════════════════╝
*/
module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = (() => { try { return require("string-similarity"); } catch { return null; } })();
  const moment = require("moment-timezone");
  const path   = require("path");
  const fs     = require("fs-extra");
  const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return async function ({ event }) {
    const dateNow = Date.now();

    // ✅ FIX: destructure করা যাবে না — live read করতে হবে
    // global.config.PREFIX যেকোনো সময় prefix.js বদলাতে পারে
    const ADMINBOT       = global.config?.ADMINBOT || [];
    const NDH            = global.config?.NDH || [];
    const allowInbox     = global.config?.allowInbox;
    const DeveloperMode  = global.config?.DeveloperMode;

    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data || {};
    const { commands, cooldowns } = global.client || {};

    var { body = "", senderID, threadID, messageID } = event;
    senderID = String(senderID);
    threadID = String(threadID);

    if (!body || event.type === "message_unsend") return;
    const botID = String(global.config?.botID || "");
    if (senderID === botID) return;

    // ── Anti-Spam check ───────────────────────────────────────────
    if (global.checkAntiSpam?.(senderID)) return; // চুপচাপ ignore

    // ✅ FIX: প্রতিবার live থেকে PREFIX পড়ো
    const threadSetting   = (threadData && threadData.get(threadID)) || {};
    const effectivePrefix = threadSetting.hasOwnProperty("PREFIX")
      ? threadSetting.PREFIX
      : (global.config?.PREFIX ?? "/");

    // ✅ FIX: noprefix সঠিকভাবে check করো
    const isNoPrefix = effectivePrefix === ""
      || effectivePrefix === null
      || effectivePrefix === undefined;

    // ✅ SPECIAL: "no prefix", "prefix +", "prefix" — এগুলো
    // prefix ছাড়াই আসে, prefix check এর আগেই ধরতে হবে
    const bodyTrimLower = body.trim().toLowerCase();
    const isPrefixTrigger =
      bodyTrimLower === "prefix" ||
      bodyTrimLower === "no prefix" ||
      bodyTrimLower === "noprefix" ||
      bodyTrimLower === "prefix no" ||
      bodyTrimLower.startsWith("prefix +");

    if (isPrefixTrigger) {
      // prefix কমান্ড সরাসরি চালাও
      const prefixCmd = commands.get("prefix");
      if (prefixCmd) {
        const runner = prefixCmd.run || prefixCmd.onStart || prefixCmd.onCall;
        if (runner) {
          const message = {
            reply:  (msg, cb) => api.sendMessage(msg, threadID, cb || (() => {}), messageID),
            send:   (msg, tid) => api.sendMessage(msg, tid || threadID),
            react:  (emoji)   => api.setMessageReaction(emoji, messageID, () => {}, true),
            unsend: (mid)     => api.unsendMessage(mid),
          };
          try {
            await runner({
              api, event, models, Users, Threads, Currencies,
              args: body.trim().split(/ +/).slice(1),
              message, prefix: effectivePrefix,
              threadID, messageID, senderID,
              permssion: 0, role: 0,
              getText: () => "",
            });
          } catch (e) {
            global.log?.error?.(`[prefix] ত্রুটি: ${e.message}`);
          }
        }
      }
      return;
    }

    if (!isNoPrefix) {
      const rx = new RegExp(`^(<@!?${escapeRegex(senderID)}>|${escapeRegex(effectivePrefix)})\\s*`);
      if (!rx.test(body)) return;
    }

    // ── Mode guards ───────────────────────────────────────────────
    const cfg = global.config || {};
    if (!global.data?.allThreadID?.includes(threadID) && !ADMINBOT.includes(senderID) && cfg.adminPaOnly == true)
      return api.sendMessage("🔒 MODE » এই বট শুধুমাত্র admin inbox এ ব্যবহার করা যাবে।", threadID, messageID);
    if (!ADMINBOT.includes(senderID) && cfg.adminOnly == true)
      return api.sendMessage("🔒 MODE » এই বট এখন শুধুমাত্র admin ব্যবহার করতে পারবে।", threadID, messageID);
    if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && cfg.ndhOnly == true)
      return api.sendMessage("🔒 MODE » এই বট এখন শুধুমাত্র bot support ব্যবহার করতে পারবে।", threadID, messageID);

    // ── Adminbox ──────────────────────────────────────────────────
    try {
      const adboxPath = path.join(process.cwd(), "Script/commands/cache/data.json");
      if (fs.existsSync(adboxPath)) {
        const dataAdbox    = JSON.parse(fs.readFileSync(adboxPath, "utf-8"));
        const threadInf    = threadInfo?.get(threadID) || await Threads.getInfo(threadID).catch(() => ({ adminIDs: [] }));
        const isGroupAdmin = (threadInf.adminIDs || []).find(el => String(el.id) == senderID);
        if (
          dataAdbox.adminbox?.[threadID] == true &&
          !ADMINBOT.includes(senderID) &&
          !isGroupAdmin &&
          event.isGroup == true
        ) return api.sendMessage("🔒 MODE » এই গ্রুপে শুধুমাত্র group admin বট ব্যবহার করতে পারবে।", threadID, messageID);
      }
    } catch {}

    // ── Inbox check ───────────────────────────────────────────────
    const isInbox     = senderID === threadID;
    const isAdmin     = ADMINBOT.includes(senderID);
    const adminPaOnly = global.config?.adminPaOnly;

    if (isInbox) {
      // ✅ adminPaOnly: শুধু ADMINBOT ইনবক্সে ব্যবহার করতে পারবে
      if (adminPaOnly && !isAdmin) return;
      // allowInbox false হলে সবার জন্য ইনবক্স বন্ধ
      if (!allowInbox && !isAdmin) return;
    }

    // ── Ban check ─────────────────────────────────────────────────
    if (!isAdmin) {
      if (userBanned?.has(senderID)) {
        const { reason = "কারণ জানানো হয়নি", dateAdded = "" } = userBanned.get(senderID) || {};
        return api.sendMessage(
          `🚫 তুমি এই বট ব্যবহার করতে পারবে না!\n📝 কারণ: ${reason}\n📅 তারিখ: ${dateAdded}`,
          threadID,
          async (err, info) => { await new Promise(r => setTimeout(r, 5000)); api.unsendMessage(info?.messageID).catch(() => {}); },
          messageID
        );
      }
      if (threadBanned?.has(threadID)) {
        const { reason = "কারণ জানানো হয়নি", dateAdded = "" } = threadBanned.get(threadID) || {};
        return api.sendMessage(
          `🚫 এই গ্রুপে বট ব্যবহার নিষিদ্ধ করা হয়েছে!\n📝 কারণ: ${reason}\n📅 তারিখ: ${dateAdded}`,
          threadID,
          async (err, info) => { await new Promise(r => setTimeout(r, 5000)); api.unsendMessage(info?.messageID).catch(() => {}); },
          messageID
        );
      }
    }

    // ── Parse args ────────────────────────────────────────────────
    let args, commandName;
    if (isNoPrefix) {
      const parts = body.trim().split(/ +/);
      commandName = parts.shift().toLowerCase();
      args = parts;
    } else {
      const rx2     = new RegExp(`^(<@!?${escapeRegex(senderID)}>|${escapeRegex(effectivePrefix)})\\s*`);
      const matched = body.match(rx2);
      if (!matched) return;
      const parts = body.slice(matched[0].length).trim().split(/ +/);
      commandName = parts.shift().toLowerCase();
      args        = parts;
    }
    if (!commandName) return;

    // ── Command lookup + aliases + string-similarity ──────────────
    let command = commands.get(commandName)
      || [...commands.values()].find(c =>
          (c.config?.aliases || []).map(a => a.toLowerCase()).includes(commandName)
        );

    if (!command) {
      // ✅ noPrefix mode এ কমান্ড না পেলে চুপ থাকো
      // কারণ: সাধারণ কথাবার্তাও কমান্ড হিসেবে আসে
      if (isNoPrefix) return;

      // prefix mode এ string-similarity দিয়ে কাছাকাছি suggest করো
      if (stringSimilarity) {
        const allNames = [...commands.keys()];
        if (allNames.length) {
          const checker = stringSimilarity.findBestMatch(commandName, allNames);
          if (checker.bestMatch.rating >= 0.5) {
            command = commands.get(checker.bestMatch.target);
          } else {
            return api.sendMessage(
              `❓ "${commandName}" নামে কোনো কমান্ড নেই!\n💡 কাছাকাছি: ${effectivePrefix}${checker.bestMatch.target}\n📋 সব কমান্ড: ${effectivePrefix}menu`,
              threadID
            );
          }
        }
      }
      if (!command) return;
    }

    // ── commandBanned ─────────────────────────────────────────────
    if (!ADMINBOT.includes(senderID)) {
      const banT = commandBanned?.get(threadID) || [];
      const banU = commandBanned?.get(senderID)  || [];
      if (banT.includes(command.config.name))
        return api.sendMessage(
          `🚫 এই গ্রুপে "${command.config.name}" কমান্ড ব্যবহার নিষিদ্ধ!`,
          threadID,
          async (err, info) => { await new Promise(r => setTimeout(r, 5000)); api.unsendMessage(info?.messageID).catch(() => {}); },
          messageID
        );
      if (banU.includes(command.config.name))
        return api.sendMessage(
          `🚫 তোমার জন্য "${command.config.name}" কমান্ড ব্যবহার নিষিদ্ধ!`,
          threadID,
          async (err, info) => { await new Promise(r => setTimeout(r, 5000)); api.unsendMessage(info?.messageID).catch(() => {}); },
          messageID
        );
    }

    // ── NSFW guard ────────────────────────────────────────────────
    const cmdCat = (command.config?.commandCategory || command.config?.category || "").toLowerCase();
    if (cmdCat === "nsfw" && !global.data?.threadAllowNSFW?.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage(
        `🔞 এই গ্রুপে NSFW কমান্ড ব্যবহার করা যাবে না!\n✅ চালু করতে: ${effectivePrefix}nsfw on`,
        threadID,
        async (err, info) => { await new Promise(r => setTimeout(r, 5000)); api.unsendMessage(info?.messageID).catch(() => {}); },
        messageID
      );

    // ── Permission 0/1/2/3 ────────────────────────────────────────
    let permssion = 0;
    try {
      const tInfo = threadInfo?.get(threadID) || await Threads.getInfo(threadID).catch(() => ({ adminIDs: [] }));
      const isGA  = (tInfo.adminIDs || []).find(el => String(el.id) == senderID);
      if (ADMINBOT.includes(String(senderID)))     permssion = 3;
      else if (NDH.includes(String(senderID)))     permssion = 2;
      else if (isGA)                               permssion = 1;
    } catch {}

    const requiredPerm = command.config?.hasPermssion ?? command.config?.role ?? 0;
    if (requiredPerm > permssion) {
      const permNames = ["সবাই", "গ্রুপ Admin", "Bot Support", "Bot Admin"];
      return api.sendMessage(
        `🔒 এই কমান্ড ব্যবহার করতে "${permNames[requiredPerm]}" পারমিশন দরকার!\n❌ তোমার পারমিশন: ${permNames[permssion]}`,
        threadID, messageID
      );
    }

    // ── Cooldown ──────────────────────────────────────────────────
    if (!cooldowns.has(command.config.name)) cooldowns.set(command.config.name, new Map());
    const timestamps = cooldowns.get(command.config.name);
    const cdSecs     = command.config.cooldowns ?? command.config.countDown ?? command.config.coolDown ?? 1;
    if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + cdSecs * 1000) {
      const left = ((timestamps.get(senderID) + cdSecs * 1000 - dateNow) / 1000).toFixed(1);
      return api.sendMessage(`⏳ একটু অপেক্ষা করো!\n🕐 ${left} সেকেন্ড পরে আবার চেষ্টা করো।`, threadID, messageID);
    }

    // ── per-command getText ───────────────────────────────────────
    let getText2 = () => "";
    const lang2 = global.config?.language || "en";
    if (command.languages?.[lang2]) {
      getText2 = (...v) => {
        let t = command.languages[lang2][v[0]] || "";
        for (let i = v.length; i > 0; i--) t = t.replace(new RegExp("%" + i, "g"), v[i]);
        return t;
      };
    }

    // ── Execute ───────────────────────────────────────────────────
    global.log?.cmd?.(`⚡ [${command.config.name}] ← ${senderID}`);
    try {
      const message = {
        reply:  (msg, cb)  => api.sendMessage(msg, threadID, cb || (() => {}), messageID),
        send:   (msg, tid) => api.sendMessage(msg, tid || threadID),
        react:  (emoji)    => api.setMessageReaction(emoji, messageID, () => {}, true),
        unsend: (mid)      => api.unsendMessage(mid),
      };

      const Obj = {
        api, event, args, models,
        Users, Threads, Currencies,
        permssion, role: permssion,
        message, getText: getText2,
        prefix: effectivePrefix,
        threadID, messageID, senderID,
        onReply(handler) {
          global.client.handleReply.push({
            author: senderID, messageID,
            name: command.config.name,
            commandName: command.config.name,
            handler,
          });
        },
        onReact(handler) {
          global.client.handleReaction.push({
            author: senderID, messageID,
            name: command.config.name,
            commandName: command.config.name,
            handler,
          });
        },
      };

      const runner = command.run || command.onStart || command.onCall;
      if (!runner) throw new Error(`কমান্ড [${command.config.name}] এ run/onStart/onCall নেই`);

      // ── Timeout wrapper — command ৬০ সেকেন্ডে শেষ না হলে kill ──
      await Promise.race([
        runner(Obj),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Command timeout (60s)")), 60000)
        ),
      ]);

      timestamps.set(senderID, dateNow);
      if (DeveloperMode)
        global.log?.info?.(`[DEV] ${commandName} | ${senderID} | ${Date.now() - dateNow}ms`);

    } catch (e) {
      const msg   = e?.message || String(e);
      const isNet = ["ECONNRESET","ETIMEDOUT","ENOTFOUND","network","fetch","axios","socket"].some(k => msg.includes(k));
      const isTmr = msg.includes("timeout");

      global.log?.warn?.(`⚠️ [${command?.config?.name || commandName}]: ${msg.slice(0, 100)}`);

      // Network error — user কে বলো retry করতে
      if (isNet) {
        api.sendMessage(`⚠️ "${commandName}" — নেটওয়ার্ক সমস্যা! কিছুক্ষণ পরে আবার চেষ্টা করো। 🔄`, threadID);
      } else if (isTmr) {
        api.sendMessage(`⏱️ "${commandName}" — সময় শেষ! আবার চেষ্টা করো।`, threadID);
      } else {
        api.sendMessage(
          `❌ "${commandName}" কমান্ড চালাতে সমস্যা!
📝 ${msg.slice(0, 100)}
🔄 আবার চেষ্টা করো।`,
          threadID
        );
      }
    }
  };
};
