import db from '../config/database.js';
const Student = db.students;
import { hashPass } from './auth.controller.js';

export async function create(req, res) {
    const newStudent = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: await hashPass(req.body.password)
    };

    try {
        const student = await Student.create(newStudent);
        delete student.dataValues["password"];
        res.send(student);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}


export async function findAll(req, res) {
    const students = await Student.findAll();
    students.forEach((student) => {
        delete student.dataValues["password"];
    })
    res.send(students);
}

export async function findOne(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        res.status(404).send(`Student with id=${id} not found`);
    } else {
        delete student.dataValues["password"];
        res.send(student);
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const updateData = {
        password: req.body.password !== undefined ? await hashPass(req.body.password) : undefined,
        name: req.body.name,
        email: req.body.email
    };

    const rowsAffected = await Student.update(updateData, { where: { id } });

    if (rowsAffected[0] === 0) {
        res.status(404).send(`Student with id=${id} not found`);
    } else {
        // Fetch the updated student and send it back to the client
        const updatedStudent = await Student.findByPk(id);
        delete updatedStudent.dataValues["password"];
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

export async function findMyTutors(req, res) {
    const id = req.params.id;

    const tutors = await Student.findAll({
        where: { id },
        include: [
            {
                model: TutorSession,
                attributes: [],
                include: [
                    {
                        model: Student,
                        attributes: ['name'],
                    },
                ],
            },
        ]
    });

    console.log(tutors);
}