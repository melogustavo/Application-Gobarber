// Session = Autenticacao de login
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessiosRouter = Router();
const sessionsController = new SessionsController();

sessiosRouter.post('/', sessionsController.create);

export default sessiosRouter;
