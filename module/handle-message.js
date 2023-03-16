

export const handleMessage = async (message, bot) => {
    const contact = message.talker();
    const msgType = message.type();
    if (msgType === bot.Message.Type.Text) {
        const text = message.text();
        if (text.includes('天气')) {
            await message.say('今天的天气不错哦!')
        }
    }

}