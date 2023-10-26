const QuranSura = require('../models/quranSura');
const QuranIndex = require('../models/quranIndex');
const AudioFull = require('../models/audioFull');
const ayatAudio = require('../models/ayatAudio');

const getSura = async (req, res) => {
  const suraNumber = req.params.suraNumber;
  const page = req.params.page;

  const pageSize = 30;

  try {
    const sura = await QuranSura.find({ id: suraNumber }).sort('verses.id');

    const indexDetails = await QuranIndex.findOne({ sura_no: suraNumber });

    const fullAudio = await AudioFull.findOne({
      sura_no: suraNumber.toString(),
    });
    const ayatAudioData = await ayatAudio
      .findOne({ number: suraNumber })
      .sort('ayahs.numberInSurah');

    if (sura && indexDetails) {
      //   res.status(200).json({
      //     bangla: sura[0].verses,
      //     english: sura[1].verses,
      //     details: indexDetails[0],
      //     audio: audio,
      //     ayatAudio: ayatAudioData,
      //   });

      const bangla = sura[0].verses;
      const english = sura[1].verses;
      const audios = ayatAudioData.ayahs;

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const totalPage = Math.ceil(bangla.length / pageSize);

      // merge bangla and english
      const merged = bangla.map((item, index) => {
        if (index < start || index >= end) {
          // remove the verses that are not in the page
          return {};
        } else {
          const enTranslation = () => {
            const enObj = english.find((e) => {
              return e.id === item.id;
            });
            return enObj.translation;
          };

          const audioAyah = () => {
            const audioObj = audios.find((e) => {
              return e.numberInSurah === item.id;
            });
            return audioObj.audio;
          };

          return {
            id: item.id,
            arabic: item.text,
            bangla: item.translation,
            english: enTranslation(),
            audio: audioAyah(),
          };
        }

        // match the english id with bangla id then return the english translation
      });

      // Now remove empty objects from the array
      const filtered = merged.filter((item) => {
        return Object.keys(item).length !== 0;
      });

      res.status(200).json({
        verses: filtered,
        page: Number(page),
        pageSize,
        totalPage,
        fullAudio: fullAudio.audio,
        details: indexDetails,
      });
      //
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
