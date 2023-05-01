const db = require('../config/database.js');
const Item = db.items;

exports.create = async (req, res) => {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
    };

    const item = await Item.create(newItem);
    res.send(item);
};

exports.findAll = async (req, res) => {
    const items = await Item.findAll();
    res.send(items);
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    const item = await Item.findByPk(id);

    if (!item) {
        res.status(404).send(`Item with id=${id} not found`);
    } else {
        res.send(item);
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        description: req.body.description,
    };

    const rowsAffected = await Item.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Item with id=${id} not found`);
    } else {
        res.send({ message: `Item with id=${id} updated successfully` });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    const rowsAffected = await Item.destroy({ where: { id } });

    if (rowsAffected === 0) {
        res.status(404).send(`Item with id=${id} not found`);
    } else {
        res.send({ message: `Item with id=${id} deleted successfully` });
    }
};
