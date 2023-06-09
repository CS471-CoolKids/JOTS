import db from '../config/database.js';
import { hashPass } from './auth.controller.js';
const Tutor = db.tutors;

export async function create(req, res) {
    const newTutor = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: await hashPass(req.body.password),
        resume: req.body.resume
    };

    try {
        const tutor = await Tutor.create(newTutor);
        delete tutor.dataValues["password"];
        res.send(tutor);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}


export async function findAll(req, res) {
    const tutors = await Tutor.findAll();
    tutors.forEach((tutor) => {
        delete tutor.dataValues["password"];
    })
    res.send(tutors);
}

export async function findOne(req, res) {
    const id = req.params.id;
    const tutor = await Tutor.findByPk(id);

    if (!tutor) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        delete tutor.dataValues["password"];
        res.send(tutor);
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const updateData = {
        password: req.body.password !== undefined ? await hashPass(req.body.password) : undefined,
        name: req.body.name,
        email: req.body.email,
        resume: req.body.resume
    };

    const rowsAffected = await Tutor.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        // Fetch the updated tutor and send it back to the client
        const updatedTutor = await Tutor.findByPk(id);
        delete updatedTutor.dataValues["password"];
        res.send({ message: `Tutor with id=${id} updated successfully`, tutor: updatedTutor });
    }
}


export async function _delete(req, res) {
    const id = req.params.id;

    const rowsAffected = await Tutor.destroy({ where: { id } });

    if (rowsAffected === 0) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        res.send({ message: `Tutor with id=${id} deleted successfully` });
    }
}