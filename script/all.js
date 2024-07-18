module.exports.config = {
  name: "adminonly",
  version: "1.5",
  role: 2,
  hasPrefix: true,
  aliases: ["adonly", "onlyad", "onlyadmin"],
  description: "Turn on/off only admin can use bot",
  usage: "adminonly [on | off] or adminonly noti [on | off]",
  credits: "NTKhang",
  cooldown: 5,
  category: "owner",
};

module.exports.run = async function({ api, event, args, getLang }) {
  let isSetNoti = false;
  let value;
  let indexGetVal = 0;

  if (args[0] === "noti") {
    isSetNoti = true;
    indexGetVal = 1;
  }

  if (args[indexGetVal] === "on") {
    value = true;
  } else if (args[indexGetVal] === "off") {
    value = false;
  } else {
    return api.sendMessage("Syntax error: Please use the correct command format.", event.threadID, event.messageID);
  }

  if (isSetNoti) {
    config.hideNotiMessage.adminOnly = !value;
    api.sendMessage(getLang(value ? "turnedOnNoti" : "turnedOffNoti"), event.threadID, event.messageID);
  } else {
    config.adminOnly.enable = value;
    api.sendMessage(getLang(value ? "turnedOn" : "turnedOff"), event.threadID, event.messageID);
  }

  fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
};
