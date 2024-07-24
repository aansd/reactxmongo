const db = require('../../config/mongodb');
const {ObjectId} = require('bson');
const fs = require('fs');
const path = require('path');


const index = (req, res) =>{
    db.collection('product').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const view = (req, res) => {
    const {id} = req.params;
    db.collection('product').findOne({_id: new ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const store = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('product').insertOne({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const destroy = (req, res) => {
    const { id } = req.params;
    db.collection('product').deleteOne({ _id: new ObjectId(id) })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};


  const update = (req, res) => {
    const id = req.params.id; 
    const { name, price, stock, status } = req.body;
    const image = req.file; 
    
    
    let updateFields = { name, price, stock, status };

    if (image) {
        const targetPath = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, targetPath);
        updateFields.image_url = `http://localhost:3000/public/${image.originalname}`;
    }

    db.collection('product').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
    )
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}