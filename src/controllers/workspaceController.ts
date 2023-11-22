```typescript
import { Request, Response } from 'express';
import Workspace from '../models/workspaceModel';

const workspaceController = {
  // Get all workspaces
  getAllWorkspaces: async (req: Request, res: Response) => {
    try {
      const workspaces = await Workspace.find();
      res.json(workspaces);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get a single workspace by ID
  getWorkspaceById: async (req: Request, res: Response) => {
    try {
      const workspace = await Workspace.findById(req.params.id);
      if (workspace == null) {
        return res.status(404).json({ message: 'Cannot find workspace' });
      }
      res.json(workspace);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Create a new workspace
  createWorkspace: async (req: Request, res: Response) => {
    const workspace = new Workspace({
      name: req.body.name,
      description: req.body.description,
      // Add other workspace properties here
    });

    try {
      const newWorkspace = await workspace.save();
      res.status(201).json(newWorkspace);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update a workspace
  updateWorkspace: async (req: Request, res: Response) => {
    try {
      const workspace = await Workspace.findById(req.params.id);
      if (workspace == null) {
        return res.status(404).json({ message: 'Cannot find workspace' });
      }

      if (req.body.name != null) {
        workspace.name = req.body.name;
      }
      // Update other workspace properties here

      const updatedWorkspace = await workspace.save();
      res.json(updatedWorkspace);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Delete a workspace
  deleteWorkspace: async (req: Request, res: Response) => {
    try {
      const workspace = await Workspace.findById(req.params.id);
      if (workspace == null) {
        return res.status(404).json({ message: 'Cannot find workspace' });
      }

      await workspace.remove();
      res.json({ message: 'Deleted Workspace' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default workspaceController;
```
