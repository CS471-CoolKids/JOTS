const { DataTypes } = require('sequelize');

const Tutor = sequelize.define('tutor', {
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = Tutor;
