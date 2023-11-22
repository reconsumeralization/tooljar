```typescript
import { Request, Response } from 'express';
import Collaboration from '../models/collaborationModel';

const collaborationController = {
  // Get all collaboration activities
  getAllCollaborations: async (req: Request, res: Response) => {
    try {
      const collaborations = await Collaboration.find();
      res.json(collaborations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get a specific collaboration activity
  getCollaboration: async (req: Request, res: Response) => {
    try {
      const collaboration = await Collaboration.findById(req.params.id);
      if (collaboration == null) {
        return res.status(404).json({ message: 'Cannot find collaboration' });
      }
      res.json(collaboration);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Create a new collaboration activity
  createCollaboration: async (req: Request, res: Response) => {
    const collaboration = new Collaboration({
      user: req.body.user,
      action: req.body.action,
      timestamp: req.body.timestamp,
    });

    try {
      const newCollaboration = await collaboration.save();
      res.status(201).json(newCollaboration);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update a collaboration activity
  updateCollaboration: async (req: Request, res: Response) => {
    try {
      const collaboration = await Collaboration.findById(req.params.id);
      if (collaboration == null) {
        return res.status(404).json({ message: 'Cannot find collaboration' });
      }

      if (req.body.user != null) {
        collaboration.user = req.body.user;
      }
      if (req.body.action != null) {
        collaboration.action = req.body.action;
      }
      if (req.body.timestamp != null) {
        collaboration.timestamp = req.body.timestamp;
      }

      const updatedCollaboration = await collaboration.save();
      res.json(updatedCollaboration);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Delete a collaboration activity
  deleteCollaboration: async (req: Request, res: Response) => {
    try {
      const collaboration = await Collaboration.findById(req.params.id);
      if (collaboration == null) {
        return res.status(404).json({ message: 'Cannot find collaboration' });
      }

      await collaboration.remove();
      res.json({ message: 'Deleted Collaboration' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default collaborationController;
```
