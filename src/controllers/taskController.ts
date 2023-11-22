```typescript
import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';

class TaskController {
    // Get all tasks
    public async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await TaskModel.find();
            res.status(200).json({ tasks });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single task by ID
    public async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const task = await TaskModel.findById(req.params.id);
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ task });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new task
    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const task = new TaskModel(req.body);
            await task.save();
            res.status(201).json({ task });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a task
    public async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ task });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a task
    public async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const task = await TaskModel.findByIdAndDelete(req.params.id);
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task deleted' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TaskController();
```
