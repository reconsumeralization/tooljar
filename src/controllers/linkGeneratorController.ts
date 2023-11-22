```typescript
import { Request, Response } from 'express';
import LinkGeneratorModel from '../models/linkGeneratorModel';

class LinkGeneratorController {
    // Generate a new link
    public async generateLink(req: Request, res: Response): Promise<void> {
        try {
            const { appID } = req.body;
            const link = await LinkGeneratorModel.generate(appID);
            res.status(200).json({ link });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all generated links
    public async getLinks(req: Request, res: Response): Promise<void> {
        try {
            const links = await LinkGeneratorModel.find();
            res.status(200).json({ links });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a specific link by ID
    public async getLink(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const link = await LinkGeneratorModel.findById(id);
            if (!link) {
                res.status(404).json({ message: 'Link not found' });
            } else {
                res.status(200).json({ link });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a specific link by ID
    public async deleteLink(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedLink = await LinkGeneratorModel.findByIdAndDelete(id);
            if (!deletedLink) {
                res.status(404).json({ message: 'Link not found' });
            } else {
                res.status(200).json({ message: 'Link deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new LinkGeneratorController();
```
