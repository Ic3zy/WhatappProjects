const path = require('path');
const debug = config.debug;
const pypath = path.join(__dirname, '..', 'functions\\ytdlp.py');
const mp3path = path.join(__dirname, '..', 'download.mp3');
const { MessageMedia } = require('whatsapp-web.js');
const { exec } = require('child_process');
const { worktype } = require('../config');
module.exports = {
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${prefix}song`)) {
            const BotId = msg.client.info.wid._serialized;
            var msgId = undefined;
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            if (chat.isGroup) {
                var msgId = msg.id.participant;
            }
            else {
                var msgId = msg.from;
            }
            if (debug) {
                console.log(msgId);
            }
            if (debug) {
                console.log(msgId);
            }

            let sudo = false;
            let onay = false;

            for (const i of sudoUsers) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                    break;
                }
            }

            if (!onay && msgId === BotId) {
                onay = true;
            }

            if (debug) {
                console.log(onay);
            }
            if (worktype==='public') {
                var arg = msg.body.trim().replace(`${prefix}song `, '');
                if (arg===' ' || arg==='') {
                    msg.client.sendMessage(chatId, 'Lütfen aramak istediğiniz bir şarkı ismi giriniz.');
                    return;
                }
                msg.client.sendMessage(chatId, 'Şakıyı indiriyorum lütfen bekleyiniz.');
                exec(`python ${pypath} ${arg}`, (error, stdout) => {
                    if (error) {
                        msg.client.sendMessage(chatId, 'Python dosyası çalıştırılırken bir hat oluştu bilgisayarınızda python ve ytdlp kurulu olduğundan emin olun.');
                        return;
                    }
                    const media = MessageMedia.fromFilePath(mp3path);
                    msg.client.sendMessage(chatId, media);
                });
            } else if (worktype==='private') {
                var arg = msg.body.trim().replace(`${prefix}song `, '');
                if (arg===' ' || arg==='') {
                    msg.client.sendMessage(chatId, 'Lütfen aramak istediğiniz bir şarkı ismi giriniz.');
                    return;
                }
                msg.client.sendMessage(chatId, 'Şakıyı indiriyorum lütfen bekleyiniz.');
                exec(`python ${pypath} ${arg}`, (error, stdout) => {
                    if (error) {
                        msg.client.sendMessage(chatId, 'Python dosyası çalıştırılırken bir hat oluştu bilgisayarınızda python ve ytdlp kurulu olduğundan emin olun.');
                        return;
                    }
                    const media = MessageMedia.fromFilePath(mp3path);
                    msg.client.sendMessage(chatId, media);
                });
            }
        }
    }
};
