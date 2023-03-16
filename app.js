import { WechatyBuilder } from 'wechaty'
import { handleMessage } from './module/handle-message.js'


const wechaty = WechatyBuilder.build() // get a Wechaty instance


wechaty
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login',            user => console.log(`User ${user} logged in`))
    .on('message', async (message) => {
        await handleMessage(message, wechaty);
    })
wechaty.start();



