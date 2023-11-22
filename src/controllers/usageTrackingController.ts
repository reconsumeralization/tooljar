```typescript
import { Request, Response } from 'express';
import UsageTrackingModel from '../models/usageTrackingModel';

class UsageTrackingController {
  // Get all usage tracking data
  public async getAllUsageData(req: Request, res: Response): Promise<void> {
    try {
      const usageData = await UsageTrackingModel.find();
      res.status(200).json({ usageData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get usage tracking data by ID
  public async getUsageDataById(req: Request, res: Response): Promise<void> {
    try {
      const usageData = await UsageTrackingModel.findById(req.params.id);
      if (!usageData) {
        res.status(404).json({ message: 'Usage data not found' });
      } else {
        res.status(200).json({ usageData });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create new usage tracking data
  public async createUsageData(req: Request, res: Response): Promise<void> {
    try {
      const usageData = new UsageTrackingModel(req.body);
      await usageData.save();
      res.status(201).json({ usageData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update usage tracking data by ID
  public async updateUsageData(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usageData = await UsageTrackingModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!usageData) {
        res.status(404).json({ message: 'Usage data not found' });
      } else {
        res.status(200).json({ usageData });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete usage tracking data by ID
  public async deleteUsageData(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await UsageTrackingModel.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Usage data not found' });
      } else {
        res.status(200).json({ deleted });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UsageTrackingController();
```
