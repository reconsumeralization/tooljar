```typescript
import { Request, Response } from 'express';
import { uiModel } from '../models/uiModel';

class UIController {
    // Get UI settings
    public getUISettings(req: Request, res: Response) {
        uiModel.getUISettings((err: any, data: any) => {
            if (err) {
                res.status(500).send({
                    message: 'Error retrieving UI settings',
                    error: err
                });
            } else {
                res.send(data);
            }
        });
    }

    // Update UI settings
    public updateUISettings(req: Request, res: Response) {
        const newSettings = req.body;

        uiModel.updateUISettings(newSettings, (err: any, data: any) => {
            if (err) {
                res.status(500).send({
                    message: 'Error updating UI settings',
                    error: err
                });
            } else {
                res.send(data);
            }
        });
    }

    // Reset UI settings to default
    public resetUISettings(req: Request, res: Response) {
        uiModel.resetUISettings((err: any, data: any) => {
            if (err) {
                res.status(500).send({
                    message: 'Error resetting UI settings',
                    error: err
                });
            } else {
                res.send(data);
            }
        });
    }
}

export = new UIController();
```
