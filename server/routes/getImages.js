const Image = require('../models/Image');
const router = require('express').Router();


router.get('/', async (req, res) => {
  try{
    const images = await Image.find({});
    res.status(200).send(images);
  }
  catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;