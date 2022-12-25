const {
  Configuration,
  OpenAIApi,
} = require('openai');

const User = require('../../../models/user');
const Message = require('../../../models/message');

const config = require('../../../config/config');

const configuration = new Configuration({
  apiKey: config.openAiApiKey,
});

const openai = new OpenAIApi(configuration);

const createResponse = async (chat, clients) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: chat._aiPrompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.4,
      stop: ['[USER]:', '[FRIEND]:'],
    });

    if (response.status !== 200) {
      return;
    }

    const {
      data: {
        choices,
      },
    } = response;

    const responseMessage = choices[0]?.text;

    if (!responseMessage) {
      return;
    }

    const bot = await User.findOne({ role: 'ai-friend-bot' });

    const message = new Message({
      content: responseMessage,
      chatId: chat.id,
      userId: bot.id,
    });

    const newMessage = await message.save();

    chat.lastMessage = newMessage.id; // eslint-disable-line no-param-reassign
    chat._aiPrompt = `${chat._aiPrompt}${newMessage.content}`; // eslint-disable-line no-param-reassign

    const dataToSend = {
      type: 'new message',
      chatId: chat.id,
      continueChat: true,
      data: {
        id: newMessage.id,
        content: newMessage.content,
        userId: newMessage.userId,
        createdAt: newMessage.createdAt,
      },
    };

    clients.forEach((client) => {
      client.send(JSON.stringify(dataToSend));
    });

    await chat.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = createResponse;
