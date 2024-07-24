const Product = require('./models');
const path = require('path');
const fs = require('fs');


const index = (req, res) => {
    Product.find({})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const view = (req, res) => {
    const { id } = req.params;
    Product.findOne({ _id: id })
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const create = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
       Product.create({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const update = async (req, res) => {
   
    const { id, name, price, stock, status } = req.body;
    const image = req.file;
    const product = await Product.findOne({ _id: id });
    if (!product) {
        return res.status(404).send({ error: 'Product id not found' });
    }
    let updateFields = { name, price, stock, status };

    if (image) {
        const targetPath = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, targetPath);
        updateFields.image_url = `http://localhost:3000/public/${image.originalname}`;
    }

    Product.findByIdAndUpdate(product._id, updateFields, { new: true })
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const destroy = (req, res) => {
    const {id} = req.body;
    Product.findByIdAndDelete({_id: id})
    .then(result => res.send(result))
    .catch(error => res.send(error));
  }

module.exports = {
    index,
    view,
    create,
    update,
    destroy
}