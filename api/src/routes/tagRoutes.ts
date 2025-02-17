import app from '@app';
import TagController from "@controllers/TagController";
import TagValidation from "@middlewares/TagValidation";
import Middleware, {FindMiddleware} from "@middlewares/index";
import Controller from "@controllers/index";

export default function() {
    const tagController: Controller = new TagController();
    const tagValidation: Middleware = new TagValidation();
    const findMiddleware: Middleware = new FindMiddleware('tag');

    app.route('/tags')
        .get(tagController.index)
        .post(tagValidation.handle, tagController.store);

    app.route('/tags/:id')
        .get(findMiddleware.handle, tagController.show)
        .put(findMiddleware.handle, tagValidation.handle, tagController.update)
        .delete(findMiddleware.handle, tagController.destroy);
}