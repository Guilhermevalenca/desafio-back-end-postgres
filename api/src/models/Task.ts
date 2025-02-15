import database from "@database";
import { DataTypes } from "sequelize";

export default database.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'in_progress', 'completed'],
            defaultValue: 'pending',
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
);

