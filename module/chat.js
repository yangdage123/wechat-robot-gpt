import {Configuration, OpenAIApi} from 'openai';
import config from '../data/config.json' assert { type: 'json' };

const configuration = new Configuration({
    apiKey: config.openaiKey,
});

const openai = new OpenAIApi(configuration);

export const handleChat = async (message) => {
    console.log('handle answer');
    const question = message.text().split('机器杨')[1];
    const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${question}`,
            temperature: 0.7,
            max_tokens: 2380,
        });
    const answer = response.data.choices[0].text;
    await message.say(answer);
    console.log('send answer')
}
