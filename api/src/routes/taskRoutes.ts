import app from '@app';
import TaskController from '@controllers/TaskController';
import { FindMiddleware } from "@middlewares/index";
import TaskValidation from "@middlewares/TaskValidation";

export default function() {
    const taskController: TaskController = new TaskController();
    const taskValidation: TaskValidation = new TaskValidation();
    const taskFind: FindMiddleware = new FindMiddleware('task');

    app.route('/tasks')
        .get(taskController.index)
        .post(taskValidation.handle, taskController.store);

    app.route('/tasks/:id')
        .get(taskFind.handle, taskController.show)
        .put(taskFind.handle, taskValidation.handle, taskController.update)
        .delete(taskFind.handle, taskController.destroy);

    app.put('/tasks/:id/tags', taskFind.handle, taskValidation.subHandle, taskController.updateTags);
}