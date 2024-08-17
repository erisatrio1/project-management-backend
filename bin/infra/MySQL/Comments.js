import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Stories from "./Stories.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Comments = db.define('comments', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    comment:{
        type: DataTypes.TEXT,
    },
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});

Stories.hasMany(Comments);
Comments.belongsTo(Stories, { foreignKey: 'storyId' });
User.hasMany(Comments);
Comments.belongsTo(User, { foreignKey: 'userId' });

export default Comments;