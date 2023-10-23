const mongoose = require('mongoose');

const quranSuraSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    transliteration: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    total_verses: {
      type: Number,
      required: true,
    },
    context: {
      type: String,
      default: 'arabic-bangla',
    },
    verses: [
      {
        id: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        translation: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: 'quran_sura' },
  { timestamps: true }
);

const QuranSura = mongoose.model('QuranSura', quranSuraSchema);

module.exports = QuranSura;
