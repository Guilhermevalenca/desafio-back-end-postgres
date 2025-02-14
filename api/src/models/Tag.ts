import database from "@database";
import {DataTypes} from "sequelize";
import Task from "./Task";

export default database.define(
    'task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
);