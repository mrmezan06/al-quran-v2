const QuranSura = require('../models/quranSura');
const QuranIndex = require('../models/quranIndex');
const AudioFull = require('../models/audioFull');
const ayatAudio = require('../models/ayatAudio');

const getSura = async (req, res) => {
  const suraNumber = req.params.suraNumber;

  try {
    const sura = await QuranSura.find({ id: suraNumber }).sort('verses.id');

    const indexDetails = await QuranIndex.find({ sura_no: suraNumber });

    const audio = await AudioFull.findOne({ sura_no: suraNumber.toString() });
    const ayatAudioData = await ayatAudio
      .findOne({ number: suraNumber })
      .sort('ayahs.numberInSurah');

    if (sura && indexDetails) {
      res.status(200).json({
        bangla: sura[0].verses,
        english: sura[1].verses,
        details: indexDetails[0],
        audio: audio,
        ayatAudio: ayatAudioData,
      });
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

module.exports = { getSura };
