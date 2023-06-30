import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { reservationScheme } from '@reservation/schemes/reservation';
import { IReservationDocument } from '@reservation/interfaces/IReservationDocument.interface';
import { reservationService } from '@services/db/reservation.service';
import { authService } from '@services/db/auth.service';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { ReservationUtility } from './utilities/reservation.utility';
import { Generators } from '@helpers/generators/generators';
import HTTP_STATUS from 'http-status-codes';

export class Reservation extends ReservationUtility {
	@joiValidation(reservationScheme)
	public async create(req: Request, res: Response): Promise<void> {
		const { nights, category, beds } = req.body;

		const reservationId: ObjectId = new ObjectId();
		const user: IAuthDocument = await authService.getUserByEmail(`${req.currentUser?.email}`);

		const reservationData: IReservationDocument = Reservation.prototype.reservationData({
			_id: reservationId,
			guests: user,
			room: Generators.randomNumber(),
			nights,
			category,
			beds
		});

		const reservationCreated = (await reservationService.createReservation(
			reservationData
		)) as unknown as IReservationDocument;

		res
			.status(HTTP_STATUS.CREATED)
			.json({ message: 'Reservation created successfully', reservation: reservationCreated });
	}

	public async read(req: Request, res: Response): Promise<void> {
		const reservation: IReservationDocument = await reservationService.getReservationById(
			`${req.params.reservationId}`
		);

		if (!reservation) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Reservation not found', reservation: {} });
		}

		res.status(HTTP_STATUS.OK).json({ message: 'Reservation founded', reservation: reservation });
	}

	public async edit(req: Request, res: Response): Promise<void> {
		const { nights } = req.body;

		const reservationInDB: IReservationDocument = await reservationService.getReservationById(
			`${req.params.reservationId}`
		);

		if (!reservationInDB) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Reservation not found', reservation: {} });
		}

		await reservationService.editReservation(`${req.params.reservationId}`, nights);

		const reservationUpdated: IReservationDocument = await reservationService.getReservationById(
			`${req.params.reservationId}`
		);

		res
			.status(HTTP_STATUS.CREATED)
			.json({ message: 'Reservation updated successfully', reservation: reservationUpdated });
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const reservationInDB: IReservationDocument = await reservationService.getReservationById(
			`${req.params.reservationId}`
		);

		if (!reservationInDB) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Reservation not found', reservation: {} });
		}

		await reservationService.deleteReservation(`${req.params.reservationId}`);
		res.status(HTTP_STATUS.OK).json({ message: 'Reservation deleted successfully', reservation: {} });
	}
}
