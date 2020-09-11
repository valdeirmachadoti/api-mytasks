import {Router} from 'express';

import authMiddleware from './app/middleware/auth'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router ();

routes.post ('/users', UserController.store);
routes.post ('/sessions', SessionController.store);

//Todas as rotas abaixo desse middleware vão precisar de autenticação
routes.use(authMiddleware)
routes.put('/users', UserController.update);

routes.post('/tasks', TaskController.store)
routes.get('/tasks', TaskController.index)

export default routes;