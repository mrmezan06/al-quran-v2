const QuranIndex = require('../models/quranIndex');

const getIndex = async (req, res) => {
  try {
    const index = await QuranIndex.find({}).sort('sura_no');
    if (index.length > 0) {
      res.status(200).json(index);
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

module.exports = { getIndex };
