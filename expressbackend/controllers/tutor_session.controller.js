import db from '../config/database.js';
const TutorSession = db.tutor_sessions;

export async function create(req, res) {
    const newTutorSession = {
        tutorId: req.body.tutorId,
        studentId: req.body.studentId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        isRepeating: req.body.isRepeating,
        courseId: req.body.courseId
    };

    try {
        const tutor_session = await TutorSession.create(newTutorSession);
        res.send(tutor_session);
    } catch (error) {
        // This is a simplistic error handling. You might want to
        // improve this to handle specific error cases
        res.status(500).send({ message: error.message });
    }
}

export async function findSessions(req, res) {
    const { tutorId, studentId, startTime } = req.query;

    const where = {};
    if (tutorId !== undefined) {
        where.tutorId = tutorId;
    }
    if (studentId !== undefined) {
        where.studentId = studentId;
    }
    if (startTime !== undefined) {
        where.startTime = startTime;
    }

    const tutor_sessions = await TutorSession.findAll({ where });

    if (!tutor_sessions || tutor_sessions.length === 0) {
        res.status(404).send('No Tutor Sessions found with the provided criteria');
    } else {
        res.send(tutor_sessions);
    }
}

export async function update(req, res) {
    const { tutorId, studentId, startTime } = req.params;

    const existingSession = await TutorSessionModel.findOne({ where: { tutorId, studentId, startTime } });

    if (!existingSession) {
        res.status(404).send(`Tutor Session with tutorId=${tutorId}, studentId=${studentId}, startTime=${startTime} not found`);
        return;
    }

    if (req.body.startTime && req.body.startTime !== startTime) {
        // startTime has changed, so we need to delete and recreate the session
        const updateData = {
            tutorId: req.body.tutorId || existingSession.tutorId,
            studentId: req.body.studentId || existingSession.studentId,
            startTime: req.body.startTime,
            endTime: req.body.endTime || existingSession.endTime,
            isRepeating: req.body.isRepeating !== undefined ? req.body.isRepeating : existingSession.isRepeating,
            courseId: req.body.courseId || existingSession.courseId
        };

        await TutorSessionModel.destroy({ where: { tutorId, studentId, startTime } });
        const newSession = await TutorSessionModel.create(updateData);

        res.send({ message: `Tutor Session updated successfully`, session: newSession });
    } else {
        // startTime hasn't changed, so we can just update the session
        const updateData = {
            endTime: req.body.endTime || existingSession.endTime,
            isRepeating: req.body.isRepeating !== undefined ? req.body.isRepeating : existingSession.isRepeating,
            courseId: req.body.courseId || existingSession.courseId
        };

        await TutorSessionModel.update(updateData, { where: { tutorId, studentId, startTime } });
        const updatedSession = await TutorSessionModel.findOne({ where: { tutorId, studentId, startTime } });

        res.send({ message: `Tutor Session updated successfully`, session: updatedSession });
    }
}


export async function _delete(req, res) {
    const { tutorId, studentId, startTime } = req.params;

    const rowsAffected = await TutorSessionModel.destroy({ where: { tutorId, studentId, startTime } });

    if (rowsAffected === 0) {
        res.status(404).send(`Tutor Session with tutorId=${tutorId}, studentId=${studentId}, startTime=${startTime} not found`);
    } else {
        res.send({ message: `Tutor Session deleted successfully` });
    }
}
