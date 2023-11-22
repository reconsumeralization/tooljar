
import mongoose from 'mongoose';
import AppModel from './appModel';

class ImportExportModel {
    // Export app as JSON
    public async exportApp(appId: string): Promise<any> {
        try {
            const app = await AppModel.findById(appId);
            if (!app) {
                throw new Error('App not found');
            }
            return app;
        } catch (error) {
            throw error;
        }
    }

    // Import app from JSON
    public async importApp(appData: any): Promise<any> {
        try {
            const app = new AppModel(appData);
            const result = await app.save();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new ImportExportModel();
