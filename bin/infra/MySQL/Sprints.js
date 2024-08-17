import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Project from "./Project.js";

const { DataTypes } = Sequelize;

const Sprints = db.define('sprints', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 150]
        }
    },
    goal:{
        type: DataTypes.TEXT,
    },
    start_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    end_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});

Project.hasMany(Sprints);
Sprints.belongsTo(Project, { foreignKey: 'projectId' });

export default Sprints;