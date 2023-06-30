import express, { Router } from 'express';
import { Signup } from '@auth/controllers/signup';
import { Signin } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';

// Desing Pattern Prototype y Mediator
class AuthRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.post('/signup', Signup.prototype.create);

		this.router.post('/signin', Signin.prototype.read);

		return this.router;
	}

	public signoutRoute(): Router {
		this.router.get('/signout', SignOut.prototype.update);

		return this.router;
	}
}

export const authRoutes: AuthRoutes = new AuthRoutes();
