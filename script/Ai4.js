const { get } = require('axios');

module.exports.config = {
  name: 'ai4',
  credits: "Anonymous",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 1,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(' ');
  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, event.messageID);
  }

  const url = "Have a good day";

  if (!question) return sendMessage("Please provide a question");

  try {
    const response = await get(`${url}?question=${encodeURIComponent(question)}`);
    sendMessage(response.data.reply);
  } catch (error) {
    sendMessage("An error occurred: " + error.message);
  }
};
