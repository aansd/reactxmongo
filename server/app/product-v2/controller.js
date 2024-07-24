const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const index = async (req, res) => {
    const { search } = req.query;
    let whereClause = {};

    if (search) {
        whereClause = {
            where: {
                name: {
                    [Op.like]: `%${search}%`
                }
            }
        };
    }

    try {
        const products = await Product.findAll(whereClause);
        res.json(products);
    } catch (e) {
        res.send(e);
    }
};

const view = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
        if (product) {
            res.json(product), _response(res);
        }
}

const store = async (req, res) => {
    const { users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if (image) {
        const targetPath = path.join(__dirname, '../../uploads', image.originalname);
        try {
            fs.renameSync(image.path, targetPath);
            await Product.sync();
            const newProduct = await Product.create({
                users_id,
                name,
                price,
                stock,
                status,
                image_url: `http://localhost:3000/public/${image.originalname}`
            });
            res.send(newProduct), _response(res);
        } catch (e) {
            res.send(e);
        }
    }
}

const update = async (req, res) => {
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file;

    try {
        let updateFields = {
            users_id,
            name,
            price,
            stock,
            status
        };

        if (image) {
            const targetPath = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, targetPath);
            updateFields.image_url = `http://localhost:3000/public/${image.originalname}`;
        }
        const productId = req.params.id;
        const updateProduct = await Product.update(updateFields, {
            where: { id: productId },
            returning: true
        });

        res.json({
            product: updateProduct[1][0]
        }), _response(res);
    } catch (e) {
      res.send(e);
    }
}

const destroy = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.destroy({
            where: {id: productId}
        });
        res.send(productId), _response(res);
    } catch (e) {
        res.send(e);
    }
}

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: error
            });
        } else {
            res.send({
                status: 'success',
                response: result
            });
        }
    }
}

module.exports ={
    index,
    view,
    store,
    update,
    destroy
}