import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Project = db.define('project', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    project_code:{
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            len: [3, 10]
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    description:{
        type: DataTypes.TEXT,
    },
    start_date:{
        type: DataTypes.DATEONLY
    },
    end_date:{
        type: DataTypes.DATEONLY
    }
});

User.belongsToMany(Project, { through: 'user_project' });
Project.belongsToMany(User, { through: 'user_project' });

export default Project;