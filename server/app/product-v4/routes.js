const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const Product = require('./models');
const path = require('path');
const fs = require('fs');
const productCOntrollerV4 = require('./controller');


router.get('/product', productCOntrollerV4.index);
router.get('/product/:id', productCOntrollerV4.view);
router.post('/product', upload.single('image'), productCOntrollerV4.create );
router.put('/product', upload.single('image'), productCOntrollerV4.update);
router.delete('/product/:id', productCOntrollerV4.destroy);

module.exports = router;