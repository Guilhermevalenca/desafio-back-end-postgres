import app from '@app';
import TaskController from '@controllers/TaskController';
import Middleware, { FindMiddleware } from "@middlewares/index";
import TaskValidation from "@middlewares/TaskValidation";

export default function() {
    const taskController: TaskController = new TaskController();
    const taskValidation: Middleware = new TaskValidation();
    const taskFind: FindMiddleware = new FindMiddleware('Task');

    app.route('/tasks')
        .get(taskController.index)
        .post(taskValidation.handle, taskController.store);

    app.route('/tasks/:id')
        .get(
            (...params) => taskFind.handle(...params),
            taskController.show
        )
        .put(
            (...params) => taskFind.handle(...params),
            taskValidation.handle,
            taskController.update
        )
        .delete(
            (...params) => taskFind.handle(...params),
            taskController.destroy
        );
}