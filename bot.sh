if [ ! -d "node_modules" ]; then
  echo "node_modules klasörü bulunamadı, bağımlılıklar yükleniyor..."
  npm install
else
  echo "node_modules mevcut, bağımlılıklar zaten yüklü."
fi
echo "Bot başlatılıyor..."
node bot.js
