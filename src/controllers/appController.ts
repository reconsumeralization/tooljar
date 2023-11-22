```typescript
import { Request, Response } from 'express';
import AppModel from '../models/appModel';

class AppController {
    // Get all apps
    public async getApps(req: Request, res: Response): Promise<void> {
        try {
            const apps = await AppModel.find();
            res.json(apps);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Get a single app by ID
    public async getApp(req: Request, res: Response): Promise<void> {
        try {
            const app = await AppModel.findById(req.params.id);
            if (app) {
                res.json(app);
            } else {
                res.status(404).send('App not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Create a new app
    public async createApp(req: Request, res: Response): Promise<void> {
        try {
            const app = new AppModel(req.body);
            const result = await app.save();
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update an existing app
    public async updateApp(req: Request, res: Response): Promise<void> {
        try {
            const app = await AppModel.findByIdAndUpdate(req.params.id, req.body);
            if (app) {
                const updatedApp = await AppModel.findById(req.params.id);
                res.json(updatedApp);
            } else {
                res.status(404).send('App not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Delete an app
    public async deleteApp(req: Request, res: Response): Promise<void> {
        try {
            const app = await AppModel.findByIdAndDelete(req.params.id);
            if (app) {
                res.status(200).send('App deleted');
            } else {
                res.status(404).send('App not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new AppController();
```
