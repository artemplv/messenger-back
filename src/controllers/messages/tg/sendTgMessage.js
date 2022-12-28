const https = require('https');
const querystring = require('querystring');
const User = require('../../../models/user');

const tgBotToken = process.env.TELEGRAM_BOT_TOKEN;
const adminUserTgId = process.env.ADMIN_USER_TELEGRAM_ID;

const baseUrl = `https://api.telegram.org/bot${tgBotToken}`;

function sendRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => (res.statusCode === 200 ? resolve(res) : reject(res)))
      .on('error', reject);
  });
}

const sendTgMessage = async (userId, chatId, message) => {
  try {
    const user = await User.findById(userId);

    const messageToSend = 'You got a new message\n\n'
      + `*From:* ${user.firstName} ${user.lastName} (${user.username})\n`
      + `*User id:* ${user.id}\n`
      + `*Chat id:* ${chatId}\n`
      + `*Message:* ${message.content}\n`
      + `*Received at:* ${message.createdAt}`;

    const urlParams = querystring.stringify({
      chat_id: adminUserTgId,
      text: messageToSend,
      parse_mode: 'Markdown',
    });

    await sendRequest(`${baseUrl}/sendMessage?${urlParams}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendTgMessage;
