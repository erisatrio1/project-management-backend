import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Stories from "./Stories.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Tasks = db.define('tasks', {
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
    status:{
        type: DataTypes.ENUM({
            values: ['Backlog', 'In Progress', 'Done']
        })
    },
    userStoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    assigneeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});

Stories.hasMany(Tasks);
Tasks.belongsTo(Stories, { foreignKey: 'userStoryId' });
User.hasMany(Tasks);
Tasks.belongsTo(User, { foreignKey: 'assigneeId' });

export default Tasks;