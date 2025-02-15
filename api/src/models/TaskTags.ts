import database from "@database";
import Tag from "@models/Tag";
import Task from "@models/Task";

const TaskTags = database.define(
    'Task_Tags',
    {}
);

Task.belongsToMany(Tag, {
    through: TaskTags
});

Tag.belongsToMany(Task, {
    through: TaskTags
});

export default TaskTags;