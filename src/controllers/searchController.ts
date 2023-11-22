```typescript
import { Request, Response } from 'express';
import SearchModel from '../models/searchModel';

class SearchController {
    private searchModel: SearchModel;

    constructor() {
        this.searchModel = new SearchModel();
    }

    public async searchApps(req: Request, res: Response) {
        try {
            const { query } = req.body;
            const results = await this.searchModel.searchApps(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new SearchController();
```
