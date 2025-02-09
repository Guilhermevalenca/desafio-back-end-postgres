import Task from '@migration/Task';
import Tag from '@migration/Tag';

Task.belongsToMany(Tag, {
    through: 'Task_Tags',
});

Tag.belongsToMany(Task, {
    through: 'Task_Tags'
});