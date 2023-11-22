```typescript
import { Request, Response } from 'express';
import AccessControl from '../models/accessControlModel';

const accessControlController = {
  // Get all access controls
  getAllAccessControls: async (req: Request, res: Response) => {
    try {
      const accessControls = await AccessControl.find();
      res.json(accessControls);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get one access control
  getAccessControl: async (req: Request, res: Response) => {
    try {
      const accessControl = await AccessControl.findById(req.params.id);
      if (accessControl == null) {
        return res.status(404).json({ message: 'Cannot find access control' });
      }
      res.json(accessControl);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Create one access control
  createAccessControl: async (req: Request, res: Response) => {
    const accessControl = new AccessControl({
      name: req.body.name,
      permissions: req.body.permissions,
    });

    try {
      const newAccessControl = await accessControl.save();
      res.status(201).json(newAccessControl);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update one access control
  updateAccessControl: async (req: Request, res: Response) => {
    try {
      const accessControl = await AccessControl.findById(req.params.id);
      if (accessControl == null) {
        return res.status(404).json({ message: 'Cannot find access control' });
      }

      if (req.body.name != null) {
        accessControl.name = req.body.name;
      }

      if (req.body.permissions != null) {
        accessControl.permissions = req.body.permissions;
      }

      const updatedAccessControl = await accessControl.save();
      res.json(updatedAccessControl);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete one access control
  deleteAccessControl: async (req: Request, res: Response) => {
    try {
      const accessControl = await AccessControl.findById(req.params.id);
      if (accessControl == null) {
        return res.status(404).json({ message: 'Cannot find access control' });
      }

      await accessControl.remove();
      res.json({ message: 'Deleted Access Control' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default accessControlController;
```
