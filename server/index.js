const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const ImageUploads = require('./models/Image');
const getImagesRoutes = require('./routes/getImages');

const app = express();
const port = process.env.PORT || 5000;

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Multer
const upload = multer({storage: storage})

// Middleware for parsing JSON
app.use(express.json({limit: '50mb'}));
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    })

// upload images api to MongoDB
app.post('/api/upload',upload.single('image'), async (req, res) => {
  console.log(req);
  try {
    const saveImg = await ImageUploads.create({
      name: req.file.originalname,
      image: {
        data: fs.readFileSync('uploads/' + req.file.originalname),
        contentType: req.file.mimetype
      }
    });

    saveImg.save();
    res.status(201).send('Image uploaded successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});


// Routes
app.use('/api/images', getImagesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

