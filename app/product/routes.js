const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads'});
const productCOntroller = require('./controller');



router.get('/product', productCOntroller.index);
router.get('/product/:id', productCOntroller.view);
router.post('/product/', upload.single('image'), productCOntroller.store );
router.put('/product/:id',upload.single('image'), productCOntroller.update);
router.delete('/product/:id', upload.single('image'), productCOntroller.destroy);


module.exports = router;