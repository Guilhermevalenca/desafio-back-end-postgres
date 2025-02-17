import app from '@app';
import env from '@env';
import routes from '@routes/index';
import initMigrate from './models/index';

try {
    initMigrate();
    routes();
    app.listen(env.API_PORT, () => {
        console.log(`Server running on port ${env.API_PORT}`);
    });

} catch (e) {
    console.log(e);
}
