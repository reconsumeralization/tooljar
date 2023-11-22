```typescript
import { Request, Response } from 'express';
import VersionControlModel from '../models/versionControlModel';

class VersionControlController {
  // Get all versions
  public async getAllVersions(req: Request, res: Response): Promise<void> {
    try {
      const versions = await VersionControlModel.find();
      res.status(200).json({ versions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a specific version
  public async getVersion(req: Request, res: Response): Promise<void> {
    try {
      const version = await VersionControlModel.findById(req.params.id);
      if (!version) {
        res.status(404).json({ message: 'Version not found' });
      } else {
        res.status(200).json({ version });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new version
  public async createVersion(req: Request, res: Response): Promise<void> {
    try {
      const version = new VersionControlModel(req.body);
      await version.save();
      res.status(201).json({ version });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a version
  public async updateVersion(req: Request, res: Response): Promise<void> {
    try {
      const version = await VersionControlModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!version) {
        res.status(404).json({ message: 'Version not found' });
      } else {
        res.status(200).json({ version });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a version
  public async deleteVersion(req: Request, res: Response): Promise<void> {
    try {
      const version = await VersionControlModel.findByIdAndDelete(req.params.id);
      if (!version) {
        res.status(404).json({ message: 'Version not found' });
      } else {
        res.status(200).json({ message: 'Version deleted' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new VersionControlController();
```
