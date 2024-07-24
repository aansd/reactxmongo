const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productCOntrollerV4 = require('./controller');
const {createValidator} = require('./validator');

router.get('/product', productCOntrollerV4.index);
router.get('/product/:id', productCOntrollerV4.view);
router.post('/product',createValidator, upload.single('image'), productCOntrollerV4.create );
router.put('/product/:id', upload.single('image'), productCOntrollerV4.update);
router.delete('/product/:id', productCOntrollerV4.destroy);

module.exports = router;