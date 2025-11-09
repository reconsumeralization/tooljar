import { Request, Response } from 'express';
import VersionControlModel from '../models/versionControlModel';
import { catchAsync, AppError } from '../middleware/errorHandler';
import { isValidObjectId } from '../middleware/validation';

class VersionControlController {
  // Get all versions
  public getAllVersions = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const versions = await VersionControlModel.find();
    res.status(200).json({
      status: 'success',
      results: versions.length,
      data: { versions }
    });
  });

  // Get a specific version
  public getVersion = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid version ID format', 400);
    }

    const version = await VersionControlModel.findById(req.params.id);

    if (!version) {
      throw new AppError('Version not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { version }
    });
  });

  // Create a new version
  public createVersion = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // Validate required fields
    const { version, changes, author, app } = req.body;

    if (!version || !changes || !author || !app) {
      throw new AppError('Missing required fields: version, changes, author, app', 400);
    }

    // Validate app ObjectId
    if (!isValidObjectId(app)) {
      throw new AppError('Invalid app ID format', 400);
    }

    const newVersion = new VersionControlModel(req.body);
    await newVersion.save();

    res.status(201).json({
      status: 'success',
      data: { version: newVersion }
    });
  });

  // Update a version
  public updateVersion = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid version ID format', 400);
    }

    // Validate app ObjectId if provided
    if (req.body.app && !isValidObjectId(req.body.app)) {
      throw new AppError('Invalid app ID format', 400);
    }

    const version = await VersionControlModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!version) {
      throw new AppError('Version not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { version }
    });
  });

  // Delete a version
  public deleteVersion = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // Validate ObjectId to prevent NoSQL injection
    if (!isValidObjectId(req.params.id)) {
      throw new AppError('Invalid version ID format', 400);
    }

    const version = await VersionControlModel.findByIdAndDelete(req.params.id);

    if (!version) {
      throw new AppError('Version not found', 404);
    }

    res.status(200).json({
      status: 'success',
      message: 'Version deleted successfully'
    });
  });
}

export default new VersionControlController();
