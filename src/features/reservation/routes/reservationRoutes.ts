import express, { Router } from 'express';
import { Reservation } from '@reservation/controllers/reservation';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';

// Desing Pattern Prototype y Mediator
class ReservationRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.post('/makeReservation', authMiddleware.checkAuthentication, Reservation.prototype.create);

		this.router.get('/myReservation/:reservationId', authMiddleware.checkAuthentication, Reservation.prototype.read);

		this.router.put('/editReservation/:reservationId', authMiddleware.checkAuthentication, Reservation.prototype.edit);

		this.router.delete(
			'/deleteReservation/:reservationId',
			authMiddleware.checkAuthentication,
			Reservation.prototype.delete
		);

		return this.router;
	}
}

export const reservationRoutes: ReservationRoutes = new ReservationRoutes();
