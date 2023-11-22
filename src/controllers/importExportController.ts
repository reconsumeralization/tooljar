```typescript
import { Request, Response } from 'express';
import ImportExportModel from '../models/importExportModel';

class ImportExportController {
    // Export app as JSON
    public async exportApp(req: Request, res: Response): Promise<void> {
        try {
            const appId = req.params.id;
            const app = await ImportExportModel.exportApp(appId);
            res.json(app);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    // Import app from JSON
    public async importApp(req: Request, res: Response): Promise<void> {
        try {
            const appData = req.body;
            const app = await ImportExportModel.importApp(appData);
            res.json(app);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default new ImportExportController();
```
