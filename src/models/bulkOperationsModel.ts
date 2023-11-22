
import mongoose from 'mongoose';

const bulkOperationsSchema = new mongoose.Schema({
  operationType: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

class BulkOperationsModel {
  private model: mongoose.Model<mongoose.Document, {}>;

  constructor() {
    this.model = mongoose.model('BulkOperations', bulkOperationsSchema);
  }

  // Import database rows
  public async importRows(data: any): Promise<any> {
    const operation = new this.model({
      operationType: 'import',
      data: data,
    });
    return await operation.save();
  }

  // Export database rows
  public async exportRows(data: any): Promise<any> {
    const operation = new this.model({
      operationType: 'export',
      data: data,
    });
    return await operation.save();
  }

  // Execute operations on database rows
  public async executeOperations(data: any): Promise<any> {
    const operation = new this.model({
      operationType: 'execute',
      data: data,
    });
    return await operation.save();
  }
}

export default BulkOperationsModel;
