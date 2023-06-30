import { Application, Request, Response } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { reservationRoutes } from '@reservation/routes/reservationRoutes';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { config } from '@configs/configEnvs';

// Design Pattern Chain of Responsability
export default (app: Application) => {
	const routes = () => {
		app.use('/healthcheck', (_req: Request, res: Response) => res.send('Server is OK!'));

		app.use(config.BASE_PATH!, authRoutes.routes());

		app.use(config.BASE_PATH!, authRoutes.signoutRoute());

		app.use(config.BASE_PATH!, authMiddleware.verifyUser, reservationRoutes.routes());
	};
	routes();
};
