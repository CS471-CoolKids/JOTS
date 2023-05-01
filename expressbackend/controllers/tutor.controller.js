const db = require('../config/database.js');
const Tutor = db.tutors;

exports.create = async (req, res) => {
    const newTutor = {
        name: req.body.name,
    };

    const tutor = await Tutor.create(newTutor);
    res.send(tutor);
};

exports.findAll = async (req, res) => {
    const tutors = await Tutor.findAll();
    res.send(tutors);
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    const tutor = await Tutor.findByPk(id);

    if (!tutor) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        res.send(tutor);
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
    };

    const rowsAffected = await Tutor.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        res.send({ message: `Tutor with id=${id} updated successfully` });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    const rowsAffected = await Tutor.destroy({ where: { id } });

    if (rowsAffected === 0) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        res.send({ message: `Tutor with id=${id} deleted successfully` });
    }
};
