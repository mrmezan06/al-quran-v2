const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

const QuranIndex = require('./models/quranIndex');
const QuranSura = require('./models/quranSura');
const AudioFull = require('./models/audioFull');
const ayatAudio = require('./models/ayatAudio');

const quranIndexData = require('./data/quranIndexData');
const quranSuraDataE = require('./data/arabicEnglish');
const quranSuraData = require('./data/arabicBangla');
const audioFullData = require('./data/audioFull');
const ayatAudioData = require('./data/ayatAudio');

dotenv.config();
const connectDB = require('./utils/DB');

connectDB();

const importData = async () => {
  try {
    // Index deletion
    await QuranIndex.deleteMany();
    // Index insertion
    await QuranIndex.insertMany(quranIndexData);
    // Sura deletion
    await QuranSura.deleteMany();
    // Sura insertion
    // arabicBangla
    await QuranSura.insertMany(quranSuraData);
    // arabicEnglish
    await QuranSura.insertMany(quranSuraDataE);
    // AudioFull deletion
    await AudioFull.deleteMany();
    // AudioFull insertion
    await AudioFull.insertMany(audioFullData);
    // ayatAudio deletion
    await ayatAudio.deleteMany();
    // ayatAudio insertion
    await ayatAudio.insertMany(ayatAudioData);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await QuranIndex.deleteMany();
    await QuranSura.deleteMany();
    await AudioFull.deleteMany();
    await ayatAudio.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// Run this command to import data:
// node server/seeder.js
// Run this command to delete data:
// node server/seeder.js -d
