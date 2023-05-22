import db from '../config/database.js';
const Student = db.students;

export async function create(req, res) {
    const newStudent = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    try {
        const student = await Student.create(newStudent);
        res.send(student);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}


export async function findAll(req, res) {
    const students = await Student.findAll();
    res.send(students);
}

export async function findOne(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        res.status(404).send(`Student with id=${id} not found`);
    } else {
        res.send(student);
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const rowsAffected = await Student.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Student with id=${id} not found`);
    } else {
        // Fetch the updated student and send it back to the client
        const updatedStudent = await Student.findByPk(id);
        res.send({ message: `Student with id=${id} updated successfully`, student: updatedStudent });
    }
}


export async function _delete(req, res) {
    const id = req.params.id;

    const rowsAffected = await Student.destroy({ where: { id } });

    if (rowsAffected === 0) {
        res.status(404).send(`Student with id=${id} not found`);
    } else {
        res.send({ message: `Student with id=${id} deleted successfully` });
    }
}