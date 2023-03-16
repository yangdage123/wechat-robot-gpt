import { getWeather } from './sendrequest.js';
import cityGeo from '../data/city-geo.json' assert { type: 'json' };

const location = '南京市';
const appid = '';

const main = async () => {
    const r = cityGeo.filter((v) => (v.area === location || (v.city === '市辖区' ? v.province === location : v.city === location)));
    if (r.length >= 1) {
        const { lat, lon } = r[0];
        const response = await getWeather({ lat, lon, appid });
        if (response.status === 200) {
            response.data.daily.filter(v => v.temp.day)
        }
    }
}
main();

/*
export const handleMessage = async (message, bot) => {
    const contact = message.talker();
    const msgType = message.type();
    if (msgType === bot.Message.Type.Text) {
        const text = message.text();
        if (text.includes('天气')) {
            await message.say('今天的天气不错哦!')
        }
    }
}*/
