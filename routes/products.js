const router = require('express').Router();
const Product = require('../models/Product');
const cloudinary = require('../cloudinary');
const upload = require('../multer');

router.get('/', async (req, res) => {
  await Product.find({}).then((users) => {
    console.log(users);
    res.status(200).send(users);
  });
});

router.post('/uploadImage', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Error',
      });
    }
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Uploaded successfully!',
      url: result.url,
      data: result,
    });
  });
});

router.post('/upload', async (req, res) => {
  let temp = req.body;
  const newProduct = new Product(temp);
  try {
    const savedProduct = await newProduct.save();
    console.log('Product uploaded successfully');
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
