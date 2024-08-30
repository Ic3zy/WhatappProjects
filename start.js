const fs = require('fs');
const { exec } = require('child_process');
const nodeModulesDir = './node_modules';
const botScript = 'bot.js';
if (!fs.existsSync(nodeModulesDir)) {
    console.log('node_modules klasörü bulunamadı, bağımlılıklar yükleniyor...');
    exec('npm install', (error, stdout, stderr) => {
        if (error) {
            console.error(`npm install sırasında hata oluştu: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        startBot();
    });
} else {
    console.log('node_modules mevcut, bağımlılıklar zaten yüklü.');
    startBot();
}
function startBot() {
    console.log('Bot başlatılıyor...');
    exec(`node ${botScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Bot çalıştırılırken hata oluştu: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
