import db from '../config/database.js';
const Course = db.courses;

export async function create(req, res) {
    const newCourse = {
        id: req.body.id,
        name: req.body.name,
        textbook: req.body.textbook,
        homework: req.body.homework
    };

    try {
        const course = await Course.create(newCourse);
        res.send(course);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}


export async function findAll(req, res) {
    const courses = await Course.findAll();
    res.send(courses);
}

export async function findOne(req, res) {
    const id = req.params.id;
    const course = await Course.findByPk(id);

    if (!course) {
        res.status(404).send(`Course with id=${id} not found`);
    } else {
        res.send(course);
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        textbook: req.body.textbook,
        homework: req.body.homework
    };

    const rowsAffected = await Course.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Course with id=${id} not found`);
    } else {
        // Fetch the updated student and send it back to the client
        const updatedCourse = await Course.findByPk(id);
        res.send({ message: `Course with id=${id} updated successfully`, course: updatedCourse });
    }
}


export async function _delete(req, res) {
    const id = req.params.id;

    const rowsAffected = await Course.destroy({ where: { id } });

    if (rowsAffected === 0) {
        res.status(404).send(`Course with id=${id} not found`);
    } else {
        res.send({ message: `Course with id=${id} deleted successfully` });
    }
}