import { getWeather } from './sendrequest.js';
import cityGeo from '../data/city-geo.json' assert { type: 'json' };
import config from '../data/config.json' assert { type: 'json' };
import { getWindLevel } from './wind-level.js';
import { handleChat } from './chat.js';

const location = '南京市';
const appid = config.apikey;

const formatWeatherMsg = ({ max, min, day, feels, weatherDesc, weatherIcon, windLevel }) => {
    return `今天白天${day}℃  ${weatherDesc}
${min}℃ / ${max}℃
体感${feels}℃，风力${windLevel}级`;
}

// https://openweathermap.org/api/one-call-api
const handleWeather = async (message) => {
    console.log('handle weather！');
    const r = cityGeo.filter((v) => (v.area === location || (v.city === '市辖区' ? v.province === location : v.city === location)));
    if (r.length >= 1) {
        const { lat, lon } = r[0];
        console.log('request weather data!');
        const response = await getWeather({ lat, lon, appid });
        if (response.status === 200) {
            console.log('get weather data');
            const dailyWeather = response.data.daily.map((v) => {
                const { temp, feels_like, weather, wind_speed } = v;
                const weatherDesc = weather[0].description;
                const icon = weather[0].description;
                return {
                    max: temp.max, // 最高温度
                    min: temp.min, // 最低温度
                    day: temp.day, // 白天温度
                    feels: feels_like.day, // 体感温度
                    weatherDesc,
                    weatherIcon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
                    windLevel: getWindLevel(wind_speed),
                }
            });
            const msg = formatWeatherMsg(dailyWeather[0]);
            await message.say(msg);
            console.log('send weather!');
        }
    }
}

const manageSystem = () => {

}

export const handleMessage = async (message, bot) => {
    const contact = message.talker();
    const msgType = message.type();
    if (msgType === bot.Message.Type.Text) {
        const text = message.text();
        if (text.startsWith('天气')) {
            await handleWeather(message);
        } else if (text.startsWith('机器杨')) {
            await handleChat(message);
        }
    }
}
