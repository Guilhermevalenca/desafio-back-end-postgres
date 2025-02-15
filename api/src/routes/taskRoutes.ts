import app from '@app';
import TaskController from '@controllers/TaskController';
import Middleware, { FindMiddleware } from "@middlewares/index";
import TaskValidation from "@middlewares/TaskValidation";
import Controller from "@controllers/index";

export default function() {
    const taskController: Controller = new TaskController();
    const taskValidation: Middleware = new TaskValidation();
    const taskFind: FindMiddleware = new FindMiddleware('Task');

    app.route('/tasks')
        .get(taskController.index)
        .post(taskValidation.handle, taskController.store);

    app.route('/tasks/:id')
        .get(taskFind.handle, taskController.show)
        .put(taskFind.handle, taskValidation.handle, taskController.update)
        .delete(taskFind.handle, taskController.destroy);
}