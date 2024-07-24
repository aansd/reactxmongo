const {check} = require('express-validator');

exports.createValidator = [
    check('name', 'nama wajib di isi').not().isEmpty(),
    check('price', 'harga wajib di isi').not().isEmpty(),
    check('stock', 'stock wajib di isi').not().isEmpty(),
]