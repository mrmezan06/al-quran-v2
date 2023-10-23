const mongoose = require('mongoose');

const AudioFullSchema = new mongoose.Schema(
  {
    sura_no: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AudioFull', AudioFullSchema);
