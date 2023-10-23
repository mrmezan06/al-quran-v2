const mongoose = require('mongoose');

const quranIndexSchema = mongoose.Schema(
  {
    sura_no: {
      type: Number,
      required: true,
    },
    total_ayat: {
      type: Number,
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
    arabic_english: {
      type: String,
      required: true,
    },
    english: {
      type: String,
      required: true,
    },
    arabic_bangla: {
      type: String,
      required: true,
    },
    bangla: {
      type: String,
      required: true,
    },
    revealation: {
      type: String,
      required: true,
    },
    rukus: [Number],
    sajdas: [Number],
    juzs: [Number],
    manzils: [Number],
    para: {
      type: Number,
      required: true,
    },
  },
  { collection: 'quran_index' },
  { timestamps: true }
);

const QuranIndex = mongoose.model('QuranIndex', quranIndexSchema);

module.exports = QuranIndex;
