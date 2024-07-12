const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const productCOntrollerV2 = require('./controller');

router.get('/product', productCOntrollerV2.index);
router.get('/product/:id', productCOntrollerV2.view);
router.post('/product', upload.single('image'), productCOntrollerV2.store );
router.put('/product/:id', upload.single('image'), productCOntrollerV2.update );
router.delete('/product/:id', upload.single('image'), productCOntrollerV2.destroy);
module.exports = router;
