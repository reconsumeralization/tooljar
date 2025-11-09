import { Request, Response } from 'express';
import ImportExportModel from '../models/importExportModel';
import { catchAsync, AppError } from '../middleware/errorHandler';
import { isValidObjectId, isSecurePath } from '../middleware/validation';

class ImportExportController {
    // Export app as JSON
    public exportApp = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const appId = req.params.id;

        // Validate ObjectId to prevent NoSQL injection
        if (!isValidObjectId(appId)) {
            throw new AppError('Invalid app ID format', 400);
        }

        const app = await ImportExportModel.exportApp(appId);

        res.status(200).json({
            status: 'success',
            data: { app }
        });
    });

    // Import app from JSON
    public importApp = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const appData = req.body;

        // Validate required fields
        if (!appData || typeof appData !== 'object') {
            throw new AppError('Invalid app data', 400);
        }

        // If appData contains file paths, validate them
        if (appData.filePath && !isSecurePath(appData.filePath)) {
            throw new AppError('Invalid file path detected', 400);
        }

        // Prevent importing with specific ID to avoid overwriting
        if (appData._id) {
            throw new AppError('Cannot import with specific ID', 400);
        }

        const app = await ImportExportModel.importApp(appData);

        res.status(201).json({
            status: 'success',
            data: { app }
        });
    });
}

export default new ImportExportController();
