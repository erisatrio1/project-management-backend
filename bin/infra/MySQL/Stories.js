import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Sprints from "./Sprints.js";

const { DataTypes } = Sequelize;

const Stories = db.define('user_stories', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 150]
        }
    },
    description:{
        type: DataTypes.TEXT,
    },
    priority:{
        type: DataTypes.ENUM({
            values: ['Low', 'Medium', 'High']
        })
    },
    status:{
        type: DataTypes.ENUM({
            values: ['Backlog', 'In Progress', 'Done']
        })
    },
    sprintId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});

Sprints.hasMany(Stories);
Stories.belongsTo(Sprints, { foreignKey: 'sprintId' });

export default Stories;