const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./utils/DB');
dotenv.config();
const cors = require('cors');

// const suraRoutes = require('./routes/suraRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const ayatRoutes = require('./routes/ayatRoutes');
// const hadithRoutes = require('./routes/hadithRoutes');
const indexRoutes = require('./routes/indexRoutes');
const suraRoutes = require('./routes/suraRoutes');

const app = express();
app.use(express.json());

// WhiteList Array of Origins
const whitelist = ['https://islamic-life.netlify.app', 'http://localhost:3000'];

// Cors Options
const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('Not Allowed By CORS');
      callback(new Error('Not Allowed By CORS'));
    }
  },
};

app.use(cors(corsOptions));

// app.use('/api/sura', suraRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/ayat', ayatRoutes);
// app.use('/api/hadith', hadithRoutes);

app.use('/api/v2/', indexRoutes);
app.use('/api/v2/sura', suraRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
  connectDB();
});
