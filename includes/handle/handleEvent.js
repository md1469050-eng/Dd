"use strict";
module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const moment = require("moment-timezone");
  return function ({ event }) {
    const { userBanned, threadBanned } = global.data || {};
    const { events } = global.client || {};
    const { allowInbox, DeveloperMode } = global.config || {};
    var { senderID, threadID } = event;
    senderID = String(senderID);
    threadID = String(threadID);
    if (userBanned?.has(senderID) || threadBanned?.has(threadID) || (allowInbox == false && senderID == threadID)) return;
    if (event.type == "change_thread_image") event.logMessageType = "change_thread_image";
    if (!events) return;
    for (const [key, value] of events.entries()) {
      if (global.config?.eventDisabled?.includes(key)) continue;
      const eventTypes = value.config?.eventType || [];
      const matched    = Array.isArray(eventTypes) && eventTypes.includes(event.logMessageType);
      const hasBelal   = typeof value.handleEvent === "function";
      if (!matched && !hasBelal) continue;
      // ── Isolated async execution — একটা event crash হলে বাকিগুলো চলবে ──
      Promise.resolve().then(async () => {
        const Obj = { api, event, models, Users, Threads, Currencies };
        if (matched && typeof value.run === "function") {
          await value.run(Obj);
          if (DeveloperMode) global.log?.info?.(`[Event] ${value.config.name} | ${threadID}`);
        } else if (hasBelal) {
          await value.handleEvent(Obj);
        }
      }).catch(e => {
        const msg = e?.message || String(e);
        const isNet = ["ECONNRESET","ETIMEDOUT","network","axios"].some(k => msg.includes(k));
        if (!isNet) global.log?.warn?.(`⚠️ [Event:${value.config?.name}]: ${msg.slice(0,80)}`);
      });
    }
  };
};
