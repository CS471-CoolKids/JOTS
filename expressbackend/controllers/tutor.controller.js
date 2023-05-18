import db from '../config/database.js';
const Tutor = db.tutors;

export async function create(req, res) {
    const newTutor = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        credentials: req.body.credentials
    };

    try {
        const tutor = await Tutor.create(newTutor);
        res.send(tutor);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}


export async function findAll(req, res) {
    const tutors = await Tutor.findAll();
    res.send(tutors);
}

export async function findOne(req, res) {
    const id = req.params.id;
    const tutor = await Tutor.findByPk(id);

    if (!tutor) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        res.send(tutor);
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        credentials: req.body.credentials
    };

    const rowsAffected = await Tutor.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Tutor with id=${id} not found`);
    } else {
        // Fetch the updated tutor and send it back to the client
        const updatedTutor = await Tutor.findByPk(id);
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