import database from "@database";
import Tag from "@models/Tag";
import Task from "@models/Task";

const TaskTags = database.define(
    'task_tags',
    {}
);

Task.belongsToMany(Tag, {
    through: TaskTags,
    foreignKey: 'task_id'
});

Tag.belongsToMany(Task, {
    through: TaskTags,
    foreignKey: 'tag_id'
});

export default TaskTags;