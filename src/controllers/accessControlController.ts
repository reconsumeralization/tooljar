import { Request, Response } from 'express';
import AccessControl from '../models/accessControlModel';
import { catchAsync, AppError } from '../middleware/errorHandler';
import { isValidObjectId } from '../middleware/validation';

const accessControlController = {
  // Get all access controls
  getAllAccessControls: catchAsync(async (req: Request, res: Response) => {
    const accessControls = await AccessControl.find();
    res.status(200).json({
      status: 'success',
      results: accessControls.length,
      data: { accessControls }
    });
  }),

  // Get one access control
  getAccessControl: catchAsync(async (req: Request, res: Response) => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid access control ID format', 400);
    }

    const accessControl = await AccessControl.findById(req.params.id);

    if (!accessControl) {
      throw new AppError('Access control not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { accessControl }
    });
  }),

  // Create one access control
  createAccessControl: catchAsync(async (req: Request, res: Response) => {
    const { name, permissions } = req.body;

    if (!name) {
      throw new AppError('Name is required', 400);
    }

    const accessControl = new AccessControl({
      name,
      permissions,
    });

    const newAccessControl = await accessControl.save();

    res.status(201).json({
      status: 'success',
      data: { accessControl: newAccessControl }
    });
  }),

  // Update one access control
  updateAccessControl: catchAsync(async (req: Request, res: Response) => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid access control ID format', 400);
    }

    const accessControl = await AccessControl.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        permissions: req.body.permissions
      },
      { new: true, runValidators: true }
    );

    if (!accessControl) {
      throw new AppError('Access control not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { accessControl }
    });
  }),

  // Delete one access control
  deleteAccessControl: catchAsync(async (req: Request, res: Response) => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid access control ID format', 400);
    }

    const accessControl = await AccessControl.findByIdAndDelete(req.params.id);

    if (!accessControl) {
      throw new AppError('Access control not found', 404);
    }

    res.status(200).json({
      status: 'success',
      message: 'Access control deleted successfully'
    });
  }),
};

export default accessControlController;
