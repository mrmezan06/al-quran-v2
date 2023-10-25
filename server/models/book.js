const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    part: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      enum: [
        'Quran',
        'Hadith',
        'Fiqh',
        'Seerah',
        'History',
        'Tafseer',
        'Aqeedah',
        'Dawah',
        'Other',
      ],
      default: 'Other',
    },
    url: {
      type: [String],
      required: true,
    },
    author: {
      type: String,
      trim: true,
    },
    uploader: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now(),
    },
    updater: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
