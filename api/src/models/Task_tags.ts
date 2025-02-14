import Task from './Task';
import Tag from './Tag';

Task.belongsToMany(Tag, {
    through: 'Task_Tags',
});

Tag.belongsToMany(Task, {
    through: 'Task_Tags'
});