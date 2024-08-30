const fs = require('fs');
const config = require('./config');
const debug = config.debug;
const path = require('path');
const basepath = path.resolve(__dirname, 'aghgmsgw.json');
const grcpath = path.resolve(__dirname, 'groupconfig.json');
const fakeban = path.resolve(__dirname, 'fakeban.json');

// JSON dosyasını okuma
function readJSON(filePath) {
  try {
    console.log(filePath)
    if (!fs.existsSync(filePath)) {
      return {};
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Dosya okuma hatası (${filePath}):`, error.message);
    return {};
  }
}

// JSON dosyasını yazma
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Dosya başarıyla kaydedildi: ${filePath}`);
  } catch (error) {
    console.error(`Dosya yazma hatası (${filePath}):`, error.message);
  }
}

// grcpath ile ilgili işlemler
function readDatabase() {
  return readJSON(grcpath);
}

function writeDatabase(data) {
  writeJSON(grcpath, data);
}

// basepath ile ilgili işlemler
function readwhg() {
  return readJSON(basepath);
}

function writeBase(base) {
  writeJSON(basepath, base);
}

// fakeban ile ilgili işlemler
function readFake() {
  return readJSON(fakeban);
}

function writeFake(base) {
  writeJSON(fakeban, base);
}

// grcpath (groupconfig.json) için mesaj kaydetme ve alma
function saveMessage(id, message) {
  const db = readDatabase();
  db[id] = message;
  writeDatabase(db);
  console.log(`Mesaj kaydedildi: ${id} -> ${message}`);
}

function getMessageById(id) {
  const db = readDatabase();
  return db[id] ? db[id] : undefined;
}

// basepath (aghgmsgw.json) için argüman kaydetme ve alma
function saveArg(id, message) {
  const db = readwhg();
  db[id] = message;
  writeBase(db);
  console.log(`Argüman kaydedildi: ${id} -> ${message}`);
}

function getArgById(id) {
  const db = readwhg();
  return db[id] ? db[id] : undefined;
}

// fakeban (fakeban.json) için fake numara kaydetme ve alma
function saveFake(id, message) {
  const db = readFake();
  db[id] = message;
  writeFake(db);
  console.log(`Fake numara kaydedildi: ${id} -> ${message}`);
}

function getFakeById(id) {
  const db = readFake();
  return db[id] ? db[id] : undefined;
}

module.exports = {
  saveMessage,
  getMessageById,
  saveArg,
  getArgById,
  saveFake,
  getFakeById
};
