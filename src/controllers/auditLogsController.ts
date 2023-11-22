```typescript
import { Request, Response } from 'express';
import AuditLogsModel from '../models/auditLogsModel';

class AuditLogsController {
  // Get all audit logs
  public async getAllAuditLogs(req: Request, res: Response): Promise<void> {
    try {
      const auditLogs = await AuditLogsModel.find();
      res.status(200).json({ auditLogs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single audit log by ID
  public async getAuditLogById(req: Request, res: Response): Promise<void> {
    try {
      const auditLog = await AuditLogsModel.findById(req.params.id);
      if (!auditLog) {
        res.status(404).json({ message: 'Audit log not found' });
      } else {
        res.status(200).json({ auditLog });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new audit log
  public async createAuditLog(req: Request, res: Response): Promise<void> {
    try {
      const auditLog = new AuditLogsModel(req.body);
      await auditLog.save();
      res.status(201).json({ auditLog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update an existing audit log
  public async updateAuditLog(req: Request, res: Response): Promise<void> {
    try {
      const auditLog = await AuditLogsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!auditLog) {
        res.status(404).json({ message: 'Audit log not found' });
      } else {
        res.status(200).json({ auditLog });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete an audit log
  public async deleteAuditLog(req: Request, res: Response): Promise<void> {
    try {
      const auditLog = await AuditLogsModel.findByIdAndDelete(req.params.id);
      if (!auditLog) {
        res.status(404).json({ message: 'Audit log not found' });
      } else {
        res.status(200).json({ message: 'Audit log deleted' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuditLogsController();
```
