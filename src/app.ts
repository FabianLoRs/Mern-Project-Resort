import express, { Express } from 'express';
import setupDatabaseBootstrap from '@bootstrap/setupDatabase.bootstrap';
import { config } from '@configs/configEnvs';
import { ResortServer } from '@bootstrap/setupServer.bootstrap';

class Application {
	public initialize(): void {
		this.loadConfig();
		setupDatabaseBootstrap();

		const app: Express = express();
		const server: ResortServer = new ResortServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: Application = new Application();
application.initialize();
